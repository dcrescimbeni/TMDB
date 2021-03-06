exports.loginGet = (req, res, next) => {
  res.send('login page');
};

exports.secretGet = (req, res, next) => {
  res.send('login successful');
};

exports.logoutGet = (req, res, next) => {
  req.logout();
  res.send('logout successful');
};

exports.isAuth = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.redirect('/api/login');
  }
};

exports.isOwnUser = (req, res, next) => {
  const paramsUser = req.params.username;
  const loggedUser = req.user ? req.user.dataValues.username : null;

  if (req.isAuthenticated() && paramsUser === loggedUser) {
    next();
  } else {
    res.redirect('/api/login');
  }
};
