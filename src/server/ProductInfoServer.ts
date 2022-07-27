import * as grpc from "grpc";
import { IProductInfoServer } from "../protogen/product_info_grpc_pb";
import { Product, ProductID } from "../protogen/product_info_pb";
import { v4 as uuidv4 } from 'uuid';
import store from "./store";

class ProductInfoServer implements IProductInfoServer
{
  addProduct(call: grpc.ServerUnaryCall<Product>, callback: grpc.sendUnaryData<ProductID>)
  {
    const newProduct = new Product();
    newProduct.setId(uuidv4());
    newProduct.setName(call.request.getName());
    newProduct.setDescription(call.request.getDescription());
    store.push(newProduct);

    const response = new ProductID();
    response.setValue(newProduct.getId());
    callback(null, response);
  };

  getProduct(call: grpc.ServerUnaryCall<ProductID>, callback: grpc.sendUnaryData<Product>)
  {
    const foundProduct = store.find(x => x.getId() === call.request.getValue());
    if (foundProduct)
      callback(null, foundProduct);
    else
      callback({ code: grpc.status.NOT_FOUND, name: "Not Found!", message: "바보", details: "바보바보" }, null);
  };
}

export default ProductInfoServer;