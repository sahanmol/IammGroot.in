import { useState, useEffect, useCallback } from 'react';

/**
 * Generic query hook to handle Supabase/API loading and error states consistently.
 * 
 * @param {Function} queryFn - Async function returning data
 * @param {Array} deps - Dependency array to trigger refetch
 */
export const useSupabaseQuery = (queryFn, deps = []) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const refetch = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await queryFn();
      setData(result);
      return result;
    } catch (err) {
      setError(err.message || 'An error occurred during query execution');
      console.error('[useSupabaseQuery] Execution Error:', err);
    } finally {
      setLoading(false);
    }
  }, deps);

  useEffect(() => {
    refetch();
  }, [refetch]);

  return { data, error, loading, refetch };
};
export default useSupabaseQuery;
