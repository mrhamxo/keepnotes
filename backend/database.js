const mongoose  = require('mongoose');

const mongoUrl = "mongodb://localhost:27017/keepnotes";

const connectToMongo = async() => {
    mongoose.connect(mongoUrl, () => {
        console.log("Connection to MongoDB successful");
    });
}
module.exports = connectToMongo;

// mongoose.connect(mongoUrl)
// .then(() => {
//     console.log('Connection Successful');
// }).catch((err) => {
//     console.log(err);
// });
