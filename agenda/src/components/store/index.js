import { createStore, combineReducers} from "redux";

import person from "../reducers/person";

const reducers = combineReducers({ person });

const store = createStore(
    reducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
