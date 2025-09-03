/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  try {
    // Test backend connection
    const backendUrl = 'http://localhost:3005';
    console.log('Testing backend connection to:', `${backendUrl}/api/v1/orders`);
    
    const response = await fetch(`${backendUrl}/api/v1/orders`, {
      method: 'GET',
      signal: AbortSignal.timeout(5000),
    });
    
    if (response.ok) {
      return Response.json({ 
        message: 'Backend connection successful',
        backendStatus: 'connected',
        timestamp: new Date().toISOString()
      });
    } else {
      return Response.json({ 
        message: 'Backend connection failed',
        backendStatus: 'error',
        status: response.status,
        statusText: response.statusText,
        timestamp: new Date().toISOString()
      }, { status: 503 });
    }
  } catch (error) {
    console.error('Backend connection test failed:', error);
    return Response.json({ 
      message: 'Backend connection test failed',
      backendStatus: 'unreachable',
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString()
    }, { status: 503 });
  }
}

export async function POST(request: NextRequest) {
  try {
    console.log('=== API Orders POST Request Start ===');
    
    let body;
    try {
      body = await request.json();
      console.log('Request body received:', body);
    } catch (parseError) {
      console.error('Failed to parse request body:', parseError);
      return NextResponse.json(
        { error: 'Invalid JSON in request body' },
        { status: 400 }
      );
    }
    
    const {
      items,
      total,
      orderNumber,
      customerInfo,
      deliveryInfo,
      paymentMethod,
      note
    } = body;

    console.log('Extracted data:', {
      items: items?.length,
      total,
      orderNumber,
      customerInfo: !!customerInfo,
      deliveryInfo: !!deliveryInfo,
      paymentMethod,
      note
    });

    // Validate required fields
    if (!items || !total || !orderNumber || !customerInfo || !deliveryInfo) {
      console.error('Validation failed:', {
        hasItems: !!items,
        hasTotal: !!total,
        hasOrderNumber: !!orderNumber,
        hasCustomerInfo: !!customerInfo,
        hasDeliveryInfo: !!deliveryInfo
      });
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Chuẩn bị data để gửi đến backend Rails
    const orderData = {
      orders: {
        order_number: orderNumber,
        payment_method: paymentMethod,
        delivery_type: deliveryInfo.type,
        delivery_address: deliveryInfo.type === 'home' ? deliveryInfo.address : undefined,
        store_location: deliveryInfo.type === 'store' ? deliveryInfo.store : undefined,
        notes: note,
        guest_name: customerInfo.name,
        guest_email: customerInfo.email,
        guest_phone: customerInfo.mobile,
        shipping_info: deliveryInfo.type === 'home' ? {
          shipping_name: customerInfo.name,
          shipping_phone: customerInfo.mobile,
          shipping_city: deliveryInfo.city || 'Ho Chi Minh City',
          shipping_district: 'District 1',
          shipping_ward: 'Ward 1',
          shipping_postal_code: '70000',
          delivery_address: deliveryInfo.address
        } : undefined,
        order_items: items.map((item: any) => ({
          product_id: item.id,
          quantity: item.quantity,
          variant_id: item.selectedColor || null
        }))
      }
    };

    console.log('Prepared order data:', orderData);
    console.log('Proceeding with real backend API call...');
    
    // Gọi backend Rails API (Rails đang chạy trên port 3005)
    const backendUrl = 'http://localhost:3005'; // Backend Rails port
    console.log('Calling backend API:', `${backendUrl}/api/v1/orders`);
    console.log('Order data being sent:', orderData);
    
    try {
      // Test connection to backend first
      const testResponse = await fetch(`${backendUrl}/api/v1/orders`, {
        method: 'GET',
        signal: AbortSignal.timeout(5000), // 5 seconds timeout for test
      });
      
      if (!testResponse.ok) {
        console.error('Backend connection test failed:', testResponse.status, testResponse.statusText);
        throw new Error(`Backend không khả dụng: ${testResponse.status} ${testResponse.statusText}`);
      }
      
      console.log('Backend connection test successful');
      
      // Now make the actual POST request
      const response = await fetch(`${backendUrl}/api/v1/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
        signal: AbortSignal.timeout(10000), // 10 seconds timeout
      });
      
      console.log('Backend response received:', {
        status: response.status,
        statusText: response.statusText,
        headers: Object.fromEntries(response.headers.entries())
      });

      if (!response.ok) {
        let errorData;
        try {
          errorData = await response.json();
        } catch (e) {
          errorData = { error: `HTTP ${response.status}: ${response.statusText}` };
        }
        console.error('Backend API error:', errorData);
        console.error('Response status:', response.status);
        console.error('Response headers:', Object.fromEntries(response.headers.entries()));
        throw new Error(errorData.error || `Failed to create order in backend: ${response.status}`);
      }

      const orderResult = await response.json();
      console.log('Order created in backend:', orderResult);

      // Return success response
      return NextResponse.json({
        success: true,
        message: 'Order created successfully',
        order: orderResult
      });

    } catch (fetchError) {
      console.error('Fetch error:', fetchError);
      if (fetchError instanceof Error) {
        if (fetchError.name === 'TimeoutError') {
          throw new Error('Request timeout: Backend API không phản hồi trong thời gian quy định');
        }
        throw fetchError;
      }
      throw new Error(`Network error: ${fetchError instanceof Error ? fetchError.message : 'Unknown error'}`);
    }

  } catch (error) {
    console.error('=== API Orders POST Request Error ===');
    console.error('Error details:', error);
    console.error('Error stack:', error instanceof Error ? error.stack : 'No stack trace');
    
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Internal server error' },
      { status: 500 }
    );
  }
}
