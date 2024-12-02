import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { z } from 'zod';

interface UseFormOptions<T> {
  schema: z.ZodSchema<T>;
  onSubmit: (data: T) => Promise<void>;
  redirectTo?: string;
}

export function useFormSubmit<T>({ schema, onSubmit, redirectTo }: UseFormOptions<T>) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (data: unknown) => {
    try {
      setLoading(true);
      const validatedData = schema.parse(data);
      await onSubmit(validatedData);
      toast.success(t('common.success'));
      if (redirectTo) {
        navigate(redirectTo);
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        error.errors.forEach(err => {
          toast.error(`${err.path.join('.')}: ${err.message}`);
        });
      } else {
        const message = error instanceof Error ? error.message : t('common.error');
        toast.error(message);
      }
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return { handleSubmit, loading };
}