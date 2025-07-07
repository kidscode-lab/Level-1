# L1 - Lesson 02
#   Calculate YRT fair using elif structure
 
age =  int(input('What is your age:'))
if age >= 65:
	fare = 2.45
elif age >= 20:
	fare = 4
elif age >= 13:
	fare = 3.1
elif age >= 6:
	fare = 2.45
else:
	fare = 0
	
print(fare)