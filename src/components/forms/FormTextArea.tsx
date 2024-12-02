import React from 'react';
import { UseFormRegister } from 'react-hook-form';

interface FormTextAreaProps {
  label: string;
  name: string;
  register: UseFormRegister<any>;
  error?: string;
  rows?: number;
  className?: string;
}

export const FormTextArea: React.FC<FormTextAreaProps> = ({
  label,
  name,
  register,
  error,
  rows = 3,
  className = '',
}) => {
  return (
    <div className={className}>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <textarea
        id={name}
        {...register(name)}
        rows={rows}
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
      />
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
};