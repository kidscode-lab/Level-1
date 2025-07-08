# L1 - Lesson 05
#   Files handling

#file write operation
with open('filedemo.txt', 'w') as f:
    f.writelines("I'm learning Python programming !\n")
    f.writelines("This is lesson 5 !\n")

print('File test.txt has been written')

# setup a variable 'file'
with open('filedemo.txt', 'r') as f:
    # loop each line of the file
    for l in f:
        # loop each line of the file
        print(l, end='')
