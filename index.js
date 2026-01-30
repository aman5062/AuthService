const express = require('express');
const app = express()
const dotenv = require("dotenv")
dotenv.config()
const routers = require("./routers/index");
const bodyParser = require('body-parser');
const db = require("./models/index")
const cookieParser = require('cookie-parser');
app.use(cookieParser());
PORT = 3000
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
app.use(express.json())
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/api",routers)
const loginPage = `
      <!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Login</title>

<!-- Bootstrap 5 CDN -->
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">

<style>
body {
    height: 100vh;
    background: #17a2b8;
    display: flex;
    align-items: center;
    justify-content: center;
}

.login-box {
    width: 100%;
    max-width: 400px;
    padding: 30px;
    background: #fff;
    border-radius: 8px;
    box-shadow: 0 8px 20px rgba(0,0,0,0.1);
}
</style>
</head>

<body>

<div class="login-box">
    <h3 class="text-center mb-4">Login</h3>
    
    <form action='/api/auth/login' method ='POST'>
        <div class="mb-3">
            <label class="form-label">Email</label>
            <input type="text" class="form-control" name="email" placeholder="Enter Email">
        </div>

        <div class="mb-3">
            <label class="form-label">Password</label>
            <input type="password" class="form-control" name="password" placeholder="Enter password">
        </div>


        <button type="submit" class="btn btn-info w-100">Login</button>

    </form>
    <div id="message" style="color:red"></div>
</div>
<script>
const params = new URLSearchParams(window.location.search);
const msg = params.get("message");
const type = params.get("type") || "danger";

if (msg) {
    const messageDiv = document.getElementById("message");
    messageDiv.innerHTML =
        '<div class="alert alert-' + type + ' mt-3">' +
        msg +
        '</div>';

    setTimeout(function () {
        messageDiv.innerHTML = "";
        window.history.replaceState({}, document.title, window.location.pathname);
    }, 3000);
}
</script>



</body>
</html>

`;
app.get("/login",(req,res)=>{
      res.send(loginPage)
})
app.get("/dashboard",(req,res)=>{
    res.redirect("/dashboard/config")
})
app.get("/dashboard/config",(req,res)=>{
    res.render("config")
})
app.get("/dashboard/log",(req,res)=>{
    res.render("logs")
})
app.get("/dashboard/session",(req,res)=>{
    res.render("session")
})
app.get("/company/home",(req,res)=>{
    res.render("company/home")
})
// app.listen(PORT,()=>{
//       console.log(`Server is running on http://localhost:${PORT}`)
// })

const startServer = async () => {
  try {
    await db.sequelize.authenticate();
    console.log("Database connected successfully");

    await db.sequelize.sync(); 

    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });

  } catch (error) {
    console.log("DB not ready, retrying in 5 seconds...");
    setTimeout(startServer, 5000);
  }
};

startServer();
