const mongoose = require('mongoose');

const DB = "mongodb://127.0.0.1:27017/myclasses";
mongoose.connect(DB,{useNewUrlParser : true}).then(() => {
  console.log("Connected successfully");
})
.catch((err) => {
  console.error("App starting error:", err.message);
  process.exit(1);
});
  module.exports = mongoose