#!/bin/bash

# Function to install npm dependencies in a given directory
install_npm_dependencies() {
  local dir=$1
  if [ -d "$dir" ]; then
    echo "Installing npm dependencies in $dir"
    cd $dir
    npm install
    cd ..
  else
    echo "Directory $dir does not exist"
  fi
}

# List of directories to install dependencies in
directories=("ui" "zost-cli")

# Iterate over each directory and install dependencies
for dir in "${directories[@]}"; do
  install_npm_dependencies $dir
done

echo "All dependencies installed"
