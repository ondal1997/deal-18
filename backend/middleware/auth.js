const authenticationValidator = async (req, res, next) => {
  const { userId } = req.session;
  if (!userId) {
    res.status(401).json({ error: '로그인이 필요합니다.' });
    return;
  }
  next();
};

module.exports = authenticationValidator;
