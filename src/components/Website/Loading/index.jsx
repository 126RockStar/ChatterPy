import * as React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

import './loading.scss';

const Loading = () => (
  <div className="loading-shading-mui">
    <CircularProgress className="loading-icon-mui" />
  </div>
);
export default Loading