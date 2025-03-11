import Test from "../models/tests.model.js";
import User from "../models/user.model.js";

export const storetestDetails = async (req, res) => {
  try {
    const { userId, category, difficultyLevel, testDuration, noOfQuestions } =
      req.body;
    // console.log(userId)
    const user = await User.findOne({ userId });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const newTest = new Test({
      userId: user._id,
      category,
      difficultyLevel,
      testDuration,
      noOfQuestions,
    });

    await newTest.save();
    user.tests.push(newTest._id);
    await user.save();

    res
      .status(201)
      .json({ message: "Test Details stored successfully", test: newTest });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error storing test result", error: error.message });
  }
};

export const storeMarks = async (req, res) => {
  try {
    const { userId, marksObtained, coinsObtained } = req.body;
    console.log(marksObtained);
    const { testId } = req.params;

    const user = await User.findOne({ userId });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const test = await Test.findById(testId);
    if (!test) {
      return res.status(404).json({ message: "Test not found" });
    }

    if (!user.tests.includes(test._id)) {
      return res
        .status(403)
        .json({ message: "Test does not belong to this user" });
    }

    test.marksObtained = marksObtained;
    await test.save();

    user.marksObtained = marksObtained;
    if (marksObtained > 40) {
      user.shuriCoins += coinsObtained;
    }
    await user.save();

    res.status(200).json({ message: "Marks updated successfully", test });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating marks", error: error.message });
  }
};

export const getUserTests = async (req, res) => {
  try {
    const { userId } = req.params;
    console.log(userId);
    const user = await User.findOne({ userId }).populate("tests");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ tests: user.tests });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching test results", error: error.message });
  }
};