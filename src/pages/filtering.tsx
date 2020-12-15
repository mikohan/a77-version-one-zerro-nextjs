import React from 'react';
import './App.css';
import useLanguages from '~/hooks/languagesHook';

const Filtering: React.FC = () => {
  const languages = useLanguages();
  return (
    <div className="main">
      <h2 className="text-center uppercase">Programming Languages</h2>
      {languages.slice(0, 10).map((l) => (
        <p className="text-center" key={l.id}>
          {l.name}
        </p>
      ))}
    </div>
  );
};
export default Filtering;
