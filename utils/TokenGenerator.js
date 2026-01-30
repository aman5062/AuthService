const commonUtil = require("./common")
const TOKEN_SECRET_KEY="sifasnkjnfdkjndskjnds"
const jwt = require("jsonwebtoken")
const crypto = require("crypto");

class tokenGenerator{
      async getAccessToken(user_id){
            const configdata = await commonUtil.getConfig();
            const minutes = Number(configdata.access_token_expiry_minutes);

            return jwt.sign(
            { user_id },
            TOKEN_SECRET_KEY,
            { expiresIn: `${minutes}m` }
            );
      }

      async getRefreshToken(){
            return crypto.randomBytes(40).toString("hex");
      }
      
}
module.exports = new tokenGenerator()