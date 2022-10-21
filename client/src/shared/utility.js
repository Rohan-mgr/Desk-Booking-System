export const validateForm = (formData, method) => {
  const { fname, lname, email, password } = formData;
  const errors = {};
  let nameRegex = /^(?![\s.]+$)[a-zA-Z\s.]{2,}$/g;
  let emailRegex =
    /^[a-zA-Z0-9!@#$%^&*_?{}~-]+(\.[a-zA-Z0-9!@#$%^&*_?{}~-]+)*@([a-z0-9]+([a-z0-9-]*)\.)+[a-zA-Z]+$/g;
  let passRegex =
    /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*-_=?])[a-zA-Z0-9!@#$%^&*-_=?]{8,}/g;

  if (method === "signup") {
    if (!fname || fname.trim() === "")
      errors.fname = "Please Enter Your Full Name";
    else if (!fname.match(nameRegex))
      errors.fname = "First name must have at least two alphabets";
  }
  if (method === "signup") {
    if (!lname || lname.trim() === "")
      errors.lname = "Please Enter Your Full Name";
    else if (!lname.match(nameRegex))
      errors.lname = "Last name must have at least two alphabets";
  }

  if (!email || email.trim() === "") errors.email = "Please Enter Your Email";
  else if (!email.match(emailRegex)) errors.email = "Please Enter Valid Email";

  if (!password || password.trim() === "")
    errors.password = "Please Enter Your Password";
  else if (method === "signup" && !password.match(passRegex))
    errors.password =
      //   method === "signin"
      //     ? "Incorrect Password"
      "Weak Password. Must Include special charaters, Capital letters and at least 8 characters";

  return errors;
};
