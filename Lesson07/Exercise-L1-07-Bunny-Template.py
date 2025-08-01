import json
import time
import sys
import random

# Color codes for terminal output
class Colors:
    HEADER = '\033[95m'
    BLUE = '\033[94m'
    GREEN = '\033[92m'
    WARNING = '\033[93m'
    FAIL = '\033[91m'
    ENDC = '\033[0m'
    BOLD = '\033[1m'

def print_colored(text, color):
    """Print text in color"""
    print(f"{color}{text}{Colors.ENDC}")

def typewriter_effect(text, delay=0.03):
    """Print text with typewriter effect"""
    for char in text:
        sys.stdout.write(char)
        sys.stdout.flush()
        time.sleep(delay)
    print()

def loading_animation(message="Loading", duration=2):
    """Show loading animation"""
    print(f"{message}", end="")
    for i in range(duration * 4):
        print(".", end="", flush=True)
        time.sleep(0.25)
    print(" Done! ✅")

def print_title():
    """Print fancy game title"""
    print_colored("🐰" * 50, Colors.HEADER)
    print_colored("           🌟 VIRTUAL BUNNY PET GAME 🌟", Colors.HEADER)
    print_colored("🐰" * 50, Colors.HEADER)
    print()

def get_bunny_mood(pet):
    """Determine bunny's overall mood"""
    total_wellness = (pet["health"] + pet["happiness"] + (10 - pet["hunger"])) / 3
    
    if total_wellness >= 8:
        return "ecstatic"
    elif total_wellness >= 6:
        return "happy"
    elif total_wellness >= 4:
        return "okay"
    elif total_wellness >= 2:
        return "worried"
    else:
        return "sick"

def get_bunny_face_and_message(pet):
    """Get dynamic face and message based on pet's condition"""
    mood = get_bunny_mood(pet)
    
    faces_and_messages = {
        "ecstatic": {
            "face": "( ◕ ω ◕ )",
            "message": f"🌟 {pet['name']} is absolutely glowing with happiness! 🌟",
            "color": Colors.GREEN
        },
        "happy": {
            "face": "( ˶ᵔ ᵕ ᵔ˶ )",
            "message": f"😊 {pet['name']} is feeling great today!",
            "color": Colors.BLUE
        },
        "okay": {
            "face": "( ･ω･ )",
            "message": f"🙂 {pet['name']} is doing alright.",
            "color": Colors.ENDC
        },
        "worried": {
            "face": "( ˘︹˘ )",
            "message": f"😟 {pet['name']} seems a bit worried...",
            "color": Colors.WARNING
        },
        "sick": {
            "face": "( ╥ω╥ )",
            "message": f"😰 {pet['name']} needs your help urgently!",
            "color": Colors.FAIL
        }
    }
    
    return faces_and_messages[mood]

def create_status_bar(value, max_value=10, bar_length=20):
    """Create a visual status bar"""
    filled_length = int(bar_length * value / max_value)
    bar = '█' * filled_length + '░' * (bar_length - filled_length)
    percentage = int(100 * value / max_value)
    return f"[{bar}] {percentage}%"

# Step 1
def load_bunny_data():
    try:
        # Read Pet's data from file if pet_data exist
        with open("pet_data.json", "r") as file:
            # return a DICTIONARY variable
            return json.load(file)
    except FileNotFoundError:
        # if no Bunny's data exist, set initial attributes,
        return {"name": "Fluffy", "hunger": 5, "happiness": 5, "health": 10}

# Step 2
def display_menu():
    """Display colorful interactive menu"""
    print()
    print_colored("🎮 What would you like to do with your bunny?", Colors.HEADER)
    print()
    print("1. 🥕 Feed your pet")
    print("2. 🎾 Play with your pet")
    print("3. 📊 Check pet status")
    print("4. 💾 Save and Quit")
    print()
    
    while True:
        try:
            choice = input("👆 Enter your choice (1-4): ")
            choice_int = int(choice)
            if 1 <= choice_int <= 4:
                return choice_int
            else:
                print_colored("❌ Please enter a number between 1 and 4!", Colors.FAIL)
        except ValueError:
            print_colored("❌ Please enter a valid number!", Colors.FAIL)

def save_bunny_data(pet):
    pass

# Step 3.3
def display_bunny_status(pet):
    """Enhanced status display with visual elements"""
    pass

# Step 4
def feed_bunny(pet):
    """Feed bunny with personality responses"""

    input("\n🎯 Press Enter to continue...")
    return pet

# Step 5
def play_with_bunny(pet):
    """Play with bunny with fun activities"""
    activities = [
        "🎾 threw a ball",
        "🐰 did bunny hops together",
        "🎪 played hide and seek",
        "🎨 made bunny art",
        "🎵 danced to music"
    ]
    
    activity = random.choice(activities)
    
    print_colored(f"🎮 Playtime with {pet['name']}!", Colors.BLUE)
    typewriter_effect(f"You and {pet['name']} {activity}!")
    
    loading_animation("Playing", 2)
    
    # Apply play logic (your original code with fixes)
    pet["happiness"] = min(10, pet["happiness"] + 2)
    if pet["happiness"] > 7:
        pet["health"] = min(10, pet["health"] + 1)
    pet["hunger"] = min(10, pet["hunger"] + 2)
    if pet["hunger"] > 5:
        pet["health"] = max(0, pet["health"] - 2)
    
    # Dynamic responses
    if pet["happiness"] >= 9:
        typewriter_effect(f"🌟 {pet['name']} is absolutely thrilled!")
        typewriter_effect("Your bunny is bouncing with pure joy! 🦘")
    elif pet["happiness"] >= 7:
        typewriter_effect(f"😄 {pet['name']} had a wonderful time!")
    else:
        typewriter_effect(f"🙂 {pet['name']} enjoyed playing with you!")
    
    display_bunny_status(pet)
    input("\n🎯 Press Enter to continue...")
    return pet

def welcome_screen(pet):
    """Display engaging welcome screen"""
    print_title()
    

    display_bunny_status(pet)

# Define the main logic
def main():
    """Main game loop with enhanced experience"""
    # Step 3.1
    pet = load_bunny_data()
    
    # Welcome screen
    welcome_screen(pet)
    
    # Step 3.4 - Main game loop

# Your program start here
if __name__ == "__main__":
    main()