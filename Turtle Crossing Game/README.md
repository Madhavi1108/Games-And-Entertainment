# Turtle Crossing Game

This is a Python implementation of the classic "Turtle Crossing" game, built using the Turtle graphics library.  In this game, the player controls a turtle that needs to cross a busy road filled with randomly generated cars.

## Table of Contents

-   [Features](#features)
-   [Getting Started](#getting-started)
    -   [Prerequisites](#prerequisites)
    -   [Installation](#installation)
-   [How to Play](#how-to-play)
-   [File Structure](#file-structure)
-   [Classes](#classes)
    -   [Player](#player)
    -   [CarManager](#carmanager)
    -   [Scoreboard](#scoreboard)
-   [Contributing](#contributing)
-   [License](#license)

## Features

-   Player control using the Up arrow key.
-   Randomly generated cars moving across the screen.
-   Collision detection between the player and the cars.
-   Level progression with increasing car speed.
-   Scoreboard to display the current level.
-   Game Over message when the player collides with a car.

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
2.  A window will appear with a turtle at the bottom of the screen.
3.  Use the "Up" arrow key to move the turtle forward.
4.  Avoid colliding with the cars moving across the screen.
5.  If the turtle successfully reaches the top of the screen, the player levels up, and the car speed increases.
6.  The current level is displayed on the scoreboard.
7.  If the turtle collides with a car, the game is over.

## File Structure

```
.
├── car_manager.py # Defines the CarManager class.
├── main.py       # Main game logic and setup.
├── player.py     # Defines the Player class.
├── scoreboard.py # Defines the Scoreboard class.
└── README.md     # Documentation for the project.
```

## Classes

### Player

`player.py`

-   `Player()`: Initializes the player (turtle) with its starting position, shape, and orientation.
-   `go_up()`: Moves the player up the screen.
-   `go_to_start()`: Resets the player's position to the starting point.
-   `is_at_finish_line()`: Checks if the player has reached the finish line (top of the screen).

### CarManager

`car_manager.py`

-   `CarManager()`: Initializes the car manager with an empty list of cars and the starting car speed.
-   `create_car()`: Creates a new car with a random color and position at a random interval.
-   `move_cars()`: Moves all the cars across the screen.
-   `level_up()`: Increases the car speed for the next level.

### Scoreboard

`scoreboard.py`

-   `Scoreboard()`: Initializes the scoreboard to display the current level.
-   `update_scoreboard()`: Clears and updates the displayed level.
-   `increase_level()`: Increases the level and updates the scoreboard.
-   `game_over()`: Displays the "Game Over" message on the screen.

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
