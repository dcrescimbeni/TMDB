const SignUp = () => {
  return (
    <div>
      <div>
        <h3>Sign up</h3>
        <form>
          <label htmlFor="username">Username</label>
          <input type="text" placeholder="Username" />
          <br />
          <label htmlFor="password">Password</label>
          <input type="text" placeholder="Password" />
          <input type="text" placeholder="Enter again" />
          <br />
          <label htmlFor="email">Email</label>
          <input type="text" placeholder="Email" />
          <input type="text" placeholder="Enter again" />
        </form>
      </div>
    </div>
  );
};

export default SignUp;
