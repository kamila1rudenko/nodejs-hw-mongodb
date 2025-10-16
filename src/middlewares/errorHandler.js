export const errorHandler = (err, req, res, next) => {
  const status = err.status ?? 500;
  const msg = status === 500 ? 'Something went wrong' : err.message;

  res.status(status).json({
    status,
    message: msg,
    data: err.message,
  });
};
