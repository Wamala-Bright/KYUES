const testErrorPage = (req, res, next) => {
  const error = new Error('This is a test error');
  error.status = 500;
  next(error);
};

const showNotFoundPage = (req, res, next) => {
  const error = new Error('Page Not Found');
  error.status = 404;
  next(error);
};

export { testErrorPage, showNotFoundPage };
