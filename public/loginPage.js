'use strict'

const userForm = new UserForm();

userForm.loginFormCallback = (data) => ApiConnector.login(data,
    (response) => {
        if (response.success) {
            location.reload();
        } else {
            userForm.setLoginErrorMessage(response.error);
        }
    });

userForm.registerFormCallback = (data) => ApiConnector.register(data,
    (respond) => {
        if (respond.success) {
            location.reload();
        } else {
            userForm.setRegisterErrorMessage(respond.error);
        }
    });

// ApiConnector.logout(() => location.reload());

const logoutButton = new LogoutButton();

logoutButton.action = () => ApiConnector.logout(
    (logoutRes) => {
        if (logoutRes) {
            location.reload();
        }
    });