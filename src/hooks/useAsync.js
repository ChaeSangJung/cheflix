import { useReducer, useEffect } from 'react';

function reducer(state, action) {
  switch (action.type) {
    case 'LOADING':
      return {
        loading: true,
        data: null,
        error: null
      };
    case 'SUCCESS':
      return {
        loading: false,
        data: action.data,
        error: null
      };
    case 'ERROR':
      return {
        loading: false,
        data: null,
        error: action.error
      };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}

function useAsync(callback, deps = [], skip = false) {
  const [state, dispatch] = useReducer(reducer, {
    loading: false,
    data: null,
    error: false
  });

  const fetchData = async (id, param1, param2) => {
    dispatch({ type: 'LOADING' });
    try {
      if(id) {
        const data = await callback(id);
        dispatch({ type: 'SUCCESS', data });
      } else if(id && param1){
        const data = await callback(id, param1);
        dispatch({ type: 'SUCCESS', data });
      } else if(id && param1 && param2){
        const data = await callback(id, param1, param2);
        dispatch({ type: 'SUCCESS', data });
      } else {
        const data = await callback();
        dispatch({ type: 'SUCCESS', data });
      }
    } catch (e) {
      dispatch({ type: 'ERROR', error: e });
    }
  };

  useEffect(() => {
    if (skip) return;
    fetchData();
    // eslint 설정을 다음 줄에서만 비활성화
    // eslint-disable-next-line
  }, deps);

  return [state, fetchData];
}

export default useAsync;