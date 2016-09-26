import * as actions from '../actions/appActions';

const initialState = {
  result: {
    data: {},
    message: '',
    pagination: {
        page_count: null,
        current_page: null,
        has_next_page: false,
        has_prev_page: false,
        count: null,
        limit: null
    }
  },
  proccessing: true
};

export default function app(state = initialState, action = {}) {
  switch (action.type) {
    case actions.SET_RESULT:
      return {
        ...state,
        message: '',
        result: action.data
      };
    case actions.FETCH_DATA_START:
      return {
        ...state,
        proccessing: true
      };
    case actions.FETCH_DATA_STOP:
      return {
        ...state,
        proccessing: false
      };
    case actions.FETCH_FAILED:
      return {
        ...state,
        message: 'Failed to fetch data',
        proccessing: false
      };
    default:
      return state;
  }
}
