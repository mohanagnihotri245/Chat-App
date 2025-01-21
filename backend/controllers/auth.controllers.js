import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import generateTokenAndSetCookies from "../utils/generateToken.js";
export const signup=async(req,res)=>{
  try {
   
    const { fullName, username, password, confirmPassword, gender } = req.body;

    // Validate required fields
    if (!fullName || !username || !password || !confirmPassword || !gender) {
      return res.status(400).json({ error: "All fields are required." });
    }

    // Check if passwords match
    if (password !== confirmPassword) {
      return res.status(400).json({ error: "Passwords do not match." });
    }

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ error: "Username already exists." });
    }
    const boyprofile=`https://avatar.iran.liara.run/public/boy?username=${username}`
    const girlprofile=`https://avatar.iran.liara.run/public/girl?username=${username}`

    const salt =await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    
    const newUser=new User({
        fullName,
        username,
        password: hashedPassword,
        gender,
        profilePic:gender === "male" ? boyprofile : girlprofile,
      })

      if(User){
        generateTokenAndSetCookies(newUser._id,res);
       await newUser.save();
       return  res.status(201).json({
      _id:newUser._id,
      fullName: newUser.fullName,
      username: newUser.username,
      profilePic: newUser.profilePic
     })
   }
   else{
    res.status(400).json({error:"Invalid user data"})
   }
  } catch (error) {
    console.error("Error during signup:", error);
    res.status(500).json({error:"Internal Server Error"})
  }
 
 };
 export const login=async(req,res)=>{
  try {
    const {username,password}=req.body;
    const user = await User.findOne({username});
    const isPasswordCorrect = await bcrypt.compare(password,user?.password|| "");

    if( !isPasswordCorrect){
      return res.status(400).json({error:"Invalid  password"});
    }
    if(!user){
      return res.status(400).json({error:"Invalid username "});
    }
    
    generateTokenAndSetCookies(user._id,res); 
    res.status(200).json({
      _id:user._id,
      fullName: user.fullName,
      username: user.username,
      profilePic: user.profilePic
     });

  } catch (error) {
    console.error("Error during signup:", error);
    res.status(500).json({error:"Internal Server Error"})
  }
  };
  export const logout = (req, res) => {
    try {
      // Clear the JWT cookie
      res.clearCookie("jwt", {
        httpOnly: true,
        sameSite: "strict"
       
      });
  
      // Send success response
      res.status(200).json({ message: "Logged out successfully. Session cleared." });
    } catch (error) {
      console.error("Error in logout controller:", error.message);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };
  