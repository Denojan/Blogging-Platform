
const express = require('express');
const router = express.Router();
const imageController = require('../../controller/imageController');
const ROLES_LIST = require('../../config/roles_list');
const verifyRoles = require('../../middleware/verifyRoles');
const upload = require('../../utils/upload');

router.post('/file/upload', upload.single('file'), imageController.uploadImage);
router.get('/file/:filename', imageController.getImage);


module.exports = router;
