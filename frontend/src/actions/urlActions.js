// urlActions.js
import axios from "axios";
import { CLEAR_ERRORS, CREATE_URL_FAIL, CREATE_URL_REQUEST, CREATE_URL_SUCCESS, DELETE_URL_FAIL, DELETE_URL_REQUEST, DELETE_URL_SUCCESS, EDIT_URL_FAIL, EDIT_URL_REQUEST, EDIT_URL_SUCCESS, MY_URLS_FAIL, MY_URLS_REQUEST, MY_URLS_SUCCESS } from "../constants/urlConstants";

// Create New URL
export const createUrl = (url) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_URL_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post("/api/v1/url/new", { longUrl: url.longUrl }, config);

    dispatch({ type: CREATE_URL_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: CREATE_URL_FAIL,
      payload: error.response.data.message,
    });
  }
};

// My Urls
export const getUrls = () => async (dispatch) => {
  try {
    dispatch({ type: MY_URLS_REQUEST });

    const { data } = await axios.get("/api/v1/urls/me");
    console.log('Data received:', data);  // Add this line
    dispatch({ type: MY_URLS_SUCCESS, payload: data.userUrls });
  } catch (error) {
    dispatch({
      type: MY_URLS_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const deleteUrl = (shortId) => async (dispatch) => {
    try {
      dispatch({ type: DELETE_URL_REQUEST });
  
      const { data } = await axios.delete(`/api/v1/delete/${shortId}`);
  
      dispatch({ type: DELETE_URL_SUCCESS, payload: data.message });
    } catch (error) {
      dispatch({
        type: DELETE_URL_FAIL,
        payload: error.response.data.message,
      });
    }
};

// Edit URL
export const editUrl = (urlId, newShortId) => async (dispatch) => {
    try {
      dispatch({ type: EDIT_URL_REQUEST });
  
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
  
      const { data } = await axios.put(`/api/v1/edit/${urlId}`, { newShortId }, config);
  
      dispatch({ type: EDIT_URL_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: EDIT_URL_FAIL,
        payload: error.response.data.message,
      });
    }
  };

// Clearing Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
