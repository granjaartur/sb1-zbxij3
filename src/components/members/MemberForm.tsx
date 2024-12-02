import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-hot-toast';
import { memberSchema } from '../../utils/form-validators';
import FormInput from '../forms/FormInput';
import FormSelect from '../forms/FormSelect';
import FormTextArea from '../forms/FormTextArea';
import type { Member } from '../../types/member';
import { api } from '../../utils/api';

interface MemberFormProps {
  initialData?: Partial<Member>;
  isEditing?: boolean;
}

const MemberForm: React.FC<MemberFormProps> = ({ initialData, isEditing }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(memberSchema),
    defaultValues: initialData,
  });

  const onSubmit = async (data: any) => {
    try {
      if (isEditing && initialData?.id) {
        await api.put(`/api/members/${initialData.id}`, data);
      } else {
        await api.post('/api/members', data);
      }
      
      toast.success(t('common.success'));
      navigate('/members');
    } catch (error) {
      console.error('Error saving member:', error);
      toast.error(error instanceof Error ? error.message : t('common.error'));
    }
  };

  const genderOptions = [
    { value: 'MALE', label: t('members.gender.male') },
    { value: 'FEMALE', label: t('members.gender.female') },
    { value: 'OTHER', label: t('members.gender.other') },
  ];

  const maritalStatusOptions = [
    { value: 'SINGLE', label: t('members.maritalStatus.single') },
    { value: 'MARRIED', label: t('members.maritalStatus.married') },
    { value: 'DIVORCED', label: t('members.maritalStatus.divorced') },
    { value: 'WIDOWED', label: t('members.maritalStatus.widowed') },
    { value: 'OTHER', label: t('members.maritalStatus.other') },
  ];

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      {/* Personal Information */}
      <div className="bg-white shadow rounded-lg p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">{t('members.personalInfo')}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormInput
            label={t('members.name')}
            name="name"
            register={register}
            error={errors.name?.message}
          />
          <FormInput
            label={t('members.profession')}
            name="profession"
            register={register}
            error={errors.profession?.message}
          />
          <FormTextArea
            label={t('members.observations')}
            name="observations"
            register={register}
            error={errors.observations?.message}
            className="col-span-2"
          />
        </div>
      </div>

      {/* Contact Information */}
      <div className="bg-white shadow rounded-lg p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">{t('members.contact')}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormInput
            label={t('members.email')}
            name="email"
            type="email"
            register={register}
            error={errors.email?.message}
          />
          <FormInput
            label={t('members.phone')}
            name="phone"
            register={register}
            error={errors.phone?.message}
          />
          <FormInput
            label={t('members.mobile')}
            name="mobile"
            register={register}
            error={errors.mobile?.message}
          />
          <FormTextArea
            label={t('members.address')}
            name="address"
            register={register}
            error={errors.address?.message}
            className="col-span-2"
          />
        </div>
      </div>

      {/* Identification */}
      <div className="bg-white shadow rounded-lg p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">{t('members.identification')}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormInput
            label={t('members.documentId')}
            name="documentId"
            register={register}
            error={errors.documentId?.message}
          />
          <FormInput
            label={t('members.taxId')}
            name="taxId"
            register={register}
            error={errors.taxId?.message}
          />
          <FormSelect
            label={t('members.gender')}
            name="gender"
            options={genderOptions}
            register={register}
            error={errors.gender?.message}
          />
          <FormSelect
            label={t('members.maritalStatus')}
            name="maritalStatus"
            options={maritalStatusOptions}
            register={register}
            error={errors.maritalStatus?.message}
          />
          <FormInput
            label={t('members.birthDate')}
            name="birthDate"
            type="date"
            register={register}
            error={errors.birthDate?.message}
          />
        </div>
      </div>

      {/* Education/Professional */}
      <div className="bg-white shadow rounded-lg p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">{t('members.education')}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormInput
            label={t('members.academicDegree')}
            name="academicDegree"
            register={register}
            error={errors.academicDegree?.message}
          />
          <FormInput
            label={t('members.school')}
            name="school"
            register={register}
            error={errors.school?.message}
          />
          <FormInput
            label={t('members.fieldOfStudy')}
            name="fieldOfStudy"
            register={register}
            error={errors.fieldOfStudy?.message}
          />
          <FormTextArea
            label={t('members.training')}
            name="training"
            register={register}
            error={errors.training?.message}
            className="col-span-2"
          />
        </div>
      </div>

      <div className="flex justify-end space-x-4">
        <button
          type="button"
          onClick={() => navigate('/members')}
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

export default MemberForm;