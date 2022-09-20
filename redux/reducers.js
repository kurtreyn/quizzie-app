import { combineReducers } from 'redux';
import {
  SET_CURRENT_USER,
  SET_TOKEN,
  SET_GROUPS,
  SET_LOADING,
  SET_GROUP_NAME,
  SET_HAS_GROUP_NAME,
  SET_FINAL_RESULTS,
  SET_FINAL_SCORE,
  SET_ACTIVE_GROUP,
  SET_POINTS_POSSIBLE,
  SET_QUIZ_RESET,
} from './actions';

const initialState = {
  groups: null,
  group_name: '',
  current_user: null,
  token: '',
  loading: false,
  has_group_name: false,
  final_results: null,
  final_score: null,
  points_possible: null,
  active_group: null,
  quiz_reset: false,
};

const Reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_GROUPS:
      return { ...state, groups: action.payload };
    case SET_GROUP_NAME:
      return { ...state, group_name: action.payload };
    case SET_ACTIVE_GROUP:
      return { ...state, active_group: action.payload };
    case SET_HAS_GROUP_NAME:
      return { ...state, has_group_name: action.payload };
    case SET_CURRENT_USER:
      return { ...state, current_user: action.payload };
    case SET_TOKEN:
      return { ...state, token: action.payload };
    case SET_QUIZ_RESET:
      return { ...state, quiz_reset: action.payload };
    case SET_FINAL_RESULTS:
      return { ...state, final_results: action.payload };
    case SET_FINAL_SCORE:
      return { ...state, final_score: action.payload };
    case SET_POINTS_POSSIBLE:
      return { ...state, points_possible: action.payload };
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  Reducer,
});

export default rootReducer;
