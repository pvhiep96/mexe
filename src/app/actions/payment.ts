'use server';

import { redirect } from 'next/navigation';
import { headers } from 'next/headers';
import { vnpay, getClientIP, formatAmount, generateOrderId } from './lib/vnpay';
import { ProductCode, VnpLocale, VnpCurrCode, dateFormat } from 'vnpay';
import type {
  BankOption,
  ProductCodeOption,
  LocaleOption,
  PaymentResult,
} from './types';

// Define types for client-side use (without importing VNPay)
export interface PaymentFormData {
  amount: string;
  orderInfo: string;
  orderType: string;
  bankCode?: string;
  locale: string;
}

export type {
  BankOption,
  ProductCodeOption,
  LocaleOption,
  PaymentResult,
} from './types';

// Server action to get bank list
export async function getBankListAction(): Promise<BankOption[]> {
  try {
    const banks = await vnpay.getBankList();
    return banks.map((bank) => ({
      bank_code: bank.bank_code,
      bank_name: bank.bank_name,
    }));
  } catch (error) {
    return [];
  }
}

// Server action to get product code options
export async function getProductCodeOptions(): Promise<ProductCodeOption[]> {
  return [
    { value: ProductCode.Other, label: 'Khác' },
    { value: ProductCode.Fashion, label: 'Thời trang' },
    { value: ProductCode.Food_Consumption, label: 'Thực phẩm' },
    { value: ProductCode.Books_Newspapers_Magazines, label: 'Sách & Báo chí' },
    { value: ProductCode.Electronics_Sound, label: 'Điện tử' },
    { value: ProductCode.Phone_Tablet, label: 'Điện thoại & Tablet' },
    { value: ProductCode.Hotel_Tourism, label: 'Khách sạn & Du lịch' },
    { value: ProductCode.Cuisine, label: 'Ẩm thực' },
    { value: ProductCode.Entertainment_Training, label: 'Giải trí & Đào tạo' },
    { value: ProductCode.Health_Beauty, label: 'Sức khỏe & Làm đẹp' },
  ];
}

// Server action to get locale options
export async function getLocaleOptions(): Promise<LocaleOption[]> {
  return [
    { value: VnpLocale.VN, label: 'Tiếng Việt' },
    { value: VnpLocale.EN, label: 'English' },
  ];
}

function toTimezoneString(date: Date, offsetHours: number = 7): string {
  const utc = date.getTime() + date.getTimezoneOffset() * 60000;
  const local = new Date(utc + offsetHours * 3600000 + offsetHours * 3600000);

  // Format as `YYYY-MM-DDTHH:mm:ss+07:00`
  const iso = local.toISOString().slice(0, 19);
  const sign = offsetHours >= 0 ? '+' : '-';
  const pad = (n: number) => String(Math.abs(n)).padStart(2, '0');
  return `${iso}${sign}${pad(offsetHours)}:00`;
}

// Server action to create payment URL only (no redirect)
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function createPaymentUrlOnly(formData: any): Promise<string> {
  const headersList = await headers();
  const clientIP = getClientIP(headersList);

  // Extract form data
  const amount = formData.amount as string;
  const orderInfo = formData.orderInfo as string;
  const orderType = formData.orderType as string;
  const bankCode = formData.bankCode as string;
  const locale = formData.locale as string;

  // Validation
  if (!amount || !orderInfo) {
    throw new Error('Amount and order info are required');
  }

  const numAmount = parseInt(amount);
  if (isNaN(numAmount) || numAmount < 1000) {
    throw new Error('Amount must be at least 1,000 VND');
  }

  // Generate order ID
  const orderId = generateOrderId();

  // Build payment URL
  const now: Date = new Date();
  const expireDAte = new Date(new Date().getTime() + 30 * 60 * 1000);
  const paymentUrl = vnpay.buildPaymentUrl({
    vnp_Amount: formatAmount(numAmount),
    vnp_CreateDate: dateFormat(new Date(toTimezoneString(now, 7))),
    vnp_CurrCode: VnpCurrCode.VND,
    vnp_IpAddr: '117.2.113.207',
    vnp_Locale: 'vn',
    vnp_OrderInfo: orderInfo,
    vnp_OrderType: 'topup',
    vnp_ReturnUrl:
      process.env.VNPAY_RETURN_URL ||
      'https://admin.mexestore.vn/payment/return',
    vnp_TxnRef: orderId,
    vnp_TmnCode: '5YQD1DBZ',
    vnp_ExpireDate: dateFormat(new Date(toTimezoneString(expireDAte, 7))),

    ...(bankCode && { vnp_BankCode: bankCode }),
  });

  return paymentUrl;
}

