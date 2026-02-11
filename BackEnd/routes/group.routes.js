const express = require("express");
const router = express.Router();

const authMiddleware = require("../middlewares/auth.middleware");
const groupController = require("../controllers/group.controller");

router.post("/", authMiddleware, groupController.createGroup);
router.post("/:groupId/members", authMiddleware, groupController.addMember);
router.delete("/:groupId/members/:userId", authMiddleware, groupController.removeMember);
router.delete("/:groupId/leave", authMiddleware, groupController.leaveGroup);
router.get("/my", authMiddleware, groupController.getMyGroups);
router.put("/:groupId/transfer-admin", authMiddleware, groupController.transferAdmin);
router.delete("/:groupId", authMiddleware, groupController.deleteGroup);
router.get("/:groupId/members", authMiddleware, groupController.getGroupMembers);


module.exports = router;