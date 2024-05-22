import './api/auth-api';
import './api/notifications-api';
import history from '@history';
import './api/contacts-api';
import './api/project-api';
import './api/tasks-api';
import './api/ecommerce-api';
import './api/scrumboard-api';
import './api/profile-api';
import mock from './mock';


mock.onAny().passThrough();

if (module?.hot?.status() === 'apply') {
  const { pathname } = history.location;
  history.push('/loading');
  history.push({ pathname });
}
