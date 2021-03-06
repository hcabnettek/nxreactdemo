/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef, useReducer } from 'react';

interface InitialState {
  status: string;
  error: any;
  data: any;
}

type Action =
  | { type: 'FETCHING' }
  | { type: 'FETCHED'; payload: any }
  | { type: 'FETCH_ERROR'; payload?: any };

export const useFetch = (url: string) => {
  const cache = useRef<Record<string, unknown>>({});

  const initialState: InitialState = {
    status: 'idle',
    error: null,
    data: {},
  };

  const [state, dispatch] = useReducer(
    (state: InitialState, action: Action): InitialState => {
      switch (action.type) {
        case 'FETCHING':
          return { ...initialState, status: 'fetching' };
        case 'FETCHED':
          return { ...initialState, status: 'fetched', data: action.payload };
        case 'FETCH_ERROR':
          return { ...initialState, status: 'error', error: action.payload };
        default:
          return state;
      }
    },
    initialState
  );

  useEffect(() => {
    let cancelRequest = false;
    if (!url) return;

    const fetchData = async () => {
      dispatch({ type: 'FETCHING' });
      if (cache.current[url]) {
        const data = cache.current[url];
        dispatch({ type: 'FETCHED', payload: data as any[] });
      } else {
        try {
          const response = await fetch(url);
          const data = await response.json();
          cache.current[url] = data;
          if (cancelRequest) return;
          dispatch({ type: 'FETCHED', payload: data });
        } catch (error) {
          if (cancelRequest) return;
          dispatch({ type: 'FETCH_ERROR', payload: error.message });
        }
      }
    };

    fetchData();

    return function cleanup() {
      cancelRequest = true;
    };
  }, [url]);

  return state;
};
