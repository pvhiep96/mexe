import { NextRequest, NextResponse } from 'next/server';
import { VietQR } from 'vietqr';

export async function GET(request: NextRequest) {
  try {
    const vietQR = new VietQR({
      clientID: '438ccb81-6275-4dd6-8e1e-fb89cbfb2f3c',
      apiKey: 'c2143161-66e1-4675-9bae-985751f66234',
    });

    vietQR
      .genQRCodeBase64({
        bank: '970415',
        accountName: 'QUY VAC XIN PHONG CHONG COVID',
        accountNumber: '113366668888',
        amount: '79000',
        memo: 'Ung Ho Quy Vac Xin',
        template: 'compact',
      })
      .then((data: unknown) => {
        return NextResponse.json({
          message: 'Backend connection successful',
          backendStatus: 'connected',
          data,
          timestamp: new Date().toISOString(),
        });
      })
      .catch((err: unknown) => {
        return NextResponse.json({
          message: 'Backend connection failed',
          backendStatus: 'error',
          timestamp: new Date().toISOString(),
        });
      });
  } catch (error) {
    return NextResponse.json(
      {
        message: 'Backend connection test failed',
        backendStatus: 'unreachable',
        error: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString(),
      },
      { status: 503 }
    );
  }
}
