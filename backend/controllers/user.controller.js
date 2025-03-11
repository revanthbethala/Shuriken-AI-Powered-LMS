import User from "../models/user.model.js";

export const getUser = async (req, res) => {
  try {
    const { userId,fullName, email, profilePic, isSignedIn } = req.body;
    let user = await User.findOne({ userId });

    if (user) {
      user.fullName = fullName;
      user.email = email;
      user.profilePic = profilePic;
      user.isSignedIn = isSignedIn;
    } else {
      user = new User({ userId, fullName, email, profilePic, isSignedIn });
    }
    await user.save();
    res.status(200).json({ message: "User synced successfully", user });
  } catch (error) {
    res.status(500).json({ message: "Error syncing user", error: error.message });
  }
};

export const changeRole = async (req, res)=>{
  try {
    const {userId,role}=req.body;
    let user = await User.findOne({ userId });
    if (!user){
      res.status(500).json({message:"user not found",error:error.message});
    }
    else{
      user.role=role;
    }
    await user.save()
    res.status(200).json({message:"role chnaged successfully",user})
  } catch (error) {
    res.status(500).json({message:"Error changing role",error:error.message})
  }
}

export const getUserById = async(req,res)=>{
  try {
    const { userId } = req.params;
    let user = await User.findOne({ _id:userId });
    if (!user) {
      res.status(404).json({ message: "User not found" });
    } else {
      res.status(200).json({ user });
    }
  } catch (error) {
    res.status(500).json({ message: "Error fetching user", error: error.message });
  }
}

export const getUserByClerk = async(req,res)=>{
  try {
    const { userId } = req.params;
    let user = await User.findOne({ userId });
    if (!user) {
      res.status(404).json({ message: "User not found" });
    } else {
      res.status(200).json({ user });
    }
  } catch (error) {
    res.status(500).json({ message: "Error fetching user", error: error.message });
  }
}