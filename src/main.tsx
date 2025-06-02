import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import App from './App';
import '@styles/tailwind.css';

const queryClient = new QueryClient();

const enableMocking = async () => {
  if (process.env.NODE_ENV !== 'development') {
    return Promise.resolve();
  }
  if (import.meta.env.VITE_USE_MSW !== 'true') {
    return Promise.resolve();
  }

  const { default: worker } = await import('@mocks/browser');

  return worker.start();
};

enableMocking().then(() => {
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </StrictMode>,
  );
});
