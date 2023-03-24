import { useCallback } from 'react';
import { ToastPosition, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const position: ToastPosition = toast.POSITION.TOP_RIGHT;

export function useNotifications() {
  const notifySuccess = useCallback(
    (message: string) => toast.success(message, { position }),
    [toast.success]
  );

  const notifyInfo = useCallback(
    (message: string) => toast.info(message, { position }),
    [toast.info]
  );

  const notifyError = useCallback(
    (message: string) => toast.error(message, { position }),
    [toast.error]
  );

  return {
    notifySuccess,
    notifyInfo,
    notifyError,
  };
}
