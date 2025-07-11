# Initial values
budget = 100
shopping_list = []

while True:
    # \n = print a line before "Menu"
    print("\n=== Birthday Party Planning ===")
    print("1. Buy Decorations ($15)")
    print("2. Buy Cake ($25)")
    print("3. Buy Party Favors ($10)")
    print("4. Check Budget")
    print("5. Exit")
    
    choice = input("Enter your choice: ")
    
    if choice == "1":
        # buy decorations
        print()
    elif choice == "2":
        # buy cake
        
    elif choice == "3":
        # buy party favors
        
    elif choice == "4":
        # check budget and shopping list
        
    elif choice == "5":
        # say goodbye and show final summary
        break
        
    else:
        # print a message to tell user the input is invalid
        print("Invalid choice! Please select 1-5.")
