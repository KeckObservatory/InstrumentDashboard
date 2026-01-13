import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { QueryParamProvider } from 'use-query-params';
import { ReactRouter6Adapter } from 'use-query-params/adapters/react-router-6';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

createRoot(document.getElementById('root')!).render(
  <>
    <StrictMode>
      <BrowserRouter>
        <QueryParamProvider adapter={ReactRouter6Adapter}>
          <App />
        </QueryParamProvider>
      </BrowserRouter>
    </StrictMode>
  </>
)
