const balanceService = require("../services/balance.services");

exports.getGroupBalance = async (req, res) => {
  try {
    const userId = req.user.id;
    const { groupId } = req.params;

    const balance = await balanceService.getGroupBalance({
      groupId,
      userId,
    });

    res.json(balance);
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
};
