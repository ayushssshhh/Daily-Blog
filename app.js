//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
// Load the full build.
const _ = require('lodash');
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));


const port = 5000;
let posts = [];

let blog1 = {
  title : "Daily Blog",
  body : "DailyBlog is an online bloging website made by Kumar Ayush as a personal development project. This website is a dynamic website which enables user to post their blogs through compose page and get listed on home page, users can also read posted Blogs in home page by clicking on it.<br>Technologies used : <br><br>&emsp;&emsp; &emsp;&emsp; 1. html <br>&emsp; &emsp;&emsp; &emsp;  2. CSS <br>&emsp; &emsp;&emsp; &emsp;  3. JavaScript <br>&emsp;&emsp; &emsp; &emsp;  4. NodeJs <br>&emsp;&emsp; &emsp; &emsp;  5. Express <br>&emsp;&emsp; &emsp; &emsp;  6. EJS <br>&emsp;&emsp; &emsp; &emsp;  7. Bootstrap",
  img : "/images/blog1.png"
}

posts.push(blog1);

app.get("/",(req,res)=>{
  res.render("home" ,{
    postsRender : posts,
  })

})

app.get("/about",(req,res)=>{
  res.render("about");
})

app.get("/contact",(req,res)=>{
  res.render("contact" ,{
    contactContentRender : contactContent
  })
})

app.get("/compose" , (req , res)=>{
  res.render("compose");
})

app.get("/post/:topic" , (req , res)=>{
  let topic = req.params.topic;
  topic = _.lowerCase(topic);


  posts.forEach((posts)=>{

    let title = posts.title;
    title = _.lowerCase(title);
    
    if(title === topic){
      res.render("post" , {
        mainPostRender : posts       
      });
    }
  })
})

app.post("/compose",(req , res)=>{
  let post = {
    title : req.body.inputTitle,
    body : req.body.inputPost,
    img : req.body.inputImgUrl
  }

  posts.push(post);
  res.redirect("/");
})




app.listen(process.env.PORT || port, ()=>{
  console.log("server started : " + port);
})


