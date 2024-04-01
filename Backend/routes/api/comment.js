const express = require('express');
const router = express.Router();
const commentController = require('../../controller/commentController');
const ROLES_LIST = require('../../config/roles_list');
const verifyRoles = require('../../middleware/verifyRoles');


router
  .route("/deleteComment/:id")
  .delete(verifyRoles(ROLES_LIST.User,ROLES_LIST.Admin), commentController.deleteComment);


  router
  .route("/comments/:id")
  .get(
    verifyRoles(ROLES_LIST.Admin,ROLES_LIST.User),
    commentController.getComments
  );

  router
  .route("/new")
  .post(
    verifyRoles(
      ROLES_LIST.User,ROLES_LIST.Admin
    ),
    commentController.newComment
  );


module.exports = router;
