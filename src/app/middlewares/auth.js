export default (req, res, next) => {
  console.log('ola middleware');

  return next();
};
