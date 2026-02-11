const groupService = require("../services/group.services");

exports.createGroup = async (req, res) => {
  try {
    const userId = req.user.id;        // JWT se aaya
    const { name } = req.body;

    const group = await groupService.createGroup({
      name,
      userId,
    });

    res.status(201).json({
      message: "Group created successfully",
      group,
    });
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
};

exports.addMember = async (req, res) => {
  try {
    const adminId = req.user.id;
    const { groupId } = req.params;
    const { email } = req.body;

    const member = await groupService.addMember({
      groupId,
      adminId,
      email,
    });

    res.status(201).json({
      message: "Member added successfully",
      member,
    });
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
};

exports.removeMember = async (req, res) => {
  try {
    const adminId = req.user.id;
    const { groupId, userId } = req.params;

    await groupService.removeMember({
      groupId,
      adminId,
      userId: Number(userId),
    });

    res.json({
      message: "Member removed successfully",
    });
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
};

exports.leaveGroup = async (req, res) => {
  try {
    const userId = req.user.id;
    const { groupId } = req.params;

    await groupService.leaveGroup({
      groupId,
      userId,
    });

    res.json({
      message: "You have left the group successfully",
    });
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
};

exports.getMyGroups = async (req, res) => {
  try {
    const userId = req.user.id;

    const groups = await groupService.getMyGroups(userId);

    res.json({
      groups,
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.transferAdmin = async (req, res) => {
  try {
    const adminId = req.user.id;
    const { groupId } = req.params;
    const { newAdminId } = req.body;

    await groupService.transferAdmin({
      groupId,
      adminId,
      newAdminId,
    });

    res.json({
      message: "Admin role transferred successfully",
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};


exports.deleteGroup = async (req, res) => {
  try {
    const userId = req.user.id;
    const { groupId } = req.params;

    await groupService.deleteGroup({
      groupId,
      userId,
    });

    res.json({
      message: "Group deleted successfully",
    });
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
};

exports.getGroupMembers = async (req, res) => {
  try {
    const { groupId } = req.params;
    const userId = req.user.id;

    const members = await groupService.getGroupMembers({
      groupId,
      userId,
    });

    res.json({
      count: members.length,
      members,
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
