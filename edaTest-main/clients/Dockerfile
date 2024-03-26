# Dockerfile para los microservicios de Node.js (Clientes y Cuentas por Pagar)
FROM node:18

# Crear directorio de trabajo
WORKDIR /usr/src/app

# Instalar dependencias
# El asterisco (*) se usa para asegurarse de que tanto package.json como package-lock.json sean copiados
COPY package*.json ./

RUN npm install

# Copiar los archivos del proyecto
COPY . .

# Exponer el puerto que usa el microservicio
EXPOSE 3001

# Comando para ejecutar la app
CMD ["node", "index.js"]