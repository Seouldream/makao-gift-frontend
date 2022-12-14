/* eslint-disable react/jsx-props-no-spreading */
import { useForm } from 'react-hook-form';

import { useNavigate } from 'react-router-dom';

import { useLocalStorage } from 'usehooks-ts';

import styled from 'styled-components';
import useUserStore from '../hooks/useUserStore';
import useForceUpdate from '../hooks/useForceUpdate';

const Container = styled.div`
  margin: auto;
  margin-top: 4em;
  height: 100%;
  width: 50%;  
`;

const Title = styled.h2`
  display: flex;
  justify-content: center;
  margin-bottom: .15em;
  font-size: 3em;
  font-weight: bold;
`;

const Form = styled.form`
  padding-top: 2.2em;
  border-top: 2px solid #ABD9FF;
`;

const Input = styled.input`
  margin: .6em 0;
  padding: 1.2em .6em;
  width: 100%;
  border: 1px solid #A0A0A0;
  color: #A0A0A0;
  &:focus {
    border: 1px solid #ABD9FF;
  }
`;

const LoginButton = styled.button`
  margin-top: 3em;
  padding: 1.8em 1em;
  width: 100%;
  border: 1px solid #ABD9FF;
  background-color: #ABD9FF;
  color: #FFF;
`;

const Registration = styled.button`
  display: flex;
  margin: auto;
  margin-top: 3em;
  border: none;
  background: transparent;

`;

const Error = styled.div`
  color: #f23434d3;
`;

export default function LoginForm() {
  const navigate = useNavigate();

  const forceUpdate = useForceUpdate();

  const [, setAccessToken] = useLocalStorage('accessToken', '');

  const userStore = useUserStore();

  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    const { userId, password } = data;
    const accessToken = await userStore.login({ userId, password });
    setAccessToken(accessToken);
    if (accessToken) {
      navigate('/');
      forceUpdate();
    }
  };

  const handleClick = () => {
    navigate('/signup');
  };

  return (
    <Container>
      <Title>USER LOGIN</Title>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <Input
            id="input-userId"
            placeholder="아이디"
            {...register('userId', { required: true })}
          />
          {errors.userId ? (
            <Error>아이디를 입력해주세요</Error>
          ) : null}
        </div>
        <div>
          <Input
            id="input-password"
            placeholder="비밀번호"
            type="password"
            {...register('password', { required: true })}
          />
          {errors.password ? (
            <Error>비밀번호를 입력해주세요</Error>
          ) : null}
        </div>
        {userStore.isLoginFail ? (
          <Error>{userStore.errorMessage}</Error>
        ) : null}
        <LoginButton type="submit">
          로그인하기
        </LoginButton>
        <Registration
          type="button"
          onClick={handleClick}
        >
          회원가입
        </Registration>
      </Form>
    </Container>
  );
}
