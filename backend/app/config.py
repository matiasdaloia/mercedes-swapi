from typing import List

from dotenv import load_dotenv
from pydantic_settings import BaseSettings

load_dotenv()


class Settings(BaseSettings):
    SWAPI_BASE_URL: str = "https://swapi.info/api"
    LOG_LEVEL: str = "INFO"
    CORS_ORIGINS: List[str] = ["http://localhost:6969"]

    class Config:
        env_file = ".env"


settings = Settings()
