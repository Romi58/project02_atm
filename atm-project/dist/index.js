"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const inquirer_1 = __importDefault(require("inquirer"));
const atm_1 = require("./atm");
// Start ATM application
async function startATM() {
    console.log('Welcome to the ATM');
    console.log('------------------');
    // Initialize user data
    const userData = (0, atm_1.initializeUserData)();
    // Prompt user for user id and pin
    const userInput = await inquirer_1.default.prompt([
        {
            type: 'input',
            name: 'userId',
            message: 'Enter your user ID:',
        },
        {
            type: 'password',
            name: 'userPin',
            message: 'Enter your PIN:',
            mask: '*',
        },
    ]);
    // Authenticate user
    const isAuthenticated = (0, atm_1.authenticateUser)(userInput.userId, userInput.userPin);
    if (!isAuthenticated) {
        console.log('Authentication failed. Please try again.');
        return;
    }
    console.log('Authentication successful.');
    // Main ATM functionalities
    while (true) {
        const userChoice = await inquirer_1.default.prompt([
            {
                type: 'list',
                name: 'action',
                message: 'Choose an action:',
                choices: ['Check Balance', 'Deposit', 'Withdraw', 'Exit'],
            },
        ]);
        switch (userChoice.action) {
            case 'Check Balance':
                console.log(`Your balance is: $${(0, atm_1.getUserBalance)(userInput.userId)}`);
                break;
            case 'Deposit':
                const depositAmountInput = await inquirer_1.default.prompt({
                    type: 'number',
                    name: 'amount',
                    message: 'Enter amount to deposit:',
                });
                const newBalanceAfterDeposit = (0, atm_1.depositAmount)(userInput.userId, depositAmountInput.amount);
                console.log(`Deposit successful. Your new balance is: $${newBalanceAfterDeposit}`);
                break;
            case 'Withdraw':
                const withdrawAmountInput = await inquirer_1.default.prompt({
                    type: 'number',
                    name: 'amount',
                    message: 'Enter amount to withdraw:',
                });
                const newBalanceAfterWithdraw = (0, atm_1.withdrawAmount)(userInput.userId, withdrawAmountInput.amount);
                if (newBalanceAfterWithdraw === -1) {
                    console.log('Insufficient balance.');
                }
                else {
                    console.log(`Withdrawal successful. Your new balance is: $${newBalanceAfterWithdraw}`);
                }
                break;
            case 'Exit':
                console.log('Thank you for using the ATM. Goodbye!');
                return;
            default:
                console.log('Invalid choice. Please try again.');
        }
    }
}
// Run the ATM application
startATM();
