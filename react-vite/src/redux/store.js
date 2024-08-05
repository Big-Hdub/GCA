import { legacy_createStore as createStore, applyMiddleware, compose, combineReducers } from "redux";
import accountsReducer from "./account";
import sessionReducer from "./session";
import coursesReducer from "./course";
import lessonsReducer from "./lesson";
import gradesReducer from "./grade";
import dashReducer from "./dash";
import thunk from "redux-thunk";

const rootReducer = combineReducers({
  account: accountsReducer,
  lessons: lessonsReducer,
  session: sessionReducer,
  courses: coursesReducer,
  grades: gradesReducer,
  dash: dashReducer,
});

let enhancer;
if (import.meta.env.MODE === "production") {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = (await import("redux-logger")).default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
