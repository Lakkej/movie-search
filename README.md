## Welcome!

This app can be started by **"npm run start_app"** for both the backend and client side.
### Backend
The backend is NodeJS with Express and redis@next for async request to the Redis DB.
It uses winston to log every incoming call and stores these files named "yyyy-MM-dd".
The server is also setup so that the app can run even if it cannot connect to the locally running Redis-server. If it can connect to it it stores the API responses with the queryKey (e.g. for ID search it is the imdbID).

### Frontend

Front-end uses basic ReactJS and uses Material-UI as the components library. The app uses params for searching so that the user can go back and forward in history. Also uses Anchor for viewing detailed info of the movie that the user selects by clicking on the card. MovieDetail uses Dialogs to show its content.

