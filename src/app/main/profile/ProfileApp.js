import FusePageSimple from '@fuse/core/FusePageSimple';
import withReducer from 'app/store/withReducer';
import Avatar from '@mui/material/Avatar';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Typography from '@mui/material/Typography';
import { useDeepCompareEffect } from '@fuse/hooks';
import { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import useThemeMediaQuery from '@fuse/hooks/useThemeMediaQuery';
import { motion } from 'framer-motion';
import Box from '@mui/material/Box';
import AboutTab from './tabs/AboutTab';
import ChangePassword from './tabs/ChangePassword';
import Action from './tabs/Action';
import reducer from './store';
import { getRecords } from './store/ProfielSlice';
import { useSelector } from 'react-redux';
import { selectUser } from 'app/store/userSlice';

const Root = styled(FusePageSimple)(({ theme }) => ({
  '& .FusePageSimple-header': {
    backgroundColor: theme.palette.background.paper,
    borderBottomWidth: 1,
    borderStyle: 'solid',
    borderColor: theme.palette.divider,
    '& > .container': {
      maxWidth: '100%',
    },
  },
}));

function ProfileApp(props) {
  const dispatch = useDispatch();
const pageLayout = useRef(null);
const routeParams = useParams();
const [rightSidebarOpen, setRightSidebarOpen] = useState(false);
const user = useSelector(selectUser);
 const backgroundNum=Math.floor(Math.random() * 5) + 1;

  const [selectedTab, setSelectedTab] = useState(0);
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));

  function handleTabChange(event, value) {
    setSelectedTab(value);
  }
  
  useDeepCompareEffect(() => {
    dispatch(getRecords());
  }, [dispatch]);
  console.log("user --");
console.log(user);
  return (
    <Root
      header={
        <div className="flex flex-col">
          <img
            className="h-160 lg:h-320 object-cover w-full"
            // src="assets/images/pages/profile/cover.jpg"
            src= {`assets/images/avatars/background${backgroundNum}.png`}
            alt="Profile Cover"
          />

          <div className="flex flex-col flex-0 lg:flex-row items-center max-w-5xl w-full mx-auto px-32 lg:h-72">
            <div className="-mt-96 lg:-mt-88 rounded-full">
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1, transition: { delay: 0.1 } }}>
                <Avatar
                  sx={{ borderColor: 'background.paper' }}
                  className="w-128 h-128 border-4"
                  src= {`assets/images/avatars/${user.data.gender}${user.data.avatarNum}-avatar.png`}
                  alt={user.data.name}
                />
              </motion.div>
            </div>

            <div className="flex flex-col items-center lg:items-start mt-16 lg:mt-0 lg:ml-32">
              <Typography className="text-lg font-bold leading-none">{user.data.name}</Typography>

            </div>

            <div className="hidden lg:flex h-32 mx-32 border-l-2" />

     

            <div className="flex flex-1 justify-end my-16 lg:my-0">
              <Tabs
                value={selectedTab}
                onChange={handleTabChange}
                indicatorColor="primary"
                textColor="inherit"
                variant="scrollable"
                scrollButtons={false}
                className="-mx-4 min-h-40"
                classes={{ indicator: 'flex justify-center bg-transparent w-full h-full' }}
                TabIndicatorProps={{
                  children: (
                    <Box
                      sx={{ bgcolor: 'text.disabled' }}
                      className="w-full h-full rounded-full opacity-20"
                    />
                  ),
                }}
              >
                <Tab
                  className="text-14 font-semibold min-h-40 min-w-64 mx-4 px-12 "
                  disableRipple
                  label="Action"
                />
                <Tab
                  className="text-14 font-semibold min-h-40 min-w-64 mx-4 px-12 "
                  disableRipple
                  label="About"
                />
                <Tab
                  className="text-14 font-semibold min-h-40 min-w-64 mx-4 px-12 "
                  disableRipple
                  label="Change Password"
                />
            
              </Tabs>
            </div>
          </div>
        </div>
      }
      content={
        <div className="flex flex-auto justify-center w-full max-w-5xl mx-auto p-24 sm:p-32">
          {selectedTab === 0 && <Action />}
          {selectedTab === 1 && <AboutTab />}
          {selectedTab === 2 && <ChangePassword />}
        </div>
      }
      scroll={isMobile ? 'normal' : 'page'}
    />
  );
}

export default withReducer('adminApp', reducer)(ProfileApp);
