FROM frolvlad/alpine-oraclejdk8:slim
EXPOSE 8080 8090
VOLUME /tmp
ADD cloudsdk-microemr-client-4.1.0-SNAPSHOT.jar client.jar
RUN sh -c 'touch /app.jar'
ENTRYPOINT ["java","-Djava.security.egd=file:/dev/./urandom","-jar","/client.jar"]
