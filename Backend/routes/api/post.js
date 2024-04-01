const express = require('express');
const router = express.Router();
const postController = require('../../controller/postController');
const ROLES_LIST = require('../../config/roles_list');
const verifyRoles = require('../../middleware/verifyRoles');



router
  .route("/deletePost/:id")
  .delete(verifyRoles(ROLES_LIST.Admin,ROLES_LIST.User), postController.deletePost);


  router
  .route("/getPosts")
  .get(
    verifyRoles(ROLES_LIST.Admin,ROLES_LIST.User),
    postController.getAllPosts
  );

router
  .route("/getOnePost/:id")
  .get(
    verifyRoles(ROLES_LIST.Admin,ROLES_LIST.User),
    postController.getPost
  );

router
  .route("/create")
  .post(
    verifyRoles(
      ROLES_LIST.User,ROLES_LIST.Admin
    ),
    postController.createPost
  );

  router
  .route("/update/:id")
  .put(
    verifyRoles(
      ROLES_LIST.User,ROLES_LIST.Admin
    ),
    postController.updatePost
  );



  module.exports = router;
