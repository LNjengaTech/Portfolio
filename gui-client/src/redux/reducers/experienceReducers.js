import {
  EXPERIENCE_LIST_REQUEST, EXPERIENCE_LIST_SUCCESS, EXPERIENCE_LIST_FAIL,
  EXPERIENCE_CREATE_REQUEST, EXPERIENCE_CREATE_SUCCESS, EXPERIENCE_CREATE_FAIL, EXPERIENCE_CREATE_RESET,
  EXPERIENCE_UPDATE_REQUEST, EXPERIENCE_UPDATE_SUCCESS, EXPERIENCE_UPDATE_FAIL, EXPERIENCE_UPDATE_RESET,
  EXPERIENCE_DELETE_REQUEST, EXPERIENCE_DELETE_SUCCESS, EXPERIENCE_DELETE_FAIL
} from '../constants/experienceConstants';

export const experienceListReducer = (state = { experiences: [] }, action) => {
  switch (action.type) {
    case EXPERIENCE_LIST_REQUEST:
      return { loading: true, experiences: [] };
    case EXPERIENCE_LIST_SUCCESS:
      return { loading: false, experiences: action.payload };
    case EXPERIENCE_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

// Similar reducers for create, update, delete (copy from projectReducers)
export const experienceCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case EXPERIENCE_CREATE_REQUEST:
      return { loading: true };
    case EXPERIENCE_CREATE_SUCCESS:
      return { loading: false, success: true, experience: action.payload };
    case EXPERIENCE_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case EXPERIENCE_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const experienceUpdateReducer = (state = { experience: {} }, action) => {
  switch (action.type) {
    case EXPERIENCE_UPDATE_REQUEST:
      return { loading: true };
    case EXPERIENCE_UPDATE_SUCCESS:
      return { loading: false, success: true, experience: action.payload };
    case EXPERIENCE_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case EXPERIENCE_UPDATE_RESET:
      return { experience: {} };
    default:
      return state;
  }
};

export const experienceDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case EXPERIENCE_DELETE_REQUEST:
      return { loading: true };
    case EXPERIENCE_DELETE_SUCCESS:
      return { loading: false, success: true };
    case EXPERIENCE_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};