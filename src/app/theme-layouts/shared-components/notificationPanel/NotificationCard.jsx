import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import clsx from 'clsx';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import NavLinkAdapter from '@fuse/core/NavLinkAdapter';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import Button from '@mui/material/Button';
import { useState } from 'react';



function NotificationCard(props) {
  console.log("card props " + props);
  const { item, className } = props;
  const dispatch = useDispatch();
  const variant = item?.variant || '';
  const navigate = useNavigate();

  const handleClose = (ev) => {
    ev.preventDefault();
    ev.stopPropagation();

    if (props.onClose) {
      props.onClose(item.id);
    }
  };

  return (
    <Card
      className={clsx(
        'flex items-center relative w-full rounded-16 p-20 min-h-64 shadow space-x-8 cursor-pointer',
        variant === 'success' && 'bg-green-600 text-white',
        variant === 'info' && 'bg-blue-700 text-white',
        variant === 'error' && 'bg-red-600 text-white',
        variant === 'warning' && 'bg-orange-600 text-white',
        className
      )}
      elevation={0}
      component={item.useRouter ? NavLinkAdapter : 'div'}
      onClick={() => {
        window.location.href = 'apps/scrumboard';
      }}
      role={item.link && 'button'}
    >
      {item.icon && !item.image && (
        <Box
          sx={{ backgroundColor: 'background.default' }}
          className="flex shrink-0 items-center justify-center w-32 h-32 mr-12 rounded-full"
        >
          <FuseSvgIcon className="opacity-75" color="inherit">
            {item.icon}
          </FuseSvgIcon>
        </Box>
      )}

      {item.image && (
        <img
          className="shrink-0 w-32 h-32 mr-12 rounded-full overflow-hidden object-cover object-center"
          src={item.image}
          alt="Notification"
        />
      )}

      <div className="flex flex-col flex-auto">
        <Typography className="font-bold text-[17px] line-clamp-1">User Request</Typography>

          <div className="line-clamp-2 font-medium text-[15px]">
            <span className='font-semibold text-blue-800 text-[15px]'>{item.name}</span>
            {` want to be a user`}
          </div>

        {item.item && (
          <Typography className="mt-8 text-sm leading-none " color="text.secondary">
            {formatDistanceToNow(new Date(item.time), { addSuffix: true })}
          </Typography>
        )}
      
      </div>

      <IconButton
        disableRipple
        className="top-0 right-0 absolute p-8"
        color="inherit"
        size="small"
        onClick={handleClose}
      >
        <FuseSvgIcon size={12} className="opacity-75" color="inherit">
          heroicons-solid:x
        </FuseSvgIcon>
      </IconButton>
      {item.children}
    </Card>
  );
}

export default NotificationCard;
