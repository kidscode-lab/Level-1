# L1 - Lesson 05
#   Enhance shopping list

shoppingList = []

print("Enter your shopping items. Press Enter without typing anything to finish.")

while True:
    shoppingItem = input(f"Enter item {len(shoppingList) + 1}: ").strip()
    if shoppingItem == "":
        break
    shoppingList.append(shoppingItem)

# Sort the list
shoppingList.sort()

# Save to file
file_name = "shopping_list.txt"
with open(file_name, "w") as f:
    for item in shoppingList:
        f.write(item + "\n")

# Inform the user
print(f"Your shopping list has been saved to '{file_name}'.")
