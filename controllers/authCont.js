const user = require("../modals/user");
const jwt = require('jsonwebtoken');
const {promisify} = require('util');
const sendEmail = require("../utils/email");
const crypto = require("crypto");


exports.signup = async (req, res, next) => {
    try{
        const newUser = await user.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            passwordConfirm: req.body.passwordConfirm
        });

        const token = jwt.sign({id: newUser._id}, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRES_IN
        });
        res.cookie('jwt', token, {
            expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24*60*60*1000),
            // secure: true,
            httpOnly: true
        })
        res.status(201).json({
          status: "success",
          token,
          data: {
            user: newUser
          }
        });
    } catch(err){
        res.status(400).json({
          status: "failed",
          message: err
        });
    }
}

exports.login = async (req, res, next) => {
    try{
        const {email, password} = req.body;
        //check if email and pwd exists
        if(!email || !password){
            return res.status(400).json({
                status: "failed",
                message: "please provide email and password"
            })
        }
        //check if user exists and pwd is correct
        const User = await user.findOne({email: email}).select('+password');

        if(!User || !(await User.correctPassword(password, User.password))){
            return res.status(401).json({
                status: "failed",
                message: "Not authorised! Incorrect email or password"
            })
        }
        //if everything ok, send token to client
        const token = jwt.sign({ id: User._id }, process.env.JWT_SECRET, {
          expiresIn: process.env.JWT_EXPIRES_IN,
        });
        res.cookie('jwt', token, {
          expire: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000),
          // secure: true,
          httpOnly: true
        })
        res.status(200).json({
            status: "success",
            token
        })
    } catch(err){
        console.log(err);
        return res.status(400).json({
                status: "fAiled",
                message: err
            })
    }
}

exports.logout = (req, res) => {
  res.cookie("jwt", "loggedout", {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true
  });
  res.status(200).json({ status: "success" });
};

exports.protect = async (req, res, next) => {
    try{
         // 1) Getting token and check of it's there
         let token;
         if (
           req.headers.authorization &&
           req.headers.authorization.startsWith("Bearer")
         ) {
           token = req.headers.authorization.split(" ")[1];
         }

         if (!token) {
           return next(
             res.status(401).json({
               status: "failed",
               message: "You are not authorised",
             })
           );
         }

         // 2) Verification token
         let decoded;
         try{
             decoded = await promisify(jwt.verify)(
               token,
               process.env.JWT_SECRET
             );
         } catch(err){
           return res.status(401).json({
              status: "failed",
              message: "Unauthorised! invalid token"
            });
         };

         // 3) Check if user still exists
         const currentUser = await user.findById(decoded.id);
         if (!currentUser) {
           return res.status(401).json({
               status: "failed",
               message: "User does not exist",
             });
         }

        //  // 4) Check if user changed password after the token was issued
         

         // GRANT ACCESS TO PROTECTED ROUTE
         req.user = currentUser;

         next();
       } catch(err){
        res.status(200).json({
          status: "failed",
          message: err,
        });
    }
}

exports.restrictTo = (...roles) =>{
    return (req, res, next) =>{
        if(!roles.includes(req.user.role)){
            return res.status(403).json({
                status: "Forbidden",
                message: "only admins can perform this action"
            })
        }

        next();
    }
}

exports.forgotPassword = async (req, res, next) => {

    // 1) Get user based on Posted email
    const User = await user.findOne({ email: req.body.email });
    if (!User) {
        return res.status(404).json({
        status: "error",
        message: "no user found",
        });
    }

    // 2) Generate the random reset token
    const resetToken = User.createPasswordResetToken();
    await User.save({ validateBeforeSave: false });

    // 3) Send it to user's email
    const resetURL = `${req.protocol}://${req.get("host")}/api/v1/users/resetPassword/${resetToken}`;

    const message = `Forgot your password? Submit a PATCH request with your new password and passwordConfirm to: ${resetURL}.\nIf you didn't forget your password, please ignore this email!`;

    try {
        await sendEmail({
        email: User.email,
        subject: "Your password reset token (valid for 10 min)",
        message,
        });

        res.status(200).json({
        status: "success",
        message: "Token sent to email!",
        });
    } catch (err) {
        User.passwordResetToken = undefined;
        User.passwordResetExpires = undefined;
        await User.save({ validateBeforeSave: false });

        return res.status(500).json({
        status: "failed",
        message: "There was an error sending the email. Try again later!"
        });
    }
     
};

exports.resetPassword = async (req, res, next) => {
  try{
       // 1) Get user based on the token
       const hashedToken = crypto
         .createHash("sha256")
         .update(req.params.token)
         .digest("hex");
       const User = await user.findOne({
         passwordResetToken: hashedToken,
         passwordResetExpires: { $gt: Date.now() },
       });

       // 2) If token has not expired, and there is User, set the new password
       if (!User) {
         return status(400).json({
           status: "failed",
           message: "Token is invalid or has expired",
         });
       }
       User.password = req.body.password;
       User.passwordConfirm = req.body.passwordConfirm;
       User.passwordResetToken = undefined;
       User.passwordResetExpires = undefined;
       await User.save();

       // 3) Log the User in, send JWT
       const token = jwt.sign({ id: User._id }, process.env.JWT_SECRET, {
         expiresIn: process.env.JWT_EXPIRES_IN,
       });
       res.status(200).json({
         status: "success",
         token,
       });
     }catch(err){
         res.status(400).json({
             status:"failed",
             message: "something went wrong!"
         })
     }
 };

 exports.updatePassword = async (req, res, next) => {
   // 1) Get user from collection
   const User = await user.findById(req.user.id).select("+password");

   // 2) Check if Posted current password is correct
   if (!(await User.correctPassword(req.body.passwordCurrent, User.password))) {
     return res.status(401).json({
         status:"failed",
         message: "your current password is wrong!"
     })
   }

   // 3) If so, update password
   User.password = req.body.password;
   User.passwordConfirm = req.body.passwordConfirm;
   await User.save();

   // 4) Log User in, send JWT
   const token = jwt.sign({ id: User._id }, process.env.JWT_SECRET, {
     expiresIn: process.env.JWT_EXPIRES_IN,
   });
   res.status(200).json({
     status: "success",
     token,
   });
 };

