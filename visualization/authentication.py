from fastapi import Request, HTTPException
import jwt
import os

def verify_token(request: Request):
    """
    Verify the token in the request header.
    """
    token = request.headers.get("Authorization")

    if not token or not token.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Token missing or invalid")
    
    token = token.split(" ")[1]
    try:
        token_decode = jwt.decode(token, os.getenv("JWT_SECRET"), algorithms= [os.getenv("JWT_ALGORITHM")])
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token has expired")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail="Invalid token")
    except Exception:
        raise HTTPException(status_code=401, detail="Not Authorized")