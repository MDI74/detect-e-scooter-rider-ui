import {
  PropsWithChildren, createContext, useContext, useMemo, useState,
} from 'react';
import { ErrorDialog } from './ErrorDialog';

type ErrorDialogContextType = {
  errorMessage: string | null;
  setErrorMessage: (errorMessage: string) => void
};

const ErrorDialogContext = createContext<ErrorDialogContextType>({
  errorMessage: null,
  setErrorMessage: () => {},
});

export const ErrorDialogProvider = ({ children }: PropsWithChildren) => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const value = useMemo(
    () => ({
      errorMessage,
      setErrorMessage,
    }),
    [errorMessage],
  );

  return (

    <ErrorDialogContext.Provider value={value}>
      {errorMessage && (
        <ErrorDialog
          message={errorMessage}
        />
      )}
      {children}
    </ErrorDialogContext.Provider>
  );
};

export const useErrorDialogContext = () => useContext(ErrorDialogContext);
