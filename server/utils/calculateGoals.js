const calculateGoals = (data) => {
  let BMR;
  const weight = +data.weight;
  const height = +data.height;
  const age = +data.age;
  console.log("weight:", weight);
  console.log("height:", height);
  console.log("age:", age);
  if (data.sex === "female") {
    BMR = 447.593 + 9.247 * weight + 3.098 * height - 4.33 * age;
  } else {
    BMR = 88.362 + 13.397 * weight + 4.799 * height - 5.677 * age;
  }
  let calorieGoal;
  switch (data.activity) {
    case "sedentary":
      calorieGoal = Math.round(BMR * 1.2);
      break;
    case "lightly-active":
      calorieGoal = Math.round(BMR * 1.375);
      break;
    case "moderately-active":
      calorieGoal = Math.round(BMR * 1.55);
      break;
    case "very-active":
      calorieGoal = Math.round(BMR * 1.725);
      break;
    case "super-active":
      calorieGoal = Math.round(BMR * 1.9);
      break;
  }
  switch (data.goal) {
    case "lose-weight":
      calorieGoal -= 300;
      break;
    case "gain-muscle":
      calorieGoal += 300;
      break;
  }
  let carbPct, proteinPct, fatPct;
  switch (data.goal) {
    case "lose-weight":
      carbPct = 0.5;
      proteinPct = 0.3;
      fatPct = 0.2;
      break;
    case "gain-muscle":
      carbPct = 0.4;
      proteinPct = 0.35;
      fatPct = 0.25;
      break;
    case "maintain-weight":
      carbPct = 0.5;
      proteinPct = 0.2;
      fatPct = 0.3;
      break;
  }
  const carbGoal = Math.round((calorieGoal * carbPct) / 4);
  const proteinGoal = Math.round((calorieGoal * proteinPct) / 4);
  const fatGoal = Math.round((calorieGoal * fatPct) / 9);

  console.log("calorieGoal:", calorieGoal);
  console.log("carbGoal:", carbGoal);
  console.log("proteinGoal:", proteinGoal);
  console.log("fatGoal:", fatGoal);

  return { calorieGoal, carbGoal, proteinGoal, fatGoal };
};
module.exports = calculateGoals;
