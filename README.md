# Flim! TMDB :movie_camera:

Flim! is a fully responsive movie database SPA that allows searching, viewing details, and saving movies and TV shows, using the TMDB public API to fetch details. You can create a user to save and see your favorites list.

It was a solo project, developed over 80 hours.

Live site:

https://flimtmdb.netlify.app/

---

## Screenshots

### Home page

![home page](https://github.com/dcrescimbeni/TMDB/blob/main/public/screenshots/home.png)

### Search results
**Desktop**

![results full](https://github.com/dcrescimbeni/TMDB/blob/main/public/screenshots/results-full.png)

**Mobile**

![results mobile](https://github.com/dcrescimbeni/TMDB/blob/main/public/screenshots/results-mobile.png)

### Details

**Desktop**

![details full](https://github.com/dcrescimbeni/TMDB/blob/main/public/screenshots/details-full.png)

**Mobile**

![details mobile](https://github.com/dcrescimbeni/TMDB/blob/main/public/screenshots/details-mobile.png)


### Signup
![signup](https://github.com/dcrescimbeni/TMDB/blob/main/public/screenshots/signup.png)

---

## Technologies

- **Node.js + Express:** for the server
- **React + styled-components:** for the UI and styling
- **Passport + bcrypt:** to save and retrieved hashed and salted users passwords
- **Sequelize + PostgreSQL:** to connect to the database
- **Mocha + Chai:** to implement a fully tested backend
- **Heroku + Netlify:** to deploy the back and front end respectively

---

## Installation and usage

Installation is done using `npm` package manager:

```javascript
npm install
```

Then you must create an `.env` file

```
TMDB_API=
SESSION_SECRET=
DATABASE_URL=
REACT_APP_SERVER_URL=
```

To run the app, type `npm start`. It will concurrently start the Express server, and the React frontend.
