# L1 - Lesson 03
#   Exercise answer for Lesson 02
#   Generate a number from 1 to 100
#   The user will have 5 attempts to guess the number.
#   If the guess is correct, print "BINGO!" and end the game.
#   If the guess is incorrect and the user still has remaining attempts, prompt them to try again
#   If the user does not guess the number within 5 attempts, print "Fail" and reveal the correct number

import random

secret_number = random.randint(1, 100)
attempts = 5

print("Welcome to Guess the Number!")

for i in range(attempts):
    guess = int(input("Enter your guess (1-100): "))

    if guess == secret_number:
        print("BINGO!")
        break
    elif guess < secret_number:
        print("Too low! Try again.")
    else:
        print("Too high! Try again.")

    remaining_attempts = attempts - (i + 1)
    print("You have", remaining_attempts, "attempts left.")

if guess != secret_number:
    print("Fail! The number was", secret_number)