import _ from '@lodash';

const ContactModel = (data) =>
  _.defaults(data || {}, {

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
  });

export default ContactModel;
