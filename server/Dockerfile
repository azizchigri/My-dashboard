FROM gradle:jdk8 as builder
COPY --chown=gradle:gradle ./server /home/gradle/src
WORKDIR /home/gradle/src
RUN gradle build shadowJar

FROM openjdk:8-jdk-alpine
EXPOSE 1908
MAINTAINER "aziz chigri <aziz.chigri@epitech.eu>"
COPY --from=builder /home/gradle/src/build/libs/server.jar /app/
WORKDIR /app
VOLUME /tmp
ENTRYPOINT ["java","-Djava.security.egd=file:/dev/./urandom", "-Dspring.profiles.active=container", "-Dspring.profiles.active=container", "-jar", "server.jar"]