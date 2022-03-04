import { useState, useEffect, useContext } from 'react';
import styled from 'styled-components/macro';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import useInput from '../hooks/useInput';
import MainButton from '../commons/MainButton';
import SecondaryButton from '../commons/SecondaryButton';
import InputField from '../commons/InputField';
import { AuthContext } from '../AuthContext';

const Login = () => {
  const navigate = useNavigate();
  const userDetails = useContext(AuthContext);

  const username = useInput('');
  const password = useInput('');

  const initialStateErrors = {
    username: [],
    password: [],
    general: [],
  };

  useEffect(() => {
    let isLoggedIn = userDetails.user;
    if (isLoggedIn) {
      navigate('/');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userDetails]);

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loginErrors, setLoginErrors] = useState(initialStateErrors);

  const validations = () => {
    const errors = initialStateErrors;

    // Username validations
    if (!username.value.length) errors.username.push(`Username can't be empty`);

    // Password validations
    if (!password.value.length) errors.password.push(`Password can't be empty`);

    return errors;
  };

  useEffect(() => {
    if (
      loginErrors.username.length === 0 &&
      loginErrors.password.length === 0 &&
      loginErrors.general.length === 0 &&
      isSubmitted
    ) {
      axios
        .post('/api/login', {
          username: username.value,
          password: password.value,
        })
        .then((res) => res.data)
        .then((isAuthenticated) => {
          if (isAuthenticated === 'login successful') {
            userDetails.toggleAuth(username.value);
            navigate('/');
          } else {
            const errors = initialStateErrors;
            errors.general.push(`Wrong username or password`);
            setLoginErrors(errors);
          }
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loginErrors, isSubmitted]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoginErrors(validations());
    setIsSubmitted(true);
  };

  return (
    <MainWrapper>
      <Title>Log in</Title>
      <form onSubmit={handleSubmit}>
        <FormFieldsWrapper>
          <Label htmlFor="username">Username</Label>
          <InputField placeholder="Username" {...username} />
          {loginErrors.username.map((item, index) => {
            return <ErrorMessage key={index}>{item}</ErrorMessage>;
          })}
          <br />
          <Label htmlFor="password">Password</Label>
          <InputField placeholder="Password" type="password" {...password} />
          {loginErrors.password.map((item, index) => {
            return <ErrorMessage key={index}>{item}</ErrorMessage>;
          })}
          <br />
          {loginErrors.general.map((item, index) => {
            return <ErrorMessage key={index}>{item}</ErrorMessage>;
          })}
          <ButtonsWrapper>
            <MainButton onClick={handleSubmit}>Log in</MainButton>
            <SecondaryButton>Sign up</SecondaryButton>
          </ButtonsWrapper>
        </FormFieldsWrapper>
      </form>
    </MainWrapper>
  );
};

const MainWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f6f6f6;
  width: 100%;
  padding-bottom: 40px;

  @media (min-width: 450px) {
    max-width: 450px;
    padding: 50px;
    border-radius: 10px;
  }
`;

const Title = styled.h3`
  color: #9c1de7;
  margin: 20px 0px;

  @media (min-width: 450px) {
    margin-top: 0px;
  }
`;

const FormFieldsWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const ButtonsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Label = styled.label`
  color: #581b98;
  font-weight: bold;
`;

const ErrorMessage = styled.p`
  background-color: #fecaca;
  color: #b91c1c;
  margin: 5px 0px;
  padding: 5px;
  border-radius: 5px;
  font-size: 0.85rem;
`;

export default Login;
