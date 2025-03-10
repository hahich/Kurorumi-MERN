import subCategoryModel from "../model/subCategory.model.js"


export const addSubCategoryController = async (req, res) => {
    try {
        const { name, image, category } = req.body

        if (!name && !image && !category[0]) {
            return res.status(400).json({
                message: "Provided name, image, category",
                error: true,
                success: false
            })
        }

        const payload = {
            name,
            image,
            category,
        }

        const createSubCategory = new subCategoryModel(payload)
        const save = await createSubCategory.save()

        return res.json({
            message: "Sub Category Save",
            data: save,
            error: false,
            success: true,
        })


    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        });
    }
}

export const getSubCategoryController = async (req, res) => {
    try {
        const data = await subCategoryModel.find().sort({ createdAt: -1 }).populate('category')
        return res.json({
            message: "Sub Category data",
            data: data,
            success: true,
            error: false
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}

export const updateSubCategoryController = async (req, res) => {
    try {
        const { _id, name, image, category } = req.body

        const checkSub = await subCategoryModel.findById(_id)
        if (!checkSub) {
            return res.status(400).json({
                message: "Check your _id",
                error: true,
                success: false
            })
        }

        const updateSubCategory = await subCategoryModel.findByIdAndUpdate(_id, {
            name, image, category
        })

        return res.json({
            message: "Update Successfully",
            data: updateSubCategory,
            error: false,
            success: true
        })


    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}

export const deleteSubCategoryController = async (req, res) => {
    try {
        const { _id } = req.body

        const deleteSubCategory = await subCategoryModel.findByIdAndDelete(_id)

        return res.json({
            message: "Delete Successfully",
            data: deleteSubCategory,
            error: false,
            success: true
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}