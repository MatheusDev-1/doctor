FROM python:3.10-slim

WORKDIR /

COPY requirements.txt .

RUN apt-get update && apt-get install -y pkg-config python3-dev default-libmysqlclient-dev build-essential default-libmysqlclient-dev && pip install mysqlclient
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

EXPOSE 8000

CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]