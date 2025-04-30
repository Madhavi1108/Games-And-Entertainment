import random
import hangman_art
import hangman_words

stages = hangman_art.stages
print(hangman_art.logo)
lives = 6
word = random.choice(hangman_words.word_list)
print(word)

placeholder = ""
word_length = len(word)
for letter in range(word_length):
    placeholder += "_"
print("Word to guess:" + placeholder)

game_over = False
correct_letters = []

while not game_over:
    guess = input("Enter a letter: ").lower()

    if guess in correct_letters:
        print(f"This letter {guess} is already guessed")

    display = ""
    for i in word:
        if guess == i:
            display += i
            correct_letters.append(i)
        elif i in correct_letters:
            display += i
        else:
            display += "_"

    print(display)

    if guess not in word:
        lives = lives - 1
        print(f"The guessed word {guess} is not in the word. You lose a life")
        if lives == 0:
            print("************You lose*************")
            print(f"The word was {word}")
            game_over = True

    if "_" not in display:
        print("*************You Win!!*************")
        game_over = True
    print(stages[lives])
