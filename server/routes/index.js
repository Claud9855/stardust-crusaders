const router = require('express').Router();
const path = require('path');
const apiRoutes = require('./API');

router.use('/API', apiRoutes);
router.use((req,res) => {
    res.sendFile(path.join(__dirname, '../../client/build/index.html'));
});

module.exports = router;