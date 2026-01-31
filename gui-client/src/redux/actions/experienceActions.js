import api from '../../api/api';
import {
  EXPERIENCE_LIST_REQUEST, EXPERIENCE_LIST_SUCCESS, EXPERIENCE_LIST_FAIL,
  EXPERIENCE_CREATE_REQUEST, EXPERIENCE_CREATE_SUCCESS, EXPERIENCE_CREATE_FAIL,
  EXPERIENCE_UPDATE_REQUEST, EXPERIENCE_UPDATE_SUCCESS, EXPERIENCE_UPDATE_FAIL,
  EXPERIENCE_DELETE_REQUEST, EXPERIENCE_DELETE_SUCCESS, EXPERIENCE_DELETE_FAIL
} from '../constants/experienceConstants';

export const listExperiences = () => async (dispatch) => {
  try {
    dispatch({ type: EXPERIENCE_LIST_REQUEST });
    const { data } = await api.get('/experiences');
    dispatch({ type: EXPERIENCE_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: EXPERIENCE_LIST_FAIL, payload: error.response?.data.message || error.message });
  }
};

export const createExperience = (experience) => async (dispatch, getState) => {
  try {
    dispatch({ type: EXPERIENCE_CREATE_REQUEST });
    const { userLogin: { userInfo } } = getState();
    const config = { headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${userInfo.token}` } };
    const { data } = await api.post('/experience', experience, config);
    dispatch({ type: EXPERIENCE_CREATE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: EXPERIENCE_CREATE_FAIL, payload: error.response?.data.message || error.message });
  }
};

// Similar for updateExperience and deleteExperience (copy pattern from projectActions)
export const updateExperience = (id, experience) => async (dispatch, getState) => {
  try {
    dispatch({ type: EXPERIENCE_UPDATE_REQUEST });
    const { userLogin: { userInfo } } = getState();
    const config = { headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${userInfo.token}` } };
    const { data } = await api.put(`/experience/${id}`, experience, config);
    dispatch({ type: EXPERIENCE_UPDATE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: EXPERIENCE_UPDATE_FAIL, payload: error.response?.data.message || error.message });
  }
};

export const deleteExperience = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: EXPERIENCE_DELETE_REQUEST });
    const { userLogin: { userInfo } } = getState();
    const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
    await api.delete(`/experience/${id}`, config);
    dispatch({ type: EXPERIENCE_DELETE_SUCCESS });
  } catch (error) {
    dispatch({ type: EXPERIENCE_DELETE_FAIL, payload: error.response?.data.message || error.message });
  }
};