import { ReactNode, useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { useNotifications } from '../../hooks/useNotifications';

import {
  EMAIL_REGEX,
  EMPTY_FIELD_LENGTH,
  PASSWORD_FIELD_POSITION,
  MINIMUM_PASSWORD_LENGTH,
  CONFIRM_PASSWORD_FIELD_POSITION,
} from '../constants';
import { REGISTER_PAGE_ROUTE } from '../../core/constants';

import styles from '../styles/components/Form.module.scss';

interface FormProps {
  className?: string;
  orientation: 'row' | 'column';
  children: ReactNode;
  handleSubmit(): Promise<void> | void;
}

function Form(props: FormProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const [error, setError] = useState<string>('');
  const { notifyError } = useNotifications();
  const appLocation = useLocation();

  useEffect(() => {
    if (!!error) {
      notifyError(error);
      setError('');
    }
  }, [error]);

  function checkEmptyField(
    field: HTMLInputElement | HTMLTextAreaElement
  ): string | undefined {
    const fieldValue = field?.value ?? '';
    const fieldValueLength = fieldValue?.length ?? 0;
    const isEmptyField = fieldValueLength === EMPTY_FIELD_LENGTH;

    if (isEmptyField) {
      return `${field.name} é obrigatório`;
    }
  }

  function checkPasswordLength(password?: string): string | undefined {
    const passwordLength = password?.length ?? 0;
    const isPasswordValid = passwordLength >= MINIMUM_PASSWORD_LENGTH;

    if (!isPasswordValid) {
      return `A senha precisa ter tamanho maior ou igual a 6`;
    }
  }

  function checkEmail(email?: string): string | undefined {
    const isEmailValid = EMAIL_REGEX.test(email ?? '');

    if (!isEmailValid) {
      return 'Email inválido';
    }
  }

  function validateFormFields(
    formFields: (HTMLInputElement | HTMLTextAreaElement | null)[]
  ) {
    if (!!formFields) {
      for (const formField of formFields) {
        if (!!formField) {
          const emptyFieldError = checkEmptyField(formField);

          if (!!emptyFieldError) {
            setError(emptyFieldError);
            return true;
          }
        }
      }

      return false;
    }

    return false;
  }

  function validatePasswordFormFields(
    passwordFormFields: (HTMLInputElement | null)[]
  ) {
    if (!!passwordFormFields) {
      for (const passwordFormField of passwordFormFields) {
        if (!!passwordFormField) {
          const password = passwordFormField?.value ?? '';
          const passwordLengthError = checkPasswordLength(password);

          if (!!passwordLengthError) {
            setError(passwordLengthError);
            return true;
          }
        }
      }

      return false;
    }

    return false;
  }

  function validateEmail(emailFormField: HTMLInputElement | null) {
    if (!!emailFormField) {
      const email = emailFormField?.value ?? '';
      const invalidEmailError = checkEmail(email);

      if (!!invalidEmailError) {
        setError(invalidEmailError);
        return true;
      }
    }

    return false;
  }

  function checkEqualFields(passwordFormFields: (HTMLInputElement | null)[]) {
    const isOnTheRegistrationPage =
      appLocation.pathname === REGISTER_PAGE_ROUTE;

    if (!isOnTheRegistrationPage) {
      return false;
    }

    const passwordFormField = passwordFormFields[PASSWORD_FIELD_POSITION];
    const confirmPasswordFormField =
      passwordFormFields[CONFIRM_PASSWORD_FIELD_POSITION];

    if (!!passwordFormField && !!confirmPasswordFormField) {
      const password = passwordFormField?.value;
      const confirmPassword = confirmPasswordFormField?.value;
      const arePasswordFieldsEqual = password === confirmPassword;

      if (!arePasswordFieldsEqual) {
        setError('As senhas não coincidem');
        return true;
      }

      return false;
    }

    return false;
  }

  function validateFields() {
    const form = formRef.current as HTMLFormElement;
    const textFormFields = form.querySelectorAll(
      'input[type=text]'
    ) as NodeListOf<HTMLInputElement>;
    const textareaFormFields = form.querySelectorAll(
      'textarea'
    ) as NodeListOf<HTMLTextAreaElement>;
    const passwordFormFields = form.querySelectorAll(
      'input[type=password]'
    ) as NodeListOf<HTMLInputElement>;
    const emailFormField = form.querySelector(
      'input[type=email]'
    ) as HTMLInputElement;

    const formFields = [
      ...textFormFields,
      ...textareaFormFields,
      ...passwordFormFields,
      emailFormField,
    ];

    return (
      validateFormFields(formFields) ||
      validatePasswordFormFields([...passwordFormFields]) ||
      validateEmail(emailFormField) ||
      checkEqualFields([...passwordFormFields])
    );
  }

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    const hasError = validateFields();
    if (hasError) {
      return;
    }

    await props.handleSubmit();
  }

  const className = `${styles.container} ${props.className} ${
    styles[props.orientation]
  }`;

  return (
    <form ref={formRef} className={className} onSubmit={onSubmit}>
      {props.children}
    </form>
  );
}

export default Form;
