# Reminders-App
A smart task scheduler with advanced features (web clone of reminders app from MacOS, but more simplified)

# Technology stack
- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [AntDesign](https://ant.design/)
- [StyledComponents](https://styled-components.com/)
- [ReduxToolkit](https://redux-toolkit.js.org/)
- [Vite](https://vite.dev/)
- [ExpressJS](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Mongoose](https://mongoosejs.com/)

## How to run the project

### Requirements
To install and run the aplication you need [NodeJs](https://nodejs.org/en)

### Install Dependencies
```
$ npm install
```
### Create mongodb Cluster
This app is using mongodb, so you need to create your own [mongodb cluster](https://www.mongodb.com/docs/guides/atlas/cluster/) to use it 

### Get YandexMaps API key
This app is using yandex maps, to use it you need to get an [api key](https://developer.tech.yandex.ru/services)

### Create .env files
To use this app you should create .env file in client and server folder and put next env variables:

For Client folder:

VITE_SERVER_LINK='http://localhost:4000/' <br />
VITE_YMAPS_API_KEY='Your api key here' <br />

For Server folder:

PORT="4000" - here you can set post number(if you change it, you also need to set it in client folder .env file). <br />
DATABASE_PASSWORD="" - your db password here. <br />
JWT_SECRET="" - your jwt secret key (you can set any value). <br />
DATABASE="mongodb+srv://"username":<PASSWORD>@testconstuctorcluster.irsbj.mongodb.net/?retryWrites=true&w=majority&appName=TestConstuctorCluster" - put your cluster link and set your username instaed "username"  and put  <PASSWORD> keyword instead of password like in example. <br />
