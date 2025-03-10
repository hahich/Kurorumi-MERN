import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    image: {
      type: Array,
      default: [],
    },
    category: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "category",
      },
    ],
    subCategory: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "subCategory",
      },
    ],
    unit: {
      type: String,
      default: "",
    },
    stock: {
      type: Number,
      default: null,
    },
    price: {
      type: Number,
      default: null,
    },
    discount: {
      type: Number,
      default: null,
    },
    descriptions: {
      type: String,
      default: "",
    },
    more_detail: {
      type: Object,
      default: {},
    },
    public: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

// create a text index 
productSchema.index(
  {
    name: "text",
    descriptions: "text"
  },
  {
    weights: {
      name: 10,
      descriptions: 5
    }
  }
);
const productModel = mongoose.model("product", productSchema);
export default productModel;