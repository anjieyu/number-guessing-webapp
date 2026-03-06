from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import random
import copy
from collections import deque
import logging
logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger("uvicorn")
app = FastAPI()
app.add_middleware(
    CORSMiddleware, allow_origins = ['*'], allow_methods = ['*'], allow_headers = ['*']
)

@app.get("/")
def root():
    return {"message": "webgames root"}

# number guessing game API functions
random_number = random.randint(1, 10)
@app.get("/guess/{number}")
def guess_number(number: int):
    if number > random_number:
        return {"result": "too high", 
                "message": "Your guess was too high. Try again."}
    elif number < random_number:
        return {"result": "too low", 
                "message": "Your guess was too low. Try again."}
    else:
        return {"result": "correct",
                "message": "You got it!"}
    
@app.get("/guess/new-game")
def new_game():
    global random_number 
    random_number = random.randint(1, 10)
    return {"message": "new game started"}

# Bulls and cows game API functions
random_bull_number = random.randint(1111, 9999)
bull_guesses = deque()
@app.get("/bulls/{number}")
def guess_bull_number(number: int):
    if (number == random_bull_number):
        return {"result": "correct",
                "message": f"You got it! The number was {random_bull_number}",
                "guesses": list(bull_guesses)}
    digits = str(number)
    bull_digits = str(random_bull_number)
    cow_digits = list(copy.deepcopy(bull_digits))
    bulls = 0
    cows = 0
    for i, c in enumerate(digits):
        if c == bull_digits[i]:
            bulls += 1
            cow_digits.remove(c)
    for c in set(digits):
        if c in set(cow_digits):
            cows += 1
    if len(bull_guesses) < 5:
        bull_guesses.append(f"{digits}: {bulls} bulls, {cows} cows")
    else:
        bull_guesses.popleft()
        bull_guesses.append(f"{digits}: {bulls} bulls, {cows} cows")

    return {"result": "incorrect",
            "message": f"Guess again! Your guess was {number}. \n You have {bulls} bulls, {cows} cows.",
            "guesses": list(bull_guesses)}

@app.get("/bulls/new-game")
def new_bull_game():
    global random_bull_number, bull_guesses
    random_bull_number = random.randint(1111, 9999)
    bull_guesses.clear()
    return {"message": "new game started"}

with open("words.txt", "r") as file:
    words = file.read().split()

# Hang Man game API functions
word = random.choice(words)

guesses = set()
displayed_guesses = set()
max_attempts = 6
current_attempts = 0

def mask_word(word, guesses):
    return "".join([c if c in guesses else "_ " for c in word])

@app.get("/hangman/new-game")
def new_hangman():
    global word, guesses, max_attempts, current_attempts, displayed_guesses
    current_attempts = 0
    guesses = set()
    displayed_guesses = set()
    logger.debug("test")
    word = random.choice(words)
    logger.debug(f"The secret word is: {word}")
    return {"message": "new game started",
            "word": mask_word(word, guesses),
            "attempts": max_attempts - current_attempts}

@app.get("/hangman/{guess}")
def guess_hangman(guess: str):
    global current_attempts
    if guess not in guesses:
        guesses.add(guess)
        if guess not in word:
            current_attempts += 1
    mask = mask_word(word, guesses)
    if guess not in set(word):
        displayed_guesses.add(guess)
    if "_" not in mask:
        return {
            "message": "you win",
            "word": word,
            "attempts": max_attempts - current_attempts,
            "guesses": list(displayed_guesses)
        }
    elif current_attempts < max_attempts:
        return {
            "message": "keep guessing",
            "word": mask,
            "attempts": max_attempts - current_attempts,
            "guesses": list(displayed_guesses)
        }
    else:
        return {
            "message": "you lose",
            "word": word,
            "attempts": 0,
            "guesses": list(displayed_guesses)

        }


