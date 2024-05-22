
import ListItemText from '@mui/material/ListItemText';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import { useState } from 'react';

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
                    primary={admin.AdminName} 
                  />
                  </td>
                    
                    
                    <td className='text-center px-8 py-20'>{formattedDate(admin.time)}</td>
                    <td className='text-center px-8 py-20'>{admin.UserName ? admin.UserName : " --"}</td>
                    <td className='text-center justify-center px-8 py-20'>
                    {console.log("status "+admin.status)}
                    {admin.status.startsWith('dismiss') || admin.status.startsWith('Delete')? ( 
                      <div className='bg-red-500 rounded-xl flex p-10 mx-auto items-center w-136'>
                        <FuseSvgIcon className='mr-10'>heroicons-outline:trash</FuseSvgIcon>
                        {admin.status}
                      </div>
                    ) : admin.status.startsWith('Update') ?(
                    <div className='bg-orange-500 rounded-xl flex p-10 mx-auto items-center w-136'>
                    <FuseSvgIcon className='mr-10'>heroicons-outline:refresh</FuseSvgIcon>
                     { admin.status}
                  </div>)
                    :<div className='bg-green-500 rounded-xl flex p-10 mx-auto items-center w-136'>
                    <FuseSvgIcon className='mr-10'>heroicons-outline:plus-circle</FuseSvgIcon>
                     { admin.status}
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
                  <Avatar alt={admin.name} src={admin.avatar} />
                </ListItemAvatar>
                <ListItemText
                  classes={{ root: 'm-0', primary: 'font-medium leading-5 truncate' }}
                  primary={admin.name} 
                />
                </div> 
            </td>
            <td className='max-w-[120px] min-w-[100px] bg-white pl-10  py-16 border border-slate-300'>
              {admin.email}

            </td>
            <td className='max-w-[120px] min-w-[100px] bg-white pl-10  py-16 border border-slate-300'> 
            {admin.admin.space}
            </td>
            <td className='max-w-[120px] min-w-[100px] bg-white border pl-10 py-16 border-slate-300'>
            {admin.admin.right}
            </td>
          </tr>


        </tbody>


      </table> */}
      
      
    </>
  );
}

export default AdminListItem;
