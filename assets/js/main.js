const hrefFilePath = 'file:///E:/Route%20Full-Stack%20Diploma/Frontend/week%209';
const welcomeUser = document.getElementById('welcomeUser');
const nameInput = document.getElementById('nameInput');
const nameError = document.getElementById('nameError');
const emailInput = document.getElementById('emailInput');
const emailError = document.getElementById('emailError');
const passwordInput = document.getElementById('passwordInput');
const passwordError = document.getElementById('passwordError');
const successMsg = document.getElementById('successMsg');
var allUsers = [];
var userData = {};
var pathName = '/simpleUserSystem'

if (location.hostname.length == 0) {
    if (location.href === hrefFilePath + "/home.html" && localStorage.getItem('userSession') === null) {
        location.href = hrefFilePath + "/index.html";
    } else if (localStorage.getItem('userSession')) {
        if (location.href === hrefFilePath + "/index.html" || location.href === hrefFilePath + "/signUp.html") {
            location.href = hrefFilePath + "/home.html";
        }
        getUserData();
    }
} else {
    if (location.href === location.origin + pathName + "/home.html" && localStorage.getItem('userSession') === null) {
        location.href = location.origin + pathName + "/";
    } else if (localStorage.getItem('userSession')) {
        if (location.href === location.origin + pathName + "/" || location.href === location.origin + pathName + "/signUp.html") {
            location.href = location.origin + pathName + "/home.html";
        }
        getUserData();
    }
}

if (localStorage.getItem('users') !== null) {
    allUsers = JSON.parse(localStorage.getItem('users'));
}

function getUserData() {
    userData = JSON.parse(localStorage.getItem('userSession'));
    welcomeUser.innerHTML = 'welcome ' + userData.name;
}

function signIn() {
    if (emailValidation().test(emailInput.value) === false) {
        emailError.classList.remove('d-none');
        emailError.innerHTML = 'Email not found, or not valid, please sign up firstly or follow the following example: "Test.-_test@exaple.com" with minimum 3 and maximum 15';
    } else {
        if (!localStorage.getItem('users')) {
            emailError.classList.remove('d-none');
            emailError.innerHTML = 'Email not found or incorrect';
        } else {
            emailError.classList.add('d-none');
        }
    }

    if (passwordValidation().test(passwordInput.value) === false) {
        passwordError.classList.remove('d-none');
        passwordError.innerHTML = 'Password isn\'t valid. Must contain between lowercase or uppercase or number or special character such as [! @ # $ % ^ & *] with minimum 8 and maximum 15';
    } else {
        passwordError.classList.add('d-none');
    }

    if (emailValidation().test(emailInput.value) && passwordValidation().test(passwordInput.value && localStorage.getItem('users'))) {
        for (var i = 0; i < allUsers.length; i++) {
            if (allUsers[i].email !== emailInput.value) {
                emailError.classList.remove('d-none');
                emailError.innerHTML = 'Email You entered not found, please sign up firstly or re-write your email correctly!';
            } else {
                emailError.classList.add('d-none');

                if (allUsers[i].password !== passwordInput.value) {
                    passwordError.classList.remove('d-none');
                    passwordError.innerHTML = 'Password You entered not correct!';
                } else {
                    passwordError.classList.add('d-none');
                    successMsg.classList.remove('d-none');
                    setTimeout(function () {
                        successMsg.classList.add('d-none');
                        localStorage.setItem('userSession', JSON.stringify(allUsers[i]));
                        if (location.hostname.length == 0) {
                            location.href = hrefFilePath + "/home.html";
                        } else {
                            location.href = location.origin + pathName + "/home.html";
                        }
                    }, 2000);
                    break;
                }
            }
        }
    }
}

function signUp() {
    if (nameValidation().test(nameInput.value) === false) {
        nameError.classList.remove('d-none');
        nameError.innerHTML = 'Name isn\'t valid It must contain only letters with space. and start with capital letter with minimum 3 and maximum 20 characters';
    } else {
        nameError.classList.add('d-none');
    }

    if (emailValidation().test(emailInput.value) === false) {
        emailError.classList.remove('d-none');
        emailError.innerHTML = 'Email isn\'t not valid, please follow the following example: "Test.-_test@exaple.com" with minimum 3 and maximum 15';
    } else {
        emailError.classList.add('d-none');
    }

    if (passwordValidation().test(passwordInput.value) === false) {
        passwordError.classList.remove('d-none');
        passwordError.innerHTML = 'Password isn\'t valid. Must contain between lowercase or uppercase or number or special character such as [! @ # $ % ^ & *] with minimum 8 and maximum 15';
    } else {
        passwordError.classList.add('d-none');
    }

    if (nameValidation().test(nameInput.value) && emailValidation().test(emailInput.value) && passwordValidation().test(passwordInput.value)) {
        userData = {
            'name': nameInput.value,
            'email': emailInput.value,
            'password': passwordInput.value
        }

        allUsers.push(userData);
        localStorage.setItem('users', JSON.stringify(allUsers));

        successMsg.classList.remove('d-none');
        setTimeout(function () {
            successMsg.classList.add('d-none');
            if (location.hostname.length == 0) {
                location.href = hrefFilePath + "/index.html";
            } else {
                location.href = location.origin + pathName + "/";
            }
        }, 2000);
    }
}

function logOut() {
    localStorage.removeItem('userSession');
    if (location.hostname.length == 0) {
        location.href = hrefFilePath + "/index.html";
    } else {
        location.href = location.origin + pathName + "/";
    }
}

function nameValidation() {
    const nameRegex = /^[A-Z][A-Z a-z]{2,20}$/;
    return nameRegex;
}

function emailValidation() {
    const emailRegex = /^[a-zA-Z][a-zA-Z0-9._-]{2,15}@[a-z]{3,15}\.com$/;
    return emailRegex;
}

function passwordValidation() {
    const passwordRegex = /^([a-z]|[A-Z]|[0-9]|[!@#$%^&*]){8,15}$/;
    return passwordRegex;
}