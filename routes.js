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

  let query = "SELECT * FROM recipes";
  const params = [];

  if (category) {
    query += " WHERE category = ?";
    params.push(category);
  }

  db.all(query, params, (err, rows) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({
        error: "Server error while fetching recipes",
      });
    }

    res.json(rows || []);
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
  const { id } = req.params;

  if (!id || isNaN(id)) {
    return res.status(400).json({
      error:
        "Id parameter is required and must be a number. Example: /recipes/1",
    });
  }

  db.get("SELECT * FROM recipes WHERE id = ?", [id], (err, row) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Error fetching recipe" });
    }
    if (!row) {
      return res.status(404).json({ error: "Recipe not found" });
    }
    res.json(row);
  });
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
  const { name, category, instructions, ingredients, prep_time } = req.body;

  if (!name || !category || !instructions || !ingredients || !prep_time) {
    return res.status(400).json({ error: "All fields are required" });
  }

  db.run(
    "INSERT INTO recipes (name, category, instructions, ingredients, prep_time) VALUES (?, ?, ?, ?, ?)",
    [name, category, instructions, ingredients, prep_time],
    function (err) {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Error adding recipe" });
      }
      res.status(200).json({
        message: "Recipe added successfully",
        recipe: {
          id: this.lastID,
          name,
          category,
          instructions,
          ingredients,
          prep_time,
        },
      });
    }
  );
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
  const query = "SELECT * FROM meal_plans";

  db.all(query, (err, rows) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Error fetching meal plans" });
    }
    res.json(rows || []);
  });
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
