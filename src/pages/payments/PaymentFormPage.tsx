import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import PaymentForm from '../../components/payments/PaymentForm';

interface Service {
  id: string;
  name: string;
  basePrice: number;
  taxPercent: number;
}

interface Member {
  id: string;
  name: string;
}

const PaymentFormPage: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditing = Boolean(id);

  const [services, setServices] = useState<Service[]>([]);
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    Promise.all([
      fetch('/api/services').then(res => res.json()),
      fetch('/api/members').then(res => res.json()),
    ])
      .then(([servicesData, membersData]) => {
        setServices(servicesData);
        setMembers(membersData);
      })
      .catch(err => {
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleSubmit = async (data: any) => {
    try {
      const response = await fetch(`/api/payments${id ? `/${id}` : ''}`, {
        method: id ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error('Failed to save payment');
      
      navigate('/payments');
    } catch (error) {
      console.error('Error saving payment:', error);
    }
  };

  if (loading) return <div className="text-center py-4">{t('common.loading')}</div>;
  if (error) return <div className="text-red-500 text-center py-4">{error}</div>;

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-2xl font-semibold text-gray-900 mb-6">
        {isEditing ? t('payments.edit') : t('payments.add')}
      </h1>
      <PaymentForm
        onSubmit={handleSubmit}
        services={services}
        members={members}
      />
    </div>
  );
};

export default PaymentFormPage;