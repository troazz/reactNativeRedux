const URL = 'http://mikka.web.id/ads.json';

export const FETCH_DATA_START = 'FETCH_DATA_START';
export const FETCH_DATA_STOP  = 'FETCH_DATA_STOP';
export const SET_RESULT       = 'SET_RESULT';
export const SET_RESULT_MORE  = 'SET_RESULT_MORE';
export const FETCH_FAILED     = 'FETCH_FAILED';

export function getData(page) {
  return (dispatch, getState) => {
    dispatch({type: FETCH_DATA_START});
    fetch(URL)
    .then((response) => response.json())
    .then((data) => {
      dispatch({type: FETCH_DATA_STOP});
      if (page === undefined) {
        dispatch({type: SET_RESULT, data});
      } else {
        dispatch({type: SET_RESULT_MORE, data});
      }
    })
    .catch((error) => {
      dispatch({type: FETCH_DATA_STOP});
      dispatch({type: FETCH_FAILED});
      console.error(error);
    });
  };
}
