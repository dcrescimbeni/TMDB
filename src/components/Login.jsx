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

  const [isSubmitted, setIsSubmitted] = useState(false);

  const initialStateErrors = {
    username: [],
    password: [],
    general: [],
  };

  const [loginErrors, setLoginErrors] = useState(initialStateErrors);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <MainWrapper>
      <h3>Log in</h3>
      <form>
        <FormFieldsWrapper>
          <label htmlFor="username">Username</label>
          <InputField placeholder="Username" {...username} />
          <br />
          <label htmlFor="password">Password</label>
          <InputField placeholder="Password" type="password" {...password} />
          <br />
          ERROR MESSAGES PLACEHOLDER
          <div>
            <MainButton>Log in</MainButton>
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
