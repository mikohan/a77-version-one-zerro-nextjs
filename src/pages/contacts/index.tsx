import { motion } from 'framer-motion';
import { durationPage } from '~/config';

export default function Contacts() {
  return (
    <motion.div
      exit={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      transition={{ duration: durationPage }}
    >
      <h1>Contacts Page</h1>;
    </motion.div>
  );
}