import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import * as yup from 'yup';
import _ from '@lodash';
import { useEffect } from 'react';
import { useState } from 'react';
import jwtService from '../../auth/services/jwtService';
import { showMessage } from '../../store/fuse/messageSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook to navigate after successful login
/**
 * Form Validation Schema
 */
const schema = yup.object().shape({
  email: yup.string().email('You must enter a valid email').required('You must enter a email'),
  password: yup
    .string()
    .required('Please enter your password.')
    .min(4, 'Password is too short - must be at least 4 chars.'),
});

const defaultValues = {
  email: '',
  password: '',
  remember: true,
};


function SignInPage() {

  const dispatch = useDispatch();
  const backendIPAddress = process.env.REACT_APP_BACKEND_IP_ADDRESS;
  console.log("HHHHHHHHHHHHHHHHHHHHHHH");
  console.log(backendIPAddress)
  const { control, formState, handleSubmit, setError, setValue } = useForm({
    mode: 'onChange',
    defaultValues,
    resolver: yupResolver(schema),
  });

  const { isValid, dirtyFields, errors } = formState;
  const navigate = useNavigate(); // Initialize useNavigate hook/**
  
  function pass(message) {
    if (message) {
      dispatch(showMessage({ message }));
    }
  }
  useEffect(() => {
    setValue('email', "");
    setValue('password', '');
  }, [setValue]);
 

  function onSubmit({ email, password }) {
    jwtService
      .signInWithEmailAndPassword(email, password)
      .then((user) => {
        // No need to do anything, user data will be set at app/auth/AuthContext
        console.log(backendIPAddress)
      })
      .catch((error) => {
        console.log(error)
        pass(error);
      });
  }

  return (
    <div className="flex flex-col sm:flex-row items-center md:items-center sm:justify-center md:justify-center flex-1 min-w-0 bg-my-image bg-cover">
     
      
          <div className=" relative sm:h-auto md:flex md:items-center md:justify-center bg-black opacity-[0.9]   py-8 px-16 sm:p-48 md:p-64 sm:rounded-2xl md:rounded-2xl sm:shadow md:shadow ltr:border-r-1 rtl:border-l-1">
        
      
        <div className="w-full max-w-320 sm:w-320 mx-auto sm:mx-0">

          <Typography className="mt-0 text-[40px] font-extrabold tracking-tight text-center leading-tight">
            Sign in
          </Typography>
          

          <form
            name="loginForm"
            noValidate
            className="flex flex-col justify-center w-full mt-32"
            onSubmit={handleSubmit(onSubmit)}
          >
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  className="mb-24"
                  label="Email"
                  autoFocus
                  type="email"
                  error={!!errors.email}
                  helperText={errors?.email?.message}
                  variant="outlined"
                  required
                  fullWidth
                />
              )}
            />

            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  className="mb-24"
                  label="Password"
                  type="password"
                  error={!!errors.password}
                  helperText={errors?.password?.message}
                  variant="outlined"
                  required
                  fullWidth
                />
              )}
            />

            <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-between">
              <Controller
                name="remember"
                control={control}
                render={({ field }) => (
                  <FormControl>
                    <FormControlLabel
                      label="Remember me"
                      control={<Checkbox size="small" {...field} />}
                    />
                  </FormControl>
                )}
              />

              {/* <Link className="text-md font-medium"
              to="/pages/auth/forgot-password">
                Forgot password?
              </Link> */}
            </div>

            <Button
              variant="contained"
              color="secondary"
              className=" w-full mt-16"
              aria-label="Sign in"
              disabled={_.isEmpty(dirtyFields) || !isValid}
              type="submit"
              size="large"
            >
              Sign in
            </Button>

            
          </form>
        </div>
      </div>
{/* 
      <Box
        className="relative hidden md:flex flex-auto items-center justify-center h-full p-64 lg:px-112 overflow-hidden"
        
      >


        <div className="z-10 relative  max-w-2xl ">
          
          <div className="text-7xl font-bold leading-none text-gray-100">
            <div>Welcome to</div>
            <div>our community</div>
          </div>
          <div className="mt-24 text-lg tracking-tight leading-6 text-gray-400">
            Fuse helps developers to build organized and well coded dashboards full of beautiful and
            rich modules. Join us and start building your application today.
          </div>
          <div className="flex items-center mt-32">
            <AvatarGroup
              sx={{
                '& .MuiAvatar-root': {
                  borderColor: 'primary.main',
                },
              }}
            >
              <Avatar src="assets/images/avatars/female-18.jpg" />
              <Avatar src="assets/images/avatars/female-11.jpg" />
              <Avatar src="assets/images/avatars/male-09.jpg" />
              <Avatar src="assets/images/avatars/male-16.jpg" />
            </AvatarGroup>

            <div className="ml-16 font-medium tracking-tight text-gray-400">
              More than 17k people joined us, it's your turn
            </div>
          </div>
        </div>
      </Box> */}
    </div>
  );
}

export default SignInPage;
