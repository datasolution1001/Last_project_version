import sub from 'date-fns/sub';
const exampleActivitiesData = [
  {
    id: '493190c9-5b61-4912-afe5-78c21f1044d7',
    icon: 'heroicons-solid:star',
    description: '<strong>Akermi Mootaz</strong> has enter and take a parking spot',
    date: sub(new Date(), { minutes: 25 }),
  },
  {
    id: '6e3e97e5-effc-4fb7-b730-52a151f0b641',
    image: 'assets/images/avatars/male-04.jpg',
    description:
      '<strong>Leo Gill</strong> has leave the parking',
    date: sub(new Date(), { minutes: 50 }),
  },
  {
    id: 'b91ccb58-b06c-413b-b389-87010e03a120',
    image: 'assets/images/avatars/male-04.jpg',
    description: '<strong>Leo Gill</strong> has enter and take a parking spot',
    date: sub(new Date(), { hours: 3 }),
  },
  {
    id: 'ef7b95a7-8e8b-4616-9619-130d9533add9',
    image: 'assets/images/avatars/female-04.jpg',
    description: '<strong>Sophie Stone</strong> has leave the parking',
    date: sub(new Date(), { hours: 7 }),
  },
  {
    id: 'eb8aa470-635e-461d-88e1-23d9ea2a5665',
    image: 'assets/images/avatars/female-04.jpg',
    description: '<strong>Sophie Stone</strong> has enter and take a parking spot',
    date: sub(new Date(), { hours: 9 }),
  },
  {
    id: 'fd0f01b4-f3de-4333-add5-cd86850279f8',
    image: 'assets/images/avatars/female-02.jpg',
    description: '<strong>Tina Harris</strong> has leave the parking',
    date: sub(new Date(), { days: 1 }),
    
  },
  {
    id: '8f8e1bf9-4661-4939-9e43-390957b60f42',
    image: 'assets/images/avatars/female-02.jpg',
    description: '<strong>Tina Harris</strong> has enter and take a parkking spot',
    date: sub(new Date(), { days: 3 }),
  },
  {
    id: '30af917b-7a6a-45d1-822f-9e7ad7f8bf69',
    icon: 'heroicons-solid:refresh',
    description: 'The Starting of the log history Registration',
    date: sub(new Date(), { days: 4 }),
  },
];


export default exampleActivitiesData;
// import { format, parseISO } from 'date-fns';
// import { fetchLogs } from './store/LogsSlice';

// import reducer from './store';
// import withReducer from 'app/store/withReducer';
// import { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';

// const formattedDate = (dateString) => {
//   const date = parseISO(dateString);
//   return format(date, "MMM dd, hh:mm aa");
// };
// function exampleActivitiesData(){
// const dispatch = useDispatch();
//   const logs = useSelector((state) => state.logs.LogsSlice.entities);
//  // Correct slice name is "logs"

//   useEffect(() => {
//     dispatch(fetchLogs());
//   }, [dispatch]);

//   // Now you can access the fetched data from the "logs" state
//   console.log(logs);
//   const newArrayFromLogs = logs.map((log) => {
//     // Modify or extract properties from each log object as needed
//     return {
//       id: log.id,
//       icon: 'heroicons-solid:refresh',
//       description: log.name  + ' has  '+ log.action +' the parking',
//       date:formattedDate(log.actionTime)
//       // Add more properties or modify existing ones
//     };
//   });

// console.log(newArrayFromLogs);
// return  newArrayFromLogs;

// }

// export default withReducer('logs', reducer)(exampleActivitiesData);
