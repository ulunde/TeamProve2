module.exports = function(req, res, next) {

  if (!req.isAuthenticated()) {
    return res.forbidden();
  }

  exer.findOne(req.param('id')).exec(function(err, exp) {
    if (err) next(err);
    if (req.user.id === exp.person) {
      return next();
    } else {
      return res.forbidden();
    }
  });
};