import { motion } from 'framer-motion';
import { durationPage } from '~/config';

export default function About() {
  return (
    <motion.div
      exit={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      transition={{ duration: durationPage }}
    >
      <h1>About Page</h1>;
    </motion.div>
  );
}
