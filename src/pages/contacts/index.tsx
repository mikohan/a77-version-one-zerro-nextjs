import { useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import { durationPage } from '~/config';
import { SET_ACTIVE_PAGE } from '~/store/types';
import { useEffect } from 'react';

export default function Contacts() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: SET_ACTIVE_PAGE, payload: 3 });
  }, []);
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
