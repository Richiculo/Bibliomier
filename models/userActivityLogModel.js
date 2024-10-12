const pool = require('../db');

const logUserActivity = async (userId, action) => {
    try {
        await pool.query(
            'INSERT INTO UserActivityLog (userId, action) VALUES ($1, $2)',
            [userId, action]
        );
    } catch (error) {
        console.error('Error logging user activity', error);
        throw error;
    }
};

module.exports = {
    logUserActivity
};