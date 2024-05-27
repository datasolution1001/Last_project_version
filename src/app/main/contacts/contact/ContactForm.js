import Button from '@mui/material/Button';
import NavLinkAdapter from '@fuse/core/NavLinkAdapter';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams,useLocation  } from 'react-router-dom';
import { useEffect,useState,useCallback } from 'react';
import FuseLoading from '@fuse/core/FuseLoading';
import _ from '@lodash';
import * as yup from 'yup';
import React from 'react';

import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import Box from '@mui/system/Box';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import {
  addContact,
  getContact,
  newContact,
  setUserData,
  removeContact,
  selectContact,
  updateContact,
} from '../store/contactSlice';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { HiOutlineTrash } from 'react-icons/hi'; 
 const backgroundNum=Math.floor(Math.random() * 5) + 1;
const schema = yup.object().shape({
  name: yup.string().required("You must enter a name"),
  company: yup.string().required('You must enter a company'),
  phoneNumber: yup.string().matches(/^(\+\d{1,3}\s?)?(\d{2}\s?)?\d{3}\s?\d{3}\s?$/,"you must enter a correct phone number").required('You must enter a phone number'),  
  email: yup.string().matches(/[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,"you must enter an email like: example@email.com").required('You must enter an email'),
  gender: yup.string().required('Gender is required'),
  guest: yup.string().required('Guest is required'),
  // appID: yup.string().matches(/^[0-9]{3}$/, 'You must enter 3 digits'),
  date_fin:yup.date().required('Date fin is required'),
  
  date_debut: yup.date().required('Date debut is required'),
});

function ContactForm(props) {
  const contact = useSelector(selectContact);
  const {id} = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [adminState, setAdmin] = useState(0);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const randomInteger = queryParams.get('randomInteger');
 
 

  const { control, watch, reset, handleSubmit, formState, getValues } = useForm({
    mode: 'onChange',
    resolver: yupResolver(schema),
  });

  const { isValid, dirtyFields, errors } = formState;

  const form = watch();
  useEffect(() => {
    if (id === 'new') {
        dispatch(newContact());
    } else {
        dispatch(getContact(id));
    }
}, [dispatch, id]);

useEffect(() => {
    reset(contact);
}, [contact]);
const showToastSuccess = () => {
  toast.success("Contact added successfully", {
    position: "bottom-right",
    style: { marginBottom: '6rem' }
  });
};
const showToastUpdate = () => {
  toast.info("Contact updated successfully", {
    position: "bottom-right",
    style: { marginBottom: '6rem' }
  });
};
const showToastdelete = () => {
  toast(<span className='flex flex-row items-center'>
    <HiOutlineTrash className='text-red-500 px-10 icon-size-40' /> Contact deleted successfully
  </span>, {
    position: "bottom-right",
    style: { marginBottom: '6rem' },


  });
};


const  onSubmit = useCallback((data) => {
    if (id === 'new') {
        dispatch(addContact(data))
        
        .then(() => {
          
          showToastSuccess();
          navigate('/contacts');
            
        });
    } else {
        dispatch(updateContact(data))
       .then(() => {
        
        showToastUpdate();
            navigate('/contacts');
            
        });
    }
}, [dispatch, id, navigate]);


  function handleRemoveContact() {
    dispatch(removeContact(contact.id))
    .then(() => {

      showToastdelete();
      navigate('/contacts');

     
    });
  }

  if (_.isEmpty(form) || !contact) {
    return <FuseLoading />;
  }

  const handleSubmitWithToast = () => {
    showToastMessage();
    handleSubmit(onSubmit)(); 
  };
  
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
      <form onSubmit={handleSubmit(onSubmit)}>
      <div className="relative flex flex-col flex-auto items-center px-24 sm:px-48">
        <div className="w-full">
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
          </div>
        </div>

        <Controller
          control={control}
          name="name"
          render={({ field }) => (

            <TextField
              className="mt-32"
              
              {...field}
              label="Name"
              placeholder="Name"
              id="name"
              error={!!errors.name}
              helperText={errors?.name?.message}
              variant="outlined"
              required
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <FuseSvgIcon size={20}>heroicons-solid:user-circle</FuseSvgIcon>
                  </InputAdornment>
                ),
              }}
            />
          )
        }
        />
