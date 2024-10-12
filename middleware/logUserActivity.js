const { logUserActivity } = require('../models/userActivityLogModel');

const logActivity = (action) => {
    return async (req, res, next) => {
        if (req.user) {
            try {
                await logUserActivity(req.user.id, action);
            } catch (error) {
                console.error('Error logging user activity', error);
            }
        }
        next();
    };
};

module.exports = logActivity;