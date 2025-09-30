# ==============================
# Etapa 1: Construcción con Maven
# ==============================
FROM maven:3.9.6-eclipse-temurin-17 AS build
WORKDIR /app

# Copiamos el pom y descargamos dependencias primero (mejora el cache de Docker)
COPY pom.xml .
RUN mvn dependency:go-offline -B

# Copiamos el código fuente
COPY src ./src

# Compilamos y generamos el JAR (sin correr tests para que sea más rápido)
RUN mvn clean package -DskipTests

# ==============================
# Etapa 2: Imagen final liviana
# ==============================
FROM eclipse-temurin:17-jre-alpine
WORKDIR /app

# Copiamos el JAR desde la etapa anterior
COPY --from=build /app/target/*.jar app.jar

# Puerto que usará el microservicio (ajústalo a tu application.yml)
EXPOSE 8083

# Comando de arranque
ENTRYPOINT ["java", "-jar", "app.jar"]
