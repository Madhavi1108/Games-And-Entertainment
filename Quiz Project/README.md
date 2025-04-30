# Quiz Application

This is a Python-based quiz application that utilizes the Tkinter library for the graphical user interface (GUI) and retrieves quiz questions from the Open Trivia Database API.

## Table of Contents

-   [Features](#features)
-   [Getting Started](#getting-started)
    -   [Prerequisites](#prerequisites)
    -   [Installation](#installation)
-   [How to Use](#how-to-use)
-   [File Structure](#file-structure)
-   [Classes](#classes)
    -   [Question](#question)
    -   [QuizBrain](#quizbrain)
    -   [QuizInterface](#quizinterface)
    -   [Data](#data)
-   [Contributing](#contributing)
-   [License](#license)

## Features

-   Fetches boolean (True/False) questions from the Open Trivia Database API.
-   Provides a user-friendly GUI using Tkinter.
-   Displays questions to the user.
-   Allows users to answer questions as True or False.
-   Keeps track of the user's score.
-   Provides visual feedback for correct and incorrect answers.

## Getting Started

### Prerequisites

-   Python 3.x installed on your system.
-   Tkinter library (usually included with Python).
-   Requests library: You can install it using pip:

    ```bash
    pip install requests
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

3.  Ensure the `images/true.png` and `images/false.png` files are in the `images` directory.

## How to Use

1.  Run the `main.py` script.
2.  A window will appear displaying the quiz questions.
3.  Click the "True" or "False" buttons to answer each question.
4.  The application will provide visual feedback (green for correct, red for incorrect) and update the score.
5.  Continue answering questions until the quiz is completed.
6.  The final score will be displayed at the end of the quiz.

## File Structure

```
.
├── data.py             # Fetches question data from the Open Trivia Database API.
├── main.py             # Initializes and runs the quiz application.
├── question_model.py   # Defines the Question class.
├── quiz_brain.py       # Defines the QuizBrain class, which manages the quiz logic.
├── ui.py               # Defines the QuizInterface class for the GUI.
└── README.md           # Documentation for the project.
└── images/             # Directory containing image files for the GUI.
    ├── true.png        # Image for the "True" button.
    └── false.png       # Image for the "False" button.
```

## Classes

### Question

`question_model.py`

-   `Question(q_text, q_answer)`: Initializes a question object with the question text and the correct answer.

### QuizBrain

`quiz_brain.py`

-   `QuizBrain(q_list)`:  Initializes the quiz brain with a list of `Question` objects.
-   `still_has_questions()`:  Checks if there are more questions remaining.
-   `next_question()`:  Retrieves the next question, formats it, and increments the question number.  It also uses `html.unescape()` to decode HTML entities in the question text.
-   `check_answer(user_answer)`:  Checks if the user's answer is correct and updates the score.

### QuizInterface

`ui.py`

-   `QuizInterface(quiz_brain: QuizBrain)`: Initializes the GUI for the quiz using Tkinter.
-   Sets up the window, labels, canvas, and buttons.
-   `get_next_question()`:  Displays the next question on the canvas and updates the score label. Handles the end of the quiz.
-   `right_answer()`: Called when the "True" button is clicked.
-   `wrong_answer()`: Called when the "False" button is clicked.
-   `give_feedback(is_right)`: Provides visual feedback based on whether the answer is correct or incorrect.

### Data

`data.py`

-   Fetches question data from the Open Trivia Database API using the `requests` library.
-   Specifies parameters for the API request (number of questions, question type).
-   Parses the JSON response to extract the question data.

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
