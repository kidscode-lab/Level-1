# L1 - Lesson 04
#   Lab Answer
#   For List, Tuples, Sets, and Dictionary

# List
# Question: Create a list of your 5 favorite movies.
#   Add a new movie to the end,
#   then change the 2nd movie to a different one.
#   Print the final list.
print('----- Lab for List')
favorite_movies = ["Inception", "The Matrix", "Interstellar", "Spirited Away", "The Dark Knight"]
favorite_movies.append("Everything Everywhere All at Once")
favorite_movies[1] = "Parasite"
print("My favorite movies:", favorite_movies)

# Tuples
# Question: Create a tuple with your birth year, month, and day.
#   Try to access each element and print them in a sentence like
#   "I was born in [year]".
print()
print('----- Lab for Tuples')
bd = ('2000', 'Jul', '14')
print(f'I was born in {bd[0]}')

# Sets
# Question: Create two sets: 
#       one with your favorite colors and 
#       another with your friend's favorite colors. 
#       Find colors you both like using set operations.
#       Hints : use & operator
print()
print('----- Lab for Sets')
my_colors = {"blue", "green", "black", "white"}
friend_colors = {"red", "green", "blue", "yellow"}
# Find common favorite colors (intersection)
common_colors = my_colors & friend_colors
print("Colors we both like:", common_colors)
uncommon_colors = my_colors ^ friend_colors
print("Colors that are not common:", uncommon_colors)

# Dictionary
# Question: Create a dictionary about your pet (or dream pet) with keys: 
#   name, type, age, and favorite_food. 
#   Add a new key "tricks" with a list of tricks.
print()
print('----- Lab for Dictionary')
pet = {
    "name": "Shadow",
    "type": "dog",
    "age": 3,
    "favorite_food": "chicken"
}
pet["tricks"] = ["sit", "roll over", "fetch", "play dead"]
print(pet)
