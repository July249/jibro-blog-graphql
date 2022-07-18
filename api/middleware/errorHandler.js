const { logEvents } = require('./logEvents');
const { postEvents } = require('./postEvents');

const errorHandler = (err, req, res, next) => {
  logEvents(`${err.name}: ${err.message}`, 'errLog.txt');
  postEvents(`${err.name}: ${err.message}`, 'errPost.txt');
  console.error(err.stack);
  res.status(500).send(err.message);
};

module.exports = errorHandler;
