import _ from '@lodash';

function CardModel(data) {
  data = data || {};

  return _.defaults(data, {
    id: '',
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
}
export default CardModel;
