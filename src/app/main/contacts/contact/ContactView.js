import Button from '@mui/material/Button';
import NavLinkAdapter from '@fuse/core/NavLinkAdapter';
import { useParams, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FuseLoading from '@fuse/core/FuseLoading';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import Box from '@mui/system/Box';
import _ from '@lodash';
import { getContact, selectContact } from '../store/contactSlice';

const ContactView = () => {
  const contact = useSelector(selectContact);
  const routeParams = useParams();
  const dispatch = useDispatch();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const randomInteger = queryParams.get('randomInteger');
  console.log("Random Integer from URL Query Parameter:", randomInteger);
  const backgroundNum=Math.floor(Math.random() * 5) + 1;
  
  useEffect(() => {
    dispatch(getContact(routeParams.id));
  }, [dispatch, routeParams]);

  if (!contact) {
    return <FuseLoading />;
  }
  console.log("contact : "+contact.name +" : ");
  console.log(contact);

  return (
    <>
      <Box
        className="relative w-full h-160 sm:h-192 px-32 sm:px-48"
        sx={{
          backgroundColor: 'background.default',
        }}
      >

          <img
            className="absolute inset-0 object-cover w-full h-full"
            src= {`assets/images/avatars/background${backgroundNum}.png`}
            alt="user background"
          />
      </Box>
      <div className="relative flex flex-col flex-auto items-center p-24 pt-0 sm:p-48 sm:pt-0">
        <div className="w-full max-w-3xl">
          <div className="flex flex-auto items-end -mt-64">
            <Avatar
              sx={{
                borderWidth: 4,
                borderStyle: 'solid',
                borderColor: 'background.paper',
                backgroundColor: 'background.default',
                color: 'text.secondary',
              }}
              className="w-128 h-128 text-64 font-bold"
              src={contact.gender ? `assets/images/avatars/${contact.gender}${randomInteger}-avatar.png` : 'assets/images/avatars/user.png'}
              alt={contact.name}
              
            >
              {contact.name.charAt(0)}
            </Avatar>
            <div className="flex items-center ml-auto mb-4">
              <Button variant="contained" color="secondary" component={NavLinkAdapter} to={`edit?randomInteger=${randomInteger}`}>
                <FuseSvgIcon size={20}>heroicons-outline:pencil-alt</FuseSvgIcon>
                <span className="mx-8">Edit</span>
              </Button>
            </div>
          </div>

          <Typography className="mt-12 text-4xl font-bold truncate">{contact.name}</Typography>

          

          <Divider className="mt-16 mb-24" />
          

          <div className="flex flex-col space-y-32">
          
          {contact.gender == "Male" && (
              <div className="flex items-center">
                <FuseSvgIcon>material-solid:male</FuseSvgIcon>
                <div className="ml-24 leading-6">{contact.gender}</div>
              </div>
            )}
              {contact.gender == "Female" && (
              <div className="flex items-center">
                <FuseSvgIcon>material-solid:female</FuseSvgIcon>
                <div className="ml-24 leading-6">{contact.gender}</div>
              </div>
            )}


            {contact.job_title && (
              <div className="flex items-center">
                <FuseSvgIcon>heroicons-outline:briefcase</FuseSvgIcon>
                <div className="ml-24 leading-6">{contact.job_title}</div>
              </div>
            )}

            {contact.company && (
              <div className="flex items-center">
                <FuseSvgIcon>heroicons-outline:office-building</FuseSvgIcon>
                <div className="ml-24 leading-6">{contact.company}</div>
              </div>
            )}
            {contact.email && (
              <div className="flex items-center">
                <FuseSvgIcon>heroicons-outline:mail</FuseSvgIcon>
                <div className="ml-24 leading-6">{contact.email}</div>
              </div>
            )}
            {(contact.appID || contact.appID !=0) && (
              <div className="flex items-center">
                <FuseSvgIcon>heroicons-outline:device-tablet</FuseSvgIcon>
                <div className="ml-24 leading-6">{contact.appID}</div>
              </div>
            )}
            {contact.phoneNumber && (
              <div className="flex items-center">
                <FuseSvgIcon>heroicons-outline:phone</FuseSvgIcon>
                <div className="ml-24 leading-6">{contact.phoneNumber}</div>
              </div>
            )}
           
             {contact.guest && (
              <div className="flex items-center">
                
                <FuseSvgIcon>heroicons-outline:user-add</FuseSvgIcon>
                <div className="ml-24 leading-6">{contact.guest}</div>
              </div>
            )}
             {contact.date_fin && (
              <div className="flex items-center">
                
                <FuseSvgIcon>heroicons-outline:calendar</FuseSvgIcon>
                <div className="ml-24 leading-6"> Debut : {contact.date_debut}</div>
              </div>
            )}
             {contact.date_debut && (
              <div className="flex items-center">
                
                <FuseSvgIcon>heroicons-outline:calendar</FuseSvgIcon>
                <div className="ml-24 leading-6">Fin : {contact.date_fin}</div>
              </div>
            )}



 {contact.lpns.length ? (
  <div className="flex">
    <FuseSvgIcon>heroicons-outline:clipboard-list</FuseSvgIcon>
    <div className="ml-24 leading-6">Licence(s) Plate(s) Number(s)
    <div className="min-w-0 ml-24">
      {contact.lpns.map(
        (lpn) =>
          lpn !== '' && (
          
                <div className="flex items-center m-20" key={lpn}>
                     <FuseSvgIcon>heroicons-outline:qrcode</FuseSvgIcon>
                     <div className="ml-24 leading-6">{lpn}</div></div>
          )
      )}
    </div></div>
  </div>
): ""}



{(contact.admin.right) ? (
  
  <div className="flex">
    <FuseSvgIcon>material-outline:admin_panel_settings</FuseSvgIcon>
    <div className="ml-24 leading-6">Right : {contact.admin.right}
    {contact.admin.space && (
              <div className="flex items-center min-w-0 ml-24">
               <div className="flex items-center m-20" > 
                <FuseSvgIcon>heroicons-outline:location-marker</FuseSvgIcon>
                <div className="ml-24 leading-6"> Space : {contact.admin.space}</div>
              </div></div>
            )}
            
          
            
            </div>
  </div>
): ""}




              


            
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactView;
