# Use an official Java runtime as a parent image
FROM maven:3.9-sapmachine-21

# Set the working directory in the container
WORKDIR /app

# Copy the current directory contents into the container at /app
COPY ./ /app

# Make port 8080 available to the world outside this container
EXPOSE 8080

RUN mvn clean install -DskipTests

# Run the jar file
ENTRYPOINT ["java", "-jar", "/app/target/VulnerableWebApp-0.0.1-SNAPSHOT.jar"]