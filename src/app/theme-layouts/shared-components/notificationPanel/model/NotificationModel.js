import _ from '@lodash';
import FuseUtils from '@fuse/utils';

function NotificationModel(data) {
  data = data || {};

  return _.defaults(data, {
    id: FuseUtils.generateGUID(),
    icon: 'heroicons-solid:star',
    name :'',
    job_title : '',
    company :'',
    email : '',
    password : '',
    phoneNumber :'',
    guest: ''  ,
    date_debut : '',
    date_fin : '',
    admin : {},
    lpns : [],
    time: new Date().toISOString(),
    read: false,
    variant: 'default',
  });
}

const ContactModel = (data) =>
  _.defaults(data || {}, {
    
  });


export default NotificationModel;
