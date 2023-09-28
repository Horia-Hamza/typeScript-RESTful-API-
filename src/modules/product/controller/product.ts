import productModel from "../../../../DB/models/product";
import UserModel from "../../../../DB/models/user";
import { NextFunction, Request, Response } from "express";
import { asyncHandler } from "../../../services/errorHandling";
import {
  CreateProduct,
  UpdateProduct,
} from "../../../../DB/interfaces/product.interface";
export const createProduct = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = await UserModel.findById((req as any).user._id);
    if (!user) {
      const error = new Error("can not find user");
      (error as any).cause = 404;
      return next(error);
    } else {
      const newProduct: CreateProduct = {
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
      };
      const product = new productModel(newProduct);
      if (!product) {
        const error = new Error("can not create product");
        (error as any).cause = 200;
        return next(error);
      } else {
        return res.status(201).json({ message: "Done", product });
      }
    }
  }
);
export const updateProduct = asyncHandler(async (req, res, next) => {
  const user = await UserModel.findById((req as any).user._id);
  if (!user) {
    const error = new Error("can not find user");
    (error as any).cause = 404;
    return next(error);
  } else {
    const { id } = req.params;
    const product = await productModel.findById(id);
    if (!product) {
      const error = new Error("can not find product");
      (error as any).cause = 404;
      return next(error);
    } else {
      const newProduct: UpdateProduct = {
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
      };
      const updatedProduct = await productModel.findOneAndUpdate(
        { _id: id },
        newProduct,
        { new: true }
      );
      if (updatedProduct) {
        return res.status(201).json({ message: "Done", updatedProduct });
      } else {
        const error = new Error("fail to update product");
        (error as any).cause = 400;
        return next(error);
      }
    }
  }
});
export const products = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const products = await productModel.find();
    if (!products) {
      const error = new Error("can not find products");
      (error as any).cause = 404;
      return next(error);
    } else {
      return res.status(201).json({ message: "Done", products });
    }
  }
);
export const product = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const product = await productModel.findById(id);
    if (!product) {
      const error = new Error("can not find product");
      (error as any).cause = 404;
      return next(error);
    } else {
      return res.status(201).json({ message: "Done", product });
    }
  }
);
export const deleteProduct = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const deletedProduct = await productModel.findByIdAndDelete(id);
    if (!product) {
      const error = new Error("can not find product");
      (error as any).cause = 404;
      return next(error);
    } else {
      return res.status(201).json({ message: "Done", deletedProduct });
    }
  }
);
