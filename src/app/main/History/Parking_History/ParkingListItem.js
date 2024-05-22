
import ListItemText from '@mui/material/ListItemText';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import { useState } from 'react';

import { format, parseISO } from 'date-fns';

function ParkingListItem(props) {
  const { contact ,ki } = props; 
  const formattedDate = (dateString) => {
    if(typeof(dateString) ==="string"){
    const date = parseISO(dateString);
    return format(date, "MMM dd yyyy, hh:mm aa");
    }else{
      return dateString;
    }
  };

    const [isHovered, setIsHovered] = useState(false);


  return (
    <>


     
        
               <>
                 <td>
                  <ListItemText
                  className='mr-4 text-center justify-center m-3'
                  primary={ki+1} />
                  </td>
                  <td className='text-center px-8 py-20'>
                 
                  <ListItemText
                    classes={{ root: 'm-0', primary: 'font-medium leading-5 truncate' }}
                    primary={contact.name} 
                  />
                  </td>
                    
                    
                    <td className='text-center px-8 py-20'>{formattedDate(contact.actionTime)}</td>
                    <td className='text-center justify-center px-8 py-20'>
                    
                    {contact.action === "exit" ? ( 
                      <div className='bg-red-500 rounded-xl flex p-10 mx-auto items-center w-96'
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}>
                        <FuseSvgIcon className={`mr-10 ${isHovered ? 'motion-safe:animate-bounce' : ''}`}>feather:arrow-down-circle</FuseSvgIcon>
                          Exit
                      </div>
                    ) :<div className='bg-green-500 rounded-xl flex p-10 mx-auto items-center w-96'
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}>
                    <FuseSvgIcon className={`mr-10 ${isHovered ? 'motion-safe:animate-bounce' : ''}`}>feather:arrow-up-circle</FuseSvgIcon>
                      Enter
                  </div>
        
                    }</td>
            
                </>
            






      {/* <table className="w-[100%]  border-collapse border border-slate-400">
        <tbody>
          <tr className=''>
            <td className=' pl-32  bg-white py-16 border border-slate-300 max-w-[120px]' 
            sx={{ bgcolor: 'background.paper' }}>
                <div className= 'flex items-center justify-between'>
                <ListItemAvatar>
                  <Avatar alt={contact.name} src={contact.avatar} />
                </ListItemAvatar>
                <ListItemText
                  classes={{ root: 'm-0', primary: 'font-medium leading-5 truncate' }}
                  primary={contact.name} 
                />
                </div> 
            </td>
            <td className='max-w-[120px] min-w-[100px] bg-white pl-10  py-16 border border-slate-300'>
              {contact.email}

            </td>
            <td className='max-w-[120px] min-w-[100px] bg-white pl-10  py-16 border border-slate-300'> 
            {contact.admin.space}
            </td>
            <td className='max-w-[120px] min-w-[100px] bg-white border pl-10 py-16 border-slate-300'>
            {contact.admin.right}
            </td>
          </tr>


        </tbody>


      </table> */}
      
      
    </>
  );
}

export default ParkingListItem;
