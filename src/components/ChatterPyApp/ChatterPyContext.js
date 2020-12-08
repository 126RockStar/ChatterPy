// @flow
import * as React from 'react';

import { INITIAL_STATE } from './ChatterPyDispatch';
import type { ChatterPyState } from './ChatterPyDispatch';

export default (React.createContext(
  INITIAL_STATE,
): React.Context<ChatterPyState>);
