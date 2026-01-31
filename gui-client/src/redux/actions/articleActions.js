import axios from 'axios';
import {
  ARTICLE_LIST_REQUEST, ARTICLE_LIST_SUCCESS, ARTICLE_LIST_FAIL,
  ARTICLE_LIST_ALL_REQUEST, ARTICLE_LIST_ALL_SUCCESS, ARTICLE_LIST_ALL_FAIL,
  ARTICLE_DETAILS_REQUEST, ARTICLE_DETAILS_SUCCESS, ARTICLE_DETAILS_FAIL,
  ARTICLE_CREATE_REQUEST, ARTICLE_CREATE_SUCCESS, ARTICLE_CREATE_FAIL,
  ARTICLE_UPDATE_REQUEST, ARTICLE_UPDATE_SUCCESS, ARTICLE_UPDATE_FAIL,
  ARTICLE_DELETE_REQUEST, ARTICLE_DELETE_SUCCESS, ARTICLE_DELETE_FAIL
} from '../constants/articleConstants';

//public
export const listArticles= () => async (dispatch) => {
  try {
    dispatch({ type: ARTICLE_LIST_REQUEST });
    const { data } = await axios.get('/api/articles');
    dispatch({ type: ARTICLE_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: ARTICLE_LIST_FAIL, payload: error.response?.data.message || error.message });
  }
};

//admin
export const listAllArticles = () => async (dispatch, getState) => {
  try {
    dispatch({ type: ARTICLE_LIST_ALL_REQUEST });
    const { userLogin: { userInfo } } = getState();
    const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
    const { data } = await axios.get('/api/articles/all', config);
    dispatch({ type: ARTICLE_LIST_ALL_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: ARTICLE_LIST_ALL_FAIL, payload: error.response?.data.message || error.message });
  }
};

export const getArticleBySlug = (slug) => async (dispatch) => {
  try {
    dispatch({ type: ARTICLE_DETAILS_REQUEST });
    const { data } = await axios.get(`/api/articles/${slug}`);
    dispatch({ type: ARTICLE_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: ARTICLE_DETAILS_FAIL, payload: error.response?.data.message || error.message });
  }
};
//

export const createArticle = (article) => async (dispatch, getState) => {
  try {
    dispatch({ type: ARTICLE_CREATE_REQUEST });
    const { userLogin: { userInfo } } = getState();
    const config = { headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${userInfo.token}` } };
    const { data } = await axios.post('/api/articles', article, config);
    dispatch({ type: ARTICLE_CREATE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: ARTICLE_CREATE_FAIL, payload: error.response?.data.message || error.message });
  }
};

// Similar for updateArticle and deleteArticle (copy pattern from projectActions)
export const updateArticle = (id, article) => async (dispatch, getState) => {
  try {
    dispatch({ type: ARTICLE_UPDATE_REQUEST });
    const { userLogin: { userInfo } } = getState();
    const config = { headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${userInfo.token}` } };
    const { data } = await axios.put(`/api/articles/${id}`, article, config);
    dispatch({ type: ARTICLE_UPDATE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: ARTICLE_UPDATE_FAIL, payload: error.response?.data.message || error.message });
  }
};

export const deleteArticle = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: ARTICLE_DELETE_REQUEST });
    const { userLogin: { userInfo } } = getState();
    const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
    await axios.delete(`/api/articles/${id}`, config);
    dispatch({ type: ARTICLE_DELETE_SUCCESS });
  } catch (error) {
    dispatch({ type: ARTICLE_DELETE_FAIL, payload: error.response?.data.message || error.message });
  }
};