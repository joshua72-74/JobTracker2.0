const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth'); // Import middleware

// Example protected route
router.get('/myjobs', auth, (req, res) => {
  res.send('Your job applications are here!');
});

// Export the router
module.exports = router;
