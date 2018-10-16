FROM openjdk:8-jdk-alpine
MAINTAINER "aziz chigri <aziz.chigri@epitech.eu>"
VOLUME /tmp
COPY ./build/libs/server.jar /usr
EXPOSE 8080
ENTRYPOINT ["java","-Djava.security.egd=file:/dev/./urandom","-jar","/usr/server.jar"]