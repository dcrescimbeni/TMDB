import { useState, useEffect } from 'react';
import styled from 'styled-components/macro';
import axios from 'axios';

import useInput from '../hooks/useInput';
import MainButton from '../commons/MainButton';
import SecondaryButton from '../commons/SecondaryButton';
import InputField from '../commons/InputField';

const Login = () => {
  const username = useInput('');
  const password = useInput('');

  const initialStateErrors = {
    username: [],
    password: [],
    general: [],
  };

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
        .then((res) => {
          console.log(res);
          return res.data;
        })
        .then((isAuthenticated) => {
          if (isAuthenticated === 'login successful') {
            console.log('success, redirecting');
          } else {
            const errors = initialStateErrors;
            errors.general.push(`Wrong username or password`);
            setLoginErrors(errors);
          }
        });
      console.log('SUBMIT!');
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
      <h3>Log in</h3>
      <form onSubmit={handleSubmit}>
        <FormFieldsWrapper>
          <label htmlFor="username">Username</label>
          <InputField placeholder="Username" {...username} />
          {loginErrors.username.map((item, index) => {
            return <ErrorMessage key={index}>{item}</ErrorMessage>;
          })}
          <br />
          <label htmlFor="password">Password</label>
          <InputField placeholder="Password" type="password" {...password} />
          {loginErrors.password.map((item, index) => {
            return <ErrorMessage key={index}>{item}</ErrorMessage>;
          })}
          <br />
          {loginErrors.general.map((item, index) => {
            return <ErrorMessage key={index}>{item}</ErrorMessage>;
          })}
          <div>
            <MainButton onClick={handleSubmit}>Log in</MainButton>
            <SecondaryButton>Sign up</SecondaryButton>
          </div>
        </FormFieldsWrapper>
      </form>
    </MainWrapper>
  );
};

const MainWrapper = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 450px;
  border-radius: 10px;
  background-color: #f6f6f6;
  padding: 50px;
`;

const FormFieldsWrapper = styled.div`
  display: flex;
  flex-direction: column;
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
