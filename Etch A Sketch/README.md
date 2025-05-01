# Etch-a-Sketch

This is a simple Etch-a-Sketch simulator implemented using the Python Turtle graphics library. It allows you to control a turtle to draw on the screen using keyboard inputs.

## Table of Contents

-   [Features](#features)
-   [Getting Started](#getting-started)
    -   [Prerequisites](#prerequisites)
    -   [Installation](#installation)
-   [How to Use](#how-to-use)
-   [File Structure](#file-structure)
-   [Code Description](#code-description)
-   [Contributing](#contributing)
-   [License](#license)

## Features

-   Control a turtle using keyboard inputs.
-   Move the turtle forward and backward.
-   Turn the turtle left and right.
-   Clear the screen and reset the turtle to its starting position.

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

## How to Use

1.  Run the `main.py` script.
2.  A window will appear with a turtle in the center.
3.  Use the following keys to control the turtle:
    -   'w': Move forward.
    -   's': Move backward.
    -   'a': Turn left.
    -   'c': Turn right.
    -   'Clear': Clear the screen and reset the turtle's position.
4.  Click on the window to close it.

## File Structure

```
.
└── main.py   # Main script for the Etch-a-Sketch simulator.
└── README.md # Documentation for the project.
```

## Code Description

`main.py`

-   Imports the `turtle` module.
-   Creates a `Turtle` object named `tim` and a `Screen` object.
-   Defines the following functions:
    -   `move_forward()`: Moves the turtle forward by 10 units.
    -   `move_backward()`: Moves the turtle backward by 10 units.
    -   `turn_left()`: Turns the turtle 10 degrees to the left.
    -   `turn_right()`: Turns the turtle 10 degrees to the right.
    -   `clear()`: Clears the screen and returns the turtle to its home position.
-   Sets up the screen to listen for keyboard inputs.
-   Binds the functions to specific keys:
    -   'w' is bound to `move_forward`.
    -   's' is bound to `move_backward`.
    -   'a' is bound to `turn_left`.
    -   'c' is bound to `turn_right`.
    -   The `clear` function is called directly.  (Note: in the original code, `clear()` is called once at the beginning, not bound to a key for repeated use)
-   Keeps the window open until it is clicked.

## Contributing

Contributions are welcome! If you have any ideas for improvements or find any issues, please feel free to submit a pull request or open an issue on the GitHub repository.

1.  Fork the repository.
2.  Create a new branch for your feature or bug fix.
3.  Make your changes.
4.  Commit your changes and push to your fork.
5.  Submit a pull request.

## License

This project is open source and available under the [MIT License](LICENSE).
```
