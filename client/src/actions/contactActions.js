import axios from 'axios';
import {
  GET_CONTACTS,
  ADD_CONTACT,
  DELETE_CONTACT,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_CONTACT,
  FILTER_CONTACTS,
  CLEAR_CONTACTS,
  CLEAR_FILTER,
  CONTACT_ERROR,
  CLEAR_ERRORS,
  SET_LOADING,
} from './types';

export const getContacts = () => async (dispatch) => {
  setLoading();
  const res = await axios.get('/api/contacts');
  dispatch({
    type: GET_CONTACTS,
    payload: res.data,
  });
};

export const addContact = (contact) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    setLoading();

    const res = await axios.post('/api/contacts', contact, config);

    dispatch({
      type: ADD_CONTACT,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: CONTACT_ERROR,
      payload: err.response.data,
    });
  }
};

export const deleteContact = (id) => async (dispatch) => {
  try {
    setLoading();

    await axios.delete(`/api/contacts/${id}`);

    dispatch({
      type: DELETE_CONTACT,
      payload: id,
    });
  } catch (err) {
    dispatch({
      type: CONTACT_ERROR,
      payload: err.response.data.msg,
    });
  }
};

export const setCurrent = (contact) => async (dispatch) => {
  dispatch({
    type: SET_CURRENT,
    payload: contact,
  });
};

export const updateContact = (contact) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    setLoading();

    const res = await axios.put(
      `/api/contacts/${contact._id}`,
      contact,
      config
    );

    dispatch({
      type: UPDATE_CONTACT,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: CONTACT_ERROR,
      payload: err.response.data,
    });
  }
};

export const filterContacts = (text) => async (dispatch) => {
  dispatch({
    type: FILTER_CONTACTS,
    payload: text,
  });
};

export const clearFilter = () => {
  return {
    type: CLEAR_FILTER,
  };
};

export const clearCurrent = () => {
  return {
    type: CLEAR_CURRENT,
  };
};

export const clearContacts = () => {
  return {
    type: CLEAR_CONTACTS,
  };
};

export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS,
  };
};

export const setLoading = () => {
  return {
    type: SET_LOADING,
  };
};
