import { createRef } from 'react';

import { useAuth } from '../../hooks/useAuth';

import { GiTreeBranch } from 'react-icons/gi';

import Button from '../components/Button';
import Flex from '../components/Flex';
import Form from '../components/Form';
import Input from '../components/Input';
import Label from '../components/Label';
import LinkComponent from '../components/LinkComponent';

import getFieldFromRef from '../../core/utils/getFieldFromRef';

import styles from '../styles/pages/LoginPage.module.scss';

function LoginPage() {
  const { login } = useAuth();
  const usernameRef = createRef<HTMLInputElement>();
  const passwordRef = createRef<HTMLInputElement>();

  async function handleLogin() {
    const { field: username } = getFieldFromRef(usernameRef);
    const { field: password } = getFieldFromRef(passwordRef);
    await login({ username, password });
  }

  return (
    <div className={styles.container}>
      <GiTreeBranch />

      <Form
        className={styles.login}
        orientation={'column'}
        handleSubmit={handleLogin}
      >
        <h2>Fazer login</h2>

        <Flex className={styles.username} orientation={'column'}>
          <Label text={'Nome de usuário'} />
          <Input type={'text'} name={'nome de usuário'} ref={usernameRef} />
        </Flex>

        <Flex className={styles.password} orientation={'column'}>
          <Label text={'Senha'} />
          <Input type={'password'} name={'senha'} ref={passwordRef} />
        </Flex>

        <Button type="submit" btnType="secondary">
          Entrar
        </Button>

        <LinkComponent
          text={'Ainda não tem conta? Cadastre-se aqui'}
          to={'/register'}
        />
      </Form>
    </div>
  );
}

export default LoginPage;
