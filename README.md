## Descripcion

Esto es un E-commers

## Instalacion

1. Clonar el repositorio
2. Crear una copia del `.env.template` y renombrarla a `.env` y cambiar las variables de entorno
3. Instalar dependecias `npm i`
4. Levantar la base de datos `docker compose up -d`
5. Correr las migraciones de Prisma `npx prisma migrate dev`
6. Ejecutar seed `npm run seed`
7. Cerrer proyecto `npm run dev`
