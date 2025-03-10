import CategoryModel from "../model/category.model.js";
import subCategoryModel from "../model/subCategory.model.js";
import productModel from "../model/product.model.js";

export const AddCategoryController = async (req, res) => {
    try {
        const { name, image } = req.body

        if (!name || !image) {
            return res.status(400).json({
                message: "Enter fields",
                success: false,
                error: true
            })
        }

        const addCategory = new CategoryModel({
            name,
            image,
        })

        const saveCategory = await addCategory.save()

        if (!saveCategory) {
            return new res.status(500).json({
                message: "Not Created",
                error: true,
                success: true,
            })
        }

        return res.json({
            message: "Add Category",
            date: saveCategory,
            success: true,
            error: false,
        })

    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            success: false,
            error: true
        })
    }
}

export const getCategoryController = async (req, res) => {
    try {

        const data = await CategoryModel.find().sort({ createdAt: 1 })

        return res.json({
            data: data,
            error: false,
            success: true
        })

    } catch (error) {
        return res.status(500).json({
            messsage: error.message || error,
            success: false,
            error: true
        })
    }
}

export const updateCategoryController = async (req, res) => {
    try {
        const { _id, name, image } = req.body

        const update = await CategoryModel.updateOne({
            _id: _id,
        }, {
            name,
            image
        })

        return res.json({
            message: "Update Successfully",
            data: update,
            error: false,
            success: true
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            success: false,
            error: true
        })
    }
}

export const deleteCategoryController = async (req, res) => {
    try {
        const { _id } = req.body

        const checkSubCategory = await subCategoryModel.find({
            categoryId: {
                "$in": [_id]
            }
        }).countDocuments()

        const checkProduct = await productModel.find({
            categoryId: {
                "$in": [_id]
            }
        }).countDocuments()

        if (checkSubCategory > 0 || checkProduct > 0) {
            return res.status(400).json({
                message: "Category is already use can't delete",
                error: true,
                success: false
            })
        }

        const deleteCategory = await CategoryModel.deleteOne({ _id: _id })

        return res.json({
            message: "Delete Category Successfully",
            data: deleteCategory,
            error: false,
            success: true
        })

    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            success: false,
            error: true
        })
    }
}