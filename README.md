# Mercedes-Benz Full-Stack Developer Assessment

A full-stack web application that displays and manages data from the Star Wars API (SWAPI). The application is built using React (frontend) and FastAPI (backend) with Docker containerization.

## Prerequisites

- Docker and Docker Compose installed on your machine
- Port 6969 and 8000 available on your system

## Quick Start

1. Clone the repository:
```bash
git clone <repository-url>
cd mercedes-test
```

2. Run the application using Docker Compose:
```bash
docker-compose up --build
```

3. Access the application:
   - Frontend: http://localhost:6969
   - Backend API: http://localhost:8000
   - API Documentation: http://localhost:8000/docs

## Environment Variables

### Backend
- `SWAPI_BASE_URL`: Base URL for Star Wars API (default: https://swapi.info/api)
- `LOG_LEVEL`: Logging level (default: INFO)
- `CORS_ORIGINS`: Allowed CORS origins (default: ["http://localhost:6969"])

### Frontend
- `VITE_API_BASE_URL`: Backend API URL (default: http://localhost:8000/api/v1)

## API Endpoints

### Core Endpoints
- `GET /api/v1/people`: Get paginated list of Star Wars characters
  - Query params: `page`, `search`, `sort_by`, `order`
- `GET /api/v1/planets`: Get paginated list of Star Wars planets
  - Query params: `page`, `search`, `sort_by`, `order`
- `GET /api/v1/simulate-ai-insight`: Get AI-generated insights
  - Query params: `name`, `type` (person/planet/auto)


### Health Check
- `GET /health`: API health status

## Development

### Running Backend Locally
```bash
cd backend
pip install -r requirements.txt
fastapi dev app/main.py
```

### Running Frontend Locally
```bash
cd frontend
npm install
npm run dev
```

## Testing

To run the integration tests:
```bash
cd backend
pytest
```