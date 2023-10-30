import React from 'react';
import { getVersionString } from '@/utils/version';

function ShowVersion() {
  return (
    <div>
      <div className="version">
        {getVersionString()}
      </div>
    </div>
  )
}

export default ShowVersion;
