import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { X, Loader } from 'lucide-react';
import { IfThenPayService } from '../../services/ifthenpay.service';

interface PaymentProcessDialogProps {
  isOpen: boolean;
  onClose: () => void;
  paymentMethod: 'MB' | 'MBWAY';
  paymentData: {
    amount: number;
    reference: string;
    description: string;
    email: string;
    phone?: string;
  };
}

const PaymentProcessDialog: React.FC<PaymentProcessDialogProps> = ({
  isOpen,
  onClose,
  paymentMethod,
  paymentData,
}) => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [paymentReference, setPaymentReference] = useState<string | null>(null);

  const processPayment = async () => {
    setLoading(true);
    setError(null);

    try {
      const result = paymentMethod === 'MB'
        ? await IfThenPayService.generateMBReference(paymentData)
        : await IfThenPayService.generateMBWayPayment({ ...paymentData, phone: paymentData.phone! });

      if (!result.success) {
        throw new Error(result.error);
      }

      setPaymentReference(result.reference);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to process payment');
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    if (isOpen) {
      processPayment();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">
            {t(`payments.methods.${paymentMethod.toLowerCase()}`)}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="space-y-4">
          {loading && (
            <div className="text-center py-8">
              <Loader className="h-8 w-8 animate-spin mx-auto text-indigo-600" />
              <p className="mt-2 text-gray-600">{t('payments.processing')}</p>
            </div>
          )}

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
              {error}
            </div>
          )}

          {paymentReference && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h3 className="font-medium text-green-800 mb-2">
                {t('payments.referenceGenerated')}
              </h3>
              <p className="text-green-700 text-lg font-mono">
                {paymentReference}
              </p>
              <p className="mt-2 text-sm text-green-600">
                {t('payments.referenceInstructions')}
              </p>
            </div>
          )}

          <div className="mt-6 flex justify-end">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
            >
              {t('common.close')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentProcessDialog;