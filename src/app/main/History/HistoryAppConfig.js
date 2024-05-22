import { lazy } from 'react';
import { Navigate } from 'react-router-dom';

const AdminApp = lazy(() => import('./Admins_History/AdminApp'));
const ParkingApp = lazy(() => import('./Parking_History/ParkingApp'));

const HistoryAppConfig = {
  settings: {
    layout: {},
  },
  routes: [
    {
      path: 'History/Admins',
      element: <AdminApp />,
    },
    {
      path: 'History/ParkingHist',
      element: <ParkingApp />,
    },
    
  ],
};

export default HistoryAppConfig;
