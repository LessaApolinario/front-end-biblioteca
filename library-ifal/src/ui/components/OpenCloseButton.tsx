import { BsPlusCircleFill } from 'react-icons/bs';
import { RiCloseCircleFill } from 'react-icons/ri';

import styles from '../styles/components/OpenCloseButton.module.scss';

interface OpenCloseButtonProps {
  className: string;
  closeText: string;
  addItemText: string;
  isVisible: boolean;
  onClick(): void;
}

function OpenCloseButton(props: OpenCloseButtonProps) {
  const className = `${styles.container} ${styles[props.className]}`;

  if (!props.isVisible) {
    return (
      <div className={className}>
        <BsPlusCircleFill onClick={props.onClick} title={props.addItemText} />
      </div>
    );
  }

  return (
    <div className={className}>
      <RiCloseCircleFill onClick={props.onClick} title={props.closeText} />
    </div>
  );
}

export default OpenCloseButton;
