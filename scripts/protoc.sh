#!/bin/bash
set -o errexit -o nounset -o pipefail
command -v shellcheck >/dev/null && shellcheck "$0"

ROOT_PROTO_DIR="./proto/cosmos/cosmos-sdk"
COSMOS_PROTO_DIR="$ROOT_PROTO_DIR/proto"
THIRD_PARTY_PROTO_DIR="$ROOT_PROTO_DIR/third_party/proto"
OUT_DIR="./src/codec/"

mkdir -p "$OUT_DIR"

protoc \
  --plugin="./node_modules/.bin/protoc-gen-ts_proto" \
  --ts_proto_out="$OUT_DIR" \
  --proto_path="$COSMOS_PROTO_DIR" \
  --proto_path="$THIRD_PARTY_PROTO_DIR" \
  --ts_proto_opt="esModuleInterop=true,forceLong=long,useOptionals=true" \
  "$COSMOS_PROTO_DIR/cosmos/auth/v1beta1/auth.proto" \
  "$COSMOS_PROTO_DIR/cosmos/auth/v1beta1/query.proto" \
  "$COSMOS_PROTO_DIR/cosmos/bank/v1beta1/bank.proto" \
  "$COSMOS_PROTO_DIR/cosmos/bank/v1beta1/query.proto" \
  "$COSMOS_PROTO_DIR/cosmos/bank/v1beta1/tx.proto" \
  "$COSMOS_PROTO_DIR/cosmos/base/abci/v1beta1/abci.proto" \
  "$COSMOS_PROTO_DIR/cosmos/base/query/v1beta1/pagination.proto" \
  "$COSMOS_PROTO_DIR/cosmos/base/v1beta1/coin.proto" \
  "$COSMOS_PROTO_DIR/cosmos/crypto/multisig/v1beta1/multisig.proto" \
  "$COSMOS_PROTO_DIR/cosmos/crypto/secp256k1/keys.proto" \
  "$COSMOS_PROTO_DIR/cosmos/distribution/v1beta1/distribution.proto" \
  "$COSMOS_PROTO_DIR/cosmos/distribution/v1beta1/query.proto" \
  "$COSMOS_PROTO_DIR/cosmos/distribution/v1beta1/tx.proto" \
  "$COSMOS_PROTO_DIR/cosmos/staking/v1beta1/query.proto" \
  "$COSMOS_PROTO_DIR/cosmos/staking/v1beta1/staking.proto" \
  "$COSMOS_PROTO_DIR/cosmos/staking/v1beta1/tx.proto" \
  "$COSMOS_PROTO_DIR/cosmos/tx/signing/v1beta1/signing.proto" \
  "$COSMOS_PROTO_DIR/cosmos/tx/v1beta1/tx.proto" \
  "$COSMOS_PROTO_DIR/cosmos/vesting/v1beta1/vesting.proto" \
  "$COSMOS_PROTO_DIR/tendermint/abci/types.proto" \
  "$COSMOS_PROTO_DIR/tendermint/crypto/keys.proto" \
  "$COSMOS_PROTO_DIR/tendermint/crypto/proof.proto" \
  "$COSMOS_PROTO_DIR/tendermint/libs/bits/types.proto" \
  "$COSMOS_PROTO_DIR/tendermint/types/params.proto" \
  "$COSMOS_PROTO_DIR/tendermint/types/types.proto" \
  "$COSMOS_PROTO_DIR/tendermint/types/validator.proto" \
  "$COSMOS_PROTO_DIR/tendermint/version/types.proto" \
  "$THIRD_PARTY_PROTO_DIR/conflict/query.proto" \
  "$THIRD_PARTY_PROTO_DIR/conflict/tx.proto" \
  "$THIRD_PARTY_PROTO_DIR/conflict/params.proto" \
  "$THIRD_PARTY_PROTO_DIR/conflict/conflict_vote.proto" \
  "$THIRD_PARTY_PROTO_DIR/conflict/conflict_data.proto" \
  "$THIRD_PARTY_PROTO_DIR/epochstorage/endpoint.proto" \
  "$THIRD_PARTY_PROTO_DIR/epochstorage/tx.proto" \
  "$THIRD_PARTY_PROTO_DIR/epochstorage/params.proto" \
  "$THIRD_PARTY_PROTO_DIR/epochstorage/query.proto" \
  "$THIRD_PARTY_PROTO_DIR/epochstorage/epoch_details.proto" \
  "$THIRD_PARTY_PROTO_DIR/epochstorage/fixated_params.proto" \
  "$THIRD_PARTY_PROTO_DIR/epochstorage/stake_entry.proto" \
  "$THIRD_PARTY_PROTO_DIR/epochstorage/stake_storage.proto" \
  "$THIRD_PARTY_PROTO_DIR/pairing/epoch_payments.proto" \
  "$THIRD_PARTY_PROTO_DIR/pairing/tx.proto" \
  "$THIRD_PARTY_PROTO_DIR/pairing/params.proto" \
  "$THIRD_PARTY_PROTO_DIR/pairing/query.proto" \
  "$THIRD_PARTY_PROTO_DIR/pairing/relay.proto" \
  "$THIRD_PARTY_PROTO_DIR/pairing/relayCache.proto" \
  "$THIRD_PARTY_PROTO_DIR/pairing/stake_to_max_cu_list.proto" \
  "$THIRD_PARTY_PROTO_DIR/pairing/unique_payment_storage_client_provider.proto" \
  "$THIRD_PARTY_PROTO_DIR/pairing/provider_payment_storage.proto" \
  "$THIRD_PARTY_PROTO_DIR/spec/params.proto" \
  "$THIRD_PARTY_PROTO_DIR/spec/tx.proto" \
  "$THIRD_PARTY_PROTO_DIR/spec/query.proto" \
  "$THIRD_PARTY_PROTO_DIR/spec/service_api.proto" \
  "$THIRD_PARTY_PROTO_DIR/spec/spec_add_proposal.proto" \
  "$THIRD_PARTY_PROTO_DIR/spec/spec.proto" \
  "$THIRD_PARTY_PROTO_DIR/common/fixationEntry.proto" \
  "$THIRD_PARTY_PROTO_DIR/plans/params.proto" \
  "$THIRD_PARTY_PROTO_DIR/plans/plan.proto" \
  "$THIRD_PARTY_PROTO_DIR/plans/plans_add_proposal.proto" \
  "$THIRD_PARTY_PROTO_DIR/plans/query.proto" \
  "$THIRD_PARTY_PROTO_DIR/plans/tx.proto" \
  "$THIRD_PARTY_PROTO_DIR/projects/params.proto" \
  "$THIRD_PARTY_PROTO_DIR/projects/project.proto" \
  "$THIRD_PARTY_PROTO_DIR/projects/query.proto" \
  "$THIRD_PARTY_PROTO_DIR/projects/tx.proto" \
  "$THIRD_PARTY_PROTO_DIR/subscription/tx.proto" \
  "$THIRD_PARTY_PROTO_DIR/subscription/params.proto" \
  "$THIRD_PARTY_PROTO_DIR/subscription/query.proto" \
  "$THIRD_PARTY_PROTO_DIR/subscription/subscription.proto" \

# Remove unnecessary codec files
rm -rf \
  src/codec/cosmos_proto/ \
  src/codec/gogoproto/ \
  src/codec/google/api/ \
  src/codec/google/protobuf/descriptor.ts