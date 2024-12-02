import React from 'react';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { paymentSchema } from '../../utils/form-validators';
import FormInput from '../forms/FormInput';
import FormSelect from '../forms/FormSelect';
import type { z } from 'zod';

type PaymentFormData = z.infer<typeof paymentSchema>;

interface PaymentFormProps {
  initialData?: Partial<PaymentFormData>;
  services: Array<{ id: string; name: string; basePrice: number; taxPercent: number }>;
  members: Array<{ id: string; name: string }>;
  onSubmit: (data: PaymentFormData) => Promise<void>;
}

const PaymentForm: React.FC<PaymentFormProps> = ({
  initialData,
  services,
  members,
  onSubmit,
}) => {
  const { t } = useTranslation();
  const { register, handleSubmit, watch, setValue, formState: { errors, isSubmitting } } = useForm<PaymentFormData>({
    resolver: zodResolver(paymentSchema),
    defaultValues: initialData,
  });

  const selectedServiceId = watch('serviceId');
  const selectedService = services.find(s => s.id === selectedServiceId);

  React.useEffect(() => {
    if (selectedService) {
      const basePrice = selectedService.basePrice;
      const taxAmount = (basePrice * selectedService.taxPercent) / 100;
      setValue('amount', basePrice + taxAmount);
    }
  }, [selectedServiceId, selectedService, setValue]);

  const statusOptions = [
    { value: 'PENDING', label: t('payments.status.pending') },
    { value: 'PAID', label: t('payments.status.paid') },
    { value: 'OVERDUE', label: t('payments.status.overdue') },
    { value: 'CANCELLED', label: t('payments.status.cancelled') },
  ];

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="bg-white shadow rounded-lg p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormSelect
            label={t('payments.member')}
            name="memberId"
            options={members.map(m => ({ value: m.id, label: m.name }))}
            register={register}
            error={errors.memberId?.message}
          />

          <FormSelect
            label={t('payments.service')}
            name="serviceId"
            options={services.map(s => ({ value: s.id, label: s.name }))}
            register={register}
            error={errors.serviceId?.message}
          />

          <FormInput
            label={t('payments.amount')}
            name="amount"
            type="number"
            register={register}
            error={errors.amount?.message}
          />

          <FormInput
            label={t('payments.dueDate')}
            name="dueDate"
            type="date"
            register={register}
            error={errors.dueDate?.message}
          />

          <FormSelect
            label={t('payments.status')}
            name="status"
            options={statusOptions}
            register={register}
            error={errors.status?.message}
          />

          <FormInput
            label={t('payments.reference')}
            name="reference"
            register={register}
            error={errors.reference?.message}
          />
        </div>
      </div>

      <div className="flex justify-end space-x-4">
        <button
          type="button"
          className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
        >
          {t('common.cancel')}
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          {isSubmitting ? t('common.loading') : t('common.save')}
        </button>
      </div>
    </form>
  );
};

export default PaymentForm;