import FusePageSimple from '@fuse/core/FusePageSimple';
import Typography from '@mui/material/Typography';
import Timeline from '@mui/lab/Timeline';
import useThemeMediaQuery from '@fuse/hooks/useThemeMediaQuery';
import ActivityTimelineItem from './ActivityTimelineItem';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLogs } from './store/LogsSlice';
import { format, parseISO } from 'date-fns';
import reducer from './store';
import withReducer from 'app/store/withReducer';


function ActivitiesPage() {
  const dispatch = useDispatch();
  const logs = useSelector((state) => state.logs.LogsSlice.entities);
  const ids = useSelector((state) => state.logs.LogsSlice.ids);
 // Correct slice name is "logs"
const MaxNumber = 6;
  useEffect(() => {
    dispatch(fetchLogs(MaxNumber));
  }, [dispatch]);

  const formattedDate = (dateString) => {
  const date = parseISO(dateString);
  return format(date, "MMM dd, hh:mm aa");
};

  // Now you can access the fetched data from the "logs" state
  console.log(logs);
  console.log(ids);
  const exampleActivitiesData = [];
  for  (let key in ids){
    let log = logs[ids[key]];
    console.log('log1: ', log);
    exampleActivitiesData.push({
      id: log['id'],
      icon: 'heroicons-solid:star',
      description: log['name']  + ' has  '+ log['action'] +' the parking',
      date:formattedDate(log['actionTime'])
      // Add more properties or modify existing ones
    });
  }


  console.log("exemple : ");
  console.log(exampleActivitiesData);
  
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));

  if (!exampleActivitiesData) {
    return null;
  }

  if (exampleActivitiesData.length === 0) {
    return (
      <div className="flex flex-1 items-center justify-center h-full">
        <Typography color="text.secondary" variant="h5">
          There are no Activities this month!
        </Typography>
      </div>
    );
  }

  return (
    <FusePageSimple
      content={
        <div className="flex flex-col flex-auto px-24 py-40 sm:px-64 sm:pt-72 sm:pb-80">
          <Typography className="text-4xl font-extrabold tracking-tight leading-none">
            All Activities
          </Typography>
          <Typography className="mt-6 text-lg" color="text.secondary">
            Parking activities history are listed here as individual items, starting with the most
            recent.
          </Typography>
          <Timeline
            className="py-48"
            position="right"
            sx={{
              '& .MuiTimelineItem-root:before': {
                display: 'none',
              },
            }}
          >
            {exampleActivitiesData.map((item, index) => (
              <ActivityTimelineItem
                last={exampleActivitiesData.length === index + 1}
                item={item}
                key={item.id}
              />
            ))}
          </Timeline>
        </div>
      }
      scroll={isMobile ? 'normal' : 'page'}
    />
  );
    }

export default withReducer('logs', reducer)(ActivitiesPage);
