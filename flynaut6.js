const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('./models/User');

passport.use(new LocalStrategy(
  {
    usernameField: 'email', // Assuming email is used as the username
    passwordField: 'password'
  },
  async (email, password, done) => {
    try {
      const user = await User.findOne({ email });

      if (!user) {
        return done(null, false, { message: 'Invalid email or password' });
      }

      const isMatch = await user.comparePassword(password);

      if (!isMatch) {
        return done(null, false, { message: 'Invalid email or password' });
      }

      return done(null, user);
    } catch (error) {
      return done(error);
    }
  }
));

// Register the authentication middleware in your routes
app.post('/login', passport.authenticate('local'), (req, res) => {
  // Authentication successful
  res.redirect('/dashboard');
});
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//Adding Middleware for Token in Node.js

const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  jwt.verify(token, 'secretKey', (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid token' });
    }

    req.user = user;
    next();
  });
};

// Use the middleware in your routes
app.get('/protected', authenticateToken, (req, res) => {
  // Access granted, token is valid
  res.json({ message: 'Protected route' });
});


//Example of Promise.all with resolve and reject:

const promise1 = new Promise((resolve, reject) => {
    setTimeout(() => resolve('Promise 1 resolved'), 1000);
  });
  
  const promise2 = new Promise((resolve, reject) => {
    setTimeout(() => reject(new Error('Promise 2 rejected')), 2000);
  });
  
  const promise3 = new Promise((resolve, reject) => {
    setTimeout(() => resolve('Promise 3 resolved'), 1500);
  });
  
  Promise.all([promise1, promise2, promise3])
    .then(results => {
      console.log(results);
    })
    .catch(error => {
      console.log(error);
    });
  

    //Example of Aggregate Lookup property in MongoDB:



const User = require('./models/User');
const Post = require('./models/Post');

Post.aggregate([
  {
    $lookup: {
      from: 'users',
      localField: 'userId',
      foreignField: '_id',
      as: 'user'
    }
  }
])
  .then(posts => {
    console.log(posts);
  })
  .catch(error => {
    console.log(error);
  });


  //Example of populating an array field with ref IDs


  const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String
});

const postSchema = new mongoose.Schema({
  title: String,
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
});

const User = mongoose.model('User', userSchema);
const Post = mongoose.model('Post', postSchema);

Post.find()
  .populate('author')
  .exec()
  .then(posts => {
    console.log(posts);
  })
  .catch(error => {
    console.log(error);
  });


  //Examples of socket emit, on, and connection in Node.js:


  // Server-side
const http = require('http');
const socketIO = require('socket.io');

const server = http.createServer(app);
const io = socketIO(server);

io.on('connection', socket => {
  console.log('A client connected');

  // Emitting data to the client
  socket.emit('message', 'Hello client!');

  // Receiving data from the client
  socket.on('message', data => {
    console.log('Received message from client:', data);
  });
});





