import { Plus, X } from '@phosphor-icons/react';
import styles from './styles.module.scss';

interface Props {
  isVisible: boolean;
  dataTitle: string;
  className?: string;
  toggle(): void;
}

function OpenCloseButton({ isVisible, dataTitle, className, toggle }: Props) {
  const iconClassName = `${styles.container} ${styles[className || '']}`;

  if (isVisible) {
    return (
      <div className={iconClassName}>
        <X size={32} data-title="Fechar" onClick={toggle} />
      </div>
    );
  }

  return (
    <div className={iconClassName}>
      <Plus size={32} data-title={dataTitle} onClick={toggle} />
    </div>
  );
}

export { OpenCloseButton };
