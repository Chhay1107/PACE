import { RouterProvider } from 'react-router';
import React from 'react';

import { router } from './router';

export function App(): React.JSX.Element {
  return <RouterProvider router={router} />;
}
