import productModel from "../model/product.model.js"

export const createProductController = async (req, res) => {
    try {
        const { name, image, category, subCategory, unit, stock, price, discount, descriptions, more_detail } = req.body
        if (!name || !image[0] || !category[0] || !subCategory[0] || !unit || !stock || !price || !descriptions) {
            return res.status(400).json({
                message: "All field is required",
                error: true,
                success: false,
            })
        }

        const products = new productModel({
            name, image, category, subCategory, unit, stock, price, discount, descriptions, more_detail
        })
        const saveProducts = await products.save()
        return res.json({
            message: "Product create successfully",
            data: saveProducts,
            error: false,
            success: true,
        })

    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false,
        })
    }
}

export const getProductController = async (req, res) => {
    try {
        let { page, limit, search } = req.body

        if (!page) {
            page = 2
        }

        if (!limit) {
            limit = 10
        }

        const query = search ? {
            $text: {
                $search: search
            }
        } : {}

        const skip = (page - 1) * limit

        const [data, totalCount] = await Promise.all([
            productModel.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit),
            productModel.countDocuments(query)
        ])

        return res.json({
            message: "Product Data",
            totalCount: totalCount,
            error: false,
            success: true,
            totalNoPage: Math.ceil(totalCount / limit),
            data: data
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false,
        })
    }
}

export const getProductsbyCategory = async (req, res) => {
    try {
        const { id } = req.body

        if (!id) {
            return res.status(400).json({
                message: "Provide Category Id",
                error: true,
                success: false
            })
        }

        const products = await productModel.find({ category: { $in: id } }).limit(20)

        return res.json({
            message: "Category Products List",
            data: products,
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

export const getProductsByCategoryAndSubCategory = async (req, res) => {
    try {
        const { categoryId, subCategoryId, page, limit } = req.body

        if (!categoryId || !subCategoryId) {
            return res.status(400).json({
                message: "Provide Category Id and Sub Category Id",
                error: true,
                success: false
            })
        }

        if (!page) {
            page = 1
        }

        if (!limit) {
            limit = 10
        }

        const query = {
            category: { $in: categoryId },
            subCategory: { $in: subCategoryId }
        }

        const skip = (page - 1) * limit

        const [data, dataCount] = await Promise.all([
            productModel.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit).populate("category subCategory"),
            productModel.countDocuments(query)
        ])

        return res.json({
            message: "Products List",
            data: data,
            totalCount: dataCount,
            page: page,
            limit: limit,
            error: false,
            success: true,
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}

export const getProductsDetails = async (req, res) => {
    try {
        const { productsId } = req.body

        const products = await productModel.findOne({ _id: productsId })

        return res.json({
            message: "Products Details",
            data: products,
            error: false,
            success: true,
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false,
        })
    }
}

export const updateProductController = async (req, res) => {
    try {
        const { _id } = req.body

        if (!_id) {
            return res.status(400).json({
                message: "Provide Product Id",
                error: true,
                success: false,
            })
        }

        const updateProducts = await productModel.updateOne({
            _id: _id
        }, {
            ...req.body,
        })

        return res.json({
            message: "Update Successfully",
            data: updateProducts,
            error: false,
            success: true,
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false,
        })
    }
}

export const deleteProductController = async (req, res) => {
    try {
        const { _id } = req.body

        if (!_id) {
            return res.status(400).json({
                message: "Provide Product Id",
                error: true,
                success: false,
            })
        }

        const deleteProducts = await productModel.deleteOne({ _id: _id })

        return res.json({
            message: "Product Delete Successfully",
            data: deleteProducts,
            error: false,
            success: true,
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false,
        })
    }
}

export const searchProducts = async (req, res) => {
    try {
        let { search, page, limit } = req.body;
        page = page ? parseInt(page) : 1;
        limit = limit ? parseInt(limit) : 10;
        const query = search ? {
            $text: {
                $search: search
            }
        } : {};
        const skip = (page - 1) * limit

        const [data, dataCount] = await Promise.all([
            productModel.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit).populate('category subCategory'),
            productModel.countDocuments(query)
        ]);

        return res.json({
            message: "Products Data",
            data: data,
            totalCount: dataCount,
            page: page,
            limit: limit,
            totalPage: Math.ceil(dataCount/limit),
            error: false,
            success: true,
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        });
    }
}