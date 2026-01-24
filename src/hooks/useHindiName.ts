import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export const useHindiName = (englishName: string | null) => {
  const [hindiName, setHindiName] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!englishName) {
      setHindiName(null);
      return;
    }

    const translateName = async () => {
      setLoading(true);
      setError(null);

      try {
        const { data, error: functionError } = await supabase.functions.invoke('translate-name', {
          body: { name: englishName }
        });

        if (functionError) {
          throw functionError;
        }

        setHindiName(data?.hindiName || englishName);
      } catch (err) {
        console.error('Translation error:', err);
        setError(err instanceof Error ? err.message : 'Translation failed');
        // Fallback to English name on error
        setHindiName(englishName);
      } finally {
        setLoading(false);
      }
    };

    translateName();
  }, [englishName]);

  return { hindiName, loading, error };
};
