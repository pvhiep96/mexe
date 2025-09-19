import { FC } from 'react';
import PaymentReturn from './component';

const sendMail = async (params) => {
  // Placeholder function to simulate sending an email
  console.log(params);
  // /api/v1/orders/completed
  const orderResponse = await fetch(`${process.env.API_URL}/orders/completed`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(params),
  });
  console.log(orderResponse);
};
const PaymentPage: FC = async ({ searchParams }) => {
  await sendMail(await searchParams);
  return <PaymentReturn />;
};

export default PaymentPage;
