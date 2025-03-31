import { Meal, MealType, DietaryPreference } from '../types/meals';

export const allMeals: Meal[] = [
    // Breakfast Meals (15)
    {
        id: 1,
        name: "Protein Pancakes",
        calories: 600,
        ingredients: ["Protein Powder", "Oats", "Eggs", "Greek Yogurt", "Maple Syrup"],
        emojis: ["🥞", "🌾", "🥚", "🥛", "🍁"],
        time: "Breakfast",
        dietaryTags: ["Meat-eater", "Nut-Free"]
    },
    {
        id: 2,
        name: "Acai Bowl",
        calories: 550,
        ingredients: ["Acai", "Banana", "Granola", "Chia Seeds", "Honey"],
        emojis: ["🥣", "🍌", "🌾", "🌱", "🍯"],
        time: "Breakfast",
        dietaryTags: ["Vegan", "Gluten-Free", "Nut-Free"]
    },
    {
        id: 3,
        name: "Salmon & Avocado Toast",
        calories: 650,
        ingredients: ["Whole Grain Bread", "Smoked Salmon", "Avocado", "Eggs", "Everything Bagel Seasoning"],
        emojis: ["🍞", "🐟", "🥑", "🥚", "🌿"],
        time: "Breakfast",
        dietaryTags: ["Pescatarian", "Nut-Free"]
    },
    {
        id: 4,
        name: "Tofu Scramble Bowl",
        calories: 500,
        ingredients: ["Tofu", "Spinach", "Bell Peppers", "Black Beans", "Turmeric"],
        emojis: ["🥘", "🥬", "🫑", "🫘", "🌿"],
        time: "Breakfast",
        dietaryTags: ["Vegan", "Gluten-Free", "Nut-Free", "Dairy-Free"]
    },
    {
        id: 5,
        name: "Breakfast Burrito",
        calories: 700,
        ingredients: ["Eggs", "Black Beans", "Avocado", "Cheese", "Whole Wheat Tortilla"],
        emojis: ["🌯", "🥚", "🫘", "🥑", "🧀"],
        time: "Breakfast",
        dietaryTags: ["Meat-eater", "Nut-Free"]
    },
    {
        id: 6,
        name: "Overnight Oats",
        calories: 450,
        ingredients: ["Oats", "Almond Milk", "Chia Seeds", "Honey", "Berries"],
        emojis: ["🥣", "🥛", "🌱", "🍯", "🫐"],
        time: "Breakfast",
        dietaryTags: ["Vegan", "Gluten-Free", "Dairy-Free"]
    },
    {
        id: 7,
        name: "Breakfast Quesadilla",
        calories: 650,
        ingredients: ["Eggs", "Cheese", "Spinach", "Whole Wheat Tortilla", "Salsa"],
        emojis: ["🌯", "🥚", "🧀", "🥬", "🍅"],
        time: "Breakfast",
        dietaryTags: ["Meat-eater", "Nut-Free"]
    },
    {
        id: 8,
        name: "Smoothie Bowl",
        calories: 500,
        ingredients: ["Banana", "Mixed Berries", "Spinach", "Almond Milk", "Granola"],
        emojis: ["🥣", "🍌", "🫐", "🥛", "🌾"],
        time: "Breakfast",
        dietaryTags: ["Vegan", "Gluten-Free", "Dairy-Free"]
    },
    {
        id: 9,
        name: "Greek Yogurt Parfait",
        calories: 500,
        ingredients: ["Greek Yogurt", "Granola", "Mixed Berries", "Honey", "Almonds"],
        emojis: ["🥛", "🌾", "🫐", "🍯", "🥜"],
        time: "Breakfast",
        dietaryTags: ["Pescatarian", "Gluten-Free"]
    },
    {
        id: 10,
        name: "Breakfast Pizza",
        calories: 750,
        ingredients: ["Whole Wheat Pita", "Eggs", "Turkey Bacon", "Cheese", "Bell Peppers"],
        emojis: ["🍕", "🥚", "🥓", "🧀", "🫑"],
        time: "Breakfast",
        dietaryTags: ["Meat-eater", "Nut-Free"]
    },
    {
        id: 11,
        name: "Breakfast Tacos",
        calories: 650,
        ingredients: ["Eggs", "Black Beans", "Avocado", "Corn Tortillas", "Salsa"],
        emojis: ["🌮", "🥚", "🫘", "🥑", "🍅"],
        time: "Breakfast",
        dietaryTags: ["Vegan", "Gluten-Free", "Nut-Free", "Dairy-Free"]
    },
    {
        id: 12,
        name: "Protein French Toast",
        calories: 700,
        ingredients: ["Whole Grain Bread", "Protein Powder", "Eggs", "Cinnamon", "Maple Syrup"],
        emojis: ["🍞", "⚪", "🥚", "🌿", "🍁"],
        time: "Breakfast",
        dietaryTags: ["Meat-eater", "Nut-Free"]
    },
    {
        id: 13,
        name: "Breakfast Sushi",
        calories: 550,
        ingredients: ["Sushi Rice", "Egg", "Avocado", "Cream Cheese", "Nori"],
        emojis: ["🍚", "🥚", "🥑", "🧀", "🌊"],
        time: "Breakfast",
        dietaryTags: ["Pescatarian", "Nut-Free"]
    },
    {
        id: 14,
        name: "Breakfast Risotto",
        calories: 600,
        ingredients: ["Arborio Rice", "Mushrooms", "Spinach", "Parmesan", "Egg"],
        emojis: ["🍚", "🍄", "🥬", "🧀", "🥚"],
        time: "Breakfast",
        dietaryTags: ["Meat-eater", "Nut-Free"]
    },
    {
        id: 15,
        name: "Breakfast Polenta",
        calories: 500,
        ingredients: ["Polenta", "Mushrooms", "Spinach", "Parmesan", "Egg"],
        emojis: ["🌽", "🍄", "🥬", "🧀", "🥚"],
        time: "Breakfast",
        dietaryTags: ["Meat-eater", "Nut-Free"]
    },
    // Lunch Meals (15)
    {
        id: 16,
        name: "Vegan Buddha Bowl",
        calories: 700,
        ingredients: ["Quinoa", "Chickpeas", "Kale", "Sweet Potato", "Tahini Dressing"],
        emojis: ["🌾", "🫘", "🥬", "🍠", "🥄"],
        time: "Lunch",
        dietaryTags: ["Vegan", "Gluten-Free", "Nut-Free", "Dairy-Free"]
    },
    {
        id: 17,
        name: "Chicken Caesar Wrap",
        calories: 650,
        ingredients: ["Grilled Chicken", "Romaine", "Parmesan", "Whole Wheat Wrap", "Caesar Dressing"],
        emojis: ["🥪", "🍗", "🥬", "🧀", "🥫"],
        time: "Lunch",
        dietaryTags: ["Meat-eater", "Nut-Free"]
    },
    {
        id: 18,
        name: "Mediterranean Bowl",
        calories: 700,
        ingredients: ["Brown Rice", "Grilled Chicken", "Feta", "Olives", "Cucumber"],
        emojis: ["🍚", "🍗", "🧀", "🫒", "🥒"],
        time: "Lunch",
        dietaryTags: ["Meat-eater", "Nut-Free"]
    },
    {
        id: 19,
        name: "Tuna Pasta Bowl",
        calories: 700,
        ingredients: ["Whole Grain Pasta", "Tuna", "Olive Oil", "Cherry Tomatoes", "Parmesan"],
        emojis: ["🍝", "🐟", "🫒", "🍅", "🧀"],
        time: "Lunch",
        dietaryTags: ["Pescatarian", "Nut-Free"]
    },
    {
        id: 20,
        name: "Veggie Wrap",
        calories: 550,
        ingredients: ["Whole Wheat Wrap", "Hummus", "Mixed Greens", "Cucumber", "Bell Peppers"],
        emojis: ["🥪", "🥫", "🥬", "🥒", "🫑"],
        time: "Lunch",
        dietaryTags: ["Vegan", "Nut-Free", "Dairy-Free"]
    },
    {
        id: 21,
        name: "Salmon Salad",
        calories: 600,
        ingredients: ["Salmon", "Mixed Greens", "Avocado", "Cherry Tomatoes", "Olive Oil"],
        emojis: ["🐟", "🥬", "🥑", "🍅", "🫒"],
        time: "Lunch",
        dietaryTags: ["Pescatarian", "Gluten-Free", "Nut-Free", "Dairy-Free"]
    },
    {
        id: 22,
        name: "Turkey Club",
        calories: 750,
        ingredients: ["Turkey", "Bacon", "Avocado", "Whole Grain Bread", "Lettuce"],
        emojis: ["🥪", "🦃", "🥓", "🥑", "🥬"],
        time: "Lunch",
        dietaryTags: ["Meat-eater", "Nut-Free"]
    },
    {
        id: 23,
        name: "Quinoa Buddha Bowl",
        calories: 750,
        ingredients: ["Quinoa", "Chickpeas", "Kale", "Sweet Potato", "Tahini Dressing"],
        emojis: ["🌾", "🫘", "🥬", "🍠", "🥄"],
        time: "Lunch",
        dietaryTags: ["Vegan", "Gluten-Free", "Nut-Free", "Dairy-Free"]
    },
    {
        id: 24,
        name: "Chicken & Rice Bowl",
        calories: 850,
        ingredients: ["Chicken Breast", "Brown Rice", "Avocado", "Sweet Potato", "Olive Oil"],
        emojis: ["🍗", "🍚", "🥑", "🍠", "🫒"],
        time: "Lunch",
        dietaryTags: ["Meat-eater", "Gluten-Free", "Nut-Free", "Dairy-Free"]
    },
    {
        id: 25,
        name: "Mediterranean Wrap",
        calories: 650,
        ingredients: ["Whole Wheat Wrap", "Falafel", "Hummus", "Mixed Greens", "Tzatziki"],
        emojis: ["🥪", "🥫", "🥫", "🥬", "🥛"],
        time: "Lunch",
        dietaryTags: ["Vegan", "Nut-Free", "Dairy-Free"]
    },
    {
        id: 26,
        name: "Sushi Roll Bowl",
        calories: 700,
        ingredients: ["Sushi Rice", "Tuna", "Avocado", "Cucumber", "Seaweed"],
        emojis: ["🍚", "🐟", "🥑", "🥒", "🌊"],
        time: "Lunch",
        dietaryTags: ["Pescatarian", "Gluten-Free", "Nut-Free", "Dairy-Free"]
    },
    {
        id: 27,
        name: "Chicken Teriyaki Bowl",
        calories: 750,
        ingredients: ["Brown Rice", "Chicken", "Broccoli", "Carrots", "Teriyaki Sauce"],
        emojis: ["🍚", "🍗", "🥦", "🥕", "🥫"],
        time: "Lunch",
        dietaryTags: ["Meat-eater", "Gluten-Free", "Nut-Free", "Dairy-Free"]
    },
    {
        id: 28,
        name: "Vegan Sushi Bowl",
        calories: 600,
        ingredients: ["Sushi Rice", "Tofu", "Avocado", "Cucumber", "Seaweed"],
        emojis: ["🍚", "🥫", "🥑", "🥒", "🌊"],
        time: "Lunch",
        dietaryTags: ["Vegan", "Gluten-Free", "Nut-Free", "Dairy-Free"]
    },
    {
        id: 29,
        name: "Mediterranean Pasta",
        calories: 700,
        ingredients: ["Whole Grain Pasta", "Olive Oil", "Cherry Tomatoes", "Kalamata Olives", "Feta"],
        emojis: ["🍝", "🫒", "🍅", "🫒", "🧀"],
        time: "Lunch",
        dietaryTags: ["Pescatarian", "Nut-Free"]
    },
    // Dinner Meals (15)
    {
        id: 30,
        name: "Grilled Salmon",
        calories: 650,
        ingredients: ["Salmon", "Brown Rice", "Broccoli", "Lemon", "Olive Oil"],
        emojis: ["🐟", "🍚", "🥦", "🍋", "🫒"],
        time: "Dinner",
        dietaryTags: ["Pescatarian", "Gluten-Free", "Nut-Free", "Dairy-Free"]
    },
    {
        id: 31,
        name: "Vegan Stir Fry",
        calories: 600,
        ingredients: ["Tofu", "Brown Rice", "Mixed Vegetables", "Soy Sauce", "Ginger"],
        emojis: ["🥘", "🍚", "🥬", "🥫", "🧄"],
        time: "Dinner",
        dietaryTags: ["Vegan", "Gluten-Free", "Nut-Free", "Dairy-Free"]
    },
    {
        id: 32,
        name: "Beef & Sweet Potato Bowl",
        calories: 950,
        ingredients: ["Ground Beef", "Sweet Potato", "Spinach", "Cheese", "Sour Cream"],
        emojis: ["🥩", "🍠", "🥬", "🧀", "🥛"],
        time: "Dinner",
        dietaryTags: ["Meat-eater", "Gluten-Free", "Nut-Free"]
    },
    {
        id: 33,
        name: "Shrimp Pasta",
        calories: 800,
        ingredients: ["Whole Grain Pasta", "Shrimp", "Garlic", "Olive Oil", "Parmesan"],
        emojis: ["🍝", "🦐", "🧄", "🫒", "🧀"],
        time: "Dinner",
        dietaryTags: ["Pescatarian", "Nut-Free"]
    },
    {
        id: 34,
        name: "Vegan Curry",
        calories: 700,
        ingredients: ["Coconut Milk", "Chickpeas", "Brown Rice", "Curry Powder", "Spinach"],
        emojis: ["🥘", "🥥", "🫘", "🍚", "🥬"],
        time: "Dinner",
        dietaryTags: ["Vegan", "Gluten-Free", "Nut-Free", "Dairy-Free"]
    },
    {
        id: 35,
        name: "Chicken Stir Fry",
        calories: 750,
        ingredients: ["Chicken Breast", "Brown Rice", "Mixed Vegetables", "Soy Sauce", "Ginger"],
        emojis: ["🍗", "🍚", "🥬", "🥫", "🧄"],
        time: "Dinner",
        dietaryTags: ["Meat-eater", "Gluten-Free", "Nut-Free", "Dairy-Free"]
    },
    {
        id: 36,
        name: "Baked Cod",
        calories: 600,
        ingredients: ["Cod", "Quinoa", "Asparagus", "Lemon", "Olive Oil"],
        emojis: ["🐟", "🌾", "🥬", "🍋", "🫒"],
        time: "Dinner",
        dietaryTags: ["Pescatarian", "Gluten-Free", "Nut-Free", "Dairy-Free"]
    },
    {
        id: 37,
        name: "Vegan Lasagna",
        calories: 800,
        ingredients: ["Whole Grain Noodles", "Tofu Ricotta", "Spinach", "Marinara", "Nutritional Yeast"],
        emojis: ["🍝", "🥫", "🥬", "🍅", "🌱"],
        time: "Dinner",
        dietaryTags: ["Vegan", "Nut-Free", "Dairy-Free"]
    },
    {
        id: 38,
        name: "Grilled Chicken Pasta",
        calories: 850,
        ingredients: ["Whole Grain Pasta", "Grilled Chicken", "Broccoli", "Alfredo Sauce", "Parmesan"],
        emojis: ["🍝", "🍗", "🥦", "🥛", "🧀"],
        time: "Dinner",
        dietaryTags: ["Meat-eater", "Nut-Free"]
    },
    {
        id: 39,
        name: "Seafood Paella",
        calories: 900,
        ingredients: ["Arborio Rice", "Shrimp", "Mussels", "Bell Peppers", "Saffron"],
        emojis: ["🍚", "🦐", "🦪", "🫑", "🌿"],
        time: "Dinner",
        dietaryTags: ["Pescatarian", "Gluten-Free", "Nut-Free", "Dairy-Free"]
    },
    {
        id: 40,
        name: "Vegan Shepherd's Pie",
        calories: 750,
        ingredients: ["Lentils", "Mashed Potatoes", "Mixed Vegetables", "Mushrooms", "Gravy"],
        emojis: ["🫘", "🥔", "🥬", "🍄", "🥫"],
        time: "Dinner",
        dietaryTags: ["Vegan", "Gluten-Free", "Nut-Free", "Dairy-Free"]
    },
    {
        id: 41,
        name: "Beef Wellington",
        calories: 1000,
        ingredients: ["Beef Tenderloin", "Mushrooms", "Puff Pastry", "Prosciutto", "Herbs"],
        emojis: ["🥩", "🍄", "🥐", "🥓", "🌿"],
        time: "Dinner",
        dietaryTags: ["Meat-eater", "Nut-Free"]
    },
    // Snack Meals (15)
    {
        id: 42,
        name: "Protein Smoothie",
        calories: 400,
        ingredients: ["Protein Powder", "Banana", "Almond Milk", "Spinach", "Chia Seeds"],
        emojis: ["🥛", "🍌", "🥛", "🥬", "🌱"],
        time: "Snack",
        dietaryTags: ["Vegan", "Gluten-Free", "Dairy-Free"]
    },
    {
        id: 43,
        name: "Greek Yogurt Bowl",
        calories: 500,
        ingredients: ["Greek Yogurt", "Granola", "Mixed Berries", "Honey", "Almonds"],
        emojis: ["🥛", "🌾", "🫐", "🍯", "🥜"],
        time: "Snack",
        dietaryTags: ["Pescatarian", "Gluten-Free"]
    },
    {
        id: 44,
        name: "Trail Mix Bowl",
        calories: 600,
        ingredients: ["Mixed Nuts", "Dried Fruit", "Dark Chocolate", "Seeds", "Coconut"],
        emojis: ["🥜", "🍇", "🍫", "🌱", "🥥"],
        time: "Snack",
        dietaryTags: ["Vegan", "Gluten-Free", "Dairy-Free"]
    },
    {
        id: 45,
        name: "Protein Energy Balls",
        calories: 450,
        ingredients: ["Protein Powder", "Oats", "Peanut Butter", "Honey", "Chia Seeds"],
        emojis: ["⚪", "🌾", "🥜", "🍯", "🌱"],
        time: "Snack",
        dietaryTags: ["Vegan", "Gluten-Free", "Dairy-Free"]
    },
    {
        id: 46,
        name: "Hummus & Veggies",
        calories: 400,
        ingredients: ["Hummus", "Carrots", "Cucumber", "Bell Peppers", "Pita Chips"],
        emojis: ["🥫", "🥕", "🥒", "🫑", "🥖"],
        time: "Snack",
        dietaryTags: ["Vegan", "Nut-Free", "Dairy-Free"]
    },
    {
        id: 47,
        name: "Tuna & Crackers",
        calories: 450,
        ingredients: ["Tuna", "Whole Grain Crackers", "Avocado", "Cherry Tomatoes", "Everything Bagel Seasoning"],
        emojis: ["🐟", "🥖", "🥑", "🍅", "🌿"],
        time: "Snack",
        dietaryTags: ["Pescatarian", "Nut-Free"]
    },
    {
        id: 48,
        name: "Protein Ice Cream",
        calories: 550,
        ingredients: ["Protein Powder", "Banana", "Almond Milk", "Cocoa Powder", "Peanut Butter"],
        emojis: ["🍦", "🍌", "🥛", "🍫", "🥜"],
        time: "Snack",
        dietaryTags: ["Vegan", "Gluten-Free", "Dairy-Free"]
    },
    {
        id: 49,
        name: "Cheese & Fruit Plate",
        calories: 500,
        ingredients: ["Cheese", "Apple", "Grapes", "Almonds", "Honey"],
        emojis: ["🧀", "🍎", "🍇", "🥜", "🍯"],
        time: "Snack",
        dietaryTags: ["Pescatarian", "Gluten-Free"]
    },
    {
        id: 50,
        name: "Vegan Protein Bowl",
        calories: 450,
        ingredients: ["Quinoa", "Chickpeas", "Kale", "Sweet Potato", "Tahini Dressing"],
        emojis: ["🌾", "🫘", "🥬", "🍠", "🥄"],
        time: "Snack",
        dietaryTags: ["Vegan", "Gluten-Free", "Nut-Free", "Dairy-Free"]
    },
    {
        id: 51,
        name: "Protein Popcorn",
        calories: 400,
        ingredients: ["Popcorn", "Protein Powder", "Coconut Oil", "Sea Salt", "Nutritional Yeast"],
        emojis: ["🍿", "⚪", "🥥", "🧂", "🌱"],
        time: "Snack",
        dietaryTags: ["Vegan", "Gluten-Free", "Nut-Free", "Dairy-Free"]
    },
    {
        id: 52,
        name: "Vegan Protein Cookies",
        calories: 450,
        ingredients: ["Protein Powder", "Oats", "Almond Butter", "Maple Syrup", "Dark Chocolate"],
        emojis: ["🍪", "🌾", "🥜", "🍁", "🍫"],
        time: "Snack",
        dietaryTags: ["Vegan", "Gluten-Free", "Dairy-Free"]
    },
    {
        id: 53,
        name: "Protein Chips",
        calories: 400,
        ingredients: ["Protein Powder", "Rice Paper", "Spices", "Olive Oil", "Sea Salt"],
        emojis: ["🥔", "⚪", "🌿", "🫒", "🧂"],
        time: "Snack",
        dietaryTags: ["Vegan", "Gluten-Free", "Nut-Free", "Dairy-Free"]
    },
    {
        id: 54,
        name: "Greek Yogurt Bark",
        calories: 500,
        ingredients: ["Greek Yogurt", "Mixed Berries", "Honey", "Granola", "Chia Seeds"],
        emojis: ["🥛", "🫐", "🍯", "🌾", "🌱"],
        time: "Snack",
        dietaryTags: ["Pescatarian", "Gluten-Free"]
    },
    {
        id: 55,
        name: "Protein Rice Cakes",
        calories: 450,
        ingredients: ["Rice Cakes", "Protein Powder", "Peanut Butter", "Banana", "Honey"],
        emojis: ["🍚", "⚪", "🥜", "🍌", "🍯"],
        time: "Snack",
        dietaryTags: ["Vegan", "Gluten-Free", "Dairy-Free"]
    },
    {
        id: 56,
        name: "Vegan Protein Muffins",
        calories: 400,
        ingredients: ["Protein Powder", "Banana", "Oats", "Almond Milk", "Dark Chocolate"],
        emojis: ["🧁", "🍌", "🌾", "🥛", "🍫"],
        time: "Snack",
        dietaryTags: ["Vegan", "Gluten-Free", "Dairy-Free"]
    },
    {
        id: 30,
        name: "Grilled Salmon",
        calories: 650,
        ingredients: ["Salmon", "Brown Rice", "Broccoli", "Lemon", "Olive Oil"],
        emojis: ["🐟", "🍚", "🥦", "🍋", "🫒"],
        time: "Dinner",
        dietaryTags: ["Pescatarian", "Gluten-Free", "Nut-Free", "Dairy-Free"]
    },
    {
        id: 31,
        name: "Vegan Stir Fry",
        calories: 600,
        ingredients: ["Tofu", "Brown Rice", "Mixed Vegetables", "Soy Sauce", "Ginger"],
        emojis: ["🥘", "🍚", "🥬", "🥫", "🧄"],
        time: "Dinner",
        dietaryTags: ["Vegan", "Gluten-Free", "Nut-Free", "Dairy-Free"]
    },
    {
        id: 32,
        name: "Beef & Sweet Potato Bowl",
        calories: 950,
        ingredients: ["Ground Beef", "Sweet Potato", "Spinach", "Cheese", "Sour Cream"],
        emojis: ["🥩", "🍠", "🥬", "🧀", "🥛"],
        time: "Dinner",
        dietaryTags: ["Meat-eater", "Gluten-Free", "Nut-Free"]
    },
    {
        id: 33,
        name: "Shrimp Pasta",
        calories: 800,
        ingredients: ["Whole Grain Pasta", "Shrimp", "Garlic", "Olive Oil", "Parmesan"],
        emojis: ["🍝", "🦐", "🧄", "🫒", "🧀"],
        time: "Dinner",
        dietaryTags: ["Pescatarian", "Nut-Free"]
    },
    {
        id: 34,
        name: "Vegan Curry",
        calories: 700,
        ingredients: ["Coconut Milk", "Chickpeas", "Brown Rice", "Curry Powder", "Spinach"],
        emojis: ["🥘", "🥥", "🫘", "🍚", "🥬"],
        time: "Dinner",
        dietaryTags: ["Vegan", "Gluten-Free", "Nut-Free", "Dairy-Free"]
    },
    {
        id: 35,
        name: "Chicken Stir Fry",
        calories: 750,
        ingredients: ["Chicken Breast", "Brown Rice", "Mixed Vegetables", "Soy Sauce", "Ginger"],
        emojis: ["🍗", "🍚", "🥬", "🥫", "🧄"],
        time: "Dinner",
        dietaryTags: ["Meat-eater", "Gluten-Free", "Nut-Free", "Dairy-Free"]
    },
    {
        id: 36,
        name: "Baked Cod",
        calories: 600,
        ingredients: ["Cod", "Quinoa", "Asparagus", "Lemon", "Olive Oil"],
        emojis: ["🐟", "🌾", "🥬", "🍋", "🫒"],
        time: "Dinner",
        dietaryTags: ["Pescatarian", "Gluten-Free", "Nut-Free", "Dairy-Free"]
    },
    {
        id: 37,
        name: "Vegan Lasagna",
        calories: 800,
        ingredients: ["Whole Grain Noodles", "Tofu Ricotta", "Spinach", "Marinara", "Nutritional Yeast"],
        emojis: ["🍝", "🥫", "🥬", "🍅", "🌱"],
        time: "Dinner",
        dietaryTags: ["Vegan", "Nut-Free", "Dairy-Free"]
    },
    {
        id: 38,
        name: "Grilled Chicken Pasta",
        calories: 850,
        ingredients: ["Whole Grain Pasta", "Grilled Chicken", "Broccoli", "Alfredo Sauce", "Parmesan"],
        emojis: ["🍝", "🍗", "🥦", "🥛", "🧀"],
        time: "Dinner",
        dietaryTags: ["Meat-eater", "Nut-Free"]
    },
    {
        id: 39,
        name: "Seafood Paella",
        calories: 900,
        ingredients: ["Arborio Rice", "Shrimp", "Mussels", "Bell Peppers", "Saffron"],
        emojis: ["🍚", "🦐", "🦪", "🫑", "🌿"],
        time: "Dinner",
        dietaryTags: ["Pescatarian", "Gluten-Free", "Nut-Free", "Dairy-Free"]
    },
    {
        id: 40,
        name: "Vegan Shepherd's Pie",
        calories: 750,
        ingredients: ["Lentils", "Mashed Potatoes", "Mixed Vegetables", "Mushrooms", "Gravy"],
        emojis: ["🫘", "🥔", "🥬", "🍄", "🥫"],
        time: "Dinner",
        dietaryTags: ["Vegan", "Nut-Free", "Dairy-Free"]
    },
]; 