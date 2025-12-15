import api from '../../api/api';
import {
  PROJECT_LIST_REQUEST,
  PROJECT_LIST_SUCCESS,
  PROJECT_LIST_FAIL,
  PROJECT_DETAILS_REQUEST,
  PROJECT_DETAILS_SUCCESS,
  PROJECT_DETAILS_FAIL,
  PROJECT_CREATE_REQUEST,
  PROJECT_CREATE_SUCCESS,
  PROJECT_CREATE_FAIL,
  PROJECT_UPDATE_REQUEST,
  PROJECT_UPDATE_SUCCESS,
  PROJECT_UPDATE_FAIL,
  PROJECT_DELETE_REQUEST,
  PROJECT_DELETE_SUCCESS,
  PROJECT_DELETE_FAIL,
  PROJECT_IMAGE_UPLOAD_REQUEST,
  PROJECT_IMAGE_UPLOAD_SUCCESS,
  PROJECT_IMAGE_UPLOAD_FAIL,
} from '../constants/projectConstants';

export const listProjects = () => async (dispatch) => {
  try {
    dispatch({ type: PROJECT_LIST_REQUEST });

    const { data } = await api.get('/projects');

    dispatch({ type: PROJECT_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: PROJECT_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getProjectDetails = (command) => async (dispatch) => {
  try {
    dispatch({ type: PROJECT_DETAILS_REQUEST });

    const { data } = await api.get(`/projects/${command}`);

    dispatch({ type: PROJECT_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: PROJECT_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const createProject = (projectData) => async (dispatch) => {
  try {
    dispatch({ type: PROJECT_CREATE_REQUEST });

    const { data } = await api.post('/projects', projectData);

    dispatch({ type: PROJECT_CREATE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: PROJECT_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateProject = (id, projectData) => async (dispatch) => {
  try {
    dispatch({ type: PROJECT_UPDATE_REQUEST });

    const { data } = await api.put(`/projects/${id}`, projectData);

    dispatch({ type: PROJECT_UPDATE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: PROJECT_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteProject = (id) => async (dispatch) => {
  try {
    dispatch({ type: PROJECT_DELETE_REQUEST });

    await api.delete(`/projects/${id}`);

    dispatch({ type: PROJECT_DELETE_SUCCESS });
  } catch (error) {
    dispatch({
      type: PROJECT_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};


//new - image upload action
export const uploadProjectImage = (imageFile) => async (dispatch) => {
  try {
    dispatch({ type: PROJECT_IMAGE_UPLOAD_REQUEST });

    const formData = new FormData();
    formData.append('image', imageFile);

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };

    const { data } = await api.post('/projects/upload', formData, config);

    dispatch({ type: PROJECT_IMAGE_UPLOAD_SUCCESS, payload: data.imageUrl });
    
    return data.imageUrl;
  } catch (error) {
    dispatch({
      type: PROJECT_IMAGE_UPLOAD_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
    throw error;
  }
};