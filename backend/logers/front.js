const winston = require('winston')
const expressWinston = require('express-winston')
const path = require('path')
require('winston-daily-rotate-file')

module.exports = function (siteMap) {
  const onlyLog = new Set(Object.keys(siteMap.map))
  let transport
  if (process.env.NODE_ENV === 'development') {
    transport = new winston.transports.Console({
      json: true,
      colorize: true
    })
  } else {
    transport = new (winston.transports.DailyRotateFile)({
      dirname: path.join('logsDir', 'frontEnd'),
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
    ignoreRoute (req, res) {
      return !onlyLog.has(req.path)
    },
    dynamicMeta (req, res) {
      return {ip: req.ip}
    }
  })
}
