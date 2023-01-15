const passwordRegex = new RegExp("^[A-Za-z0-9_.]{5,16}$");
const emailRegex =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const validatePassword = (password) => passwordRegex.test(password);
const validateEmail = (email) => emailRegex.test(email);

export { validateEmail, validatePassword };
