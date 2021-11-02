import { v4 as uuidv4 } from 'uuid';
import { SET_ALERT, REMOVE_ALERT } from './types';
import store from '../store';

export const setAlert =
  (msg, type, timeout = 3000) =>
  async (dispatch) => {
    const id = uuidv4();
    if (store.getState().alert < 1) {
      dispatch({
        type: SET_ALERT,
        payload: { msg, type, id },
      });
    }

    setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id }), timeout);
  };
