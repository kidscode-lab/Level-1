# L1 - Lesson 02
#   Calculate YRT fair using multiple if

age =  int(input('What is your age:'))
if age >= 65:
	fare = 2.45
else:
    if age >= 20:
        fare = 4.0
    else:
        if age >= 13:
            fare = 3.1
        else:
            if age >= 6:
                fare = 2.45
            else:
                fare = 0
print(fare)