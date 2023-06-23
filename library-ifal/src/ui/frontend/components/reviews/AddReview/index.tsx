import { useState } from 'react';
import { OpenCloseButton } from '../../OpenCloseButton';
import { Text } from '../../base/Text';
import { useAuth } from '../../../../../hooks/useAuth';

function AddReview() {
  const { isAuthenticated } = useAuth();
  const [isVisible, setIsVisible] = useState(false);

  function toggleCreateReviewFormVisibility() {
    setIsVisible(!isVisible);
  }

  if (!isAuthenticated) {
    return <></>;
  }

  return (
    <>
      <OpenCloseButton
        isVisible={isVisible}
        dataTitle="Adicionar resenha"
        toggle={toggleCreateReviewFormVisibility}
      />
      {isVisible && <Text size="large">+ Adicionar resenha</Text>}
    </>
  );
}

export { AddReview };
