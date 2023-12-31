# mern stack

#### source: [Create a MERN CRUD App](https://www.youtube.com/playlist?list=PL-LRDpVN2fZA-1igOQ6PDcqfBjS-vaC7w)

---

## creating a express backend

-   creating folder [server](./server/)
-   `npm init -y`
-   `npm install --save express mongoose dotenv nodemon`
-   create `server.js` file
-   add dev script to [package.json](./server/package.json)
    -   `"dev": "nodemon server.js",`
-   create `.env` file

## creating a react frontend

-   creating folder [client](./client/)
-   `npx create-react-app .`
    -   if you get an error, try `npm install -g npm` and then `npx create-react-app .`
-   run `npm start` to start the react app
-   cleaned unnecesary imports and code from [App.js](./client/src/App.js) and [index.js](./client/src/index.js)
-   implemented barebones frontend for the app
    -   allows creation, deletion, edition and listing of notes
    -   is connected to previously implemented express server

## refactoring the react frontend

## refactoring the react frontend
