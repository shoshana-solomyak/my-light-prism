#!/usr/bin/env bash

VERS="$(node --version)"
WANTED_MAJOR="v22"

npm_err() {
  echo -e "\x1b[40mnpm\x1b[0m \x1b[40;31mERR!\x1b[0m $1"
}

# check if we're using node v18
if [[ $VERS =~ ^"$WANTED_MAJOR" ]]; then
  # remove the npm_err function
  unset -f npm_err
  # exit with a success code
  true
else
  npm_err "You are using the incorrect version of \x1b[33;1mnode\x1b[0m."
  npm_err "Please run \x1b[33;1mnvm use\x1b[0m and then run \x1b[33;1mpnpm install\x1b[0m again."
  echo ""
  # remove the npm_err function
  unset -f npm_err
  # exit with an error code
  false
fi
