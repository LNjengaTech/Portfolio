//All my the command-related actions
import api from '../../api/api'; //Where i have set up axios instance with interceptors
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
  COMMAND_UPDATE_REQUEST,
  COMMAND_UPDATE_SUCCESS,
  COMMAND_UPDATE_FAIL,
  COMMAND_DELETE_REQUEST,
  COMMAND_DELETE_SUCCESS,
  COMMAND_DELETE_FAIL,
} from '../constants/commandConstants';

//This is my action to list all commands that will be dispatched(to the reduce) when i want to pass all cmds from backend to frntend
export const listCommands = () => async (dispatch) => {
  try {
    dispatch({ type: COMMAND_LIST_REQUEST });

    const { data } = await api.get('/commands');

    dispatch({ type: COMMAND_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: COMMAND_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getCommandDetails = (name) => async (dispatch) => {
  try {
    dispatch({ type: COMMAND_DETAILS_REQUEST });

    const { data } = await api.get(`/commands/${name}`);

    dispatch({ type: COMMAND_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: COMMAND_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const createCommand = (commandData) => async (dispatch) => {
  try {
    dispatch({ type: COMMAND_CREATE_REQUEST });

    const { data } = await api.post('/commands', commandData);

    dispatch({ type: COMMAND_CREATE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: COMMAND_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateCommand = (id, commandData) => async (dispatch) => {
  try {
    dispatch({ type: COMMAND_UPDATE_REQUEST });

    const { data } = await api.put(`/commands/${id}`, commandData);

    dispatch({ type: COMMAND_UPDATE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: COMMAND_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteCommand = (id) => async (dispatch) => {
  try {
    dispatch({ type: COMMAND_DELETE_REQUEST });

    await api.delete(`/commands/${id}`);

    dispatch({ type: COMMAND_DELETE_SUCCESS });
  } catch (error) {
    dispatch({
      type: COMMAND_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};