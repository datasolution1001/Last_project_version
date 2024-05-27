
import ListItemText from '@mui/material/ListItemText';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import { useState } from 'react';
import Modal from './model/ModalImage';
import { format, parseISO } from 'date-fns';
import { Button } from '@mui/base';

function ParkingListItem(props) {
  const { parking ,ki } = props; 
  const formattedDate = (dateString) => {
    if(typeof(dateString) ==="string"){
    const date = parseISO(dateString);
    return format(date, "MMM dd yyyy, hh:mm aa");
    }else{
      return dateString;
    }
  };
  const [isModalOpen, setIsModalOpen] = useState(false);

    const [isHovered, setIsHovered] = useState(false);
    console.log('/***********/');
    console.log(parking.date+'T'+parking.time);
    console.log(parking);


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
                    primary={parking.user_name} 
                  />
                  </td>
                  <td className='text-center px-8 py-20'>
                 {parking.Method === "Camera Action" ?( 
                 <ListItemText
                   classes={{ root: 'm-0', primary: 'font-medium leading-5 truncate' }}
                   primary={parking.License} 
                 />):
                 <ListItemText
                 classes={{ root: 'm-0', primary: 'font-medium leading-5 truncate' }}
                 primary={parking.Method} 
               />
                
                }
                 </td>
                    
                    
                    <td className='text-center px-8 py-20'>{formattedDate(parking.date+'T'+parking.time)}</td>
                    <td className='text-center justify-center px-8 py-20'>
                    
                    {parking.action === "exit" ? ( 
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


                  <td className='text-center px-8 py-20'>
                 {parking.Method === "Camera Action" ?( 
 
                <button
          onClick={() => setIsModalOpen(true)}
          className="px-12 py-7 bg-blue-600 text-white rounded-md"
        >
          See Image
        </button>
                ):
                 <ListItemText
                 classes={{ root: 'm-0', primary: 'font-medium leading-5 truncate' }}
                 primary={"_"} 
               />
                
                }
                 </td>
            
                </>
            






        <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        imageSrc={"data:image/png;base64,"+parking.imageData}
      />
      
    </>
  );
}

export default ParkingListItem;
