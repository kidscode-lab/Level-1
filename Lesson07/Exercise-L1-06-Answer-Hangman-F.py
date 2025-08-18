import random

def get_answer():
    word_list = ['Plum', 'Kiwi', 'Pear', 'Lime', 'Date']
    return random.choice(word_list).lower()

def get_one_letter():
    while True:
        letter_guess = input('Please guess the word by entering a letter: ').lower()
        if len(letter_guess) == 1 and letter_guess.isalpha():
            return letter_guess
        else:
            print('*** Invalid input. Please enter a single letter')

def generate_prompt(answer, guesses):
    prompt = ""
    for letter in answer:
        if letter in guesses:
            prompt += letter
        else:
            prompt += '_'
    return prompt

# The main game logic
def play_hangman():
    answer = get_answer()
    guesses = []
    attempts = 5
    
    print("Welcome to Hangman!")
    print(f"The word has {len(answer)} letters for fruit.")
    print()
    
    # Main game loop
    while attempts > 0:
        # Get player input
        letter_guess = get_one_letter()
        guesses.append(letter_guess)
        attempts -= 1
        
        # Generate current word state
        prompt = generate_prompt(answer, guesses)
        
        # Check win condition
        if prompt == answer:
            print("Congratulations! You've guessed the word!")
            return  # Exit the function, ending the game
        
        # Display current game status
        print(f'Your guesses so far: {prompt}. You have {attempts} attempt(s)')
        print()  # blank line for readability
    
    # If we exit the loop without winning, display game over
    print('Game over!')
    print(f'The word was: {answer}')

# Main program execution
if __name__ == "__main__":
    play_hangman()