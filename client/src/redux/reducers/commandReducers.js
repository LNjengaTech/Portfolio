//recap: reducers are pure functions that take the current state and an action as arguments and return a new state
//they listen for action types and update the state accordingly 

import {
  COMMAND_LIST_REQUEST,
  COMMAND_LIST_SUCCESS,
  COMMAND_LIST_FAIL,
  COMMAND_DETAILS_REQUEST,
  COMMAND_DETAILS_SUCCESS,
  COMMAND_DETAILS_FAIL,
  COMMAND_CREATE_REQUEST,
  COMMAND_CREATE_SUCCESS,
  COMMAND_CREATE_FAIL,
  COMMAND_CREATE_RESET,
  COMMAND_UPDATE_REQUEST,
  COMMAND_UPDATE_SUCCESS,
  COMMAND_UPDATE_FAIL,
  COMMAND_UPDATE_RESET,
  COMMAND_DELETE_REQUEST,
  COMMAND_DELETE_SUCCESS,
  COMMAND_DELETE_FAIL,
} from '../constants/commandConstants';

export const commandListReducer = (state = { commands: [] }, action) => {
  switch (action.type) {
    case COMMAND_LIST_REQUEST:
      return { loading: true, commands: [] };
    case COMMAND_LIST_SUCCESS:
      return { loading: false, commands: action.payload };
    case COMMAND_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const commandDetailsReducer = (state = { command: {} }, action) => {
  switch (action.type) {
    case COMMAND_DETAILS_REQUEST:
      return { loading: true, ...state };
    case COMMAND_DETAILS_SUCCESS:
      return { loading: false, command: action.payload };
    case COMMAND_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const commandCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case COMMAND_CREATE_REQUEST:
      return { loading: true };
    case COMMAND_CREATE_SUCCESS:
      return { loading: false, success: true, command: action.payload };
    case COMMAND_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case COMMAND_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const commandUpdateReducer = (state = { command: {} }, action) => {
  switch (action.type) {
    case COMMAND_UPDATE_REQUEST:
      return { loading: true };
    case COMMAND_UPDATE_SUCCESS:
      return { loading: false, success: true, command: action.payload };
    case COMMAND_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case COMMAND_UPDATE_RESET:
      return { command: {} };
    default:
      return state;
  }
};

export const commandDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case COMMAND_DELETE_REQUEST:
      return { loading: true };
    case COMMAND_DELETE_SUCCESS:
      return { loading: false, success: true };
    case COMMAND_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
