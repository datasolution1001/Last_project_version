import { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import ScrumboardApp from './ScrumboardApp';

const Boards = lazy(() => import('./boards/Boards'));

const ScrumboardAppConfig = {
  settings: {
    layout: {},
  },
  routes: [
    {
      path: 'apps/usersRequests',
      element: <ScrumboardApp />,
      children: [
        {
          path: '',
          element: <Navigate to="/apps/usersRequests/boards" />,
        },
        {
          path: 'boards',
          element: <Boards />,
        },
        {
          path: 'boards/:boardId',
        },
      ],
    },
  ],
};

export default ScrumboardAppConfig;
