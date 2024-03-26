# Dockerfile para la API Gateway en Python con FastAPI
FROM python:3.8

# Establece el directorio de trabajo en el contenedor
WORKDIR /usr/src/app

# Instalar dependencias
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copiar los archivos del proyecto
COPY . .

# Exponer el puerto que usa FastAPI
EXPOSE 8000

# Comando para ejecutar la aplicación
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]