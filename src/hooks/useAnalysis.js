import { useState, useCallback } from 'react';
import { useAuthStore } from '../store/authStore.js';

export const useAnalysis = () => {
  const { session } = useAuthStore();
  const [analyses, setAnalyses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  // Helper to fetch options with headers
  const getAuthHeaders = useCallback(() => {
    if (!session?.access_token) {
      throw new Error('Not authenticated: No active token session');
    }
    return {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${session.access_token}`
    };
  }, [session]);

  // Fetch past analyses
  const fetchAnalyses = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/analysis', {
        headers: getAuthHeaders(),
      });
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch analysis history');
      }
      
      setAnalyses(data);
      return data;
    } catch (err) {
      setError(err.message);
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [getAuthHeaders]);

  // Submit new text check
  const checkText = useCallback(async (text) => {
    setSubmitting(true);
    setError(null);
    try {
      const response = await fetch('/api/analysis', {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify({ idea_text: text }),
      });
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit analysis');
      }
      
      // Update history list in-place
      setAnalyses((prev) => [data, ...prev]);
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setSubmitting(false);
    }
  }, [getAuthHeaders]);

  return {
    analyses,
    loading,
    submitting,
    error,
    fetchAnalyses,
    checkText
  };
};
