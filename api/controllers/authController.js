exports.loginGet = (req, res, next) => {
  res.send('login page');
};

exports.secretGet = (req, res, next) => {
  res.status(205).send(`You've accessed the chamber of forbidden secrets`);
};

exports.logoutGet = (req, res, next) => {
  req.logout();
  res.redirect('/api/login');
};
