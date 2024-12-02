import React from 'react';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { serviceCategorySchema } from '../../utils/form-validators';
import FormInput from '../forms/FormInput';
import FormTextArea from '../forms/FormTextArea';
import type { z } from 'zod';

type CategoryFormData = z.infer<typeof serviceCategorySchema>;

interface CategoryFormProps {
  initialData?: Partial<CategoryFormData>;
  onSubmit: (data: CategoryFormData) => Promise<void>;
}

const CategoryForm: React.FC<CategoryFormProps> = ({ initialData, onSubmit }) => {
  const { t } = useTranslation();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<CategoryFormData>({
    resolver: zodResolver(serviceCategorySchema),
    defaultValues: initialData,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="bg-white shadow rounded-lg p-6">
        <div className="grid grid-cols-1 gap-6">
          <FormInput
            label={t('services.category.name')}
            name="name"
            register={register}
            error={errors.name?.message}
          />
          
          <FormTextArea
            label={t('services.category.description')}
            name="description"
            register={register}
            error={errors.description?.message}
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

export default CategoryForm;