# L1 - Lesson 06 
#   Exercise answer for Lesson 05
#   Video Game High Score Tracker

from datetime import datetime

def get_gamer_info():
    """Get gamer username and favorite game"""
    username = input("Enter your gaming username: ")
    game = input("Enter your favorite game: ")
    return username, game

def get_high_scores(username):
    """Get high scores from 5 different gaming sessions"""
    print(f"\nEnter {username}'s scores from 5 recent gaming sessions:")
    scores = []
    
    for session in range(1, 6):
        while True:
            try:
                score = int(input(f"Session {session} score: "))
                if score >= 0:  # Scores should be non-negative
                    scores.append(score)
                    break
                else:
                    print("Score cannot be negative!")
            except ValueError:
                print("Please enter a valid whole number!")
    
    return scores

def calculate_gaming_stats(scores):
    """Calculate best score, worst score, average, and improvement rate"""
    if not scores:
        return 0, 0, 0, 0
    
    best_score = max(scores)
    worst_score = min(scores)
    average = sum(scores) / len(scores)
    
    # Calculate improvement rate (last score vs first score)
    if scores[0] != 0:
        improvement_rate = ((scores[-1] - scores[0]) / scores[0]) * 100
    else:
        improvement_rate = 0
    
    return best_score, worst_score, average, improvement_rate

def determine_gamer_rank(average_score):
    """Assign gaming ranks based on average score"""
    if average_score >= 90:
        return "🏆 Legend"
    elif average_score >= 75:
        return "⭐ Pro"
    elif average_score >= 60:
        return "🎯 Advanced"
    elif average_score >= 40:
        return "🎮 Intermediate"
    else:
        return "🌱 Beginner"

def create_gamer_profile(username, game, stats, rank):
    """Create an awesome gamer profile report"""
    best, worst, average, improvement = stats
    
    profile = f"""
🎮 ===============================
   GAMER PROFILE CARD
🎮 ===============================
👤 Username: {username}
🎯 Favorite Game: {game}
📊 PERFORMANCE STATS:
   🏆 Best Score: {best:,}
   📉 Worst Score: {worst:,}
   📈 Average Score: {average:.1f}
   📊 Improvement: {improvement:+.1f}%
🏅 Rank: {rank}
⏰ Generated: {datetime.now().strftime("%Y-%m-%d %H:%M")}
🎮 ===============================
"""
    return profile

def save_gamer_profile(profile, username):
    """Save gamer profile to file"""
    filename = f"{username.lower()}_profile.txt"
    with open(filename, 'w', encoding='utf-8') as f:
        f.write(profile)
    return filename

def get_gaming_squad():
    """Build a list of squad members"""
    squad = []
    print("\n🎮 BUILD YOUR GAMING SQUAD 🎮")
    print("Enter gamer usernames (type 'done' when finished):")
    
    while True:
        username = input("Add squad member: ").strip()
        if username.lower() == 'done':
            break
        elif username:  # Only add non-empty usernames
            squad.append(username)
            print(f"✅ {username} added to squad!")
    
    return squad

def compare_players(player1_stats, player2_stats, name1, name2):
    """Bonus: Compare two players and return comparison report"""
    avg1 = player1_stats[2]  # average is at index 2
    avg2 = player2_stats[2]
    
    if avg1 > avg2:
        winner = name1
        difference = avg1 - avg2
    elif avg2 > avg1:
        winner = name2
        difference = avg2 - avg1
    else:
        winner = "TIE"
        difference = 0
    
    comparison = f"""
🆚 PLAYER COMPARISON 🆚
{name1} vs {name2}
{name1}'s Average: {avg1:.1f}
{name2}'s Average: {avg2:.1f}
"""
    
    if winner == "TIE":
        comparison += "🤝 It's a tie! Both players are equally skilled!"
    else:
        comparison += f"🏆 Winner: {winner} by {difference:.1f} points!"
    
    return comparison

def main():
    """Manage the complete gaming tracker system"""
    print("🎮" * 15)
    print("  WELCOME TO GAMING TRACKER!")
    print("🎮" * 15)
    
    # Track multiple gamers
    all_profiles = []
    
    while True:
        # Get gamer information
        username, game = get_gamer_info()
        
        # Get gaming scores
        scores = get_high_scores(username)
        
        # Calculate statistics
        stats = calculate_gaming_stats(scores)
        best, worst, average, improvement = stats
        
        # Determine rank
        rank = determine_gamer_rank(average)
        
        # Create profile
        profile = create_gamer_profile(username, game, stats, rank)
        
        # Display and save profile
        print(profile)
        filename = save_gamer_profile(profile, username)
        print(f"💾 Profile saved to: {filename}")
        
        # Store for potential comparison
        all_profiles.append((username, stats))
        
        # Ask if user wants to add another gamer
        another = input("\nAdd another gamer? (yes/no): ").lower()
        if another not in ['yes', 'y']:
            break
    
    # Bonus: If we have multiple profiles, offer comparison
    if len(all_profiles) >= 2:
        compare = input("\nWould you like to compare two gamers? (yes/no): ").lower()
        if compare in ['yes', 'y']:
            print("\nAvailable gamers:")
            for i, (name, _) in enumerate(all_profiles):
                print(f"{i+1}. {name}")
            
            try:
                choice1 = int(input("Select first gamer (number): ")) - 1
                choice2 = int(input("Select second gamer (number): ")) - 1
                
                if 0 <= choice1 < len(all_profiles) and 0 <= choice2 < len(all_profiles):
                    name1, stats1 = all_profiles[choice1]
                    name2, stats2 = all_profiles[choice2]
                    comparison = compare_players(stats1, stats2, name1, name2)
                    print(comparison)
            except (ValueError, IndexError):
                print("Invalid selection!")
    
    print("\n🎮 Thanks for using Gaming Tracker! Game on! 🎮")

if __name__ == "__main__":
    main()