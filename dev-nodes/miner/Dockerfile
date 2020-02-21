FROM ubuntu:xenial

RUN apt-get update \
     && apt-get install -y wget software-properties-common \
     && rm -rf /var/lib/apt/lists/*

WORKDIR "/root"

RUN add-apt-repository -y ppa:ethereum/ethereum
RUN apt-get update \
     && apt-get install -y ethereum

ARG password
ARG privatekey
RUN echo $password > ~/.accountpassword
RUN echo $privatekey > ~/.privatekey

ADD ./genesis.json ./genesis.json
RUN geth init genesis.json
RUN geth account import --password ~/.accountpassword  ~/.privatekey

ENV address=""
ENV bootnodeId=""
ENV bootnodeIp=""

CMD exec geth --bootnodes "enode://$bootnodeId@$bootnodeIp:30301" \
    --networkid "1582098195" --verbosity=4  --syncmode=full --mine \
    --gasprice "0" --rpc --rpcaddr "0.0.0.0" --rpccorsdomain "*" \
    --nousb --allow-insecure-unlock
#--etherbase $address --unlock $address --password ~/.accountpassword --nousb --
#CMD exec geth --verbosity 4  --mine --port 30301 \
#    --networkid "1582098195" --gasprice "0" --nousb --rpc --rpcaddr "0.0.0.0" \
#    --nodiscover

EXPOSE 8545
EXPOSE 30303
