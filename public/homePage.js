const logoutButton = new LogoutButton();

logoutButton.action = () => ApiConnector.logout(
    (logoutRes) => {
        if (logoutRes) {
            location.reload();
        }
    });