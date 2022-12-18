import { useEffect, useState } from 'react'

import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

type InputField = HTMLInputElement | null
type TextAreaField = HTMLTextAreaElement | null
type Field = InputField | TextAreaField

export function useFields() {
  const [error, setError] = useState('')

  useEffect(() => {
    const isEmpty = error === ''
    if (!isEmpty) {
      toast.error(error, {
        position: toast.POSITION.TOP_RIGHT
      })
      console.log(error)
      setError('')
    }
  }, [error])

  function validateEmptyField(field: Field) {
    if (field!.value === '') {
      setError(`O campo de ${field!.name} é obrigatório`)
      return
    }
  }

  function validatePassword(field: InputField) {
    const isPasswordLengthInvalid = field!.value?.length < 6
    if (field!.type === 'password' && isPasswordLengthInvalid) {
      setError('O campo de senha precisa ter no mínimo 6 caracteres')
      return
    }
  }

  function validateEmail(field: InputField) {
    let regex = new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}')
    const isEmail = regex.test(field!.value)
    if (field!.type === 'email' && !isEmail) {
      setError('Este não é um email válido')
      return
    }
  }

  function validateInput(input: InputField) {
    if (input !== null) {
      validateEmptyField(input)
      validatePassword(input)
      validateEmail(input)
    }
  }

  function validateTextArea(textarea: TextAreaField) {
    if (textarea) {
      validateEmptyField(textarea)
    }
  }

  function checkEqualFields(firstField: Field, secondField: Field) {
    if (firstField !== null && secondField !== null) {
      if (firstField.value !== secondField.value) {
        setError(`O campo de ${firstField.name} é deve igual ao campo de ${secondField.name}`)
        return
      }
    }
  }

  function validateAllInputs(inputs: Array<InputField>) {
    inputs.forEach((input) => validateInput(input))
  }

  return {
    validateInput,
    validateTextArea,
    checkEqualFields,
    validateAllInputs
  }
}
