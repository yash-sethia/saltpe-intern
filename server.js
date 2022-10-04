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
const transactionRouter = require("./routes/transaction");
const adminRouter = require("./routes/admin");

// //Backend routes to begin with api
app.use('/api/users', userRouter);
app.use('/api/otps', otpRouter); 
app.use('/api/transaction', transactionRouter);
app.use('/api/admin', adminRouter); 

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
