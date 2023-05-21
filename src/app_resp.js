const { auth } = require('express-openid-connect');

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: 'DHK9LylaX2cmyhhbcYEjn-VF4keWLAJHzKywIDvGvHX7vXx8vUm2ej4k-rLXERJ4',
  baseURL: 'https://student-metacafetery.up.railway.app',
  clientID: 'I1qbAI3LWZAS7FsrrHzvGwnwsira3sOQ',
  issuerBaseURL: 'https://dev-5xy5xpinxf2432j7.us.auth0.com'
};

// auth router attaches /login, /logout, and /callback routes to the baseURL
app.use(auth(config));

// req.isAuthenticated is provided from the auth router
app.get('/', (req, res) => {
  res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
});