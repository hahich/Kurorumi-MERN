import uploadImgCloudinary from "../utils/uploadImgCloudinary.js"

const uploadImgController = async (req, res) => {
    try {
        const file = req.file

        const uploadImg = await uploadImgCloudinary(file)

        return res.json({
            message: "Upload done",
            data: uploadImg,
            success: true,
            error: false
        })
    } catch (error) {
        res.status(500).json({
            message: error.message || error,
            success: false,
            error: true
        })
    }
}

export default uploadImgController;