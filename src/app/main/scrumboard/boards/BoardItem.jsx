import { Box } from '@mui/system';
import Divider from '@mui/material/Divider';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import { formatDistance } from 'date-fns';
import { useSelector, useDispatch } from 'react-redux';
import Button from '@mui/material/Button';
import NavLinkAdapter from '@fuse/core/NavLinkAdapter';
import _ from '@lodash';
import { useNavigate  } from 'react-router-dom';

import { approvedUser } from '../store/boardsSlice';
import { deleteUserInProgress } from '../store/boardsSlice';


function BoardItem(props) {
  const { board } = props;
  console.log(props)
  const dispatch = useDispatch();
  const navigate = useNavigate();


  
  
    function handleSubmitUserInProgress() {
      dispatch(approvedUser(board.id)).then(() => {
        handleRemoveUserInProgress() ;
        console.log("user is added succesfully") ;
      });
    }
  function handleRemoveUserInProgress() {
    dispatch(deleteUserInProgress(board.id)).then(() => {
      console.log("all is done")
      navigate('/apps/usersRequests');
    });
  }


  return (
    <Card
      component={Link}
     
      role="button"
      className="flex flex-col items-start w-full px-[20px]  relative shadow rounded-lg hover:shadow-xl transition-shadow duration-150 ease-in-out "
    >
      <div className='absolute w-full h-[70px] bg-gray-400 opacity-[0.1] left-0 top-0 z-0 '></div>
      <div className="flex z-10 mt-[10px] flex-col items-center flex-auto justify-start  w-full">
     

        <div className='flex flex-col items-center '>
          <Typography className=" font-bold capitalize text-ellipsis overflow-hidden text-[22px]  text-center ">{board.name}</Typography>
          <Typography className=" text-secondary font-400 text-[13px] align-center text-gray-200">{board.job_title}</Typography>
        </div>
        
        <div className='flex self-start mt-[30px] ml-[20px]  flex-col '>
          <div className='flex  items-center '>
            <FuseSvgIcon className="text-48 mr-[12px]" size={16} color="action">heroicons-solid:phone</FuseSvgIcon>
            <Typography className="line-clamp-2 text-secondary  text-gray-300">{board.phoneNumber}</Typography>
          </div>
          <div className='flex  items-center justify-start mt-[4px]'>
          <FuseSvgIcon className="text-48 mr-[12px]" size={15} color="action">heroicons-solid:office-building</FuseSvgIcon>
          <Typography className="line-clamp-2 text-secondary  text-gray-300">{board.company}</Typography>

          </div>
          <div className='flex  items-center justify-start mt-[4px]'>
          <FuseSvgIcon className="text-48 mr-[12px]" size={15} color="action">heroicons-solid:badge-check</FuseSvgIcon>
          <Typography className="line-clamp-2 text-secondary  text-gray-300">{board.date_debut}</Typography>
          </div>
          <div className='flex  items-center justify-start mt-[4px]'>
          <FuseSvgIcon className="text-48 mr-[12px]" size={15} color="action">heroicons-solid:ban</FuseSvgIcon>
          <Typography className="line-clamp-2 text-secondary  text-gray-300">{board.date_fin}</Typography>
          </div>
          <div className='flex  items-center justify-start mt-[4px]'>
          <FuseSvgIcon className="text-48 mr-[12px]" size={15} color="action">heroicons-solid:user</FuseSvgIcon>
          <Typography className="line-clamp-2 text-secondary  text-gray-300">{board.guest}</Typography>
          </div>
        </div>
        <Divider className="w-48 mt-[20px] h-2" />
      </div>
      <div className='m-auto w-[100%] flex  justify-around items-center mt-[20px]'>
        <Button
            className='px-[10px]'
            variant="contained"
            color   ="secondary"
            component={NavLinkAdapter}
            onClick={handleSubmitUserInProgress}
          >
            <span className="mx-8">Accept</span>
          </Button>
          <Button
            className=" px-[10px] bg-red-300 hover:bg-red-400"
            variant="contained"
            color   ="secondary"
            component={NavLinkAdapter}
            to=""
            onClick={handleRemoveUserInProgress}
          >
            <span className="mx-8">Decline</span>
          </Button>
      </div>
     
        <div className="flex items-center my-[20px]">
          <Typography className='text-[13px] font-medium ' color="text.secondary">Created:</Typography>
          <Typography className="mx-4 truncate text-[12px] font-light">
            {formatDistance(new Date(board.actionTime), new Date(), { addSuffix: true })}
          </Typography>
        </div>
 
    </Card>
  );
}

export default BoardItem;
