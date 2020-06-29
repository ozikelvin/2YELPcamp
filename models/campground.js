var mongoose = require('mongoose');

const campSchema = new mongoose.Schema({
    name:String,
    url:String,
    description:String,
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }
    ]
});


const Camp = mongoose.model("camp", campSchema);

module.exports = Camp;