<Controller
      control={control}
      name="gender"
      render={({ field }) => (
    
        <FormControl fullWidth
        className="mt-32"
   
        >
        <FormLabel component="legend" className='mb-10'>Gender</FormLabel>
        <RadioGroup
          {...field}
          aria-label="gender"
          row 
           id='gender'
          defaultValue="male" // Set the default value for the radio group
        >
     
          <FormControlLabel value="Male" control={<Radio />} label="Male" />
          <FormControlLabel value="Female" control={<Radio />} label="Female" />
         
        </RadioGroup>
        </FormControl>
      )}
    />
        

        <Controller
          control={control}
          name="job_title"
          render={({ field }) => (
            <TextField
              className="mt-32"
              {...field}
              label="Title"
              placeholder="Job title"
              id="title"
              error={!!errors.title}
              helperText={errors?.title?.message}
              variant="outlined"
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <FuseSvgIcon size={20}>heroicons-solid:briefcase</FuseSvgIcon>
                  </InputAdornment>
                ),
              }}
            />
          )}
        />

        <Controller
          control={control}
          name="company"
          render={({ field }) => (
            <TextField
              className="mt-32"
              {...field}
              label="Company"
              placeholder="Company"
              id="company"
              error={!!errors.company}
              helperText={errors?.company?.message}
              variant="outlined"
              required
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <FuseSvgIcon size={20}>heroicons-solid:office-building</FuseSvgIcon>
                  </InputAdornment>
                ),
              }}
            />
          )}
        />

{/*         
<Controller
          control={control}
          name="guest"
          render={({ field }) => (
            <TextField
              className="mt-32"
              {...field}
              label="guest"
              placeholder="guest"
              id="guest"
              error={!!errors.email}
              helperText={errors?.email?.message}
              variant="outlined"
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <FuseSvgIcon size={20}>heroicons-solid:user-add</FuseSvgIcon>
                  </InputAdornment>
                ),
              }}
            />
          )}
        /> */}


     
{/* <Controller
          control={control}
          name="appID"
          rules={{   pattern: {
            value: /^[0-9]{3}$/,
            message: "Please enter exactly three digits"
          }}}
          render={({ field }) => (
            <TextField
              className="mt-32"
              {...field}
              label="appID"
              placeholder="appID"
              id="appID"
              error={!!errors.appID}
              helperText={errors?.appID?.message}
              variant="outlined"
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <FuseSvgIcon size={20}>heroicons-solid:device-tablet</FuseSvgIcon>
                  </InputAdornment>
                ),
              }}
            />
          )}
        /> */}


<Controller
          control={control}
          name="phoneNumber"
          render={({ field }) => (
            <TextField
              className="mt-32"
              {...field}
              label="phone number"
              placeholder="phone number"
              id="phoneNumber"
              error={!!errors.phoneNumber}
              helperText={errors?.phoneNumber?.message}
              variant="outlined"
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <FuseSvgIcon size={20}>heroicons-solid:phone</FuseSvgIcon>
                  </InputAdornment>
                ),
              }}
            />
          )}
        />
      

        <Controller
          control={control}
          name="email"
          render={({ field }) => (
            <TextField
              className="mt-32"
              {...field}
             
              label="email"
              placeholder="email"
              id="email"
              error={!!errors.email}
              helperText={errors?.email?.message}
              variant="outlined"
              required
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <FuseSvgIcon size={20}>heroicons-solid:mail</FuseSvgIcon>
                  </InputAdornment>
                ),
              }}
            />
          )}
        />
        
<Controller
      control={control}
      name="guest"
      render={({ field }) => (
    
        <FormControl fullWidth
        className="mt-32"
   
        >
        <FormLabel component="legend" className='mb-10'>Guest</FormLabel>
        <RadioGroup
          {...field}
          aria-label="guest"
          row 
           id='guest'
          defaultValue="No" // Set the default value for the radio group
        >
     
          <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
          <FormControlLabel value="No" control={<Radio />} label="No" />
         
        </RadioGroup>
        </FormControl>
      )}
    />


        <Controller
          control={control}
          name="date_debut"
          render={({ field: { value, onChange } }) => (
            <DatePicker
            value={ new Date(value)}
              onChange={onChange}
              inputFormat="yyyy-MM-dd" // Format to display just the date
              className="mt-32 mb-16 w-full"
              clearable
              required
              slotProps={{
                textField: {
                  id: 'Date Debut',
                  label: 'Date Debut',
                  InputLabelProps: {
                    shrink: true,
                  },
                  
                  fullWidth: true,
                  variant: 'outlined',
                  
                },
                actionBar: {
                  actions: ['clear', 'today'],
                },
              }}
              slots={{
                openPickerIcon: () => <FuseSvgIcon size={20}>heroicons-solid:clock</FuseSvgIcon>,
              }}
            />
          )}
        />


