const   dotenv      =   require("dotenv");
const   express     =   require("express"),
        app         =   express(),
        fs          =   require("fs"),
        mongoose    =   require("mongoose"),
        bodyParser  =   require('body-parser')
        csv         =   require("csvtojson");

var urlencodedParser = bodyParser.urlencoded({ extended: false });
app.use(bodyParser.json());

const AshokRouter = require("./routes/AshokRoutes");
const BSERouter = require("./routes/BSERoutes");
const NSERouter = require("./routes/NSERoutes");
const CiplaRouter = require("./routes/CiplaRoutes");
const EichermotRouter = require("./routes/EichermotRoutes");
const RelianceRouter = require("./routes/RelianceRoutes");
const TataSteelRouter = require("./routes/TataSteelRoutes");
const userRouter = require("./routes/userRoutes");

dotenv.config({path: './config.env'});

const db = process.env.DATABASE;
mongoose.connect(db, {
    useNewUrlParser: true,
    useFindAndModify: false
}).then(() =>{
    console.log("DB connection successful");
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

 
app.use("/api/v1/ashokley", AshokRouter);
app.use("/api/v1/sensex", BSERouter);
app.use("/api/v1/nifty", NSERouter);
app.use("/api/v1/cipla", CiplaRouter);
app.use("/api/v1/eichermot", EichermotRouter);
app.use("/api/v1/reliance", RelianceRouter);
app.use("/api/v1/tatasteel", TataSteelRouter);
app.use("/api/v1/users", userRouter);

app.listen(process.env.PORT || 9000, function(){
    console.log("Server started!");
})