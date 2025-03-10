import Router from "express";
import auth from "../middleware/auth.js"
import { createProductController, deleteProductController, getProductController, getProductsbyCategory, getProductsByCategoryAndSubCategory, getProductsDetails, searchProducts, updateProductController } from "../controller/product.controller.js";
import { admin } from "../middleware/Admin.js";

const productRouter = Router();

productRouter.post("/create", auth, createProductController)
productRouter.post("/get", getProductController)
productRouter.post("/getProductsByCategory", getProductsbyCategory)
productRouter.post("/getProductsByCategoryAndSubCategory", getProductsByCategoryAndSubCategory)
productRouter.post("/getProductsDetails", getProductsDetails)
productRouter.put("/updateProducts",auth, admin, updateProductController)
productRouter.delete("/deleteProducts",auth, admin, deleteProductController)
productRouter.post("/searchProducts", searchProducts)
export default productRouter;