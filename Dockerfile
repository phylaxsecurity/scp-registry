FROM python:3.11-slim

WORKDIR /app
COPY . /app

RUN apt-get update && apt-get install -y git && \
    pip install fastapi uvicorn pyyaml

CMD ["python", "app/main.py"]
