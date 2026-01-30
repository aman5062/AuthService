const jwt = require('jsonwebtoken')
const auth = async(req,res,next)=>{
      // console.log("11")
      const token = req.headers.authorization?.split(' ')[1];
      if (!token) {
      return res.status(401).json({ message: "No token provided" });
      }
      try {
            const decoded = jwt.verify(token, process.env.TOKEN_SECRET_KEY);
            console.log(decoded)
            req.user = decoded;
            next();
      } catch (err) {
            return res.status(401).json({ message: "Invalid token" });
      }
}
module.exports = auth