import { useState, useCallback } from 'react';

export function useApi<T, P extends any[]>(apiFunc: (...args: P) => Promise<T>) {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const execute = useCallback(async (...args: P): Promise<T> => {
    setLoading(true);
    setError(null);
    try {
      const result = await apiFunc(...args);
      setData(result);
      return result;
    } catch (err: any) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [apiFunc]);

  return { data, error, loading, execute };
}
