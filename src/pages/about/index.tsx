import { motion } from 'framer-motion';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { durationPage } from '~/config';
import { SET_ACTIVE_PAGE } from '~/store/types';

export default function About() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: SET_ACTIVE_PAGE, payload: 2 });
  }, []);
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
