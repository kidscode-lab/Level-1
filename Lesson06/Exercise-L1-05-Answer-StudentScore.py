# L1 - Lesson 06 
#   Exercise answer for Lesson 05
#   Get student and determines letter grade based on average

def get_student_info():
    """Get student name and 3 test scores from user input"""
    name = input("Enter student name: ")
    scores = []
    
    for i in range(1, 4):  # Get 3 scores
        while True:
            try:
                score = float(input(f"Enter score {i}: "))
                if 0 <= score <= 100:  # Validate score range
                    scores.append(score)
                    break
                else:
                    print("Score must be between 0 and 100!")
            except ValueError:
                print("Please enter a valid number!")
    
    return name, scores

def calculate_average(scores):
    """Calculate and return average of scores"""
    if not scores:  # Handle empty list
        return 0
    return sum(scores) / len(scores)

def determine_grade(average):
    """Return letter grade based on average"""
    if average >= 90:
        return 'A'
    elif average >= 80:
        return 'B'
    elif average >= 70:
        return 'C'
    elif average >= 60:
        return 'D'
    else:
        return 'F'

def save_student_record(name, average, grade, filename):
    """Save student record to file"""
    with open(filename, 'a') as f:  # Append mode to keep previous records
        f.write(f"Student: {name}\n")
        f.write(f"Average: {average:.1f}\n")
        f.write(f"Grade: {grade}\n")
        f.write("-" * 20 + "\n")

def main():
    """Main program that orchestrates all functions"""
    print("=== STUDENT GRADE MANAGER ===")
    
    # Get student information
    name, scores = get_student_info()
    
    # Calculate average
    average = calculate_average(scores)
    
    # Determine letter grade
    grade = determine_grade(average)
    
    # Display results
    print(f"\n{name}'s average: {average:.1f}")
    print(f"Grade: {grade}")
    
    # Save to file
    filename = "grades.txt"
    save_student_record(name, average, grade, filename)
    print(f"Student record saved to {filename}")

if __name__ == "__main__":
    main()
