const path = require("node:path");
const { PrismaClient } = require('@prisma/client')
const { Pool } = require("pg");
const express = require("express");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const cors = require("cors");
const bodyParser = require("body-parser");
const signUpRouter = require("./routes/signUp");
const indexRouter = require("./routes/indexRouter");
const messageRouter = require("./routes/messagerouter");
const memberRouter = require("./routes/memberRouter.js");
const postsRouter = require("./routes/postsRouter");
const loginRouter = require("./routes/loginRouter");

const prisma = new PrismaClient()


const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use("/posts", postsRouter);
app.use("/signUp", signUpRouter);
app.use("/login", loginRouter);

const pool = new Pool({
  user: "tristanwassilyn",
  host: "localhost",
  database: "users",
  password: "12345678",
  port: 5432,
});

const messages = [
  {
    usernameid: "Mary",
    message: "Hey how are you!",
  },
];




app.use(session({ secret: "cats", resave: false, saveUninitialized: false }));
app.use(passport.session());
app.use(express.urlencoded({ extended: false }));
app.use("member", memberRouter);
app.use("message", messageRouter);
app.use("/", indexRouter);

app.get("/member", (req, res) => res.render("exclusivemember"));
app.get("/message", (req, res) => res.render("messageform", { user: req.user }));
app.get("/", (req, res) =>
  res.render("index", { user: req.user, messages: messages })
);
app.get("/log-out", (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});


passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      
      const user = await prisma.userinfo.findUnique({
        where: { username: username },  
      });

     
      if (!user) {
        return done(null, false, { message: "Incorrect username" });
      }

      
      if (user.password !== password) {
        return done(null, false, { message: "Incorrect password" });
      }

      
      return done(null, user);
    } catch (err) {
      return done(err);  
    }
  })
);

passport.serializeUser((userinfo, done) => {
  
  done(null, userinfo.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    
    const userinfo = await prisma.userinfo.findUnique({
      where: { id: id },
    });

    
    done(null, userinfo);
  } catch (err) {
    done(err);  
  }
});


/*
passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const { rows } = await prisma.userinfo.findUnique({
        where: { username: username }
    });
      const user = rows[0];
      if (!user) {
        return done(null, false, { message: "Incorrect username" });
      }
      if (user.password !== password) {
        return done(null, false, { message: "Incorrect password" });
      }
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  })
);

passport.serializeUser((userinfo, done) => {
  done(null, userinfo.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const { rows } = await prisma.userinfo.query("SELECT * FROM userinfo WHERE id = $1", [
      id,
    ]);
    const userinfo = rows[0];

    done(null, userinfo);
  } catch (err) {
    done(err);
  }
});
*/

 app.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/signup",
    failureRedirect: "/post",
  })
);

app.post("/write-message", (req, res) => {
  const { message, usernameid } = req.body;
  messages.push({ usernameid, message});

  res.redirect("/");
});

app.post("/exc-member", (req, res) => {
  
  const { userid } = req.body;
  const username = userid;

  const updateMemberStatus = async (username) => {
    try {
      const result = await pool.query(
        "UPDATE userinfo SET member = TRUE WHERE username = $1",
        [username]
      );
      console.log(username);
    } catch (err) {
      console.error("Error executing query", err.stack);
    }
  };
  
  updateMemberStatus(username);

  res.redirect("/");
})



app.post("/exc-member", (req, res, username) => {});

app.listen(3000, () => console.log("app listening on port 3000!"));
