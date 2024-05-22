import { motion } from 'framer-motion';
import ParkingCapacityAvailable from './widgets/ParkingCapacityAvailable';
import ParkingCapacityOccupied from './widgets/ParkingCapacityOccupied';
import ParkingAllocationGests from './widgets/ParkingAllocationGests';
import ParkingAllocationNative from './widgets/ParkingAllocationNative';
import ParkingChart from './widgets/ParkingChart';


function HomeTab() {
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

  return (
    <motion.div
      className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-24 w-full min-w-0 p-24"
      variants={container}
      initial="hidden"
      animate="show"
    >
      <motion.div variants={item}>
        <ParkingCapacityAvailable />
      </motion.div>
      <motion.div variants={item}>
        <ParkingCapacityOccupied />
      </motion.div>
      <motion.div variants={item}>
        <ParkingAllocationGests/>
      </motion.div>
      <motion.div variants={item}>
        <ParkingAllocationNative />
      </motion.div>
      <motion.div variants={item} className="sm:col-span-2 md:col-span-4">
        <ParkingChart />
      </motion.div>
    </motion.div>
  );
}

export default HomeTab;
