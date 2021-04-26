import { motion } from 'framer-motion';

import { durationPage } from '~/config';

interface Props {
  children: JSX.Element[] | JSX.Element;
  id?: string;
}

export default function Animation({ children, id }: Props) {
  return (
    <motion.div
      layoutId={id}
      exit={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      transition={{ duration: durationPage }}
    >
      {children}
    </motion.div>
  );
}
