import { useState, useEffect } from 'react';
import styled from 'styled-components/macro';
import axios from 'axios';

import useInput from '../hooks/useInput';
import MainButton from '../commons/MainButton';
import SecondaryButton from '../commons/SecondaryButton';

const SignUp = () => {
  const username = useInput('');
  const password = useInput('');
  const passwordAgain = useInput('');
  const email = useInput('');
  const emailAgain = useInput('');

  const [validationErrors, setValidationErrors] = useState({
    username: [],
    password: [],
    email: [],
  });

  // Validations
  const validate = () => {
    const errors = {
      username: [],
      password: [],
      email: [],
    };

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

  const handleSubmit = (e) => {
    e.preventDefault();

    const errors = validate();
    console.log(errors);

    setValidationErrors(validate());

    if (validationErrors.username.length > 0) {
      console.log(validationErrors);
    }
    // } else {
    // axios
    //   .post('/api/users/new', {
    //     username: username.value,
    //     password: password.value,
    //     email: email.value,
    //   })
    //   .then((res) => res.data)
    //   .then((newUser) => {
    //     console.log(newUser);
    //   });
    // }
  };

  return (
    <MainWrapper>
      <h3>Sign up</h3>
      <form onSubmit={handleSubmit}>
        <FormFieldsWrapper>
          <label htmlFor="username">Username</label>
          <input type="text" placeholder="Username" {...username} />
          <br />
          <label htmlFor="password">Password</label>
          <input type="text" placeholder="Password" {...password} />
          <input type="text" placeholder="Enter again" {...passwordAgain} />
          {`is password valid: ${'asd'}`}
          <br />
          <label htmlFor="email">Email</label>
          <input type="text" placeholder="Email" {...email} />
          <input type="text" placeholder="Enter again" {...emailAgain} />
          <div>
            <MainButton onClick={handleSubmit}>Sign up</MainButton>
            <SecondaryButton>Log in</SecondaryButton>
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

export default SignUp;
