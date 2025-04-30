# U.S. States Game

This is a simple game built with Python and the Turtle graphics library, designed to help users learn the names and locations of the 50 U.S. states.

## Table of Contents

-   [Features](#features)
-   [Getting Started](#getting-started)
    -   [Prerequisites](#prerequisites)
    -   [Installation](#installation)
-   [How to Play](#how-to-play)
-   [File Structure](#file-structure)
-   [Code Description](#code-description)
-   [Contributing](#contributing)
-   [License](#license)

## Features

-   Interactive map of the U.S.
-   Prompts user to guess the names of the states.
-   Displays correctly guessed state names on the map in their respective locations.
-   Keeps track of the number of correctly guessed states.
-   Provides an option to exit the game and generates a CSV file of the states not yet guessed.

## Getting Started

### Prerequisites

-   Python 3.x installed on your system.
-   Turtle graphics library (usually included with Python).
-   Pandas library: You can install it using pip:

    ```bash
    pip install pandas
    ```

### Installation

1.  Clone the repository:

    ```bash
    git clone <repository_url>
    ```

2.  Navigate to the project directory:

    ```bash
    cd <project_directory>
    ```

3.  Place the `50_states.csv` file and the background image (`blank_states_img.gif`) in the same directory as `main.py`.

## How to Play

1.  Run the `main.py` script.
2.  A window will appear with a blank map of the U.S.
3.  The game will prompt you to enter the name of a U.S. state.
4.  Type the name of a state and press Enter. The input is case-insensitive.
5.  If the guessed state is correct, its name will be written on the map in the correct location.
6.  If the guessed state is incorrect or has already been guessed, nothing will be written on the map and the game will continue.
7.  Continue guessing states until you have guessed all 50 or you choose to exit.
8.  To exit the game, type "Exit" in the input prompt.
9.  Upon exiting, a CSV file named `States_to_learn.csv` will be generated, containing a list of the states you did not guess correctly.

## File Structure

```
.
├── main.py              # Main game logic and setup.
├── 50_states.csv        # CSV file containing state names and coordinates.
├── blank_states_img.gif # Image file of the U.S. map.
└── README.md            # Documentation for the project.
```

## Code Description

`main.py`

-   Imports the `turtle` and `pandas` libraries.
-   Sets up the screen, title, and background image.
-   Reads state data from `50_states.csv` into a Pandas DataFrame.
-   Uses a `while` loop to continuously prompt the user for state names until all states are guessed or the user exits.
-   Handles user input, checks if the input is a valid state name, and displays the state name on the map if correct.
-   If the user types "Exit", the loop breaks, and the script generates a CSV file (`States_to_learn.csv`) containing the states that were not guessed.

## Contributing

Contributions are welcome! If you have any suggestions for improvements or find any issues, please feel free to submit a pull request or open an issue on the GitHub repository.

1.  Fork the repository.
2.  Create a new branch for your feature or bug fix.
3.  Make your changes.
4.  Commit your changes and push to your fork.
5.  Submit a pull request.

## License

This project is open source and available under the [MIT License].
```
