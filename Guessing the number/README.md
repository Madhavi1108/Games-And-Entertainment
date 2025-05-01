# Number Guessing Game

This is a number guessing game implemented in Python, offering both a command-line and a graphical user interface (GUI) version. The game generates a random number between 1 and 100, and the player tries to guess it within a limited number of attempts, depending on the chosen difficulty level.

## Table of Contents

-   [Features](#features)
-   [Getting Started](#getting-started)
    -   [Prerequisites](#prerequisites)
    -   [Installation](#installation)
-   [How to Play](#how-to-play)
    -   [Command-Line Version](#command-line-version)
    -   [GUI Version](#gui-version)
-   [File Structure](#file-structure)
-   [Code Description](#code-description)
    -   [main.py (Command-Line)](#mainpy-command-line)
    -   [game\_using\_tkinter.py (GUI)](#game_using_tkinterpy-gui)
-   [Contributing](#contributing)
-   [License](#license)

## Features

-   Generates a random number between 1 and 100.
-   Offers two difficulty levels: "easy" (10 guesses) and "hard" (5 guesses).
-   Provides feedback on guesses: "Too Low," "Too High," or "Correct!".
-   Keeps track of the number of remaining guesses.
-   Offers a command-line interface (CLI) version of the game.
-   Provides a graphical user interface (GUI) version using Tkinter.
-   GUI version includes features like:
    -   Difficulty selection buttons.
    -   Input field for guesses.
    -   Display of remaining guesses.
    -   Result messages.
    -   Play Again button.
-   Input validation in the GUI to ensure guesses are integers.

## Getting Started

### Prerequisites

-   Python 3.x installed on your system.
-   Tkinter library (usually included with Python installations for the GUI version).

### Installation

1.  Clone the repository:

    ```bash
    git clone <repository_url>
    ```

2.  Navigate to the project directory:

    ```bash
    cd <project_directory>
    ```

## How to Play

### Command-Line Version

1.  Run the `main.py` script.
2.  The game will start, and you will be prompted to choose a difficulty level ("easy" or "hard").
3.  Enter your choice.
4.  The game will then prompt you to make a guess. Enter an integer between 1 and 100.
5.  The game will provide feedback ("Too Low," "Too High," or "You win!").
6.  You will continue guessing until you guess correctly or run out of guesses.
7.  The game will ask if you want to play again.

### GUI Version

1.  Run the `game_using_tkinter.py` script.
2.  A window will appear with the number guessing game interface.
3.  Click either the "Easy" or "Hard" button to start the game.
4.  Enter your guess in the input field.
5.  Click the "Submit Guess" button.
6.  The game will display feedback in the window.
7.  Continue guessing until you win or run out of guesses.
8.  Click the "Play Again" button to start a new game.

## File Structure

```
.
├── main.py                # Command-line version of the game.
├── game_using_tkinter.py  # GUI version of the game using Tkinter.
└── README.md              # Documentation for the project.
```

## Code Description

### `main.py` (Command-Line)

-   Initializes a list of numbers from 1 to 100.
-   Defines a function `play_game()`:
    -   Prints a welcome message.
    -   Selects a random number.
    -   Prompts the user to choose the difficulty level.
    -   Sets the number of guesses based on the level.
    -   Uses a `while` loop to handle user guesses, providing feedback and decrementing the number of guesses.
    -   Prints a win or lose message.
-   Calls `play_game()` to start the game.
-   Uses a `while` loop to allow the user to play multiple games.

### `game_using_tkinter.py` (GUI)

-   Imports `tkinter`, `tkinter.messagebox`, and `random`.
-   Defines functions:
    -   `start_game(level)`: Selects a random number and sets the number of guesses based on the difficulty. Enables the "Submit Guess" button.
    -   `check_guess()`: Gets the user's guess from the input field, validates that it's an integer, compares it to the random number, provides feedback in the GUI, updates the number of remaining guesses, and handles win/lose conditions.
    -   `reset_game()`: Clears the input field, result label, disables the "Submit Guess" button, and resets the guesses label.
-   Sets up the Tkinter GUI:
    -   Creates the main window.
    -   Adds labels for the title, guess instructions, and results.
    -   Creates "Easy" and "Hard" buttons to select difficulty.
    -   Adds an entry field for user guesses.
    -   Creates a "Submit Guess" button.
    -   Creates a "Play Again" button to reset the game.
-   Uses `window.mainloop()` to run the GUI event loop.

## Contributing

Contributions are welcome! If you have any ideas for improvements or find any bugs, please feel free to open an issue or submit a pull request.

1.  Fork the repository.
2.  Create a new branch for your feature or bug fix.
3.  Make your changes.
4.  Commit your changes and push to your fork.
5.  Submit a pull request.

## License

This project is open source and available under the [MIT License].
