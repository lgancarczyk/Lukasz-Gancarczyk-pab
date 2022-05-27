# Lukasz-Gancarczyk-pab
Projekt robiony na labolatoriach to: Projekt2_1 <br />
Projekt końcowy: Strona_z_przepisami <br />
Link do Przykładowych komend w PostManie: https://www.postman.com/spaceflight-cosmonaut-87158663/workspace/8bdd472f-f617-4dc5-847f-380b7302701f/overview


API:\
  1.  Register: (POST)<br />
      http://localhost:3000/user/register<br />
      body:<br />
      {<br />
        "username": "<your_username>",<br />
        "password": "<your_password>"<br />
      }<br />

  2.  Login: (POST)<br />
      http://localhost:3000/user/login<br />
        body:\
        {\
          "username": "<your_username>",\
          "password": "<your_password>"\
        }<br />

  3.  LogOut: (GET)\
      (user must be logged in)\
      http://localhost:3000/user/logout<br />

  4.  Delete User: (DELETE)\
      (user must be logged in)\
      http://localhost:3000/user/delete<br />

  5.  Adding Recipes: (POST)\
      (user must be logged in)\
      returns recipe id\
      http://localhost:3000/recipe/add<br />
      body:\
        {<br />
          "Title": "<Title>",\
          "NoOfPortions": <portions (int)>,\
          "CookingTime": <time_in_minutes (int)>,\
          "Ingredients":[<br />
              "<your_ingredient>", "<your_ingredient>"<br />
          ],<br />
          "Instruction": "<your instruction>",\
          "Tags":[\
              "<your_tag>","<your_tag>"\
          ]\
        }<br />
  
  6.  Edit Recipe: (PUT)\
      (user must be logged in and be owner)\
      http://localhost:3000/recipe/edit/<recipe_id><br />
      body: (includes fields that you want to update)\
        {<br />
          "Title": "<your new title>"\
        }<br />

  7.  Delete Recipe: (DELETE)\
      (user must be logged in and be owner)\
      http://localhost:3000/recipe/delete/<recipe_id><br />

  8.  Add/Edit/Delete Rate: (POST) \
      (user have one rate per recipe)\
      (user must be logged in)\
      http://localhost:3000/recipe/rate/<recipe_Id>/<rate (1-5),(0 - deletes rate)><br />

  9.  Add Comment: (POST)\
      (user must be logged in)\
      http://localhost:3000/recipe/addcomment/<recipe_id><br />
      body:\
        {<br />
        "Comment":"<your_comment>"\
        }<br />

  10. Delete Comment: (DELETE)\
      (user must be logged in and be comment owner)\
      http://localhost:3000/recipe/deletecomment/<comment_id><br />

  11. Get Comment by id: (GET)\
      http://localhost:3000/recipe/getcomment/<comment_id><br />

  12. Get All Recipes: (GET)\
      http://localhost:3000/recipe/getall<br />

  13. Get Recipe by Id: (GET)\
    http://localhost:3000/recipe/get/<recipe_id><br />

  14. Get recipes by tag: (GET)\
      returns a list of Recipes which includes given tag\
      http://localhost:3000/recipe/tag/<tag_name><br />

  15. Get recipes by userId: (GET)\
      return a list of Recipes created by given user\
      http://localhost:3000/recipe/getbyuserid/<user_id><br />

