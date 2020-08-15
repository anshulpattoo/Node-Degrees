# See here for image contents: https://github.com/microsoft/vscode-dev-containers/tree/v0.134.0/containers/javascript-node/.devcontainer/base.Dockerfile
FROM nikolaik/python-nodejs:python3.8-nodejs14

# USER vscode

RUN mkdir /home/node && \
    adduser node

# USER node

COPY keystore/default.keystore /home/node/.dcp/
COPY keystore/id.keystore /home/node/.dcp/
COPY install.sh /install/

RUN chown -R 1000:1000 /home/node && \
    /install/install.sh

# [Optional] Uncomment this section to install additional OS packages.
# RUN apt-get update && export DEBIAN_FRONTEND=noninteractive \
#     && apt-get -y install --no-install-recommends <your-package-list-here>

# [Optional] Uncomment if you want to install an additional version of node using nvm
# ARG EXTRA_NODE_VERSION=10
# RUN su node -c "source /usr/local/share/nvm/nvm.sh && nvm install ${EXTRA_NODE_VERSION}"

# [Optional] Uncomment if you want to install more global node modules
# RUN sudo -u node npm install -g <your-package-list-here>
