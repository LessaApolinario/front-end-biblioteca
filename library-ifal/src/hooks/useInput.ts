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
      let regex = new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}')
      const isEmail = regex.test(input.value)

      if (input.value === '') {
        setError(`O campo de ${input.name} é obrigatório`)
        return
      }

      if (input.type === 'password' && isPasswordLengthInvalid) {
        setError('O campo de senha precisa ter no mínimo 6 caracteres')
        return
      }

      if (input.type === 'email' && !isEmail) {
        setError('Este não é um email válido')
        return
      }
    }
  }

  function checkEqualFields(firstField: HTMLInputElement | null, secondField: HTMLInputElement | null) {
    if (firstField !== null && secondField !== null) {
      if (firstField.value !== secondField.value) {
        setError(`O campo de ${firstField.name} é deve igual ao campo de ${secondField.name}`)
        return
      }
    }
  }

  function validateAll(inputs: Array<HTMLInputElement | null>) {
    inputs.forEach((input) => validate(input))
  }

  return {
    checkEqualFields,
    validateAll
  }
}
