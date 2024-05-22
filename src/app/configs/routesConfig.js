import FuseUtils from '@fuse/utils';
import FuseLoading from '@fuse/core/FuseLoading';
import { Navigate } from 'react-router-dom';
import settingsConfig from 'app/configs/settingsConfig';
import SignInConfig from '../main/sign-in/SignInConfig';
import SignUpConfig from '../main/sign-up/SignUpConfig';
import ProjectDashboardApp from '../main/project/ProjectDashboardAppConfig';
import SignOutConfig from '../main/sign-out/SignOutConfig';
import Error404Page from '../main/404/Error404Page';
import ContactsAppConfig from '../main/contacts/ContactsAppConfig';
import TasksAppConfig from '../main/tasks/TasksAppConfig';
import ActivitiesPageConfig from '../main/activities/activitiesPageConfig';
import ScrumboardAppConfig from '../main/scrumboard/ScrumboardAppConfig';
import profileAppConfig from '../main/profile/profileAppConfig';
import HistoryAppConfig from '../main/History/HistoryAppConfig';


const routeConfigs = [ScrumboardAppConfig,profileAppConfig, ProjectDashboardApp,HistoryAppConfig,ContactsAppConfig ,SignOutConfig, SignInConfig, SignUpConfig, TasksAppConfig, ActivitiesPageConfig];

const routes = [
  ...FuseUtils.generateRoutesFromConfigs(routeConfigs, settingsConfig.defaultAuth),

 {
    
    path: '/',
    element: <Navigate to="/project" />,
    auth: settingsConfig.defaultAuth,
  },  
  {
    path: 'loading',
    element: <FuseLoading />,
  },
  {
    path: '404',
    element: <Error404Page />,
  },
  {
    path: '*',
    element: <Navigate to="404" />,
  },
];

export default routes;
