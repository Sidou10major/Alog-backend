const fs = require('fs');

// Log activity function
const logActivity = (activity) => {
    const logEntry = `${new Date().toISOString()} - ${activity}\n`;
    fs.appendFile('activity.log', logEntry, (err) => {
      if (err) {
        console.error('Failed to log activity:', err);
      }
    });
  };

module.exports = logActivity;