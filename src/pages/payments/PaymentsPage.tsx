import React from 'react';
import PaymentList from '../../components/payments/PaymentList';

const PaymentsPage: React.FC = () => {
  return (
    <div className="container mx-auto">
      <PaymentList />
    </div>
  );
};

export default PaymentsPage;