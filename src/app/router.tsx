import { createBrowserRouter } from 'react-router';
import React from 'react';

import { ProofPage } from '../pages/ProofPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <ProofPage />,
  },
]);
