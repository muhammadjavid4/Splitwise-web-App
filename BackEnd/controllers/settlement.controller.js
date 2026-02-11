const settlementService = require("../services/settlement.services");

exports.settleUp = async (req, res) => {
  try {
    const userId = req.user.id;
    const { groupId, paidTo, amount, method } = req.body;

    const settlement = await settlementService.settleUp({
      groupId,
      paidBy: userId,
      paidTo,
      amount,
      method,
      createdBy: userId,
    });

    res.status(201).json({
      message: "Settlement completed successfully",
      settlement,
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};


exports.getGroupHistory = async (req, res) => {
  try {
    const userId = req.user.id;
    const { groupId } = req.params;

    const data = await settlementService.getGroupHistory({
      groupId,
      userId,
    });

    res.json({ settlements: data });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.getMyHistory = async (req, res) => {
  try {
    const userId = req.user.id;

    const data = await settlementService.getMyHistory(userId);
    res.json({ settlements: data });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// controllers/settlement.controller.js

exports.updateMethod = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;
    const { method } = req.body;

    if (!["cash", "UPI"].includes(method)) {
      throw new Error("Invalid method");
    }

    await settlementService.updateMethod({
      id,
      userId,
      method,
    });

    res.json({
      message: "Settlement method updated",
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};


exports.undoSettlement = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;

    await settlementService.undoSettlement({
      id,
      userId,
    });

    res.json({
      message: "Settlement undone successfully",
    });
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
};

// exports.undoSettlement = async (req, res) => {
//   try {
//     const userId = req.user.id;
//     const { id } = req.params;

//     await settlementService.undoSettlement({
//       id,
//       userId,
//     });

//     res.json({
//       message: "Settlement undone successfully",
//     });
//   } catch (err) {
//     res.status(400).json({
//       message: err.message,
//     });
//   }
// };

// exports.undoSettlement = async (req, res) => {
//   try {
//     const userId = req.user.id;
//     const { id } = req.params;

//     await settlementService.undoSettlement({
//       id,
//       userId,
//     });

//     res.json({
//       message: "Settlement undone successfully",
//     });
//   } catch (err) {
//     res.status(400).json({
//       message: err.message,
//     });
//   }
// };

