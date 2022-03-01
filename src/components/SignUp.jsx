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

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post('/api/users/new', {
        username: username.value,
        password: password.value,
        email: email.value,
      })
      .then((res) => res.data)
      .then((newUser) => {
        console.log(newUser);
      });
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
