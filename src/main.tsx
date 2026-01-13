import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { QueryParamProvider } from 'use-query-params';
import { ReactRouter6Adapter } from 'use-query-params/adapters/react-router-6';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import App from './App';

const root = createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <BrowserRouter>
    <QueryParamProvider adapter={ReactRouter6Adapter}>
      <StrictMode>
        <App />
      </StrictMode>
    </QueryParamProvider>
  </BrowserRouter>,
);
