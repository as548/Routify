// urlReducer.js
import { CLEAR_ERRORS, CREATE_URL_FAIL, CREATE_URL_REQUEST, CREATE_URL_SUCCESS, DELETE_URL_FAIL, DELETE_URL_REQUEST, DELETE_URL_SUCCESS, EDIT_URL_FAIL, EDIT_URL_REQUEST, EDIT_URL_RESET, EDIT_URL_SUCCESS, MY_URLS_FAIL, MY_URLS_REQUEST, MY_URLS_SUCCESS } from "../constants/urlConstants";

export const newUrlReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_URL_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case CREATE_URL_SUCCESS:
      return {
        loading: false,
        url: action.payload.url,
      };

    case CREATE_URL_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

const initialState = {
    userUrls: [],
    loading: false,
    error: null,
  };
export const myUrlsReducer = (state = initialState, action) => {
    switch (action.type) {
      case MY_URLS_REQUEST:
      case DELETE_URL_REQUEST:
        return {
          loading: true,
        };
  
      case MY_URLS_SUCCESS:
    
        return {
          loading: false,
          userUrls: action.payload,
        };
      case DELETE_URL_SUCCESS:
        return {
            loading: false,
            success: true,
            message: action.payload,
        };
      case MY_URLS_FAIL:
      case DELETE_URL_FAIL:
        return {
          loading: false,
          error: action.payload,
        };
      case CLEAR_ERRORS:
        return {
          ...state,
          error: null,
        };
  
      default:
        return state;
    }
  };

  export const deleteUrlReducer = (state = {}, action) => {
    switch (action.type) {
      case DELETE_URL_REQUEST:
        return {
          loading: true,
        };
  
      case DELETE_URL_SUCCESS:
        return {
          loading: false,
          success: true,
          message: action.payload,
        };
  
      case DELETE_URL_FAIL:
        return {
          loading: false,
          error: action.payload,
        };
  
      case CLEAR_ERRORS:
        return {
          ...state,
          error: null,
        };
  
      default:
        return state;
    }
  };
  export const editUrlReducer = (state = {}, action) => {
    switch (action.type) {
      case EDIT_URL_REQUEST:
        return {
          loading: true,
        };
  
      case EDIT_URL_SUCCESS:
        return {
          loading: false,
          success: true,
          url: action.payload.data,
        };
  
      case EDIT_URL_FAIL:
        return {
          loading: false,
          error: action.payload,
        };
    case EDIT_URL_RESET:
        return{
            ...state,
            success:false
        }
      case CLEAR_ERRORS:
        return {
          ...state,
          error: null,
        };
      
      default:
        return state;
    }
  };
  
