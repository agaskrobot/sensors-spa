import { useState, useEffect } from 'react';

// Hook to get form field errors from an API error
export const useFormErrors = (error) => {
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (error && error.fieldErrors) {
      setErrors(error.fieldErrors);
    } else {
      setErrors({});
    }
  }, [error]);

  return [errors, setErrors];
};
