const adminService = require("../services/admin")
class adminController{
      async getConfig(req,res){
            try {
                  const config = await adminService.getConfig();
                  res.status(200).json({
                        success:true,
                        data:config
                  })
            } catch (error) {
                  res.status(400).json({
                        success:false,
                        message:error.message
                  })
            }  
      }
      async updateConfig(req,res){
            try {
                  const config = await adminService.updateConfig(req.body);
                  res.status(200).json({
                        success:true,
                        data:config
                  })  
            } catch (error) {
                  res.status(400).json({
                        success:false,
                        message:error.message
                  }) 
            }  
      }
      async getLogs(req,res){
            try {
                  const logs = await adminService.getLogs(req.query);
                  res.status(200).json({
                        success:true,
                        data:logs
                  })
            } catch (error) {
                  res.status(400).json({
                        success:false,
                        message:error.message
                  })
            }  
      }
      async getSessions(req,res){
            try {
                  const sessions = await adminService.getSessions();
                  res.status(200).json({
                        success:true,
                        data:sessions
                  })
            } catch (error) {
                  res.status(400).json({
                        success:false,
                        message:error.message
                  })
            }  
      }
      async setRole(req,res){
            try {
                  const role = await adminService.setRole(req.body)
                  res.status(201).json({
                        success:true,
                        role_id:role.id,
                        name:role.name
                  })
            } catch (error) {
                 res.status(400).json({
                        success:false,
                        message:error.message
                  }) 
            }
      }

}


module.exports = new adminController()