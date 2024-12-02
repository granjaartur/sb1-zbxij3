import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Edit, Trash2, Plus, CreditCard, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { api } from '../../utils/api';
import { formatDate, formatCurrency } from '../../utils/date-utils';

interface Payment {
  id: string;
  amount: number;
  status: string;
  dueDate: string;
  paidDate?: string;
  reference?: string;
  member: {
    name: string;
    email?: string;
  };
  service: {
    name: string;
  };
}

const PaymentList: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    try {
      const data = await api.get<Payment[]>('/api/payments');
      setPayments(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="text-center py-4">{t('common.loading')}</div>;
  if (error) return <div className="text-red-500 text-center py-4">{error}</div>;

  if (payments.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-800">{t('payments.title')}</h2>
            <Link
              to="/payments/new"
              className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
            >
              <Plus className="h-5 w-5 mr-2" />
              {t('payments.add')}
            </Link>
          </div>
        </div>
        
        <div className="text-center py-12">
          <CreditCard className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">{t('payments.noPayments')}</h3>
          <p className="mt-1 text-sm text-gray-500">{t('payments.noPaymentsDescription')}</p>
          <div className="mt-6">
            <Link
              to="/payments/new"
              className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
            >
              <Plus className="h-5 w-5 mr-2" />
              {t('payments.add')}
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6 border-b border-gray-200">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-800">{t('payments.title')}</h2>
          <Link
            to="/payments/new"
            className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          >
            <Plus className="h-5 w-5 mr-2" />
            {t('payments.add')}
          </Link>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {t('payments.member')}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {t('payments.service')}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {t('payments.amount')}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {t('payments.status.label')}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {t('payments.dueDate')}
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                {t('common.actions')}
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {payments.map((payment) => (
              <tr key={payment.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{payment.member.name}</div>
                  <div className="text-sm text-gray-500">{payment.member.email}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{payment.service.name}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    {formatCurrency(payment.amount, 'EUR', i18n.language)}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    payment.status === 'PAID'
                      ? 'bg-green-100 text-green-800'
                      : payment.status === 'OVERDUE'
                      ? 'bg-red-100 text-red-800'
                      : payment.status === 'CANCELLED'
                      ? 'bg-gray-100 text-gray-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {t(`payments.status.${payment.status.toLowerCase()}`)}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {formatDate(payment.dueDate, 'PPP', i18n.language)}
                  </div>
                  {payment.paidDate && (
                    <div className="text-sm text-gray-500">
                      {t('payments.paidDate')}: {formatDate(payment.paidDate, 'PPP', i18n.language)}
                    </div>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <Link
                    to={`/payments/${payment.id}/edit`}
                    className="text-indigo-600 hover:text-indigo-900 mr-4"
                    title={t('common.edit')}
                  >
                    <Edit className="h-5 w-5 inline" />
                  </Link>
                  <button
                    onClick={() => {/* Implement delete handler */}}
                    className="text-red-600 hover:text-red-900"
                    title={t('common.delete')}
                  >
                    <Trash2 className="h-5 w-5 inline" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentList;