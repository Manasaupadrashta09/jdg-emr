FROM alpine:3.4
EXPOSE 8080 8090
VOLUME /tmp
ADD cloudsdk-microemr-server-4.1.0-SNAPSHOT.jar server.jar
RUN sh -c 'touch /app.jar'
ENTRYPOINT ["java","-Djava.security.egd=file:/dev/./urandom","-jar","/server.jar"]
