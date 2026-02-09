import {createActionGroup, emptyProps} from "@ngrx/store";

export const AppActions = createActionGroup({
  source: 'App',
  events: {
    // placeholder to prove wiring works
    'Init': emptyProps(),
  },
});