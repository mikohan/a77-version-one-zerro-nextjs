import { motion } from 'framer-motion';

import { durationPage } from '~/config';

interface Props {
  children: JSX.Element[] | JSX.Element;
}

export default function Animation({ children }: Props) {
  return (
    <motion.div
      exit={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      transition={{ duration: durationPage }}
    >
      {children}
    </motion.div>
  );
}
