# Step 1: Build the application using Maven
FROM maven:3.8.5-openjdk-17 AS build
COPY . .
RUN chmod +x mvnw && ./mvnw clean package -DskipTests

# Step 2: Run the application using a verified OpenJDK 17 runtime
FROM eclipse-temurin:17-jre-alpine
COPY --from=build /target/mockmate-backend-0.0.1-SNAPSHOT.jar mockmate.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "mockmate.jar"]