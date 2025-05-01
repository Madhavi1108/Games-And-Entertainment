from tkinter import *
from tkinter import messagebox
import random


def start_game(level):
    global num, no_of_guesses
    num = random.choice(list_1)
    
    # Set the number of guesses based on the difficulty level
    if level == 'easy':
        no_of_guesses = 10
    elif level == 'hard':
        no_of_guesses = 5

    guess_button.config(state=NORMAL)
    guesses_label.config(text=f"Remaining guesses: {no_of_guesses}")
    result_label.config(text="Make your guess!")


def check_guess():
    global no_of_guesses
    guess = guess_entry.get()

    # Ensure input is an integer
    try:
        guess = int(guess)
    except ValueError:
        messagebox.showinfo(title="Warning!!", message="Make sure that all entries are non-zero and integers only")
        return

    # Game logic for guesses
    if no_of_guesses > 0:
        if guess < num:
            result_label.config(text="Too Low. Guess again.")
        elif guess > num:
            result_label.config(text="Too High. Guess again.")
        else:
            result_label.config(text=f"You win! The number was {num}")
            guess_button.config(state=DISABLED)
            return

        no_of_guesses -= 1
        guesses_label.config(text=f"Remaining guesses: {no_of_guesses}")

        if no_of_guesses == 0:
            result_label.config(text=f"You are out of guesses. You Lose.\nThe correct number was {num}")
            guess_button.config(state=DISABLED)


def reset_game():
    guess_entry.delete(0, END)
    result_label.config(text="")
    guess_button.config(state=DISABLED)
    guesses_label.config(text="Select a difficulty to start.")


# Variables
list_1 = list(range(1, 101))  # Number list from 1 to 100
num = random.choice(list_1)  # Random number initialization
no_of_guesses = 0

# GUI setup
FONT = ("Arial", 15, "bold")
window = Tk()
window.title("My guessing game")
window.config(padx=50, pady=50, bg='yellow')
window.minsize(width=400, height=400)

# Title label
title_label = Label(window,
                    text="Welcome to the guessing game\nI am thinking of a number between 1 and 100",
                    font=("Arial", 20, "bold"),
                    bg='yellow')
title_label.grid(row=0, column=0, columnspan=2, pady=10)

# Difficulty buttons (Easy/Hard)
difficulty_frame = Frame(window, bg='yellow')
difficulty_frame.grid(row=1, column=0, columnspan=2, pady=10)

easy_button = Button(difficulty_frame, text="Easy", command=lambda: start_game('easy'),
                     font=FONT, bg="blue", fg="white", width=10)
easy_button.grid(row=0, column=0, padx=10)

hard_button = Button(difficulty_frame, text="Hard", command=lambda: start_game('hard'),
                     font=FONT, bg="blue", fg="white", width=10)
hard_button.grid(row=0, column=1, padx=10)

# Guesses label
guesses_label = Label(window, text="Select a difficulty to start.", font=FONT, bg="yellow")
guesses_label.grid(row=2, column=0, columnspan=2, pady=10)

# Guess input and button
guess_label = Label(window, text="Enter your guess:", font=FONT, bg="yellow")
guess_label.grid(row=3, column=0, pady=5, sticky=W)

guess_entry = Entry(window, font=FONT)
guess_entry.grid(row=3, column=1, pady=5)

guess_button = Button(window, text="Submit Guess", command=check_guess,
                      state=DISABLED, font=FONT, bg="blue", fg='white')
guess_button.grid(row=4, column=0, columnspan=2, pady=10)

# Result display
result_label = Label(window, text="", font=FONT, bg="yellow")
result_label.grid(row=5, column=0, columnspan=2, pady=10)

# Reset button
reset_button = Button(window, text="Play Again", font=FONT, bg="blue", fg='white', command=reset_game)
reset_button.grid(row=6, column=0, columnspan=2, pady=10)

window.mainloop()
