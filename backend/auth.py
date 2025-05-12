from jose import jwt, JWTError
from jose.utils import base64url_decode
import requests
import os
from dotenv import load_dotenv
load_dotenv()

CLERK_FRONTEND_API = os.getenv('CLERK_FRONTEND_API')
JWKS_URL = f"{CLERK_FRONTEND_API}/.well-known/jwks.json"
ISSUER = f"{CLERK_FRONTEND_API}"


def get_jwks():
    return requests.get(JWKS_URL).json()

def verify_token(auth_header):
    if not auth_header or not auth_header.startswith("Bearer "):
        return None
    
    token = auth_header.split()[1]
    
    try:
        # Step 1: Get token header (to extract 'kid')
        header = jwt.get_unverified_header(token)
        kid = header.get("kid")

        # Step 2: Get matching key from JWKs
        jwks = get_jwks()
        key = next((k for k in jwks["keys"] if k["kid"] == kid), None)
        if not key:
            return "Error in Auth"

        # Step 3: Build public key
        public_key = {
            "kty": key["kty"],
            "kid": key["kid"],
            "use": key["use"],
            "alg": key["alg"],
            "n": key["n"],
            "e": key["e"],
        }

        # Step 4: Verify token
        payload = jwt.decode(
            token,
            public_key,
            algorithms=["RS256"],
            issuer=ISSUER
        )
        return payload

    except JWTError as e:
        print("JWT verification failed:", e)
        return None
