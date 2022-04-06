import { useState, useEffect, useContext } from 'react';
import styled from 'styled-components/macro';
import axios from 'axios';
import { useNavigate } from 'react-router';

import useInput from '../hooks/useInput';
import MainButton from '../commons/MainButton';
import SecondaryButton from '../commons/SecondaryButton';
import InputField from '../commons/InputField';
import { AuthContext } from '../AuthContext';

const SignUp = () => {
  const navigate = useNavigate();
  const userDetails = useContext(AuthContext);

  const username = useInput('');
  const password = useInput('');
  const passwordAgain = useInput('');
  const email = useInput('');
  const emailAgain = useInput('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const initialStateErrors = {
    username: [],
    password: [],
    email: [],
  };

  useEffect(() => {
    let isLoggedIn = userDetails.user;
    if (isLoggedIn) {
      navigate('/');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userDetails]);

  const [validationErrors, setValidationErrors] = useState(initialStateErrors);

  // Validations
  const validate = () => {
    const errors = initialStateErrors;

    // Username validations
    if (username.value.length < 3)
      errors.username.push(`Username must be at least 3 characters long`);
    if (username.value.length > 23)
      errors.username.push(`Username can't be longer than 23 characters`);
    if (!username.value.match(/^[A-Za-z0-9_]+$/g))
      errors.username.push(
        `Username can't contain special characters, only _ (underscore) `
      );

    // Password validations
    if (password.value.length < 8)
      errors.password.push(`Password must be at least 8 characters long`);
    if (password.value !== passwordAgain.value)
      errors.password.push(`Passwords are not the same`);

    // Email validations
    if (email.value !== emailAgain.value)
      errors.email.push(`Emails are not the same`);
    if (!email.value.match(/^(.+)@(.+).(.+)$/g))
      errors.email.push(`Invalid email`);

    return errors;
  };

  useEffect(() => {
    if (
      validationErrors.username.length === 0 &&
      validationErrors.password.length === 0 &&
      validationErrors.email.length === 0 &&
      isSubmitted
    ) {
      axios
        .post(`${process.env.REACT_APP_SERVER_URL}/api/users/new`, {
          username: username.value,
          password: password.value,
          email: email.value,
        })
        .then((res) => res.data)
        .then((newUser) => {
          return axios.post(`${process.env.REACT_APP_SERVER_URL}/api/login`, {
            username: username.value,
            password: password.value,
          });
        })
        .then((res) => res.data)
        .then((isAuthenticated) => {
          if (isAuthenticated === 'login successful') {
            userDetails.toggleAuth(username.value, true);
            navigate('/');
          }
        })
        .catch((err) => {
          const errors = initialStateErrors;
          errors.username.push(`Username already exists`);
          setValidationErrors(errors);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [validationErrors, isSubmitted]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setValidationErrors(validate());
    setIsSubmitted(true);
  };

  const handleNavigateLogin = () => {
    navigate('/login');
  };

  return (
    <MainWrapper>
      <Title>Sign up</Title>
      <form onSubmit={handleSubmit}>
        <FormFieldsWrapper>
          <Label htmlFor="username">Username</Label>
          <InputField type="text" placeholder="Username" {...username} />
          {validationErrors.username.map((item, index) => {
            return <ErrorMessage key={index}>{item}</ErrorMessage>;
          })}
          <br />
          <Label htmlFor="password">Password</Label>
          <InputField type="password" placeholder="Password" {...password} />
          <InputField
            type="password"
            placeholder="Enter again"
            {...passwordAgain}
          />
          {validationErrors.password.map((item, index) => {
            return <ErrorMessage key={index}>{item}</ErrorMessage>;
          })}
          <br />
          <Label htmlFor="email">Email</Label>
          <InputField type="text" placeholder="Email" {...email} />
          <InputField type="text" placeholder="Enter again" {...emailAgain} />
          {validationErrors.email.map((item, index) => {
            return <ErrorMessage key={index}>{item}</ErrorMessage>;
          })}
          <br />

          <ButtonsWrapper>
            <MainButton onClick={handleSubmit}>Sign up</MainButton>
            <SecondaryButton onClick={handleNavigateLogin}>
              Log in
            </SecondaryButton>
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
  /*  */
  width: 100%;
  padding-bottom: 40px;

  @media (min-width: 450px) {
    max-width: 450px;
    border-radius: 10px;
    padding: 50px;
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

const Label = styled.label`
  color: #581b98;
  font-weight: bold;
`;

const ButtonsWrapper = styled.div`
  display: flex;
  flex-direction: row-reverse;
  justify-content: space-between;
`;

const ErrorMessage = styled.p`
  background-color: #fecaca;
  color: #b91c1c;
  margin: 5px 0px;
  padding: 5px;
  border-radius: 5px;
  font-size: 0.85rem;
  max-width: 340px;
`;

export default SignUp;
