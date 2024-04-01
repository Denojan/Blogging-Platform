const express = require('express');
const router = express.Router();
const usersController = require('../controller/usersController');
const ROLES_LIST = require('../config/roles_list');
const verifyRoles = require('../middleware/verifyRoles');

router
  .route("/deleteUser/:id")
  .delete(verifyRoles(ROLES_LIST.Admin), usersController.deleteUser);


  router
  .route("/getUsers")
  .get(
    verifyRoles(ROLES_LIST.Admin),
    usersController.getAllUsers
  );

router
  .route("/getOneUser/:id")
  .get(
    verifyRoles(ROLES_LIST.Admin,ROLES_LIST.User),
    usersController.getUser
  );

router
  .route("/updateUser/:eid")
  .put(
    verifyRoles(
      ROLES_LIST.User,ROLES_LIST.Admin
    ),
    usersController.updateUser
  );

  router
  .route("/updateUserPass/:id")
  .put(
    verifyRoles(
      ROLES_LIST.User,ROLES_LIST.Admin
    ),
    usersController.updateUserPass
  );



  module.exports = router;
