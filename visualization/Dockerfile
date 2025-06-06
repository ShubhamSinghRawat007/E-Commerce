FROM python:3

# Create backend directory and copy only the .env file
RUN mkdir -p /app/backend

# Copy only the needed files
COPY ./visualization /app/visualization
COPY ./backend/.env /app/backend/.env

# Set working directory to the visualization folder
WORKDIR /app/visualization

# Install Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

EXPOSE 8000

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
