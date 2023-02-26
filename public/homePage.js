const logoutButton = new LogoutButton();

logoutButton.action = () => ApiConnector.logout(
    (logoutRes) => {
        if (logoutRes) {
            location.reload();
        }
    });

ApiConnector.current((data) => {
    if (data.success) {
        ProfileWidget.showProfile(data.data);
    }
});

const ratesBoard = new RatesBoard();

function ratesFunc() {
    ApiConnector.getStocks((data) => {
        if (data.success) {
            console.log(data)
            ratesBoard.clearTable();
            ratesBoard.fillTable(data.data);
        }
    });
}
ratesFunc();
setInterval(() => ratesFunc(), 60000);

const moneyManager = new MoneyManager();

moneyManager.addMoneyCallback = (data) => {
    ApiConnector.addMoney(data, () => {
        if (data.success) {
            ProfileWidget.showProfile(data.data);
            moneyManager.setMessage(data.success, "Текст");
        } else {
            moneyManager.setMessage(data.success, data.error);
        }
    });
};

moneyManager.conversionMoneyCallback = (data) => {
    ApiConnector.convertMoney(data, () => {
        if (data.success) {
            ProfileWidget.showProfile(data.data);
            moneyManager.setMessage(data.success, "Текст");
        } else {
            moneyManager.setMessage(data.success, data.error);
        }
    });
};

moneyManager.sendMoneyCallback = (data) => {
    ApiConnector.transferMoney(data, () => {
        if (data.success) {
            ProfileWidget.showProfile(data.data);
            moneyManager.setMessage(data.success, "Текст");
        } else {
            moneyManager.setMessage(data.success, data.error);
        }
    });
};

const favoritesWidget = new FavoritesWidget();

ApiConnector.getFavorites((data) => {
    if (data.success) {
        favoritesWidget.clearTable();
        favoritesWidget.fillTable(data.data);
        moneyManager.updateUsersList(data.data);
    }
});

favoritesWidget.addUserCallback = (data) => {
    ApiConnector.addUserToFavorites(data, () => {
        if (data.success) {
            favoritesWidget.clearTable();
            favoritesWidget.fillTable(data.data);
            moneyManager.updateUsersList(data.data);
            moneyManager.setMessage(data.success, "Текст");
        } else {
            favoritesWidget.setMessage(data.success, data.error);
        }
    });
};

favoritesWidget.removeUserCallback = (objData) => {
    ApiConnector.removeUserFromFavorites(objData, (data) => {
        if (data.success) {
            favoritesWidget.clearTable();
            favoritesWidget.fillTable(data.data);
            moneyManager.updateUsersList(data.data);
            moneyManager.setMessage(data.success, "Текст");
        } else {
            favoritesWidget.setMessage(data.success, data.error);
        }
    });
};