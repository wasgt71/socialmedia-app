const path = require("node:path");
const { PrismaClient } = require("@prisma/client");
const { Pool } = require("pg");
const express = require("express");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const signUpRouter = require("./routes/signUp");
const indexRouter = require("./routes/indexRouter");
const postsRouter = require("./routes/postsRouter");
const loginRouter = require("./routes/loginRouter");
const commentRouter = require("./routes/commentRouter");
const likeRouter = require("./routes/likeRouter");
const prisma = new PrismaClient();

const corsData = {
  origin: "http://localhost:5173",
  methods: "GET,POST,PUT,DELETE",
  credentials: true,
};

const app = express();
app.use(cors(corsData));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

app.use(
  session({
    secret: "tenacity",
    resave: false,
    saveUninitialized: false,
    //cookie: { httpOnly: true, secure: false },
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(express.urlencoded({ extended: false }));
app.use("/login", loginRouter);
app.use("/comment", commentRouter);
app.use("/", indexRouter);
app.use("/posts", postsRouter);
app.use("/signUp", signUpRouter);
app.use("/like", likeRouter);

const pool = new Pool({
  user: "tristanwassilyn",
  host: "localhost",
  database: "users",
  password: "12345678",
  port: 5432,
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



app.listen(3000, () => console.log("app listening on port 3000!"));
