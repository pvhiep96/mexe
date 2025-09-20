import { NextRequest, NextResponse } from 'next/server';
import { VietQR } from 'vietqr';

export async function GET(request: NextRequest) {
  console.log(request);
  try {
    const vietQR = new VietQR({
      clientID: '438ccb81-6275-4dd6-8e1e-fb89cbfb2f3c',
      apiKey: 'c2143161-66e1-4675-9bae-985751f66234',
    });

    const res = await vietQR
      .genQRCodeBase64({
        bank: '',
        accountName: 'Tran Van Quy',
        accountNumber: '02626515401',
        amount: '79000',
        memo: 'Ung Ho Quy Vac Xin',
        template: 'compact',
      })
      .then((data: unknown) => {
        // console.log(data);
        return {
          message: 'Backend connection successful',
          backendStatus: 'connected',
          data,
          timestamp: new Date().toISOString(),
        };
      })
      .catch((err: unknown) => {
        console.error(err);
        return {
          message: 'Backend connection failed',
          backendStatus: 'error',
          timestamp: new Date().toISOString(),
        };
      });

    console.log(res);
    return Response.json({
      message: 'Backend connection successful',
      backendStatus: 'connected',
      timestamp: new Date().toISOString(),
    });
    // return NextResponse.json({ res });
  } catch (error) {
    console.error('Backend connection test failed:', error);
    return NextResponse.json({
      message: 'Backend connection test failed',
      backendStatus: 'unreachable',
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString(),
    });
  }
}
