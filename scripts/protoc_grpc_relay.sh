
#!/bin/bash

ROOT_PROTO_DIR="./proto/cosmos/cosmos-sdk"
COSMOS_PROTO_DIR="$ROOT_PROTO_DIR/proto"
THIRD_PARTY_PROTO_DIR="$ROOT_PROTO_DIR/third_party/proto"
OUT_DIR="./src/grpc_web_services"

mkdir -p "$OUT_DIR"

protoc --plugin="protoc-gen-ts=./node_modules/.bin/protoc-gen-ts" \
    --js_out="import_style=commonjs,binary:$OUT_DIR" \
    --ts_out="service=grpc-web:$OUT_DIR" \
    --proto_path="$COSMOS_PROTO_DIR" \
    --proto_path="$THIRD_PARTY_PROTO_DIR" \
    ./proto/cosmos/cosmos-sdk/third_party/proto/pairing/relay.proto \
    ./proto/cosmos/cosmos-sdk/third_party/proto/pairing/badges.proto \
    ./proto/cosmos/cosmos-sdk/third_party/proto/epochstorage/stake_entry.proto \
    ./proto/cosmos/cosmos-sdk/third_party/proto/epochstorage/endpoint.proto \
    $COSMOS_PROTO_DIR/gogoproto/gogo.proto \
    $COSMOS_PROTO_DIR/google/protobuf/descriptor.proto \
    $COSMOS_PROTO_DIR/google/protobuf/wrappers.proto \
    $COSMOS_PROTO_DIR/cosmos/base/v1beta1/coin.proto \
    $COSMOS_PROTO_DIR/cosmos_proto/cosmos.proto \
# mv ./src/proto/test ./src/pairing/.
# rm -rf ./src/proto
# mv ./src/pairing ./src/proto

cp -r $OUT_DIR ./bin/src/.

echo "-------------------- CHANGE NEEDED --------------"
echo "We need to change camel case to snake case in relay_pb.js"
echo "Also copy the compiled files to the bin"
echo "-------------------------------------------------"