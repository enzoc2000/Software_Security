FROM openjdk:17-jdk-slim

# BESU_VERSION=24.3.3
ENV BESU_HOME=/opt/besu

RUN apt-get update && apt-get install -y wget unzip && \
    mkdir -p ${BESU_HOME} && \
    wget https://hyperledger.jfrog.io/artifactory/besu-binaries/besu/24.3.3/besu-24.3.3.zip -O /tmp/besu.zip && \
    unzip /tmp/besu.zip -d ${BESU_HOME} && \
    ln -s ${BESU_HOME}/besu-24.3.3/bin/besu /usr/local/bin/besu && \
    rm /tmp/besu.zip

WORKDIR /data

# # overritten by docker-compose command
# # Expose Besu standard ports
# # JSON-RPC HTTP
# EXPOSE 8545
# # JSON-RPC WebSockets
# EXPOSE 8546
# # Metrics
# EXPOSE 9545
# # GraphQL
# EXPOSE 8547
# # Peer-to-peer discovery (UDP)
# EXPOSE 30303/udp
# # Peer-to-peer communication (TCP)
# EXPOSE 30303

CMD ["besu"]