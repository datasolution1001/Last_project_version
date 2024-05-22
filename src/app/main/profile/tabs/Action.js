import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import AdminListItem from './AdminListItem';
import Box from '@mui/material/Box';

// Importing Pagination from Material-UI
// import Pagination from '@mui/material/Pagination';

import { selectFilteredContacts , selectSortedContacts} from '../store/ProfielSlice';
import { Pagination } from '@mui/material';

function TimelineTab(props) {
  const filteredData = useSelector(selectFilteredContacts);
  const sortedContacts = useSelector(selectSortedContacts);

  // useEffect(() => {
  //   axios.get('/api/profile/timeline').then((res) => {
  //     setData(res.data);
  //   });
  // }, []);

  // if (!data) {
  //   return null;
  // }


    // Define the number of items per page
    const itemsPerPage = 6;
    const NbPage = Math.ceil(filteredData.length / itemsPerPage);

    // State to keep track of the current page
    const [currentPage, setCurrentPage] = useState(1);
  if (!filteredData) {
    return null;
  }
 

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



  
    // Calculate the index range for the current page
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    // Slice the sorted contacts array for the current page
    const paginatedContacts = sortedContacts.slice(startIndex, endIndex);

    // Handle page change
    const handlePageChange = (event, newPage) => {
        setCurrentPage(newPage);
    };

    
    if (filteredData.length === 0) {
      return (
        <Card component={motion.div} variants={item} className="w-full h-fit">
            <div className="px-32 pt-24 flex flex-col justify-between items-center md:flex-row">
              <Typography className="text-2xl font-semibold mt-3">
                Activities
              </Typography></div>
          <div className="flex flex-1 items-center justify-center h-full px-32 pt-24 pb-36">
              <Typography color="text.secondary" variant="h5">
                  There are no Admin History!
              </Typography>
          </div>
          
          </Card>
       
      );
  }



  return (
    <motion.div variants={container} initial="hidden" animate="show" className="w-full">
      <div className="md:flex">
        <div className="flex flex-col flex-1 md:ltr:pr-32 md:rtl:pl-32">
        <Card component={motion.div} variants={item} className="w-full overflow-auto">
            <div className="px-32 pt-24 flex flex-col justify-between items-center md:flex-row">
              <Typography className="text-2xl font-semibold mt-3">
                Activities
              </Typography>
              <Box className="flex items-center mt-16 mb-24">
                <Pagination 
                className="mt-16"
                page={currentPage}
                count={NbPage}
                onChange={handlePageChange}
                siblingCount={0} // Show 0 sibling pages around the current page
                boundaryCount={1} 
              />
              </Box>
              
            </div>

            <CardContent className="px-32 pt-24">
              

              <div className="mb-24">
                
          {paginatedContacts.map((item,index) => {
             return (

      
          
            <tr key={index} className=" m-0 p-0">
             
                <AdminListItem key={index} admin={item} ki=	 {index} />
             
            </tr>
);
})}
                </div>
            
            </CardContent>
          </Card>
        </div>

       
      </div>
    </motion.div>
  );
}

export default TimelineTab;
