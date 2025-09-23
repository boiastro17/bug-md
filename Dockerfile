FROM quay.io/boiastro17/CRISPYSTORM-v2
RUN git clone https://github.com/boiastro17/CRIPYSTORM-XMD /root/CRISPYSTORM-XMD
# RUN rm -rf /root/SUHAIL-XMD/.git
WORKDIR /root/CRISPYSTORM-XMD
RUN npm install || yarn install
EXPOSE 8000
CMD ["npm","start" ]
