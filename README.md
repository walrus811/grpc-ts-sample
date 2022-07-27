# gRPC Typescript(Node) 샘플

gRPC를 Typescript(Node) 환경에서 사용하는 샘플 코드입니다.

## 1. 빌드

사전에 환경에 맞는 [protc](https://github.com/protocolbuffers/protobuf/releases) 컴파일러를 설치하고 해당 실행파일을 환경변수로 등록을 해야합니다.

```bash
$ git clone https://github.com/malgn/grpc-ts-sample.git
$ cd grpc-ts-sample
$ yarn
$ yarn build
# src/protogen 밑에 gRpc 코드 생성
$ yarn serve
# Server started, listening: 127.0.0.1:50051
```
