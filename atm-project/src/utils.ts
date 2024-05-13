//to generate random user data
export function generateRandomUserData() {
    const userId = Math.floor(Math.random() * 1000000).toString().padStart(6, '0');
    const userPin = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
    const balance = Math.floor(Math.random() * 10000);
    return { userId, userPin, balance };
}
