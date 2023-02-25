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

moneyManager.addMoneyCallback 

