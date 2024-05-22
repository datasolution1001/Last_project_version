import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import Typography from '@mui/material/Typography';
import themesConfig from "../../../configs/themesConfig";
import { InputLabel } from '@mui/material';
import Button from '@mui/material/Button';
import ParkingListItem from './ParkingListItem';
import { selectFilteredContacts , selectSortedContacts} from './store/ParkingSlice';




function ParkingList(props) {
  const filteredData = useSelector(selectFilteredContacts);
  const SortedContacts = useSelector(selectSortedContacts);
      // Define the number of items per page
      const itemsPerPage = 10;

      // State to keep track of the current page
      const [currentPage, setCurrentPage] = useState(1);
  if (!filteredData) {
    return null;
  }

  if (filteredData.length === 0) {
    return (
      <div className="flex flex-1 items-center justify-center h-full">
        <Typography color="text.secondary" variant="h5">
          There are no Parking History!
        </Typography>
      </div>
    );
  }

      // Calculate the index range for the current page
      const startIndex = (currentPage - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
  
      // Slice the sorted contacts array for the current page
      const paginatedContacts = SortedContacts.slice(startIndex, endIndex);
  
      // Handle page change
      const handlePageChange = (newPage) => {
          setCurrentPage(newPage);
      };
  

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1, transition: { delay: 0.2 } }}
      className="flex flex-col flex-auto w-full max-h-full px-52 mb-56"
      >
          <section className=" w-full rounded-lg shadow-lg mt-56 mb-10">
              <table className="w-full table-fixed border-collapse">
          <thead className='table-fixed'>
            <tr>
            <th className='sticky top-0 bg-gray-200 text-gray-700 text-center text-base w-[5%] py-[2rem]'> N° </th>
            <th className="sticky top-0 bg-gray-200 text-gray-700 text-center text-base px-8 ">FullName</th>
            <th className="sticky top-0 bg-gray-200 text-gray-700 text-center text-base px-8 ">Method</th>
            <th className="sticky top-0 bg-gray-200 text-gray-700 text-center text-base px-8 ">Time</th>
            <th  className="sticky top-0 bg-gray-200 text-gray-700 text-center text-base px-8 ">Action</th>
            <th  className="sticky top-0 bg-gray-200 text-gray-700 text-center text-base px-8 ">Image Camera</th>
          </tr></thead>
          <tbody style={{backgroundColor : themesConfig.default.palette.background.paper}}>
          

          {paginatedContacts.map((item,index) => {
        return (

      
          
            <tr key={index} className=" m-0 p-0">
             
                <ParkingListItem key={index} contact={item} ki=	 {index} />
             
            </tr>
       
        );
      })}
          </tbody>
      </table>
      </section>

       {/* Pagination controls */}
       <div className="flex justify-end pb-48">
                {/* Previous button */}
                <Button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="mx-2 my-4"
                    color="primary"
                    variant="contained"
                >
                    Previous
                </Button>
                
                {/* Page display */}
                <InputLabel className="mx-2 justify-center m-14">
                    Page {currentPage}
                </InputLabel>
                
                {/* Next button */}
                <Button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={endIndex >= SortedContacts.length}
                    className="mx-2 my-4"
                    color="secondary"
                    variant="contained"
                >
                    Next
                </Button>
            </div>
      
    </motion.div>
  );
}

export default ParkingList;
s