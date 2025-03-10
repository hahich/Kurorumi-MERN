import UserModel from '../model/user.model.js';

export const admin = async (req, res, next) => {
    try {
        const userId = req.userId;
        console.log(userId);
        
        const user = await UserModel.findById(userId)

        if(!user) {
            return res.status(404).json({
                message: "User not found",
                error: true,
                success: false,
            })
        }
        
        if(user.role !== "Admin") {
            return res.status(403).json({
                message: "permission denied",
                error: true,
                success: false,
            })
        }

        next()
    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false,
        })
    }
}