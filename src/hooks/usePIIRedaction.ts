import { useMemo } from 'react';
import { redactPII, PIIRedactionResult } from '../utils/piiRedactor';

export function usePIIRedaction(text: string): PIIRedactionResult {
  return useMemo(() => {
    return redactPII(text);
  }, [text]);
}
