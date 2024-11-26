import { useState, useEffect } from "react";

const messMenu = {
  Monday: {
    meals: {
      breakfast: [
        {
          name: "Cornflakes, Paneer Paratha, Tea, Milk, Brown Bread, Mix Jam, Pickle, Butter, Mint Chutney, Bhurfi",
          nutritionalInfo:
            "Calories: 650 kcal, Protein: 18 g, Carbs: 80 g, Fat: 25 g, Calcium: 320 mg, Iron: 4 mg",
          alert:
            "Allergy: Gluten (bread), Dairy (milk, paneer, butter, bhurfi); Diabetes: Limit jam and bhurfi.",
        },
      ],
      lunch: [
        {
          name: "Jeera Aloo, Kadhi Pakora, Plain Rice, Chapati, Green Salad, Mint Chutney",
          nutritionalInfo:
            "Calories: 700 kcal, Protein: 15 g, Carbs: 90 g, Fat: 22 g, Vitamin C: 35 mg, Fiber: 6 g",
          alert:
            "Allergy: Gluten (chapati), Dairy (kadhi); Diabetes: Limit rice and potatoes.",
        },
      ],
      dinner: [
        {
          name: "Aloo Gobhi Matar, Moong Masoor Dal, Plain Rice, Sooji Halwa",
          nutritionalInfo:
            "Calories: 720 kcal, Protein: 20 g, Carbs: 85 g, Fat: 25 g, Calcium: 300 mg, Fiber: 6 g",
          alert:
            "Allergy: Gluten (sooji halwa), Dairy (halwa); Diabetes: Limit halwa and rice.",
        },
      ],
    },
  },
  Tuesday: {
    meals: {
      breakfast: [
        {
          name: "Poha, Tea, Coffee, Milk, White Bread, Butter, Jam, Boiled Eggs",
          nutritionalInfo:
            "Calories: 500 kcal, Protein: 12 g, Carbs: 65 g, Fat: 15 g, Iron: 5 mg, Vitamin C: 20 mg",
          alert:
            "Allergy: Gluten (bread), Dairy (butter, milk); Eggs: Avoid for egg allergy.",
        },
      ],
      lunch: [
        {
          name: "Rajma, Plain Rice, Chapati, Mixed Veg, Green Salad, Lemon Pickle",
          nutritionalInfo:
            "Calories: 750 kcal, Protein: 18 g, Carbs: 95 g, Fat: 18 g, Fiber: 8 g, Iron: 6 mg",
          alert: "Allergy: Gluten (chapati); Diabetes: Limit rice and pickles.",
        },
      ],
      dinner: [
        {
          name: "Shahi Paneer, Jeera Rice, Chapati, Boondi Raita, Gulab Jamun",
          nutritionalInfo:
            "Calories: 850 kcal, Protein: 20 g, Carbs: 90 g, Fat: 30 g, Calcium: 350 mg",
          alert:
            "Allergy: Dairy (paneer, raita, gulab jamun), Gluten (chapati); Diabetes: Limit gulab jamun.",
        },
      ],
    },
  },
  Wednesday: {
    meals: {
      breakfast: [
        {
          name: "Idli, Coconut Chutney, Sambar, Tea, Milk, Coffee, Sugar",
          nutritionalInfo:
            "Calories: 400 kcal, Protein: 10 g, Carbs: 60 g, Fat: 10 g, Vitamin B: 6 mg, Iron: 4 mg",
          alert:
            "Allergy: Dairy (milk), Coconut; Diabetes: Monitor portion size.",
        },
      ],
      lunch: [
        {
          name: "Chole, Bhature, Rice, Green Salad, Mint Chutney",
          nutritionalInfo:
            "Calories: 850 kcal, Protein: 20 g, Carbs: 100 g, Fat: 30 g, Fiber: 8 g, Iron: 5 mg",
          alert:
            "Allergy: Gluten (bhature), Dairy (chutney); Diabetes: Limit bhature and rice.",
        },
      ],
      dinner: [
        {
          name: "Palak Paneer, Tandoori Roti, Dal Tadka, Jeera Rice",
          nutritionalInfo:
            "Calories: 800 kcal, Protein: 22 g, Carbs: 85 g, Fat: 25 g, Calcium: 400 mg, Iron: 12 mg",
          alert:
            "Allergy: Gluten (roti), Dairy (paneer); Diabetes: Limit rice.",
        },
      ],
    },
  },
  Thursday: {
    meals: {
      breakfast: [
        {
          name: "Upma, Coconut Chutney, Tea, Coffee, Milk, Boiled Eggs",
          nutritionalInfo:
            "Calories: 450 kcal, Protein: 10 g, Carbs: 65 g, Fat: 10 g, Vitamin C: 15 mg, Fiber: 4 g",
          alert:
            "Allergy: Dairy (milk, butter), Coconut; Eggs: Avoid if allergic.",
        },
      ],
      lunch: [
        {
          name: "Aloo Baingan, Dal Fry, Plain Rice, Chapati, Salad, Pickle",
          nutritionalInfo:
            "Calories: 700 kcal, Protein: 15 g, Carbs: 85 g, Fat: 20 g, Fiber: 7 g",
          alert:
            "Allergy: Gluten (chapati); Diabetes: Limit rice and potatoes.",
        },
      ],
      dinner: [
        {
          name: "Kofta Curry, Tandoori Roti, Rice Pulao, Carrot Halwa",
          nutritionalInfo:
            "Calories: 900 kcal, Protein: 18 g, Carbs: 100 g, Fat: 30 g, Vitamin A: 50 mg",
          alert:
            "Allergy: Dairy (kofta, halwa), Gluten (roti); Diabetes: Limit halwa and rice.",
        },
      ],
    },
  },
  Friday: {
    meals: {
      breakfast: [
        {
          name: "Paratha, Aloo Bhaji, Pickle, Tea, Milk, Coffee",
          nutritionalInfo:
            "Calories: 600 kcal, Protein: 15 g, Carbs: 70 g, Fat: 20 g, Fiber: 5 g",
          alert:
            "Allergy: Gluten (paratha), Dairy (milk, butter); Diabetes: Limit potatoes.",
        },
      ],
      lunch: [
        {
          name: "Veg Biryani, Raita, Salad, Papad",
          nutritionalInfo:
            "Calories: 750 kcal, Protein: 18 g, Carbs: 85 g, Fat: 25 g, Calcium: 200 mg",
          alert: "Allergy: Dairy (raita); Diabetes: Limit rice.",
        },
      ],
      dinner: [
        {
          name: "Chana Masala, Plain Rice, Chapati, Seviyan Kheer",
          nutritionalInfo:
            "Calories: 800 kcal, Protein: 20 g, Carbs: 90 g, Fat: 25 g, Fiber: 8 g",
          alert:
            "Allergy: Dairy (kheer), Gluten (chapati); Diabetes: Limit kheer.",
        },
      ],
    },
  },
  Saturday: {
    meals: {
      breakfast: [
        {
          name: "Dosa, Coconut Chutney, Sambar, Tea, Milk, Coffee",
          nutritionalInfo:
            "Calories: 450 kcal, Protein: 10 g, Carbs: 60 g, Fat: 15 g, Vitamin B: 5 mg",
          alert:
            "Allergy: Dairy (milk), Coconut; Diabetes: Monitor portion size.",
        },
      ],
      lunch: [
        {
          name: "Paneer Bhurji, Chapati, Plain Rice, Salad, Pickle",
          nutritionalInfo:
            "Calories: 800 kcal, Protein: 22 g, Carbs: 85 g, Fat: 25 g, Calcium: 350 mg",
          alert:
            "Allergy: Dairy (paneer), Gluten (chapati); Diabetes: Limit rice.",
        },
      ],
      dinner: [
        {
          name: "Matar Paneer, Jeera Rice, Tandoori Roti, Gajar Halwa",
          nutritionalInfo:
            "Calories: 850 kcal, Protein: 20 g, Carbs: 90 g, Fat: 30 g, Vitamin A: 40 mg",
          alert:
            "Allergy: Dairy (paneer, halwa), Gluten (roti); Diabetes: Limit halwa.",
        },
      ],
    },
  },
  Sunday: {
    meals: {
      breakfast: [
        {
          name: "Chole Bhature, Tea, Coffee, Milk",
          nutritionalInfo:
            "Calories: 750 kcal, Protein: 18 g, Carbs: 90 g, Fat: 30 g, Fiber: 7 g",
          alert:
            "Allergy: Gluten (bhature), Dairy (milk); Diabetes: Limit bhature.",
        },
      ],
      lunch: [
        {
          name: "Veg Pulao, Dal Makhani, Chapati, Salad, Pickle",
          nutritionalInfo:
            "Calories: 800 kcal, Protein: 20 g, Carbs: 90 g, Fat: 25 g, Fiber: 6 g",
          alert:
            "Allergy: Dairy (dal makhani), Gluten (chapati); Diabetes: Limit rice.",
        },
      ],
      dinner: [
        {
          name: "Shahi Paneer, Butter Naan, Rice, Kheer",
          nutritionalInfo:
            "Calories: 900 kcal, Protein: 22 g, Carbs: 100 g, Fat: 35 g, Calcium: 400 mg",
          alert:
            "Allergy: Dairy (paneer, kheer), Gluten (naan); Diabetes: Limit kheer and naan.",
        },
      ],
    },
  },
};

