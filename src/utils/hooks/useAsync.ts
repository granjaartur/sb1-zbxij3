import { useState, useCallback } from 'react';
import { toast } from 'react-hot-toast';

interface AsyncState<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
}

export function useAsync<T>(asyncFunction: () => Promise<T>) {
  const [state, setState] = useState<AsyncState<T>>({
    data: null,
    loading: true,
    error: null,
  });

  const execute = useCallback(async () => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      const data = await asyncFunction();
      setState({ data, loading: false, error: null });
      return data;
    } catch (error) {
      const message = error instanceof Error ? error.message : 'An error occurred';
      setState({ data: null, loading: false, error: error as Error });
      toast.error(message);
      throw error;
    }
  }, [asyncFunction]);

  return { ...state, execute };
}