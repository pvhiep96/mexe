/* eslint-disable @typescript-eslint/no-explicit-any */
import { api } from '@/config/api';
import { cookies } from 'next/headers';

import { NextResponse, NextRequest } from 'next/server';
export async function GET() {
  return Response.json({ message: 'Hello World' });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const response = await api.createOrder({
      orders: {
        order_number: body.order_number,
        order_items: [
          {
            product_id: body.productId,
            quantity: body.quantity,
            variant_id: body.variant_id,
          },
        ],
      },
    });
    console.log(response.data);

    (await cookies()).set({
      name: 'order',
      value: String(response.data.order_number),
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      path: '/',
    });

    return NextResponse.json(
      {
        message: 'Order created successfully',
        order: response.data,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Error creating order:', error);
    return NextResponse.json(
      { error: 'Failed to create order' },
      { status: 500 }
    );
  }
}
