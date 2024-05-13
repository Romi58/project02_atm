

import { generateRandomUserData } from './utils';

const usersDB: { [key: string]: { userPin: string; balance: number } } = {};
export function initializeUserData() {
    const userData = generateRandomUserData();
    usersDB[userData.userId] = { userPin: userData.userPin, balance: userData.balance };
    return userData;
}

export function authenticateUser(userId: string, userPin: string) {
    return usersDB[userId] && usersDB[userId].userPin === userPin;
}


export function getUserBalance(userId: string) {
    return usersDB[userId].balance;
}


export function depositAmount(userId: string, amount: number) {
    usersDB[userId].balance += amount;
    return usersDB[userId].balance;
}

export function withdrawAmount(userId: string, amount: number) {
    if (usersDB[userId].balance >= amount) {
        usersDB[userId].balance -= amount;
        return usersDB[userId].balance;
    } else {
        return -1; 
    }
}
