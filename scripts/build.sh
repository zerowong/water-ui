#!/bin/bash

set -e

run="yarn run"

# must be first
$run "build:umd"

$run "build:esm"
$run "build:cjs"
$run "build:css"
