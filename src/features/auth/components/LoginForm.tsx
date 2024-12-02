import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslation } from 'react-i18next';
import { loginSchema } from '../validators/auth.validator';
import type { LoginCredentials } from '../types/auth.types';
import { FormInput } from '../../../components/forms/FormInput';
import { useLogin } from '../hooks/useLogin';

export const LoginForm: React.FC = () => {
  const { t } = useTranslation();
  const { handleLogin, loading } = useLogin();
  const { register, handleSubmit, formState: { errors } } = useForm<LoginCredentials>({
    resolver: zodResolver(loginSchema),
  });

  return (
    <form onSubmit={handleSubmit(handleLogin)} className="space-y-6">
      <FormInput
        label={t('auth.email')}
        name="email"
        type="email"
        register={register}
        error={errors.email?.message}
      />

      <FormInput
        label={t('auth.password')}
        name="password"
        type="password"
        register={register}
        error={errors.password?.message}
      />

      <button
        type="submit"
        disabled={loading}
        className="w-full px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        {loading ? t('common.loading') : t('auth.login')}
      </button>
    </form>
  );
};