import { Leaf } from '@phosphor-icons/react';
import { AuthenticationButtons } from '../../../components/AuthenticationButtons';
import { NavigationLinksList } from '../../../components/NavigationLinksList';
import { Header } from '../../../components/base/Header';

function MainHeader() {
  return (
    <Header
      body={{
        logo: <Leaf size={32} fill="#212121" alt="SIB logo" />,
        links: <NavigationLinksList />,
        buttons: <AuthenticationButtons />,
      }}
    />
  );
}

export { MainHeader };