const Menu = () => {
  const [selectedDay, setSelectedDay] = useState("");
  const [currentDay, setCurrentDay] = useState("");
  const [selectedMeal, setSelectedMeal] = useState("breakfast");

  const getCurrentDay = () => {
    const daysOfWeek = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const today = new Date().getDay();
    return daysOfWeek[today];
  };

  const getCurrentMeal = () => {
    const currentHour = new Date().getHours();
    if (currentHour >= 7 && currentHour < 9) {
      return "breakfast";
    } else if (currentHour >= 12 && currentHour < 14) {
      return "lunch";
    } else if (currentHour >= 14 && currentHour < 21) {
      return "dinner";
    } else {
      return "breakfast";
    }
  };

  useEffect(() => {
    const today = getCurrentDay();
    setCurrentDay(today);
    setSelectedDay(today);

    const meal = getCurrentMeal();
    setSelectedMeal(meal);
  }, []);

  const handleDayChange = (event) => {
    setSelectedDay(event.target.value);
  };

  const handleMealChange = (event) => {
    setSelectedMeal(event.target.value);
  };

  return (
    <div className="flex items-center justify-center text-white overflow-x-hidden overflow-y-hidden">
      <div className="mt-40 mess-menu p-8 bg-gray-800 rounded shadow-lg max-w-3xl w-full">
        <h1 className="text-center text-4xl font-bold mb-6 text-blue-500">
          Mess Menu
        </h1>

        {/* Day Selection */}
        <div className="flex justify-center items-center mb-6">
          <label htmlFor="day-select" className="mr-4 text-lg font-medium">
            Select Day:
          </label>
          <select
            id="day-select"
            className="p-2 text-gray-900 bg-gray-200 border border-gray-300 rounded focus:outline-none"
            value={selectedDay}
            onChange={handleDayChange}
          >
            {[
              "Monday",
              "Tuesday",
              "Wednesday",
              "Thursday",
              "Friday",
              "Saturday",
              "Sunday",
            ].map((day) => (
              <option key={day} value={day}>
                {day}
              </option>
            ))}
          </select>
        </div>

        {/* Meal Selection */}
        <div className="flex justify-center items-center mb-6">
          <label htmlFor="meal-select" className="mr-4 text-lg font-medium">
            Select Meal:
          </label>
          <select
            id="meal-select"
            className="p-2 text-gray-900 bg-gray-200 border border-gray-300 rounded focus:outline-none"
            value={selectedMeal}
            onChange={handleMealChange}
          >
            {["breakfast", "lunch", "dinner"].map((meal) => (
              <option key={meal} value={meal}>
                {meal.charAt(0).toUpperCase() + meal.slice(1)}
              </option>
            ))}
          </select>
        </div>

        {/* Health Alert */}
        <div className="mb-6">
          <div className="bg-gradient-to-r from-yellow-500 to-red-500 text-white p-4 rounded shadow-lg text-center">
            <span
              role="img"
              aria-label="alert"
              className="text-xl border-2 border-red-500 bg-yellow-200 text-red-600 rounded-full px-2 py-1 inline-block"
            >
              ⚠️
            </span>{" "}
            <strong>Health Alert:</strong> Individuals with dietary restrictions
            for <strong>{selectedDay}</strong> should note:{" "}
            {messMenu[selectedDay]?.meals[selectedMeal]?.[0]?.alert || "None"}
          </div>
        </div>

        {/* Menu Display */}
        <div className="menu-section mb-6">
          <h2 className="text-2xl font-bold text-green-400 mb-3">
            {selectedMeal.toUpperCase()} Menu
          </h2>
          <ul className="menu-list space-y-4">
            {messMenu[selectedDay]?.meals[selectedMeal]?.map((item, index) => (
              <li
                key={index}
                className="menu-item p-4 bg-gray-800 rounded shadow-lg text-lg leading-6"
              >
                <div className="font-semibold mb-2 text-blue-300">
                  {item.name}
                </div>
                <div className="text-gray-400">
                  <span className="font-medium">Nutritional Info:</span>{" "}
                  {item.nutritionalInfo}
                </div>
                <div className="text-yellow-400 mt-2 flex items-center">
                  <span role="img" aria-label="calories" className="mr-2">
                    🔥
                  </span>
                  <span className="font-medium">
                    {item.nutritionalInfo.match(/Calories:\s*\d+\s*kcal/)}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Menu;
