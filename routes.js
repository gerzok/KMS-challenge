const express = require("express");
const router = express.Router();
let { db } = require("./database.js");

/*
GET @ /api/recipes
Returns all recipes with optional category filtering
Query Parameters:
- category: (optional) Filter recipes by category (e.g., breakfast, lunch, dinner)
Expected format:
  [
    {
        "id": 1,
        "name": "Pasta Carbonara",
        "category": "dinner",
        "instructions": "1. Cook pasta. 2. Mix eggs and cheese. 3. Combine with pasta.",
        "ingredients": "Pasta, Eggs, Cheese, Bacon",
        "prep_time": 30
    },
    .
    .
  ]
*/

router.get("/recipes", (req, res) => {
  const { category } = req.query;

  if (!category) {
    return res.status(400).json({
      error:
        "Category parameter is required. Example: /recipes?category=dinner",
    });
  }

  const query = "SELECT * FROM recipes WHERE category = ?";
  const params = [category];

  db.all(query, params, (err, rows) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({
        error: "Server error while fetching recipes",
      });
    }

    if (!rows || rows.length === 0) {
      return res.status(200).json([]);
    }

    res.json(rows);
  });
});

/*
GET @ /api/recipes/id
Returns single recipe
Expected Format:
    {
        "id": 1,
        "name": "Pasta Carbonara",
        "category": "dinner",
        "instructions": "1. Cook pasta. 2. Mix eggs and cheese. 3. Combine with pasta.",
        "ingredients": "Pasta, Eggs, Cheese, Bacon",
        "prep_time": 30
    }
NOTE: If the recipe with id is not found, return status 404 with message 'Recipe not found'
*/
router.get("/recipes/:id", (req, res) => {
  //Your code goes here
});

/*
POST @ /api/recipes
Add a new recipe
Req body Example:
{
    "name": "Avocado Toast",
    "category": "breakfast",
    "instructions": "1. Toast bread. 2. Mash avocado. 3. Spread on toast. 4. Season.",
    "ingredients": "Bread, Avocado, Salt, Pepper, Lemon juice",
    "prep_time": 10
}
Response:
{
    "message": "Recipe added successfully",
    "recipe": 
        {
            "id": 3,
            "name": "Avocado Toast",
            "category": "breakfast",
            "instructions": "1. Toast bread. 2. Mash avocado. 3. Spread on toast. 4. Season.",
            "ingredients": "Bread, Avocado, Salt, Pepper, Lemon juice",
            "prep_time": 10
        }
}
*/
router.post("/recipes", (req, res) => {
  //Your code goes here
});

/*
POST @ /api/meal-plans
Create a new meal plan
Req body Example:
{
    "name": "Week of June 5",
    "date": "2023-06-05",
    "recipe_ids": [1, 2],
    "notes": "Focus on quick meals this week"
}
Response:
{
    "message": "Meal plan created successfully",
    "meal_plan": 
        {
            "id": 1,
            "name": "Week of June 5",
            "date": "2023-06-05",
            "recipe_ids": "[1,2]",
            "notes": "Focus on quick meals this week"
        }
}
*/
router.post("/meal-plans", (req, res) => {
  //Your code goes here
});

/*
GET @ /api/meal-plans
Returns all meal plans
Expected format:
  [
    {
        "id": 1,
        "name": "Week of June 5",
        "date": "2023-06-05",
        "recipe_ids": "[1,2]",
        "notes": "Focus on quick meals this week"
    },
    .
    .
  ]
*/
router.get("/meal-plans", (req, res) => {
  //Your code goes here
});

/*
DELETE @ api/meal-plans/id
Delete a meal plan
Response:
{
    "message": "Meal plan deleted successfully"
}
NOTE: If the meal plan with id is not found, return status 400 with error message.
*/
router.delete("/meal-plans/:id", (req, res) => {
  //Your code goes here
});

module.exports = router;