<Controller
          control={control}
          name="date_fin"
          render={({ field: { value, onChange } }) => (
            <DatePicker
            value={ new Date(value)}
              onChange={onChange}
              inputFormat="yyyy-MM-dd" 
              className="mt-32 mb-16 w-full"
              clearable
              required
              slotProps={{
                textField: {
                  id: 'Date Fin',
                  label: 'Date Fin',
                  InputLabelProps: {
                    shrink: true,
                  },
                
                  fullWidth: true,
                  variant: 'outlined',
                  
                },
                actionBar: {
                  actions: ['clear', 'today'],
                },
              }}
              slots={{
                openPickerIcon: () => <FuseSvgIcon size={20}>heroicons-solid:clock</FuseSvgIcon>,
              }}
            />
          )}
       />


 
<Controller
  control={control}
  name="lpns"
  render={({ field }) => (
    <>
      {field.value.map((lpn, index) => (
        <TextField
          key={index}
          className="mt-32"
          value={lpn}
          onChange={(e) => {
            const updatedLpns = [...field.value];
            updatedLpns[index] = e.target.value;
            field.onChange(updatedLpns);
          }}
          label={`LPN ${index + 1}`} // Dynamic label for each lpn input
          placeholder="LPN"
          error={!!errors.lpns}
          helperText={errors?.lpns?.message}
          variant="outlined"
 
          fullWidth
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <FuseSvgIcon size={20}>heroicons-solid:qrcode</FuseSvgIcon>
              </InputAdornment>
            ),
          }}
        />
      ))}
      <Button
        className="group inline-flex items-center mt-2 -ml-4 py-2 px-4 rounded cursor-pointer"
        onClick={() => field.onChange([...field.value, ''])}
      >
        <FuseSvgIcon size={20}>heroicons-solid:plus-circle</FuseSvgIcon>
        <span className="ml-8 font-medium text-secondary group-hover:underline">
          Add an LPN
        </span>
      </Button>
    </>
  )}
/>

<Controller
  control={control}
  name="admin"
  render={({ field }) => (
    <>
   
    
     {!(field.value.space || field.value.passwordAdmin ||field.value.right) && !(adminState.space || adminState.passwordAdmin ||adminState.right)?(

        <Button
          className="group inline-flex items-center mt-2 -ml-4 py-2 px-4 rounded cursor-pointer"
          onClick={() => {setAdmin({ space: ' ', passwordAdmin: ' ', right: ' ' });
        console.log(adminState)
        }}
        >
          <FuseSvgIcon size={20}>heroicons-solid:plus-circle</FuseSvgIcon>
          <span className="ml-8 font-medium text-secondary group-hover:underline">
            Add Admin
          </span>
        </Button>
      ): ""}
      {((adminState.space || adminState.passwordAdmin ||adminState.right) || 
      (field.value.space || field.value.passwordAdmin ||field.value.right) )  && (
        <div className="admin-fields">
          <TextField
            className="mt-32"
            value={field.value?.space || ''}
            onChange={(e) => field.onChange({ ...field.value, space: e.target.value })}
            label={`Space`}
            placeholder="Space"
            variant="outlined"
            fullWidth
            required
          />
          {(!contact.admin.passwordAdmin) &&
          (<TextField
            className="mt-32"
            value={field.value?.passwordAdmin || ''}
            onChange={(e) => field.onChange({ ...field.value, passwordAdmin: e.target.value })}
            label="Password"
            type="password"
            placeholder="Password"
            variant="outlined"
            fullWidth
            required
          />)}
          <TextField
            className="mt-32"
            value={field.value?.right || ''}
            onChange={(e) => field.onChange({ ...field.value, right: e.target.value })}
            label="Rights"
            placeholder="Rights"
            variant="outlined"
            fullWidth
            required
          />
        </div>
      )}
    </>
  )}
/>

      </div>

      <Box
        className="flex items-center mt-40 py-14 pr-16 pl-4 sm:pr-48 sm:pl-36 border-t"
        sx={{ backgroundColor: 'background.default' }}
      >
        {id !== 'new' && (
          <Button color="error" onClick={handleRemoveContact}>
              Delete
            </Button>
        )}
        <Button className="ml-auto" component={NavLinkAdapter} to={-1}>
          Cancel
        </Button>
        <Button
          className="ml-8"
          variant="contained"
          color="secondary"
          disabled={!isValid}
          onClick={ handleSubmit(onSubmit)}
          
        >
          Save
        </Button>
      </Box>
      </form>
    </>
  );
}

export default ContactForm;
