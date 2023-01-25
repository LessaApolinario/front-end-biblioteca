import { useEffect, useState } from 'react';

import { useNotifications } from './useNotifications';

import { InputField } from '../core/domain/types/InputField';
import { TextAreaField } from '../core/domain/types/TextAreaField';
import { Field } from '../core/domain/types/Field';

export function useFields() {
  const { notifyError } = useNotifications();
  const [error, setError] = useState('');

  useEffect(() => {
    const isEmpty = error === '';
    if (!isEmpty) {
      notifyError(error);
      setError('');
    }
  }, [error]);

  function validateInput(input: InputField) {
    if (input !== null) {
      const isPasswordLengthInvalid = input.value.length < 6;
      let regex = new RegExp('[a-z0-9]+@[a-z]+.[a-z]{2,3}');
      const isEmail = regex.test(input!.value);

      if (input.value === '') {
        setError(`O campo de ${input.name} é obrigatório`);
        return;
      }

      if (input.type === 'password' && isPasswordLengthInvalid) {
        setError('O campo de senha precisa ter no mínimo 6 caracteres');
        return;
      }

      if (input.type === 'email' && !isEmail) {
        setError('Este não é um email válido');
        return;
      }
    }
  }

  function validateTextArea(textarea: TextAreaField) {
    if (textarea?.value === '') {
      setError(`O campo de ${textarea?.name} é obrigatório`);
      return;
    }
  }

  function checkEqualFields(firstField: Field, secondField: Field) {
    if (firstField?.value !== secondField?.value) {
      setError(
        `O campo de ${firstField?.name} é deve igual ao campo de ${secondField?.name}`
      );
      return;
    }
  }

  function validateAllInputs(inputs: Array<InputField>) {
    inputs.forEach((input) => validateInput(input));
  }

  return {
    validateInput,
    validateTextArea,
    checkEqualFields,
    validateAllInputs,
  };
}
