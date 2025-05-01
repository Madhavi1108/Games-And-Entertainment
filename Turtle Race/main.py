from turtle import Turtle, Screen
import random

is_game_on = False
screen = Screen()

screen.setup(width=500, height=400)
user_bet = screen.textinput(title="Make your bet",prompt="Which turtle will win a race? Enter a colour")
colors = ["red", "orange", "yellow", "blue", "green", "purple"]
all_turtles = []

for i in range(0, 6):
    new_turtle = Turtle(shape="turtle")
    new_turtle.penup()
    new_turtle.color(colors[i])
    new_turtle.goto(x=-230, y=-70 + (i * 30))
    all_turtles.append(new_turtle)

if user_bet:
    is_game_on = True

while is_game_on:

    for turtles in all_turtles:
        if turtles.xcor() > 230:
            is_game_on = False
            winning_color = turtles.pencolor()
            if winning_color == user_bet:
                print(f"You won!. The {winning_color} turtle is the winner!")
            else:
                print(f"You lost!. The {winning_color} turtle is the winner!")

        random_distance = random.randint(0, 10)
        turtles.forward(random_distance)


screen.exitonclick()
