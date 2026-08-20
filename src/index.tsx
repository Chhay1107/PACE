import '@atlaskit/css-reset';

import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { setGlobalTheme } from '@atlaskit/tokens/set-global-theme';

import { App } from './app/App';

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('PACE could not find the root element.');
}

const appRootElement = rootElement;

async function startApp(): Promise<void> {
  await setGlobalTheme({});
  createRoot(appRootElement).render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
}

void startApp();
