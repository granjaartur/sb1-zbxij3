import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-hot-toast';
import { serviceSchema } from '../../utils/form-validators';
import FormInput from '../forms/FormInput';
import FormSelect from '../forms/FormSelect';
import FormTextArea from '../forms/FormTextArea';
import { api } from '../../utils/api';

interface ServiceFormProps {
  initialData?: any;
  isEditing?: boolean;
  categories: Array<{ id: string; name: string }>;
  groups: Array<{ id: string; name: string }>;
}

const ServiceForm: React.FC<ServiceFormProps> = ({
  initialData,
  isEditing,
  categories,
  groups,
}) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(serviceSchema),
    defaultValues: initialData,
  });

  const onSubmit = async (data: any) => {
    try {
      if (isEditing && initialData?.id) {
        await api.put(`/api/services/${initialData.id}`, data);
      } else {
        await api.post('/api/services', data);
      }
      
      toast.success(t('common.success'));
      navigate('/services');
    } catch (error) {
      console.error('Error saving service:', error);
      toast.error(error instanceof Error ? error.message : t('common.error'));
    }
  };

  const frequencyOptions = [
    { value: 'WEEKLY', label: t('services.frequency.weekly') },
    { value: 'MONTHLY', label: t('services.frequency.monthly') },
    { value: 'QUARTERLY', label: t('services.frequency.quarterly') },
    { value: 'YEARLY', label: t('services.frequency.yearly') },
  ];

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="bg-white shadow rounded-lg p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormInput
            label={t('services.name')}
            name="name"
            register={register}
            error={errors.name?.message}
          />
          
          <FormSelect
            label={t('services.category')}
            name="categoryId"
            options={categories.map(cat => ({ value: cat.id, label: cat.name }))}
            register={register}
            error={errors.categoryId?.message}
          />

          <FormInput
            label={t('services.basePrice')}
            name="basePrice"
            type="number"
            register={register}
            error={errors.basePrice?.message}
          />

          <FormInput
            label={t('services.taxPercent')}
            name="taxPercent"
            type="number"
            register={register}
            error={errors.taxPercent?.message}
          />

          <FormSelect
            label={t('services.frequency')}
            name="frequency"
            options={frequencyOptions}
            register={register}
            error={errors.frequency?.message}
          />

          <FormSelect
            label={t('services.group')}
            name="groupId"
            options={[
              { value: '', label: t('services.noGroup') },
              ...groups.map(group => ({ value: group.id, label: group.name }))
            ]}
            register={register}
            error={errors.groupId?.message}
          />

          <FormTextArea
            label={t('services.description')}
            name="description"
            register={register}
            error={errors.description?.message}
            className="col-span-2"
          />
        </div>
      </div>

      <div className="flex justify-end space-x-4">
        <button
          type="button"
          onClick={() => navigate('/services')}
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

export default ServiceForm;