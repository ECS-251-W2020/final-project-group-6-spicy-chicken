#!/usr/bin/env bash

#
# This script is intended to provision a machine with all necessary things to
# get subsequent software running.
#
# Typically used by a build system or Vagrant to provision the Base OS
# necessities.
#

# update lists and install basic stuff
sudo apt-get update
sudo apt-get -y install \
    apt-transport-https \
    ca-certificates \
    curl \
    gnupg-agent \
    software-properties-common vim tmux

# Add docker to repo lists and install it.
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
sudo add-apt-repository -y\
   "deb [arch=amd64] https://download.docker.com/linux/ubuntu \
   $(lsb_release -cs) \
   stable"
sudo apt-get update
sudo apt-get -y install docker-ce docker-ce-cli containerd.io

# add user to docker group
sudo usermod -aG docker $USER

# install docker-compose
sudo curl -L "https://github.com/docker/compose/releases/download/1.25.3/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# install node and npm
curl -sL https://deb.nodesource.com/setup_10.x | sudo -E bash -
sudo apt-get install -y nodejs

# install react-native deps
sudo npm install -f -g yarn
sudo npm install -g expo-cli

# install solc
#sudo npm install -g solc

# Auto complete for docker
sudo curl -L https://raw.githubusercontent.com/docker/compose/1.25.3/contrib/completion/bash/docker-compose -o /etc/bash_completion.d/docker-compose

# Add helper aliases
cat ./bash_aliases >> ~/.bashrc

# install more stuff
sudo apt-get install -y golang

# for eth-net-intelligence-api
sudo yarn global add pm2

# config
echo 'export GOPATH=$HOME/gocode' >> ~/.bashrc
echo 'export SPCK_PROJECT_PATH="${HOME}/spicy-chicken"' >> ~/.bashrc
echo 'export SPCK_DATA_ROOT="${SPCK_PROJECT_PATH}/eth-machines-data"' >> ~/.bashrc
echo 'export NODE_PATH="${SPCK_PROJECT_PATH}/node-lib-path"' >> ~/.bashrc


# install geth tools
sudo add-apt-repository -y ppa:ethereum/ethereum
sudo apt get update
sudo apt install abigen solc parallel jq

# do truffle setup
sudo npm -g install firebase-admin
#npm install truffle-hdwallet-provider


# do deploy


