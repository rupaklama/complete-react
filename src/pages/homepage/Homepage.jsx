// Profiler API - Component to check how much time a component takes to render/mount
import React, { Profiler } from 'react';

import Directory from '../../components/directory/Directory';
import './homepage.styles.scss';

const Homepage = () => {
  // throw Error;

  return (
    <div className='homepage'>
      <Profiler
        id='Directory'
        onRender={(id, phase, actualDuration) => {
          console.log(id, phase, actualDuration);
        }}
      >
        <Directory />
      </Profiler>
    </div>
  );
};

export default Homepage;
