import {
  DetailedHTMLProps,
  ForwardRefRenderFunction,
  InputHTMLAttributes,
  forwardRef,
  useImperativeHandle,
  useRef,
} from 'react';
import styles from './styles.module.scss';

export interface FormFieldHandle {
  getValue: () => string;
}

interface Props
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  className?: string;
}

const FormField: ForwardRefRenderFunction<FormFieldHandle, Props> = (
  props,
  forwardedRef
) => {
  const formFieldClassName = `${styles.container} ${props.className ?? ''}`;
  const formFieldRef = useRef<HTMLInputElement | null>(null);

  useImperativeHandle(forwardedRef, () => ({
    getValue() {
      return formFieldRef.current?.value ?? '';
    },
  }));

  return (
    <input
      className={formFieldClassName}
      type={props.type}
      placeholder={props.placeholder}
      name={props.name}
      ref={formFieldRef}
    />
  );
};

export default forwardRef(FormField);
