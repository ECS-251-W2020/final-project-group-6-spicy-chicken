FROM ubuntu:xenial

RUN apt-get update \
     && apt-get install -y wget software-properties-common \
     && rm -rf /var/lib/apt/lists/*

WORKDIR "/root"

RUN add-apt-repository -y ppa:ethereum/ethereum
RUN apt-get update \
     && apt-get install -y ethereum

ENV nodekeyhex=""
CMD exec bootnode -nodekeyhex $nodekeyhex -verbosity 9 -addr :30301

EXPOSE 30301/udp
EXPOSE 30303/udp
