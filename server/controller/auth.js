const User = require("../modal/User")
const bcrypt  = require("bcrypt")


exports.login = async(req,res) => {
    try{
     console.log(req.body,"printing email")
    }catch(err){
        console.log("err occering",err)
    }
}


exports.signup = async (req, res) => {
    try {
      // Destructure fields from the request body
      const {
        firstName,
        lastName,
        email,
        password,
    
      } = req.body
      // Check if All Details are there or not
      if (
        !firstName ||
        !lastName ||
        !email ||
        !password 
        
      ) {
        return res.status(403).send({
          success: false,
          message: "All Fields are required",
        })
      }
     
      // Check if user already exists
      const existingUser = await User.findOne({ email })
      if (existingUser) {
        return res.status(400).json({
          success: false,
          message: "User already exists. Please sign in to continue.",
        })
      }
  

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10)

      const user = await User.create({
        firstName,
        lastName,
        email,
        password: hashedPassword,
      })
  
      return res.status(200).json({
        success: true,
        user,
        message: "User registered successfully",
      })
    } catch (error) {
      console.error(error)
      return res.status(500).json({
        success: false,
        message: "User cannot be registered. Please try again.",
      })
    }
  }