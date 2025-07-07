# L1 - Lesson 04
#   Exercise answer for Lesson 03
budget = 100
shopping_list = []

print("Welcome to Birthday Party Planning!")
print(f"You have ${budget} to spend on your party!")

while True:
    # Display menu
    print("\n=== Birthday Party Planning ===")
    print("1. Buy Decorations ($15)")
    print("2. Buy Cake ($25)")
    print("3. Buy Party Favors ($10)")
    print("4. Check Budget")
    print("5. Exit")
    
    choice = input("Enter your choice: ")
    
    if choice == "1":
        # Buy Decorations
        item_name = "Decorations"
        item_cost = 15
        
        if budget >= item_cost:
            budget -= item_cost
            shopping_list.append(item_name)
            print(f"Great! You bought {item_name} for ${item_cost}!")
        else:
            print(f"Not enough budget for {item_name}!")
            
    elif choice == "2":
        # Buy Cake
        item_name = "Cake"
        item_cost = 25
        
        if budget >= item_cost:
            budget -= item_cost
            shopping_list.append(item_name)
            print(f"Great! You bought {item_name} for ${item_cost}!")
        else:
            print(f"Not enough budget for {item_name}!")
            
    elif choice == "3":
        # Buy Party Favors
        item_name = "Party Favors"
        item_cost = 10
        
        if budget >= item_cost:
            budget -= item_cost
            shopping_list.append(item_name)
            print(f"Great! You bought {item_name} for ${item_cost}!")
        else:
            print(f"Not enough budget for {item_name}!")
            
    elif choice == "4":
        # Check Budget
        print(f"\nBudget remaining: ${budget}")
        if shopping_list:
            print("Items purchased:")
            for item in shopping_list:
                print(f"  - {item}")
        else:
            print("No items purchased yet.")
            
    elif choice == "5":
        # Exit
        print("\n=== Party Planning Complete! ===")
        print(f"Money spent: ${100 - budget}")
        print(f"Money remaining: ${budget}")
        
        if shopping_list:
            print("Your party shopping list:")
            for item in shopping_list:
                print(f"  ✓ {item}")
        else:
            print("No items purchased.")
            
        print("Have a great party!")
        break
        
    else:
        # Invalid choice
        print("Invalid choice! Please select 1-5.")