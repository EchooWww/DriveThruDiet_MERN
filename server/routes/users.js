const router = require("express").Router();
const { User, validate } = require("../models/user");
const bcrypt = require("bcrypt");

router.post("/", async (req, res) => {
  try {
    console.log("post request");

    const { error } = validate(req.body);

    if (error)
      return res.status(400).send({ message: error.details[0].message });

    const user = await User.findOne({ email: req.body.email });
    if (user)
      return res
        .status(409)
        .send({ message: "User with given email already Exist!" });

    const salt = await bcrypt.genSalt(Number(process.env.SALT));
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    await new User({
      ...req.body,
      password: hashPassword,
      habits: [
        {
          name: "Ride a bike🚴",
          count: 0,
          continuous_count: 0,
          last_checked: null,
          checked: false,
          checked_dates: [],
        },
        {
          name: "Eat less meat🥩",
          count: 0,
          continuous_count: 0,
          last_checked: null,
          checked: false,
          checked_dates: [],
        },
        {
          name: "Do recycling🚮",
          count: 0,
          continuous_count: 0,
          last_checked: null,
          checked: false,
          checked_dates: [],
        },
        {
          name: "Use reusable bags🛍️",
          count: 0,
          continuous_count: 0,
          last_checked: null,
          checked: false,
          checked_dates: [],
        },
        {
          name: "Save water💧",
          count: 0,
          continuous_count: 0,
          last_checked: null,
          checked: false,
          checked_dates: [],
        },
      ],
    }).save();
    res.status(201).send({ message: "User created successfully" });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
});

module.exports = router;
