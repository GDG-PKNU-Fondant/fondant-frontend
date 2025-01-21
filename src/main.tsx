import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import '@styles/tailwind.css';

const enableMocking = async () => {
  if (process.env.NODE_ENV !== 'development') {
    return Promise.resolve();
  }
  const { default: worker } = await import('@mocks/browser');

  return worker.start();
};

enableMocking().then(() => {
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
});
