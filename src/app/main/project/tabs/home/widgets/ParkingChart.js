import Paper from '@mui/material/Paper';
import { lighten, useTheme } from '@mui/material/styles';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Typography from '@mui/material/Typography';
import { memo, useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import Box from '@mui/material/Box';
import { useSelector } from 'react-redux';
import { selectWidgets } from '../../../store/widgetsSlice';
import axios from 'axios';
import { RepeatOneSharp } from '@mui/icons-material';
function ParkingChart() {
  const theme = useTheme();
  const [nbGuest, setNbGuest] = useState(null);
  const [nbNative, setNbNative] = useState(null);
  const [guestTab, setGuestTab] = useState([]);
  const [nativeTab, setNativeTab] = useState([]);
  const [labels, setLabels] = useState([]);


  const [awaitRender, setAwaitRender] = useState(true);
  const [tabValue, setTabValue] = useState(0);
  const widgets = useSelector(selectWidgets);

  const tabNative = [];
  const tabGuest = [];
  const label = [];
  
  // fetch data from database
  useEffect(() => {
    

    fetchData();
  }, []);
  const fetchData = async () => {
   try {

   
      const currentDate = new Date();
      console.log("current date", currentDate)
      const monthUnformatted = currentDate.toLocaleDateString('en-US', { month: 'long' });
      const year = currentDate.getFullYear();
      const month = `${monthUnformatted}_${year}`;
      const dayUnformatted = currentDate.getDate();
      const day = `${dayUnformatted}`;
      function getSixDaysBefore(inputDate) {
        // Initialize an array to store the dates of the six days before
        const sixDaysBefore = [];
        
        // Iterate from 6 days ago until the input date
        for (let i = 6; i >= 0; i--) {
            // Clone the input date and subtract i days from it
            const previousDate = new Date(inputDate);
            previousDate.setDate(inputDate.getDate() - i);
            
            // Format the date as "DD/MM/YYYY"
            const formattedDate = `${previousDate.getDate().toString().padStart(2, '0')}/${(previousDate.getMonth() + 1).toString().padStart(2, '0')}/${previousDate.getFullYear()}`;
            
            // Push the formatted date to the array
            sixDaysBefore.push(formattedDate);
        }
        
        return sixDaysBefore;
    }
    
      console.log("::::::::::::::::////////////");
      console.log(getSixDaysBefore(currentDate))
      console.log("/////////////")

      const sixDays = getSixDaysBefore(currentDate)
      function dateTypo(date) {

        const tab = [];



        for (let i = 0; i < date.length; i++) {
          const [day, month, year] = date[i].split("/");
    
          // Get the month name based on the month number
          const monthNames = ["January", "February", "March", "April", "May", "June",
                              "July", "August", "September", "October", "November", "December"];
          const monthName = monthNames[parseInt(month) - 1];
          
          // Format the month and year as "Month_YYYY"
          const formatedmonth = `${monthName}_${year}`;
          
          tab.push([day, formatedmonth])
        }
        
        console.log('/*************+++++++++++++++++++++++++')
        console.log(tab)
        return tab
      }
      setLabels(dateTypo(sixDays))
      for (let i = 0; i < dateTypo(sixDays).length; i++) {
        const month = dateTypo(sixDays)[i][1];
        const day = dateTypo(sixDays)[i][0];

        const responseNative = await axios.get("http://127.0.0.1:8000/reports/Parking/get_nbNativeEnters", {
        params: {
          month,
          day,
        },
        
      });
      const responseGuest = await axios.get("http://127.0.0.1:8000/reports/Parking/get_nbGuestEnters", {
        params: {
          month,
          day,
        },
        
      });
      tabNative.push(responseNative.data)
      tabGuest.push(responseGuest.data)
      }
      setGuestTab(tabGuest);
      setNativeTab(tabNative);
    

      const guest = await axios.get("http://127.0.0.1:8000/reports/Parking/get_nbGuest_of_the_month", {
        params: {
          month,
        },
      });
      const native = await axios.get("http://127.0.0.1:8000/reports/Parking/get_nbNative_of_month", {
        params: {
          month,
        },
      });
      console.log("datttttttttttta yes")
      setNbGuest(guest.data);
      setNbNative(native.data);

    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  console.log("====================================")
  console.log(nativeTab)
  console.log(guestTab)
  console.log("====================================")

  const { overview, series, ranges } = widgets?.githubIssues;
  console.log("====================================")
  
  console.log(labels)
  console.log(series)
  console.log(ranges)
  console.log("====================================")

  const currentRange = Object.keys(ranges)[tabValue];
  console.log("series changes")
  console.log(series[currentRange])
  const chartOptions = {
    chart: {
      fontFamily: 'inherit',
      foreColor: 'inherit',
      height: '100%',
      type: 'line',
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: false,
      },
    },
    colors: [theme.palette.primary.main, theme.palette.secondary.main],
    labels,
    dataLabels: {
      enabled: true,
      enabledOnSeries: [0],
      background: {
        borderWidth: 0,
      },
    },
    grid: {
      borderColor: theme.palette.divider,
    },
    legend: {
      show: false,
    },
    plotOptions: {
      bar: {
        columnWidth: '50%',
      },
    },
    states: {
      hover: {
        filter: {
          type: 'darken',
          value: 0.75,
        },
      },
    },
    stroke: {
      width: [3, 0],
    },
    tooltip: {
      followCursor: true,
      theme: theme.palette.mode,
    },
    xaxis: {
      axisBorder: {
        show: false,
      },
      axisTicks: {
        color: theme.palette.divider,
      },
      labels: {
        style: {
          colors: theme.palette.text.secondary,
        },
      },
      tooltip: {
        enabled: false,
      },
    },
    yaxis: {
      labels: {
        offsetX: -16,
        style: {
          colors: theme.palette.text.secondary,
        },
      },
    },
  };

  useEffect(() => {
    setAwaitRender(false);
  }, []);

  if (awaitRender) {
    return null;
  }
  console.log(nativeTab)
  console.log(guestTab)
  const serie = [
    {
      "data" : nativeTab,
      "name": "Native",
      "type": "line"

    }, 
    {
      "data" : guestTab,
      "name": "Guest",
      "type": "column"

    }, 
  ]
  return (
    <Paper className="flex flex-col flex-auto p-24 shadow rounded-2xl overflow-hidden">
      <div className="flex flex-col sm:flex-row items-start justify-between">
        <Typography className="text-lg font-medium tracking-tight leading-6 truncate">
        Utilization of Parking Spaces
        </Typography>
        <div className="mt-12 sm:mt-0 sm:ml-8">
          
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 grid-flow-row gap-24 w-full mt-32 sm:mt-16">
        <div className="flex flex-col flex-auto">
          <Typography className="font-medium" color="text.secondary">
            Native vs. Guests
          </Typography>
          <div className="flex flex-col flex-auto">
            <ReactApexChart
              className="flex-auto w-full"
              options={chartOptions}
              series= {serie}
              height={320}
            />
          </div>
        </div>
        <div className="flex flex-col">
          <Typography className="font-medium" color="text.secondary">
            Monthly Overview
          </Typography>
          <div className="flex-auto grid grid-cols-4 gap-16 mt-24">
            <div className="col-span-2 flex flex-col items-center justify-center py-32 px-4 rounded-2xl bg-indigo-50 text-indigo-800">
              <Typography className="text-5xl sm:text-7xl font-semibold leading-none tracking-tight">
                {nbNative}
              </Typography>
              <Typography className="mt-4 text-sm sm:text-lg font-medium">Native</Typography>
            </div>
            <div className="col-span-2 flex flex-col items-center justify-center py-32 px-4 rounded-2xl bg-green-50 text-green-800">
              <Typography className="text-5xl sm:text-7xl font-semibold leading-none tracking-tight">
                {nbGuest}
              </Typography>
              <Typography className="mt-4 text-sm sm:text-lg font-medium">Guests</Typography>
            </div>
          </div>
        </div>
      </div>
    </Paper>
  );
}

export default memo(ParkingChart);
