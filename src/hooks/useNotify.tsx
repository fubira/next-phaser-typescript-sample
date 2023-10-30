'use client';
import React, { useContext } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import logger from '@/logger';

/**
 * useNotify
 *   Notification interface for errors, warnings, etc.
 *   Use react-toastify.
 */

export interface NotifyParam {
  error: (error: Error) => void;
  info: (info: { title: string, description: string }) => void;
  warn: (warn: { title: string, description: string }) => void;
  success: (warn: { title: string, description: string }) => void;
}

const NotifyContext = React.createContext<NotifyParam>({
  error: () => logger.warn('NotifyProvider is not enabled.'),
  info: () => logger.warn('NotifyProvider is not enabled.'),
  warn: () => logger.warn('NotifyProvider is not enabled.'),
  success: () => logger.warn('NotifyProvider is not enabled.'),
});

export const NotifyProvider: React.FC<{ children: React.ReactNode; }> = ({ children }) => {
  const notifyError = (error: Error) => {
    toast(`${error.name}: ${error.message}`, { type: "error" });
  };

  const notifyInfo = (info: {title: string, description: string }) => {
    toast(`[${info.title}] ${info.description}`, { type: "info" });
  };

  const notifyWarn = (info: {title: string, description: string }) => {
    toast(`[${info.title}] ${info.description}`, { type: "warning" });
  };

  const notifySuccess = (info: {title: string, description: string }) => {
    toast(`[${info.title}] ${info.description}`, { type: "success" });
  };

  return <NotifyContext.Provider value={{
    error: notifyError,
    info: notifyInfo,
    warn: notifyWarn,
    success: notifySuccess,
  }}>
    <ToastContainer
      position="top-right"
      autoClose={5000}
      closeOnClick
      pauseOnHover
    />
    {children}
  </NotifyContext.Provider>;
};

export const useNotify = () => {
  return useContext<NotifyParam>(NotifyContext);
};

export default useNotify;
