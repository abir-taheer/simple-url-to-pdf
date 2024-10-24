const cors = require("cors");

const ALLOWED_CORS_STR = process.env.ALLOWED_CORS || "";
const whitelist = ALLOWED_CORS_STR.split(", ");

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin) {
      callback(null, true);
    } else if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

module.exports = cors(corsOptions);
