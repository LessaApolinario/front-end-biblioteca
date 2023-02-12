import { createRef } from 'react';

import { GiTreeBranch } from 'react-icons/gi';

import Button from '../components/Button';
import Flex from '../components/Flex';
import Form from '../components/Form';
import Input from '../components/Input';
import Label from '../components/Label';
import LinkComponent from '../components/LinkComponent';

import { useAuth } from '../../hooks/useAuth';

import UserBuilder from '../../core/domain/builders/UserBuilder';

import styles from '../styles/pages/RegisterPage.module.scss';

function RegisterPage() {
  const { register } = useAuth();
  const nameRef = createRef<HTMLInputElement>();
  const usernameRef = createRef<HTMLInputElement>();
  const emailRef = createRef<HTMLInputElement>();
  const passwordRef = createRef<HTMLInputElement>();
  const confirmPasswordRef = createRef<HTMLInputElement>();

  function buildUser() {
    return new UserBuilder(nameRef.current?.value)
      .withUsername(usernameRef.current?.value)
      .withEmail(emailRef.current?.value)
      .withPassword(passwordRef.current?.value)
      .build();
  }

  async function handleRegister() {
    const user = buildUser();
    await register(user);
  }

  return (
    <div className={styles.container}>
      <GiTreeBranch />

      <Form
        className={styles.register}
        orientation={'column'}
        handleSubmit={handleRegister}
      >
        <h2>Cadastrar-se</h2>

        <Flex className={styles.row} orientation={'row'}>
          <Flex className={styles.name} orientation={'column'}>
            <Label text={'Seu nome'} />
            <Input type={'text'} name={'nome'} ref={nameRef} />
          </Flex>

          <Flex className={styles.username} orientation={'column'}>
            <Label text={'Nome de usuário'} />
            <Input type={'text'} name={'nome de usuário'} ref={usernameRef} />
          </Flex>
        </Flex>

        <Flex className={styles.row} orientation={'row'}>
          <Flex className={styles.email} orientation={'column'}>
            <Label text={'Email'} />
            <Input type={'email'} name={'email'} ref={emailRef} />
          </Flex>

          <Flex className={styles.password} orientation={'column'}>
            <Label text={'Senha'} />
            <Input type={'password'} name={'senha'} ref={passwordRef} />
          </Flex>
        </Flex>

        <Flex className={styles.row} orientation={'row'}>
          <Flex className={styles.confirmPassword} orientation={'column'}>
            <Label text={'Confirme sua senha'} />
            <Input
              type={'password'}
              name={'confirmação de senha'}
              ref={confirmPasswordRef}
            />
          </Flex>

          <Button type="submit" btnType="secondary">
            Cadastrar
          </Button>
        </Flex>

        <LinkComponent text={'Já tem conta? Entre aqui'} to={'/login'} />
      </Form>
    </div>
  );
}

export default RegisterPage;
