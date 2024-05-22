import Typography from '@mui/material/Typography';
import { motion } from 'framer-motion';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getBoards, resetBoards, selectBoards } from '../store/boardsSlice';
import BoardItem from './BoardItem';
import NewBoardItem from './NewBoardItem';

function Boards(props) {
  const dispatch = useDispatch();
  const boards = useSelector(selectBoards);

  useEffect(() => {
    dispatch(getBoards());
    return () => {
      dispatch(resetBoards());
    };
  }, [dispatch]);

  const container = {
    show: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };
  if (!boards) {
    return null;
  }

  

  return (
    <div className="flex grow shrink-0 flex-col items-center container p-24 sm:p-40 relative w-full">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { delay: 0.1 } }}>
        <Typography className="mt-16 md:mt-96 text-3xl md:text-6xl font-extrabold tracking-tight leading-7 sm:leading-10 text-center">
          Parking Users Requests
        </Typography>
      </motion.div>

      {boards.length === 0 ? 
      <div className="flex flex-1 self-center mt-[160px] h-full">
      <Typography color="text.secondary" variant="h5">
          There are no User Requests!
      </Typography>
      </div> :
      <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-16 mt-32 md:mt-64"
    >
      
    {boards.map((board) => (
      <motion.div variants={item} className="min-w-[250px]  mb-[38px]" key={board.id}>
         
        <BoardItem board={board} key={board.id} />
      </motion.div>
    ))}
      </motion.div>




      }
      
        

        
      
    </div>
  );
}

export default Boards;
