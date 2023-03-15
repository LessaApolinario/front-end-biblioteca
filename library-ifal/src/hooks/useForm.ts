import { RefObject, useEffect, useState } from 'react';

import { useNotifications } from './useNotifications';

import { Field } from '../core/domain/types/form/Field';
import { Form } from '../core/domain/types/form/Form';
import { InputTypes } from '../core/domain/types/form/InputTypes';

import {
  EMAIL_REGEX,
  EMPTY_FIELD_LENGTH,
  MINIMUM_PASSWORD_LENGTH,
} from '../ui/constants';

import {
  FIRST_PASSWORD_POSITION,
  SECOND_PASSWORD_POSITION,
} from '../core/constants';

import logWithCallback from '../core/utils/logWithCallback';

export function useForm(ref: RefObject<Form>) {
  const [error, setError] = useState<string>('');
  const { notifyInfo } = useNotifications();

  useEffect(() => {
    if (!!error) {
      logWithCallback(error, notifyInfo);
      setError('');
    }
  }, [error]);

  function validateForm() {
    return findFormErrors(getForm());
  }

  function findFormErrors(form: Form) {
    return findErrors([
      ...getInputFields(form, 'text'),
      ...getInputFields(form, 'email'),
      ...getInputFields(form, 'password'),
      ...getInputFields(form, 'search'),
      ...getTextareaFields(form),
    ]);
  }

  function findErrors(fields: Field[]) {
    for (let i = 0; i < fields.length; i++) {
      const field = fields[i];
      const emptyError = getEmptyFieldError(field);
      const passwordError = getPasswordFieldError(field);
      const emailError = getEmailFieldError(field);
      const equalsPasswordsError = getPasswordsError(
        fields[FIRST_PASSWORD_POSITION],
        fields[SECOND_PASSWORD_POSITION]
      );

      setErrorIfExists(emptyError);
      if (emptyError) {
        return emptyError;
      }

      setErrorIfExists(passwordError);
      if (passwordError) {
        return passwordError;
      }

      setErrorIfExists(emailError);
      if (emailError) {
        return emailError;
      }

      setErrorIfExists(equalsPasswordsError);
      if (equalsPasswordsError) {
        return equalsPasswordsError;
      }
    }
  }

  function getPasswordsError(firstPassword: Field, secondField: Field) {
    if (arePasswords(firstPassword, secondField)) {
      return checkEqualPasswords(firstPassword, secondField);
    }
  }

  function getEmailFieldError(field: Field) {
    if (!!hasEmailType(field)) {
      return checkEmail(field);
    }
  }

  function getPasswordFieldError(field: Field) {
    if (!!hasPasswordType(field)) {
      return checkLength(field);
    }
  }

  function getEmptyFieldError(field: Field) {
    return checkEmptyField(field);
  }

  function checkEqualPasswords(
    passwordField: Field,
    confirmedPasswordField: Field
  ) {
    if (!areEquals(passwordField, confirmedPasswordField)) {
      return 'Senha e confirmação de senha deve ser iguais';
    }
  }

  function arePasswords(firstField: Field, secondField: Field) {
    return hasPasswordType(firstField) || hasPasswordType(secondField);
  }

  function areEquals(firstField: Field, secondField: Field) {
    return firstField?.value === secondField?.value;
  }

  function checkLength(field: Field): string | undefined {
    if (!isPassword(field?.value ?? '')) {
      return `${field?.name} precisa ter tamanho maior ou igual a 6`;
    }
  }

  function checkEmail(field: Field): string | undefined {
    if (!isEmail(field?.value ?? '')) {
      return 'Email inválido';
    }
  }

  function checkEmptyField(field: Field): string | undefined {
    if (isEmpty(field)) {
      return `${field?.name} é obrigatório`;
    }
  }

  function isPassword(password: string) {
    return password.length >= MINIMUM_PASSWORD_LENGTH;
  }

  function isEmail(email: string) {
    return EMAIL_REGEX.test(email);
  }

  function isEmpty(field: Field) {
    return field?.value.length === EMPTY_FIELD_LENGTH;
  }

  function getTextareaFields(form: Form) {
    return [...form.querySelectorAll('textarea')] as Field[];
  }

  function getInputFields(form: Form, inputType: InputTypes): Field[] {
    return [...form.querySelectorAll(`input[type="${inputType}"]`)] as Field[];
  }

  function hasEmailType(field: Field) {
    return field?.type === 'email';
  }

  function hasPasswordType(field: Field) {
    return field?.type === 'password';
  }

  function getForm() {
    return ref.current as Form;
  }

  function setErrorIfExists(error?: string) {
    if (!!error) {
      setError(error);
    }
  }

  return { validateForm };
}
