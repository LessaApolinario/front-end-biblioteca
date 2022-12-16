import { useEffect, useState } from 'react'

import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export function useInput() {
  const [error, setError] = useState('')

  useEffect(() => {
    const isEmpty = error === ''
    if (!isEmpty) {
      toast.error(error, {
        position: toast.POSITION.TOP_RIGHT
      })
      setError('')
    }
  }, [error])

  function validate(input: HTMLInputElement | null) {
    if (input !== null) {
      const isPasswordLengthInvalid = input.value?.length < 6
      const isEmail = input.value.match(/^[a-z0-9.]+@[a-z0-9]+\.[a-z]+\.([a-z]+)?$/i)

      if (input.value === '') {
        setError(`O campo de ${input.name} é obrigatório`)
        return
      }

      if (input.type === 'password' && isPasswordLengthInvalid) {
        setError('O campo de senha precisa ter no mínimo 6 caracteres')
        return
      }

      if (input.type === 'email' && isEmail) {
        setError('Este não é um email válido')
        return
      }
    }
  }

  return { validate }
}
