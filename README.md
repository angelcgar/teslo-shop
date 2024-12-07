# Leer

Este proyecto lo marcare como desactualizado y no para produccion, ojo el curso
de FH NextJs me a parecido genial

## Descripcion

## Bugs

no se por que vercel falla, en local si funcionaaaaaaaaaa!!!!!!!!!!!!!

```bash
./src/app/auth/login/ui/LoginForm.tsx:4:10
Type error: Module '"react-dom"' has no exported member 'useFormState'.
  2 |
  3 | import { useEffect } from 'react';
> 4 | import { useFormState, useFormStatus } from 'react-dom';
    |          ^
  5 |
  6 | import Link from 'next/link';
  7 | // import { useRouter } from 'next/navigation';
```

Esto es un E-commers

## Instalacion

1. Clonar el repositorio
2. Crear una copia del `.env.template` y renombrarla a `.env` y cambiar las variables de entorno
3. Instalar dependecias `npm i`
4. Levantar la base de datos `docker compose up -d`
5. Correr las migraciones de Prisma `npx prisma migrate dev`
6. Ejecutar seed `npm run seed`
7. Limpiar el localStorege del navegador
8. Cerrer proyecto `npm run dev`
