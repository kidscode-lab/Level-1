# L1 - Lesson 02
#   generate a random number between 1 and 6
#   ask user to guess the number
#   if it is correct, print 'Correct' otherwise, print out the number

import random
secretNumber = random.randint(1, 6)
guess = int(input('Your guess:'))

if guess == secretNumber:
  print('Correct')
else:
  print('Incorrect. The secret number is ', secretNumber)

print("Play again !")
# question: which line is not inside if (condition) else block?