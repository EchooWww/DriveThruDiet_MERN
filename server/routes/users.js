const calculateGoals = require("../utils/calculateGoals");
const router = require("express").Router();
const { User, validate } = require("../models/user");
const bcrypt = require("bcrypt");
let email;
router.post("/", async (req, res) => {
  try {
    const { error } = validate(req.body);

    if (error)
      return res.status(400).send({ message: error.details[0].message });

    const user = await User.findOne({ email: req.body.email });
    if (user)
      return res
        .status(400)
        .send({ message: "User with given email already Exist!" });

    const salt = await bcrypt.genSalt(Number(process.env.SALT));
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    await new User({
      ...req.body,
      password: hashPassword,
      age: new Date().getFullYear() - new Date(req.body.birthday).getFullYear(),
    }).save();
    req.session.email = req.body.email;
    res.status(201).send({ message: "User created successfully" });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

router.post("/signup_profile", async (req, res) => {
  try {
    if (req.session.email) {
      const userEmail = req.session.email;
      // Find the user by email
      const user = await User.findOne({ email: userEmail });

      if (user) {
        // Calculate goals using the imported module
        const age = user.age;

        // Combine the age with the rest of the request body data
        const completeData = { ...req.body, age };

        // Calculate goals using the imported module
        const { calorieGoal, proteinGoal, carbGoal, fatGoal } =
          calculateGoals(completeData);

        // Update the user's profile with calculated goals
        user.sex = req.body.sex;
        user.height = req.body.height;
        user.weight = req.body.weight;
        user.activity = req.body.activity;
        user.goal = req.body.goal;
        user.calorieGoal = calorieGoal;
        user.carbGoal = carbGoal;
        user.proteinGoal = proteinGoal;
        user.fatGoal = fatGoal;

        // Save the changes to the user document
        await user.save();
        res
          .status(201)
          .send({ message: "User profile and goals created successfully" });
      } else {
        res.status(404).send({ message: "User not found" });
      }
    } else {
      res.status(401).send({ message: "Unauthorized" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

router.get("/onboarding", async (req, res) => {
  try {
    if (req.session.email) {
      const userEmail = req.session.email;
      const user = await User.findOne({ email: userEmail });
      if (user) {
        res.status(200).send(user);
      } else {
        res.status(404).send({ message: "User not found" });
      }
    } else {
      res.status(401).send({ message: "Unauthorized" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

module.exports = router;
