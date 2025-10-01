# Usa una imagen oficial de Node.js
FROM node:18

# Establece el directorio de trabajo
WORKDIR /app

# Copia los archivos de dependencias
COPY package.json package-lock.json* ./

# Instala las dependencias
RUN npm install

# Copia el resto del código de la aplicación
COPY . ./

# Expone el puerto por defecto de Next.js
EXPOSE 3000

# Comando para iniciar Next.js en modo desarrollo
CMD ["npm", "run", "dev"]