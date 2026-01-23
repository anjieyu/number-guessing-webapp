from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import random
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
@app.get("/bulls/{number}")
def guess_bull_number(number: int):
    if (number == random_bull_number):
        return {"result": "correct",
                "message": "You got it!"}
    digits = str(number)
    bull_digits = str(random_bull_number)
    bulls = 0
    cows = 0
    for i, c in enumerate(digits):
        if c == bull_digits[i]:
            bulls += 1
        elif c in bull_digits:
            cows += 1
    return {"result": "incorrect",
            "message": f"{bulls} bulls, {cows} cows"}

@app.get("/bulls/new-game")
def new_bull_game():
    global random_bull_number
    random_bull_number = random.randint(1111, 9999)
    return {"message": "new game started"}