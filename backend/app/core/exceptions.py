class AppException(Exception):
    """Base exception for application-specific errors"""

    pass


class SwapiConnectionError(AppException):
    """Raised when SWAPI connection fails"""

    pass
