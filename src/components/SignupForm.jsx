/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-props-no-spreading */
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import styled from 'styled-components';

import useUserStore from '../hooks/useUserStore';

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
  border-top: 2px solid #57CCFF;
`;

const Label = styled.label`
  font-weight: bold;
  display: flex;
  color: #A0A0A0;
`;

const Input = styled.input`
  margin: .6em 0;
  padding: 1.2em .6em;
  width: 100%;
  border: 1px solid #A0A0A0;
  color: #A0A0A0;
  &:focus {
    /* border: 1px solid #57CCFF;
    border-color: #57CCFF; */
    outline: none !important;
    border-color: #57CCFF;
  }
`;

const Error = styled.div`
  margin-bottom: 1.4em;
  color: #f23434d3;
`;

const P = styled.p`
  margin-bottom: 1.4em;
  color: #A0A0A0;
`;

const Button = styled.button`
  margin-top: 3em;
  padding: 1.8em 1em;
  width: 100%;
  border: 1px solid #57CCFF;
  background-color: #57CCFF;
  color: #FFF;
  :hover {
    color: black;
  }
  :active {
    background-color: #1db3f9;
  }
`;

export default function SignupForm() {
  const userStore = useUserStore();

  const navigate = useNavigate();

  const {
    register, watch, handleSubmit, formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    userStore.registrationState = '';

    const {
      userId, name, password, confirmPassword,
    } = data;
    await userStore.register({
      userId, name, password, confirmPassword,
    });

    if (userStore.isExistingUserId) {
      return;
    }

    navigate('/');
  };

  return (
    <Container>
      <Title>SIGN UP</Title>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <Label htmlFor="input-name">
            이름:
          </Label>
          <Input
            id="input-name"
            type="text"
            {...register('name', {
              required: true,
              minLength: 3,
              maxLength: 8,
              pattern: /^[ㄱ-ㅎ|가-힣]+$/,
            })}
          />
          {errors.name ? (
            <Error>3 ~ 7자까지 한글만 사용 가능</Error>
          ) : (
            <P>3 ~ 7자까지 한글만 사용 가능</P>
          ) }
        </div>
        <div>
          <Label htmlFor="input-userId">
            아이디:
          </Label>
          <Input
            id="input-userId"
            type="text"
            {...register('userId', {
              required: true,
              minLength: 4,
              maxLength: 17,
            })}
          />
          {userStore.isExistingUserId ? (
            <Error>
              {userStore.errorMessage}
            </Error>
          ) : errors.userId ? (
            <Error>에러 메세지 입력 필요합니다.(8글자)</Error>
          ) : (
            <P>영문소문자/숫자,4~16자만 사용가능</P>
          ) }
        </div>
        <div>
          <Label htmlFor="input-password">
            비밀번호:
          </Label>
          <Input
            id="input-password"
            type="password"
            {...register('password', {
              required: true,
              pattern: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
            })}
          />
          {errors.password ? (
            <Error>8글자 이상의 영문(대소문자), 숫자, 특수문자가 모두 포함되어야 함</Error>
          ) : (
            <P>8글자 이상의 영문(대소문자), 숫자, 특수문자가 모두 포함되어야 함</P>
          ) }
        </div>
        <div>
          <Label htmlFor="input-confirm-password">
            비밀번호 확인:
          </Label>
          <Input
            id="input-confirm-password"
            type="password"
            {...register('confirmPassword', {
              required: true,
              validate: (value) => value === watch('password'),
            })}
          />
          {errors.confirmPassword ? (
            <Error>비밀번호가 일치하지 않습니다</Error>
          ) : (
            null
          ) }
        </div>
        <Button type="submit" id="login-button">
          회원가입
        </Button>
      </Form>
    </Container>
  );
}
