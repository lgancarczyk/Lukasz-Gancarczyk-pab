# Lukasz-Gancarczyk-pab
Projekt robiony na labolatoriach to: Projekt2_1 <br />
Projekt końcowy: Strona_z_przepisami <br />
Link do Przykładowych komend w PostManie: https://www.postman.com/spaceflight-cosmonaut-87158663/workspace/8bdd472f-f617-4dc5-847f-380b7302701f/overview


API:
1. Register: (POST)
  http://localhost:3000/user/register
  body:
  {
    "username": "<your_username>",
    "password": "<your_password>"
  }
  
2. Login: (POST)
  http://localhost:3000/user/login
    body:
    {
      "username": "<your_username>",
      "password": "<your_password>"
    }
  
3. LogOut: (GET)
  (user must be logged in)
  http://localhost:3000/user/logout
  
4.Delete User: (DELETE)
  (user must be logged in)
  http://localhost:3000/user/delete
  
5.Adding Recipes: (POST)
  (user must be logged in)
  returns recipe id
  http://localhost:3000/recipe/add
  body:
    {
      "Title": "<Title>",
      "NoOfPortions": <portions (int)>,
      "CookingTime": <time_in_minutes (int)>,
      "Ingredients":[
          "<your ingredient>", "<your ingredient>"
      ],
      "Instruction": "<your instruction>",
      "Tags":[
          "<your_tag>","<your_tag>"
      ]
    }
6.Edit Recipe: (PUT)
  (user must be logged in and be owner)
  http://localhost:3000/recipe/edit/<recipe_id>
  body: (includes fields that you want to update)
    {
      "Title": "<your new title>"
    }
  
7.Delete Recipe: (DELETE)
  (user must be logged in and be owner)
  http://localhost:3000/recipe/delete/<recipe_id>

8.Add/Edit/Delete Rate: (POST) 
  (user have one rate per recipe)
  (user must be logged in)
  http://localhost:3000/recipe/rate/<recipe_Id>/<rate (1-5),(0 - deletes rate)>
  
9.Add Comment: (POST)
  (user must be logged in)
  http://localhost:3000/recipe/addcomment/<recipe_id>
  body:
    {
    "Comment":"<your_comment>"
    }
  
10.Delete Comment: (DELETE)
  (user must be logged in and be comment owner)
  http://localhost:3000/recipe/deletecomment/<comment_id>
  
11.Get Comment by id: (GET)
  http://localhost:3000/recipe/getcomment/<comment_id>
  
12. Get All Recipes: (GET)
  http://localhost:3000/recipe/getall
  
13. Get Recipe by Id: (GET)
  http://localhost:3000/recipe/get/<recipe_id>
  
14. Get recipes by tag: (GET)
  returns a list of Recipes which includes given tag
  http://localhost:3000/recipe/tag/<tag_name>
  
15. Get recipes by userId: (GET)
  return a list of Recipes created by given user
  http://localhost:3000/recipe/getbyuserid/<user_id>
