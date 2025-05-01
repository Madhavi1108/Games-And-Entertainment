# Turtle Race Game

This is a simple turtle race game implemented using the Python Turtle graphics library.

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

-   Multiple turtles race across the screen.
-   Users can place a bet on which turtle will win.
-   Random movement for each turtle.
-   Determines and announces the winning turtle.
-   Provides feedback on whether the user's bet was correct.

## Getting Started

### Prerequisites

-   Python 3.x installed on your system.
-   Turtle graphics library (usually included with Python).

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
2.  A window will appear, prompting you to enter the color of the turtle you think will win the race.
3.  Enter the color (e.g., "red", "blue", "green") and press Enter.
4.  The turtles will begin racing across the screen.
5.  Once a turtle reaches the finish line, the game will announce the winning color and whether you won or lost your bet.
6.  Click on the window to close it.

## File Structure

```
.
└── main.py   # Main game logic and setup.
└── README.md # Documentation for the project.
```

## Code Description

`main.py`

-   Imports the `turtle` and `random` libraries.
-   Sets up the screen dimensions.
-   Prompts the user to make a bet by entering a turtle color.
-   Creates multiple `Turtle` objects, each with a different color, and positions them at the starting line.
-   Enters a `while` loop to control the race:
    -   Each turtle moves a random distance in each iteration.
    -   The loop continues until a turtle crosses the finish line.
    -   The winning turtle's color is determined.
    -   The script compares the winning color to the user's bet and prints the result.
-   Exits the program when the user clicks on the screen.

## Contributing

Contributions are welcome! If you have any ideas for improvements or find any issues, please feel free to submit a pull request or open an issue on the GitHub repository.

1.  Fork the repository.
2.  Create a new branch for your feature or bug fix.
3.  Make your changes.
4.  Commit your changes and push to your fork.
5.  Submit a pull request.

## License

This project is open source and available under the [MIT License].
```
