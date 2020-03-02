FROM mhart/alpine-node:8.1.2
WORKDIR /src
ADD . .
EXPOSE 8000

ENV NODE_ENV production

EXPOSE 8000
CMD ["npm", "run", "start:prod"]

