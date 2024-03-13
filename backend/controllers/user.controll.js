let User = require('../models/user.model');

exports.getUsersForSidebar = async (req, res) => {
    try {
        let loggedInUserId = req.user._id;
        let filteredUsers = await User.find({ _id: { $ne: loggedInUserId } }).select("-password");

        return res.status(200).json(filteredUsers);
    } catch (error) {
        console.error("Error in getUsersForSidebar: ", error.message);
		res.status(500).json({ error: "Internal server error" });
    }
}