FROM library/node:22.6
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY ./ /usr/src/app
ENV NODE_ENV production
RUN npm install --production && npm cache clean --force && npm run build --if-present
RUN npx @puppeteer/browsers install chrome@stable
ENV PORT 80
EXPOSE 80
CMD [ "npm", "start" ]
