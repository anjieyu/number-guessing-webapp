from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import random
app = FastAPI()
app.add_middleware(
    CORSMiddleware, allow_origins = ['*'], allow_methods = ['*'], allow_headers = ['*']
)
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
    
@app.get("/new-game")
def new_game():
    global random_number 
    random_number = random.randint(1, 10)
    return {"message": "new game started"}

@app.get("/")
def root():
    return {"message": "number guessing game root"}