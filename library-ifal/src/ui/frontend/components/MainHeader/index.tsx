import { Leaf } from '@phosphor-icons/react';
import { AuthenticationButtons } from '../AuthenticationButtons';
import { NavigationLinksList } from '../NavigationLinksList';
import { Header } from '../base/Header';

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
