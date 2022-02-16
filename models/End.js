const mongoose = require("mongoose");




const End = mongoose.model("End", {
    rua : String,
    cidade : String,
    cep : String
});
module.exports = End;