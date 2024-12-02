import React from 'react';
import { useTranslation } from 'react-i18next';
import { X } from 'lucide-react';

interface PaymentMethodDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectMethod: (method: 'MB' | 'MBWAY') => void;
}

const PaymentMethodDialog: React.FC<PaymentMethodDialogProps> = ({
  isOpen,
  onClose,
  onSelectMethod,
}) => {
  const { t } = useTranslation();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">{t('payments.selectMethod')}</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="space-y-4">
          <button
            onClick={() => onSelectMethod('MB')}
            className="w-full p-4 border rounded-lg hover:bg-gray-50 flex items-center justify-between"
          >
            <div>
              <h3 className="font-medium">{t('payments.methods.mb')}</h3>
              <p className="text-sm text-gray-500">{t('payments.methods.mbDescription')}</p>
            </div>
          </button>

          <button
            onClick={() => onSelectMethod('MBWAY')}
            className="w-full p-4 border rounded-lg hover:bg-gray-50 flex items-center justify-between"
          >
            <div>
              <h3 className="font-medium">{t('payments.methods.mbway')}</h3>
              <p className="text-sm text-gray-500">{t('payments.methods.mbwayDescription')}</p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentMethodDialog;