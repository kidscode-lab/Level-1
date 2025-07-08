# L1 - Exercise 02
#   Generate random numbers between 1 and 100 for 10 time 
#   Print only the even numbers
#   For odd numbers greater than 50, print "High Odd"

import random
#1. generate 10 times a random number
for n in range(0, 10):
    # 1. a random number between 1 and 100
    num = random.randint(1, 100)
    # Check is num / 2 has remainder
    if num % 2 == 0:
        # Print onl
        print(f"{num} - num is even")
    elif num > 50:
        print(f"{num} - High Odd")
    else:
        print(f"{num}")
