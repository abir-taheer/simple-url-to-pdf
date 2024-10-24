const ALLOWED_PREFIX_STR = process.env.ALLOWED_PREFIXES || "";
const allowed_prefixes = ALLOWED_PREFIX_STR.split(", ");

const isUrlAllowed = (url) => {
  if (ALLOWED_PREFIX_STR === "") {
    return true;
  }

  return allowed_prefixes.some((prefix) => url.startsWith(prefix));
};

const securityMiddleware = (req, res, next) => {
  req.url = req.query.url || req.body.url;

  if (!URL.canParse(req.url)) {
    res.status(400).json({
      status: "error",
      message: "Invalid URL",
    });
  } else if (!isUrlAllowed(req.url)) {
    res.status(403).json({
      status: "error",
      message: "This URL is not allowed",
    });
  } else {
    next();
  }
};

module.exports = securityMiddleware;
