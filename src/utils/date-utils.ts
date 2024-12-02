import { format, parseISO } from 'date-fns';
import { enUS, pt } from 'date-fns/locale';

const locales = {
  en: enUS,
  pt: pt,
};

export const formatDate = (date: string | Date, formatStr: string, language: string = 'en'): string => {
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  return format(dateObj, formatStr, { locale: locales[language as keyof typeof locales] });
};

export const formatCurrency = (amount: number, currency: string = 'EUR', language: string = 'en'): string => {
  return new Intl.NumberFormat(language, {
    style: 'currency',
    currency,
  }).format(amount);
};