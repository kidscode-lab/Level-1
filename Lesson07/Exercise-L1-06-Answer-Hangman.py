# L1 - Lesson 06
#   Hangman

import random

# define a FUNCTION to pick a word from LIST
# random.choice returns ONE element from LIST randomly

def random_word():
    listOfWord = ['Book', 'Fish', 'Tree', 'King', 'Snow', 'Door', 'Wolf', 'Cake', 'Moon', 'Ship', 'Moon', 'Star', 'Lion', 'Frog', 'Lamp', 'Leaf', 'Bike', 'Door']
    return random.choice(listOfWord)

# Main program start here
answer = random_word().lower()
guesses = []
attempts = 5
guess_matches = False

while attempts > 0 and not guess_matches:

    letterGuess = input('Please guess the word by input a letter:').lower()
    if len(letterGuess) != 1 or not letterGuess.isalpha():
        print('*** Invalid input. Please enter a single letter')
        continue # this continue exit current loop and execute next loop

    guesses.append(letterGuess)
    attempts -= 1   #reduce 1 attempt

    # Compare the input letter against the answer
    #   then generate a prompt like '_oo_' (for the prompt of moon)
    prompt = ""
    for letter in answer:    # extract every single character from variable 'answer'
        if letter in guesses:
            prompt += letter
        else:
            prompt += '_'

    # Bingo
    if prompt == answer:
        guess_matches = True    # setting this to True will end the while loop immediately
        print("Congratulations! You've guessed the word!")
    else:
      print(f'Your guesses so far: {prompt}. You have {attempts} attempt(s)')
      print() #print a blank line

# while loop end here

# at the end, if user is failed to match then print 'Gameover'
if not guess_matches:
    print('Gameover !')