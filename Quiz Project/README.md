# Snake Game

A classic Snake game implemented in Python using the built-in `turtle` graphics module. The player controls a snake to collect food, grow in length, and avoid collisions with walls or itself.

## Features
 
- Interactive game window using the `turtle` module
- Dynamic food generation
- Real-time score tracking
- Game over detection (wall and self-collision)

## File Structure

```
├── main.py           # Entry point and game loop
├── snake.py          # Snake class: handles movement and direction
├── food.py           # Food class: spawns food at random positions
├── scoreboard.py     # Scoreboard class: manages scoring and game-over display
```

## Requirements

- Python 3.6 or above (no external libraries needed)

## How to Run

1. Clone or download this repository.
2. Run the following command in your terminal:

```bash
python main.py
```

## Controls

- Arrow keys: Navigate the snake (Up, Down, Left, Right)

## Game Rules

- Eat the blue food to grow longer.
- Avoid hitting the walls.
- Avoid colliding with your own body.
- The game ends on collision and displays "GAME OVER".

## License
This project is licensed under the MIT License.
