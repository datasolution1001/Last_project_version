import { lazy } from 'react';

const ParkingApp = lazy(() => import('./ParkingApp'));

const AdminAppConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  routes: [
    {
      path: 'ParkingHist',
      element: <ParkingApp />
    },
  ],
};

export default AdminAppConfig;
