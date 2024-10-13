# reddit-clone

This project is a Reddit clone made with Java Spring and .
The project is my naive go at creating a reddit lookalike, aptly named "rabbit". I only focus on essential features you would normally find on a furom-style platform such as Reddit; So no embedded content or streaming and stuff.

## Requirements
 - Docker Desktop or Docker Compose
 - Maven
 - JDK 21 or later


## Building the project
Clone the Github repository
 - run: ```docker compose up -d```
 - run: ```mvn clean spring-boot:run```

You should be able to access the application at localhost:8080

To kill the application simply Ctrl+C or stop the process from an IDE.

To take down the docker container, run ```docker compose down```
