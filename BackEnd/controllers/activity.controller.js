const activityService = require("../services/activity.services");

// exports.getGroupActivity = async (req, res) => {
//   try {
//     const { groupId } = req.params;

//     const logs = await activityService.getGroupActivity(groupId);

//     res.json({ activities: logs });
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// };

exports.getGroupActivities = async (req, res) => {
  try {
    const { groupId } = req.params;

    const activities = await activityService.getGroupActivities(groupId);
    const formatted = activityService.formatActivities(activities);

    res.json({ activities: formatted });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
