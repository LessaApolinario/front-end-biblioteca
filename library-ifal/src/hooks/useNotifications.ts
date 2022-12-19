import { ToastPosition, toast } from 'react-toastify'

const position: ToastPosition = toast.POSITION.TOP_RIGHT

export function useNotifications() {
  function notifySuccess(message: string) {
    toast.success(message, { position })
  }

  function notifyInfo(message: string) {
    toast.info(message, { position })
  }

  function notifyError(message: string) {
    toast.error(message, { position })
  }

  return {
    notifySuccess,
    notifyInfo,
    notifyError
  }
}
