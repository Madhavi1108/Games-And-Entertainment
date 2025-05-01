# Pong Game

This is a simple implementation of the classic Pong game using Python and the Turtle graphics library.

## Table of Contents

- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [How to Play](#how-to-play)
- [File Structure](#file-structure)
- [Classes](#classes)
  - [Ball](#ball)
  - [Paddle](#paddle)
  - [Scoreboard](#scoreboard)
- [Contributing](#contributing)
- [License](#license)

## Features

-   Two-player Pong game.
-   Paddle control using keyboard inputs.
-   Ball movement and collision detection with walls and paddles.
-   Scoring system to keep track of player points.
-   Ball speed increases as the game progresses.

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

-   **Player 1 (Left Paddle):**
    -   Use the 'w' key to move the paddle up.
    -   Use the 's' key to move the paddle down.

-   **Player 2 (Right Paddle):**
    -   Use the 'Up' arrow key to move the paddle up.
    -   Use the 'Down' arrow key to move the paddle down.

-   The goal is to prevent the ball from passing your paddle while trying to make your opponent miss.
-   Each time a player misses, the opponent scores a point.
-   The ball's speed increases slightly each time it hits a paddle, making the game more challenging.

## File Structure

```
.
├── ball.py       # Defines the Ball class.
├── main.py       # Main game logic and setup.
├── paddle.py     # Defines the Paddle class.
├── scoreboard.py # Defines the Scoreboard class.
└── README.md     # Documentation for the project.
```

## Classes

### Ball

`ball.py`

-   `Ball()`: Initializes the ball with color, shape, starting position, and movement attributes.
-   `move()`:  Moves the ball across the screen.
-   `bounce_y()`: Makes the ball bounce off the top and bottom walls. Increases ball speed.
-   `bounce_x()`: Makes the ball bounce off the paddles.  Increases ball speed.
-   `reset_position()`: Resets the ball to the center and starts it moving towards the opponent.

### Paddle

`paddle.py`

-   `Paddle(position)`:  Initializes a paddle at a given position with color, shape and movement functions.
-   `go_up()`: Moves the paddle up the screen.
-   `go_down()`: Moves the paddle down the screen.

### Scoreboard

`scoreboard.py`

-   `Scoreboard()`: Initializes the scoreboard to display the scores.
-   `update_scoreboard()`: Clears and updates the displayed scores.
-   `l_point()`:  Increments the left player's score and updates the scoreboard.
-   `r_point()`:  Increments the right player's score and updates the scoreboard.

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
