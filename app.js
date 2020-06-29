

var express = require("express")
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var Camp = require('./models/campground');
var seed = require('./seed');
var port = 58703;
var Comment = require('./models/comment');
var url = "mongodb://localhost:27017/yelpDb";
mongoose.connect(url,{
    useNewUrlParser: true,
    useUnifiedTopology: true
});
seed();
app = express();

app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static("/public"));
app.set("view engine", "ejs");




app.get("/home", (req,res)=>{
    Camp.find({},(err,camps)=>{
        if(err){
            console.log(err);
        }
        else{
            res.render("home", {campground:camps});

        }
    });


});
app.get("/home/:id", (req,res)=>{

     Camp.findById(req.params.id).populate('comments').exec((err, newid)=>{
                if(err){
                    console.log(err);
                }
                else{

                    res.render("show", {campground:newid});
                }
            });
    });

app.get("/remove", (req,res)=>{
    res.render("remove");
});
app.get("/login", (req,res)=>{

    res.render("login");
});
app.post("/submit", (req,res)=>{
var name = req.body.name;
var url = req.body.image;
var desc = req.body.des;
const camp = {name:name, url:url, description:desc};
Camp.create(camp,(err, camps)=>{
if(err){
    console.log(err);
}
else{
    res.redirect("/home");
}
});

});

app.post("/remove", (req,res)=>{
var name = req.body.name;
var image = req.body.image;
Camp.remove({
    name:name,
    url:image
}, (err, camps)=>{
    if(err){
        console.log(err);
    }
    else{
        res.redirect("/home")
    }
})
});
app.post('/search', (req,res)=>{
    var search = req.body.search;
    Camp.find({name:search}, (err, word)=>{
        if(err){
            console.log(err);
        }
        else{
            res.render('home', {campground:word});
        }
    });
});
// Making new comments

app.get('/home/:id/comment/newcome', (req, res)=>{
    Camp.findById(req.params.id, (err, newComment)=>{
        if(err){
            console.log(err);
        }
        else{
            res.render('newcome', {campground:newComment});
        }
    })

});

app.post('/home/:id/comment', (req, res) =>{

        Camp.findById(req.params.id, (err, camp) => {
            if (err) {
                console.log(err);
            }
            else {
            console.log(camp)
                Comment.create(req.body.comment, (err, comment) => {
                    if (err) {
                        console.log(err);
                    }
                    else {
                        comen.comments.push(comment);
                        comen.save();
                        res.redirect('/home/' + req.params.id);
                    }
                });

            }
        });

    });





app.listen(process.env.PORT || port, () =>{
    console.log("Server Has Started");
});