// Server action to create payment URL and redirect to VNPay
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function createPaymentUrl(formData: any) {
  try {
    const headersList = await headers();
    const clientIP = getClientIP(headersList);
    // Extract form data
    const amount = formData.amount as string;
    const orderInfo = formData.orderInfo as string;
    const orderType = formData.orderType as string;
    const bankCode = formData.bankCode as string;
    const locale = formData.locale as string;

    // Validation
    if (!amount || !orderInfo) {
      throw new Error('Amount and order info are required');
    }

    const numAmount = parseInt(amount);
    if (isNaN(numAmount) || numAmount < 1000) {
      throw new Error('Amount must be at least 1,000 VND');
    }

    // Generate order ID
    const orderId = generateOrderId();

    // Build payment URL
    const now: Date = new Date();
    const expireDAte = new Date(new Date().getTime() + 30 * 60 * 1000);
    const paymentUrl = vnpay.buildPaymentUrl({
      vnp_Amount: formatAmount(numAmount),
      vnp_CreateDate: dateFormat(new Date(toTimezoneString(now, 7))),
      vnp_CurrCode: VnpCurrCode.VND,
      vnp_IpAddr: '117.2.113.207',
      vnp_Locale: 'vn',
      vnp_OrderInfo: orderInfo,
      vnp_OrderType: 'topup',
      vnp_ReturnUrl:
        process.env.VNPAY_RETURN_URL || 'http://47.129.168.239/payment/return',
      vnp_TxnRef: orderId,
      vnp_TmnCode: '5YQD1DBZ',
      vnp_ExpireDate: dateFormat(new Date(toTimezoneString(expireDAte, 7))),

      ...(bankCode && { vnp_BankCode: bankCode }),
    });

    // Redirect to VNPay
    // Note: redirect() in Server Actions throws a NEXT_REDIRECT error which is expected behavior
    // return paymentUrl;
    redirect(paymentUrl);
  } catch (error) {
    // Check if this is a Next.js redirect (expected behavior)
    const isRedirect =
      error instanceof Error &&
      (error.message.includes('NEXT_REDIRECT') ||
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (error as any).digest?.includes('NEXT_REDIRECT'));

    if (isRedirect) {
      // This is expected behavior for redirect() in Server Actions
    } else {
      // Only log actual errors
    }
    throw error;
  }
}

// Server action to generate payment URL without redirecting (for demo purposes)
export async function generatePaymentUrlDemo(
  formData: FormData
): Promise<PaymentResult> {
  try {
    const headersList = await headers();
    const clientIP = getClientIP(headersList);

    // Extract form data
    const amount = formData.get('amount') as string;
    const orderInfo = formData.get('orderInfo') as string;
    const orderType = formData.get('orderType') as string;
    const bankCode = formData.get('bankCode') as string;
    const locale = formData.get('locale') as string;

    // Validation
    if (!amount || !orderInfo) {
      return {
        success: false,
        error: 'Amount and order info are required',
      };
    }

    const numAmount = parseInt(amount);
    if (isNaN(numAmount) || numAmount < 1000) {
      return {
        success: false,
        error: 'Amount must be at least 1,000 VND',
      };
    }

    // Generate order ID
    const orderId = generateOrderId();

    // Build payment URL
    const paymentUrl = vnpay.buildPaymentUrl({
      vnp_Amount: formatAmount(numAmount),
      vnp_CreateDate: dateFormat(new Date()),
      vnp_CurrCode: VnpCurrCode.VND,
      vnp_IpAddr: clientIP,
      vnp_Locale: locale as VnpLocale,
      vnp_OrderInfo: orderInfo,
      vnp_OrderType: orderType as ProductCode,
      vnp_ReturnUrl:
        process.env.VNPAY_RETURN_URL || 'http://localhost:3000/payment/return',
      vnp_TxnRef: orderId,
      ...(bankCode && { vnp_BankCode: bankCode }),
    });

    return {
      success: true,
      paymentUrl,
      orderId,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

// Legacy function - kept for backwards compatibility
export async function generatePaymentUrl(
  data: PaymentFormData
): Promise<string> {
  const headersList = await headers();
  const clientIP = getClientIP(headersList);

  const orderId = generateOrderId();
  const numAmount = parseInt(data.amount);

  const paymentUrl = vnpay.buildPaymentUrl({
    vnp_Amount: formatAmount(numAmount),
    vnp_CreateDate: dateFormat(new Date()),
    vnp_CurrCode: VnpCurrCode.VND,
    vnp_IpAddr: clientIP,
    vnp_Locale: data.locale as VnpLocale,
    vnp_OrderInfo: data.orderInfo,
    vnp_OrderType: data.orderType as ProductCode,
    vnp_ReturnUrl:
      process.env.VNPAY_RETURN_URL || 'http://localhost:3000/payment/return',
    vnp_TxnRef: orderId,
    ...(data.bankCode && { vnp_BankCode: data.bankCode }),
  });

  return paymentUrl;
}
