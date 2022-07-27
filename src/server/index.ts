import * as grpc from "grpc";
import ProductInfoServer from "./ProductInfoServer";
import { ProductInfoService } from "../protogen/product_info_grpc_pb";

function startServer()
{
  const server = new grpc.Server();

  server.addService(ProductInfoService, new ProductInfoServer());
  server.bind("127.0.0.1:50051", grpc.ServerCredentials.createInsecure());
  server.start();

  console.log("Server started, listening: 127.0.0.1:50051");
}

startServer();

process.on("uncaughtException", (err) =>
{
  console.log(`process on uncaughtException error: ${err}`);
});

process.on("unhandledRejection", (err) =>
{
  console.log(`process on unhandledRejection error: ${err}`);
});
