'use client';
import React, { useEffect, useReducer, useState, Reducer, ReducerAction, ReducerState } from 'react';
import logger from '@/logger';

/**
 * セッションストレージに情報を保存するuseReducer
 *
 * @param key
 * @param reducer
 * @param initState
 * @returns
 */
export function useSessionReducer<R extends Reducer<any, any>>(
  key: string,
  reducer: R,
  initState: ReducerState<R>,
): [ReducerState<R>, React.Dispatch<ReducerAction<R>>] {
  const hasSessionStorage = typeof window !== 'undefined' && window.sessionStorage;

  const getStorageState = () => {
    if (hasSessionStorage) {
      const store = window.sessionStorage.getItem(key);

      let result = undefined;
      try {
        result = store && (JSON.parse(store) as React.ReducerState<R>);
      } catch (err) {
        /**/
      }
      return result || initState;
    }
    return initState;
  };

  const [state, dispatch] = useReducer(reducer, getStorageState() || initState);

  useEffect(() => {
    if (hasSessionStorage) {
      window.sessionStorage.setItem(key, JSON.stringify(state !== undefined ? state : ''));
    }
  }, [state]);

  return [state, dispatch];
}

/**
 * セッションストレージに情報を保存するuseState
 *
 * @param key
 * @param reducer
 * @param initState
 * @returns
 */
export function useSessionState<S>(key: string, initState: S): [S, (value: S) => void] {
  const hasSessionStorage = typeof window !== 'undefined' && window.sessionStorage;

  const [state, setState] = useState(() => {
    if (hasSessionStorage) {
      const store = window.sessionStorage.getItem(key);

      let result = undefined;
      try {
        result = store && (JSON.parse(store) as S);
      } catch (err) {
        logger.error(err);
      }
      return result || initState;
    }
    return initState;
  });

  const setValue = (value: S) => {
    if (hasSessionStorage) {
      setState(value);
      window.sessionStorage.setItem(key, JSON.stringify(value !== undefined ? value : ''));
    }
  };
  return [state, setValue];
}

/**
 * セッションストレージに保存されたStateの削除
 * @param key
 */
export function clearSessionState(key: string) {
  if (typeof window !== 'undefined' && window.sessionStorage) {
    window.sessionStorage.removeItem(key);
  }
}
