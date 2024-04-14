import { ErrorDialogProvider } from '@/components/ErrorDialog/ErrorDialogProvider';
import '../styles/index.scss';
import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ErrorDialogProvider>
      <Component {...pageProps} />
    </ErrorDialogProvider>
  );
}
