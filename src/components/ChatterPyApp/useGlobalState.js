// @flow
import * as React from 'react';

import ChatterPyContext from './ChatterPyContext';
import type { ChatterPyState } from './ChatterPyDispatch';

/**
 * This connects the global ChatterPyContext to the local state being
 * held by a specific app
 */
export default function useGlobalState<LocalAppState, LocalAppAction>(
  reducer: (LocalAppState, LocalAppAction) => LocalAppState,
  localStateInitializer: ChatterPyState => LocalAppState,
  dependencies: $ReadOnlyArray<$Keys<ChatterPyState>>,
): [LocalAppState, (LocalAppAction) => void, ChatterPyState] {
  const globalState = React.useContext(ChatterPyContext);
  const deps = dependencies.map(k => globalState[k]);

  const [localState, localDispatch] = React.useReducer(
    reducer,
    globalState,
    localStateInitializer,
  );

  // reset the local state whenever the initArgs have changed
  React.useEffect(() => {
    // $FlowExpectedError[incompatible-call] we'll allow it
    localDispatch({
      globalState,
      type: 'STATE_RESET',
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return [localState, localDispatch, globalState];
}
