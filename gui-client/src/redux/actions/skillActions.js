import api from '../../api/api';
import {
  SKILL_LIST_REQUEST, SKILL_LIST_SUCCESS, SKILL_LIST_FAIL,
  SKILL_CREATE_REQUEST, SKILL_CREATE_SUCCESS, SKILL_CREATE_FAIL,
  SKILL_UPDATE_REQUEST, SKILL_UPDATE_SUCCESS, SKILL_UPDATE_FAIL,
  SKILL_DELETE_REQUEST, SKILL_DELETE_SUCCESS, SKILL_DELETE_FAIL
} from '../constants/skillConstants';

export const listSkills = () => async (dispatch) => {
  try {
    dispatch({ type: SKILL_LIST_REQUEST });
    const { data } = await api.get('/skills');
    dispatch({ type: SKILL_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: SKILL_LIST_FAIL, payload: error.response?.data.message || error.message });
  }
};

export const createSkill = (skill) => async (dispatch, getState) => {
  try {
    dispatch({ type: SKILL_CREATE_REQUEST });
    const { userLogin: { userInfo } } = getState();
    const config = { headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${userInfo.token}` } };
    const { data } = await api.post('/skills', skill, config);
    dispatch({ type: SKILL_CREATE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: SKILL_CREATE_FAIL, payload: error.response?.data.message || error.message });
  }
};

// Similar for updateSkill and deleteSkill (copy pattern from projectActions)
export const updateSkill = (id, skill) => async (dispatch, getState) => {
  try {
    dispatch({ type: SKILL_UPDATE_REQUEST });
    const { userLogin: { userInfo } } = getState();
    const config = { headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${userInfo.token}` } };
    const { data } = await api.put(`/skills/${id}`, skill, config);
    dispatch({ type: SKILL_UPDATE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: SKILL_UPDATE_FAIL, payload: error.response?.data.message || error.message });
  }
};

export const deleteSkill = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: SKILL_DELETE_REQUEST });
    const { userLogin: { userInfo } } = getState();
    const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
    await api.delete(`/skills/${id}`, config);
    dispatch({ type: SKILL_DELETE_SUCCESS });
  } catch (error) {
    dispatch({ type: SKILL_DELETE_FAIL, payload: error.response?.data.message || error.message });
  }
};