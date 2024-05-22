import { lazy } from 'react';

const AdminApp = lazy(() => import('./AdminApp'));

const AdminAppConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  routes: [
    {
      path: 'Admins',
      element: <AdminApp />
    },
  ],
};

export default AdminAppConfig;
