import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { memo } from 'react';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import { useState, useEffect } from 'react';
import axios from 'axios';

function ParkingCapacityAvailable() {
  

  const [data, setData] = useState(null);
    useEffect(() => {
    

    fetchData();
  }, []);
  const fetchData = async () => {
   try {

   
      const currentDate = new Date();
      const monthUnformatted = currentDate.toLocaleDateString('en-US', { month: 'long' });
      const year = currentDate.getFullYear();
      const month = `${monthUnformatted}_${year}`;
      const dayUnformatted = currentDate.getDate();
      const day = `${dayUnformatted}`;

      const response = await axios.get("http://127.0.0.1:8000/reports/Parking/get_available_Spots", {
        params: {
          month,
          day,
        },
      });
      console.log("datttttttttttta yes")
      setData(response.data)
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

 
  // const [occupied, available] = data;
    
  return (
    <Paper className="flex flex-col flex-auto shadow rounded-2xl overflow-hidden">
      <div className="flex items-center justify-between px-8 pt-12">
        <Typography
          className="px-16 text-lg font-medium tracking-tight leading-6 truncate"
          color="text.secondary"
        >
          {/* {title} */}
          Parking Capacity
        </Typography>
        <IconButton onClick={fetchData} aria-label="more" size="large">
          <FuseSvgIcon>heroicons-outline:status-online</FuseSvgIcon>
        </IconButton>
      </div>
      <div className="text-center mt-8">
        <Typography className="text-7xl sm:text-8xl font-bold tracking-tight leading-none text-blue-500">
        {data}
        </Typography>
        <Typography className="text-lg font-medium text-blue-600 dark:text-blue-500 pb-[28px]">
        Available 
        </Typography>
      </div>

    </Paper>
  );
}

export default memo(ParkingCapacityAvailable);
