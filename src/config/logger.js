import { createLogger, format, transports } from "winston";

import util from "util";

function transform(info, opts) {
  const args = info[Symbol.for("splat")];
  if (args) {
    info.message = util.format(info.message, ...args);
  }
  return info;
}

function utilFormatter() {
  return { transform };
}

const logger = createLogger({
  format: format.combine(
    format.timestamp(),
    utilFormatter(),
    format.simple(),
    format.align(),
    format.prettyPrint()
  ),
  level: "info",
  transports: [
    new transports.Console({
      format: format.combine(
        format.timestamp(),
        utilFormatter(),
        format.colorize(),
        format.simple(),
        format.prettyPrint(),
        format.printf(
          (info) => `${info.timestamp} ${info.level}:${info.message}`
        )
      ),
    }),
  ],
});

//export default logger;
module.exports = logger;