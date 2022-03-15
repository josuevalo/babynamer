module.exports = function(req, res, next) {
  const { username, email, password, due_date, baby_sex, name  } = req.body;

  function validEmail(userEmail) {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(userEmail);
  }

  if (req.path === "/register") {
    if (![username, email, password, due_date, baby_sex ].every(Boolean)) {
      return res.status(401).json("Missing Credentials");
    } else if (!validEmail(email)) {
      return res.status(401).json("Invalid Email");
    }
  } else if (req.path === "/login") {
    if (![username, password].every(Boolean)) {
      return res.status(401).json("Missing Credentials");
    // } else if (!validEmail(email)) {
    //   return res.status(401).json("Invalid Email");
    }
  } else if (req.path === "/voter-registration") {
    if (![name, email].every(Boolean)) {
      return res.status(401).json("Missing Credentials on voter registration")
    }
  }

  next();
};