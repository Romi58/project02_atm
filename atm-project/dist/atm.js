"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.withdrawAmount = exports.depositAmount = exports.getUserBalance = exports.authenticateUser = exports.initializeUserData = void 0;
const utils_1 = require("./utils");
const usersDB = {};
function initializeUserData() {
    const userData = (0, utils_1.generateRandomUserData)();
    usersDB[userData.userId] = { userPin: userData.userPin, balance: userData.balance };
    return userData;
}
exports.initializeUserData = initializeUserData;
function authenticateUser(userId, userPin) {
    return usersDB[userId] && usersDB[userId].userPin === userPin;
}
exports.authenticateUser = authenticateUser;
function getUserBalance(userId) {
    return usersDB[userId].balance;
}
exports.getUserBalance = getUserBalance;
function depositAmount(userId, amount) {
    usersDB[userId].balance += amount;
    return usersDB[userId].balance;
}
exports.depositAmount = depositAmount;
function withdrawAmount(userId, amount) {
    if (usersDB[userId].balance >= amount) {
        usersDB[userId].balance -= amount;
        return usersDB[userId].balance;
    }
    else {
        return -1;
    }
}
exports.withdrawAmount = withdrawAmount;
