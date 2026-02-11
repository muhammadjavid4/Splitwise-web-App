const groupRepo = require("../repositories/group.repository");
const userRepo = require("../repositories/user.repository");


exports.createGroup = async ({ name, userId }) => {
  if (!name || name.trim() === "") {
    throw new Error("Group name is required");
  }

  // 1️⃣ group insert
  const groupId = await groupRepo.createGroup({
    name,
    createdBy: userId,
  });

  // 2️⃣ creator ko admin banao
  await groupRepo.addMember({
    groupId,
    userId,
    role: "admin",
  });

  return {
    id: groupId,
    name,
    created_by: userId,
  };
};

exports.addMember = async ({ groupId, adminId, email }) => {
  // 1️⃣ group admin check
  const admin = await groupRepo.getMember(groupId, adminId);
  if (!admin || admin.role !== "admin") {
    throw new Error("Only group admin can add members");
  }

  // 2️⃣ user exist?
  const user = await userRepo.findByEmail(email);
  if (!user) {
    throw new Error("User not found");
  }

  // 3️⃣ already member?
  const exists = await groupRepo.getMember(groupId, user.id);
  if (exists) {
    throw new Error("User already in group");
  }

  // 4️⃣ add member
  await groupRepo.addMember({
    groupId,
    userId: user.id,
    role: "member",
  });

  return {
    id: user.id,
    name: user.name,
    email: user.email,
  };
};

exports.removeMember = async ({ groupId, adminId, userId }) => {
  // 1️⃣ admin check
  const admin = await groupRepo.getMember(groupId, adminId);
  if (!admin || admin.role !== "admin") {
    throw new Error("Only group admin can remove members");
  }

  // 2️⃣ admin khud ko remove nahi kar sakta
  if (adminId === userId) {
    throw new Error("Admin cannot remove himself");
  }

  // 3️⃣ member exist?
  const member = await groupRepo.getMember(groupId, userId);
  if (!member) {
    throw new Error("User is not a member of this group");
  }

  // 4️⃣ remove member
  await groupRepo.removeMember(groupId, userId);
};


exports.leaveGroup = async ({ groupId, userId }) => {
  // 1️⃣ member check
  const member = await groupRepo.getMember(groupId, userId);
  if (!member) {
    throw new Error("You are not a member of this group");
  }

  // 2️⃣ admin leave restriction
  if (member.role === "admin") {
    throw new Error(
      "Admin cannot leave the group. Transfer admin role or delete the group."
    );
  }

  // 3️⃣ remove member
  await groupRepo.removeMember(groupId, userId);
};


// get my groups
exports.getMyGroups = async (userId) => {
  return await groupRepo.getGroupsByUser(userId);
};


exports.transferAdmin = async ({ groupId, adminId, newAdminId }) => {
  // 1️⃣ current admin check
  const admin = await groupRepo.getMember(groupId, adminId);
  if (!admin || admin.role !== "admin") {
    throw new Error("Only admin can transfer admin role");
  }

  // 2️⃣ new admin member check
  const newAdmin = await groupRepo.getMember(groupId, newAdminId);
  if (!newAdmin) {
    throw new Error("New admin must be a group member");
  }

  // 3️⃣ role swap
  await groupRepo.updateRole(groupId, adminId, "member");
  await groupRepo.updateRole(groupId, newAdminId, "admin");
};



exports.deleteGroup = async ({ groupId, userId }) => {
  // 0️⃣ groupId validation
  if (!groupId || isNaN(groupId)) {
    throw new Error("Invalid group id");
  }

  // 1️⃣ group exist check
  const group = await groupRepo.findById(groupId);
  if (!group) {
    throw new Error("Group not found");
  }

  // 2️⃣ requester is member?
  const member = await groupRepo.getMember(groupId, userId);
  if (!member) {
    throw new Error("You are not a member of this group");
  }

  // 3️⃣ admin check
  if (member.role !== "admin") {
    throw new Error("Only group admin can delete the group");
  }

  // 4️⃣ delete group
  await groupRepo.deleteGroup(groupId);
};

exports.getGroupMembers = async ({ groupId, userId }) => {
  // group exist?
  const group = await groupRepo.findById(groupId);
  if (!group) throw new Error("Group not found");

  // requester member?
  const member = await groupRepo.getMember(groupId, userId);
  if (!member) throw new Error("You are not a group member");
  console.log("🔥 Backend members from DB:", JSON.stringify(member, null, 2));

  return await groupRepo.getGroupMembers(groupId);
};
