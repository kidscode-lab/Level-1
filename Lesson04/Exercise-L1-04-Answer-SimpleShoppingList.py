# L1 - Exercise 04
#   Shopping List

#   1. Create an empty list
shoppingList = []

# 2. Use a for loop to get 5 user inputs
for i in range(5):
    shoppingItem = input(f"Enter item {i + 1}: ")
    # 3. Append each item to the list
    shoppingList.append(shoppingItem)

# 4a. Sort the list
shoppingList.sort()

# 4b. Print the sorted list
print("Your shopping list is:", shoppingList)

# 4c. Print each item using a for loop
for item in shoppingList:
    print(item)
