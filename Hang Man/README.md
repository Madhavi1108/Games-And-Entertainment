# Hangman Game

This is a classic Hangman game implemented in Python. The game randomly selects a word, and the player tries to guess the word by guessing one letter at a time. The game provides visual feedback in the form of hangman stages and informs the player of their progress.

## Table of Contents

-   [Features](#features)
-   [Getting Started](#getting-started)
    -   [Prerequisites](#prerequisites)
    -   [Installation](#installation)
-   [How to Play](#how-to-play)
-   [File Structure](#file-structure)
-   [Modules](#modules)
    -   [main.py](#mainpy)
    -   [hangman\_art.py](#hangman_artpy)
    -   [hangman\_words.py](#hangman_wordspy)
-   [Contributing](#contributing)
-   [License](#license)

## Features

-   Randomly selects a word from a predefined list.
-   Displays the hangman figure in stages as the player makes incorrect guesses.
-   Shows the player's progress by displaying correctly guessed letters in the word.
-   Handles cases where the player guesses the same letter multiple times.
-   Ends the game when the player correctly guesses the word or runs out of lives.

## Getting Started

### Prerequisites

-   Python 3.x installed on your system.

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

1.  Run the `main.py` script.
2.  The game will start, displaying the Hangman logo and the initial state of the word to guess (underscores).
3.  The game will prompt you to enter a letter.
4.  Enter your letter and press Enter.
5.  The game will check if the letter is in the word:
    -   If it is, the letter will be revealed in the word, and you will be informed.
    -   If it is not, you will lose a life, and the Hangman figure will be updated.
6.  The game continues until you either guess the word correctly or run out of lives (6 lives).
7.  The game will display a win or lose message along with the correct word.

## File Structure

```
.
├── main.py        # Main game logic.
├── hangman_art.py   # Contains ASCII art for the Hangman figure and logo.
├── hangman_words.py # Contains the list of words for the game.
└── README.md      # Documentation for the project.
```

## Modules

### `main.py`

-   Imports the `random`, `hangman_art`, and `hangman_words` modules.
-   Initializes the game:
    -   Selects a random word from `hangman_words.word_list`.
    -   Sets the number of lives to 6.
    -   Creates a placeholder string to represent the hidden word.
-   The main game loop continues until `game_over` is True:
    -   Prompts the player to guess a letter.
    -   Checks if the guessed letter has already been guessed.
    -   Updates the display string with correctly guessed letters.
    -   If the guessed letter is not in the word, decrements lives and displays a message.
    -   Checks for win/lose conditions.
    -   Prints the appropriate Hangman stage.

### `hangman_art.py`

-   Contains the ASCII art for:
    -   The Hangman logo (`logo`).
    -   The different stages of the Hangman figure (`stages`).

### `hangman_words.py`

-   Contains the list of words (`word_list`) that the game can randomly choose from.

## Contributing

Contributions are welcome! If you have any ideas for improvements or find any bugs, please feel free to open an issue or submit a pull request.

1.  Fork the repository.
2.  Create a new branch for your feature or bug fix.
3.  Make your changes.
4.  Commit your changes and push to your fork.
5.  Submit a pull request.

## License

This project is open source and available under the [MIT License].
```
