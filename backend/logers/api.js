const winston = require('winston')
const expressWinston = require('express-winston')
const path = require('path')
require('winston-daily-rotate-file')

module.exports = function () {
  let transport
  if (process.env.NODE_ENV === 'development') {
    transport = new winston.transports.Console({
      json: true,
      colorize: true
    })
  } else {
    transport = new (winston.transports.DailyRotateFile)({
      dirname: path.join('logsDir', 'api'),
      filename: 'log',
      prepend: true,
      level: 'info'
    })
  }
  return expressWinston.logger({
    transports: [transport],
    meta: true,
    expressFormat: false,
    colorize: false,
    dynamicMeta (req, res) {
      return {ip: req.ip}
    }
  })
}
