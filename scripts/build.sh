#!/bin/bash

set -e

ts_config_esm="./tsconfig.esm.json"
ts_config_cjs="./tsconfig.cjs.json"
tsc="tsc -b"
umd="yarn run build:umd"

$tsc $ts_config_esm
$tsc $ts_config_cjs
$umd
