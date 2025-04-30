# Guess the number
import random

list_1 = []
i = 0
while i != 100:
    list_1.append(i + 1)
    i = i + 1


def play_game():
    print("Welcome to the number guessing game!")
    print("I'm thinking of a level between 1 and 100")
    num = random.choice(list_1)
    level = input("Choose a  difficulty level. Type 'easy' or 'hard': ")
    level = level.lower()
    if level == 'easy':
        no_of_guesses = 10
    else:
        no_of_guesses = 5

    while no_of_guesses != 0:
        print(f"You have {no_of_guesses} remaining.")
        guess = int(input("Make a guess :"))
        if guess < num:
            print("Too Low.")
            if no_of_guesses == 1:
                print(f"You are out of guesses. You Lose.\nThe correct number was {num}")
            else:
                print("Guess again")
        elif guess > num:
            print("Too High.")
            if no_of_guesses == 1:
                print(f"You are out of guesses. You Lose.\nThe correct number was {num}")
            else:
                print("Guess again")
        else:
            print(f"You win. The number was {num}")
            break
        no_of_guesses = no_of_guesses - 1


play_game()

while input("Do you want to play another game of guessing 'y' or 'n' ") == "y":
    play_game()
