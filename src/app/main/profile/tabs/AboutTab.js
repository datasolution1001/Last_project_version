import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import { useSelector } from 'react-redux';
import { selectUser } from 'app/store/userSlice';

function AboutTab() {
  // const [data, setData] = useState(null);
  const test = (x) => x + 1;
  const user = useSelector(selectUser);
  const data = user.data;
  console.log("h1*------*");
  console.log(data);

  useEffect(() => {
    axios.get('/api/profile/about').then((res) => {
      setData(res.data);
    });
  }, []);

  if (!data) {
    return null;
  }

  // const { general, work, contact, groups, friends } = data;

  const container = {
    show: {
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="w-full">
      <div className="md:flex">
        <div className="flex flex-col flex-1 md:ltr:pr-32 md:rtl:pl-32">
          <Card component={motion.div} variants={item} className="w-full mb-32">
            <div className="px-32 pt-24">
              <Typography className="text-2xl font-semibold leading-tight">
                General Information
              </Typography>
            </div>

            <CardContent className="px-32 py-24">
           
            <div className="mb-24">
                <Typography className="font-semibold mb-4 text-15">Rights</Typography>
                <Typography>{data.admin.right}</Typography>
              </div>


              <div className="mb-24">
                <Typography className="font-semibold mb-4 text-15">Locations</Typography>
                <Typography>{data.admin.space}</Typography>
              </div>
              <div className="mb-24">
                <Typography className="font-semibold mb-4 text-15">Gender</Typography>
                <Typography>{data.gender}</Typography>
              </div>

              {/* <div className="mb-24">
                <Typography className="font-semibold mb-4 text-15">License(s) Plate NUmber</Typography>

                {data.lpns.map((lpn) => (
                  <div className="flex items-center" key={lpn}>
                    <Typography>{lpn}</Typography>
                    <FuseSvgIcon className="mx-4" size={16} color="action">
                      heroicons-outline:location-marker
                    </FuseSvgIcon>
                  </div>
                ))}
              </div> */}

              {/* <div className="mb-24">
                <Typography className="font-semibold mb-4 text-15">License(s) Plate NUmber</Typography>
                <Typography>{data.lpns}</Typography>
              </div> */}
            </CardContent>
          </Card>

          <Card component={motion.div} variants={item} className="w-full mb-32">
            <div className="px-32 pt-24">
              <Typography className="text-2xl font-semibold leading-tight">Work</Typography>
            </div>

            <CardContent className="px-32 py-24">
              <div className="mb-24">
                <Typography className="font-semibold mb-4 text-15">Occupation</Typography>
                <Typography>{data.job_title}</Typography>
              </div>
              <div className="mb-24">
                <Typography className="font-semibold mb-4 text-15">company</Typography>
                <Typography>{data.company}</Typography>
              </div>

             

              {/* <div className="mb-24">
                <Typography className="font-semibold mb-4 text-15">Jobs</Typography>
                <table className="">
                  <tbody>
                    {work.jobs.map((job) => (
                      <tr key={job.company}>
                        <td>
                          <Typography>{job.company}</Typography>
                        </td>
                        <td className="px-16">
                          <Typography color="text.secondary">{job.date}</Typography>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div> */}
            </CardContent>
          </Card>

          <Card component={motion.div} variants={item} className="w-full mb-32">
            <div className="px-32 pt-24">
              <Typography className="text-2xl font-semibold leading-tight">Contact</Typography>
            </div>

            <CardContent className="px-32 py-24">
             

              <div className="mb-24">
                <Typography className="font-semibold mb-4 text-15">Tel.</Typography>
                <Typography>{data.phoneNumber}</Typography>
                
              </div>

      

              <div className="mb-24">
                <Typography className="font-semibold mb-4 text-15">Emails</Typography>

                <Typography>{data.email}</Typography>
              </div>
            </CardContent>
          </Card>
        </div>

    
      </div>
    </motion.div>
  );
}

export default AboutTab;
