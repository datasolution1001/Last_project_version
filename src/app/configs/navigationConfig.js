import i18next from 'i18next';
import ar from './navigation-i18n/ar';
import en from './navigation-i18n/en';
import tr from './navigation-i18n/tr';

i18next.addResourceBundle('en', 'navigation', en);
i18next.addResourceBundle('tr', 'navigation', tr);
i18next.addResourceBundle('ar', 'navigation', ar);

const navigationConfig = [
  {
    id: 'project',
    title: 'Reports',
    translate: 'reports',
    type: 'item',
    icon: 'heroicons-outline:clipboard-check',
    url: 'project',
  },
  {
    id: 'apps.profile',
    title: 'Profile',
    type: 'item',
    translate:'profile',
    icon: 'heroicons-outline:user-circle',
    url: 'apps/profile',
  },

  {
    id: 'History',
    title: 'History',
    type: 'collapse',
    icon: 'heroicons-outline:clipboard-list',
    translate: 'History',
    children: [
       {
    id: 'ParkingHist',
    title: 'Parking His',
    translate: 'Parking_History',
    type: 'item',
    icon:'material-outline:directions_car',
    url: 'History/ParkingHist',
  },
   {
    id: 'Admins',
    title: 'Admins His',
    translate: 'Admins_History',
    type: 'item',
    icon:'material-outline:admin_panel_settings',
    url: 'History/Admins',
  },
    ],
  },
 
  
  {
    id: 'contacts',
    title: 'Users',
    type: 'item',
    icon: 'heroicons-outline:user-group',
    url: 'contacts',
    translate: 'users',
  }, 
  {
    id: 'scrumboard',
    title: 'Users Requests',
    type: 'item',
    icon: 'heroicons-outline:view-boards',
    url: 'apps/usersRequests',
    translate: 'Users_Requests',
  },
  // {
  //   id: 'activities-component',
  //   title: 'Log History',
  //   translate: 'LogHistory',
  //   type: 'item',
  //   icon: 'heroicons-outline:star',
  //   url: 'pages/activities',
  // },
];

export default navigationConfig;
