'use client';
import { useState } from 'react';
import logger from '@/logger';

/**
 * ローカルストレージに情報を保存するuseState
 *
 * @param key
 * @param reducer
 * @param initState
 * @returns
 */
export function useLocalState<S>(key: string, initState: S): [S, (value: S) => void] {
  const hasLocalStorage = typeof window !== 'undefined' && window.localStorage;

  const [state, setState] = useState(() => {
    if (hasLocalStorage) {
      const store = window.localStorage.getItem(key);

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
    if (hasLocalStorage) {
      setState(value);
      window.localStorage.setItem(key, JSON.stringify(value !== undefined ? value : ''));
    }
  };
  return [state, setValue];
}

/**
 * ローカルストレージに保存されたStateの削除
 * @param key
 */
export function clearLocalState(key: string) {
  if (typeof window !== 'undefined' && window.localStorage) {
    window.localStorage.removeItem(key);
  }
}
