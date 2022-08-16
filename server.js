const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }
);

const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

const userRouter = require("./routes/user");
const otpRouter = require("./routes/otp");

// const taskRouter = require('./routes/tasks');
// const usersRouter = require('./routes/users');
// const articleRouter = require('./routes/articles');
// const reviewsRouter = require('./routes/reviews');
// const profileRouter = require('./routes/profile');
// const engagementRouter = require('./routes/engagement');
// const taskAnalyticsRouter = require('./routes/taskAnalytics'); 
// const adduserdata = require('./routes/adduserdata');
// const reviewmore = require('./routes/reviewmore');
// const reviewarticle = require('./routes/reviewArticle');
// const reviewmorearticle = require('./routes/reviewMoreArticle');
// const getReviews = require('./routes/getReviews');
// const overallAnalytics = require('./routes/overallAnalytics');
// const recentTransactions = require('./routes/recentTransactions');
// const portfolioArticle = require('./routes/portfolioArticle');

// //Backend routes to begin with api
app.use('/api/users', userRouter);
app.use('/api/otps', otpRouter);
// app.use('/api/users', usersRouter);
// app.use('/api/articles', articleRouter);
// app.use('/api/reviews', reviewsRouter);
// app.use('/api/profile', profileRouter);
// app.use('/api/enagagement', engagementRouter);
// app.use('/api/taskAnalytics', taskAnalyticsRouter);
// app.use('/api/adduserdata', adduserdata);
// app.use('/api/reviewmore', reviewmore);
// app.use('/api/reviewarticle', reviewarticle);
// app.use('/api/reviewMoreArticle', reviewmorearticle);
// app.use('/api/getreviews', getReviews);
// app.use('/api/overallAnalytics', overallAnalytics);
// app.use('/api/recentTransactions', recentTransactions);
// app.use('/api/portfolioArticle', portfolioArticle);


app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});

if(process.env.NODE_ENV == "production") {
  app.use(express.static("client/build"));
  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  })
}
