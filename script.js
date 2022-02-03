// Sign up / login btn
const signUpBtn = document.getElementById("signUpBtn");
const logInBtn = document.getElementById("loginBtn");
const signUp = document.getElementById("signUp");
const login = document.getElementById("login");

// Submit Btn
const registerBtn = document.getElementById("registerBtn");
const signinBtn = document.getElementById("signinBtn");

// Form input
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirmPassword");

// Register/Login Form Change
document.addEventListener("DOMContentLoaded", (e) => {
  signUpBtn.addEventListener("click", (e) => {
    e.preventDefault();
    signUp.style.display = "block";
    login.style.display = "none";
  });

  logInBtn.addEventListener("click", (e) => {
    e.preventDefault();
    login.style.display = "block";
    signUp.style.display = "none";
  });
});

// Register btn
registerBtn.addEventListener("click", (e) => {
  const checkbox = document.getElementById("checkbox");
  const check = document.getElementById("check");

  if (checkbox.checked) {
    input();
  } else {
    check.classList.add("error");
    input();
    e.preventDefault();
  }
});

// Login btn
signinBtn.addEventListener("click", (e) => {
  getLS();
  e.preventDefault();
});

// Function
function input() {
  validUsername();
  validEmail();
  validPassword();
  setToLS();
}

function validUsername() {
  if (username.value === "") {
    setError(username, "Username cannot be blank");
  } else if (username.value.length > 0 && username.value.length < 8) {
    setError(username, "Username must be at least 8 characters in length ");
  } else {
    setSuccess(username);
  }
}

function validEmail() {
  if (email.value === "") {
    setError(email, "Email cannot be blank");
  } else if (!isEmail(email.value)) {
    setError(email, "Not a valid email");
  } else {
    setSuccess(email);
  }
}

function validPassword() {
  if (password.value === "") {
    setError(password, "Password cannot be blank");
  } else if (password.value > 0 && password.value < 8) {
    setError(password, "Password must be at least 8 characters");
  } else {
    setSuccess(password);
  }

  if (confirmPassword.value === "") {
    setError(confirmPassword, "Confirm password cannot be blank");
  } else if (password.value !== confirmPassword.value) {
    setError(confirmPassword, "Passwords does not match");
  } else {
    setSuccess(confirmPassword);
  }
}

function setToLS() {
  let array = JSON.parse(localStorage.getItem("allUsers"));
  if (array == null) array = [];
  let users = {
    username: username.value,
    email: email.value,
    password: password.value,
  };

  for (let i = 0; i < array.length; i++) {
    if (array[i].username === username.value) {
      setError(username, `${username.value} is taken`);
    }
    if (array[i].email === email.value) {
      setError(email, `${email.value} is taken`);
    }
  }

  array.push(users);
  localStorage.setItem("allUsers", JSON.stringify(array));
}

function getLS() {
  const emailLogin = document.getElementById("emailLogin").value;
  const passwordLogin = document.getElementById("passwordLogin").value;
  const error = document.querySelector(".loginError");

  let array = JSON.parse(localStorage.getItem("allUsers"));
  if (array === null) error.innerHTML = "Email or password is incorrect";

  array.forEach((user) => {
    if (user.email === emailLogin && user.password === passwordLogin) {
      const content = document.getElementById("content");
      content.style.display = "block";
      const form = document.querySelector(".form");
      form.style.display = "none";
    } else {
      error.innerHTML = "Email or password is incorrect";
    }
  });
}

// Set error
function setError(input, message) {
  const formGroup = input.parentElement;
  const small = formGroup.querySelector("small");
  formGroup.className = "form-group error";
  small.innerText = message;
}

// Set success
function setSuccess(input) {
  const formGroup = input.parentElement;
  formGroup.className = "form-group success";
}

// Email
function isEmail(email) {
  return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    email
  );
}
