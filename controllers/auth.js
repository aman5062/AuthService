const authService = require('../services/auth')
const COMPANY_REDIRECT_PAGE_URL='http://localhost:3000/company/home'
class authController{

      async signup(req,res){
           try {
            const data = await authService.signup(req.body)
            if(data){
                  res.status(201).json({
                        success:true
                  })
            }
           } catch (error) {
             res.status(400).json({
                        success:false,
                        message:error.message
                  })
           }
      }
      async login(req,res){
            try {
                  const tokens = await authService.login(req.body)
                  
                  res.cookie("refresh_token", tokens.refresh_token, {
                        httpOnly: true,
                        secure: true,
                        sameSite: "strict"
                  });
                  return res.redirect(`${COMPANY_REDIRECT_PAGE_URL}?access_token=${tokens.access_token}`)
            } catch (error) {
                  return res.redirect(`/login?message=${error.message}`)
            }
      }
      async refresh(req,res){
            try {
                  const data =  await authService.refresh(req.body.refresh_token)
                  res.status(200).json({
                        success:true,
                        ...data
                  })
            } catch (error) {
                  res.status(400).json({
                        success:false,
                        message:error.message
                  }) 
            }
      }
      async logout(req,res){
            try {
                  const data =  await authService.logout(req.cookies.refresh_token)
                  res.status(200).json({
                        success:true
                  })
            } catch (error) {
                  console.log(error)
                  res.status(400).json({
                        success:false,
                        message:error.message
                  }) 
            }
      
      }
      async getMe(req,res){
            try {
                  const data =  await authService.getMe(req.user)
                  res.status(200).json({
                        success:true,
                        ...data
                  })
            } catch (error) {
                  res.status(400).json({
                        success:false,
                        message:error.message
                  }) 
            }
      
      }
}


module.exports = new authController()