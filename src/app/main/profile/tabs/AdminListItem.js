
import ListItemText from '@mui/material/ListItemText';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import { useState } from 'react';
import {
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineItem,
  TimelineSeparator,
} from '@mui/lab';
import Typography from '@mui/material/Typography';

import { format, parseISO } from 'date-fns';

function AdminListItem(props) {
  const { admin ,ki } = props; 
  const formattedDate = (dateString) => {
    if(typeof(dateString) ==="string"){
    const date = parseISO(dateString);
    return format(date, "MMM dd yyyy, hh:mm aa");
    }else{
      return dateString;
    }
  };
 


  return (
   
     <div className='w-full flex'>
      <div>
        <TimelineDot
          color="primary"
          className="w-40 h-40 p-0 m-7 mr-20  mt-0 flex items-center justify-center "
        >
         {admin.status.startsWith('dismiss') || admin.status.startsWith('Delete')? ( 
                     
                        <FuseSvgIcon >heroicons-outline:trash</FuseSvgIcon>
                      
                    ) : admin.status.startsWith('Update') ?(
                   
                    <FuseSvgIcon >heroicons-outline:refresh</FuseSvgIcon>
                    )
                    :
                    <FuseSvgIcon >heroicons-outline:plus-circle</FuseSvgIcon>
                 
                    }
         
        </TimelineDot>

   
      </div>

      <div className="flex flex-col items-start pt-0 pb-48">
      <Typography className="text-15" >
       {admin.UserName ? "You "+ admin.status+ " "+admin.UserName : "You "+admin.status }
       </Typography>
        <div className="flex flex-col sm:flex-row sm:items-center mt-8 sm:mt-4 sm:space-x-8 text-md leading-5">
          <Typography className="text-13" color="text.secondary">
          {formattedDate(admin.time)}
          </Typography>
       
        </div>
      </div>
    </div>

  );
}

export default AdminListItem;
