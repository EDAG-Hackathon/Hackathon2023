FROM python:3.11-buster
RUN pip install poetry
WORKDIR /srv
COPY . /srv
RUN poetry install
ENV FLASK_APP=app
CMD ["python","app.py"]