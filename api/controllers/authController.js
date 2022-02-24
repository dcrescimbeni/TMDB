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

exports.isAuth = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.redirect('/api/login');
  }
};

exports.isOwnUser = (req, res, next) => {
  console.log('Params: ', req.params);
  console.log('user: ', req.user);
  if (req.isAuthenticated()) {
    next();
  } else {
    res.redirect('/api/login');
  }
};
