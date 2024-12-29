import os

def generate_token():
    return os.urandom(8).hex() 