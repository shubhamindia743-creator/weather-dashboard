# Setup Guide

## Prerequisites

- Node.js 18+
- Python 3.9+
- PostgreSQL 13+
- Redis 6+
- Docker (optional)

## Installation

### 1. Clone Repository

```bash
git clone https://github.com/shubhamindia743-creator/weather-dashboard.git
cd weather-dashboard
```

### 2. Environment Setup

```bash
cp .env.example .env
```

Edit `.env` with your API keys.

### 3. Using Docker

```bash
docker-compose up -d
```

Access:
- Frontend: http://localhost:3000
- Backend: http://localhost:3001
- Analytics: http://localhost:8000

### 4. Manual Setup

#### Frontend
```bash
cd frontend
npm install
npm run dev
```

#### Backend
```bash
cd backend
npm install
npm run dev
```

#### Analytics
```bash
cd analytics
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python main.py
```
