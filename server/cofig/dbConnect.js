const mongoose = require("mongoose");
require("dotenv").config();

const dbConnect = async() => {
mongoose.connect(process.env.DATA_BASE_URL,{
    useNewUrlParser:true,
    useUnifiedTopology:true
})
.then(() =>console.log("db Connection successfull"))
.catch((err) => {
    console.log("error occured in db connection",err)
})
}

module.exports = dbConnect