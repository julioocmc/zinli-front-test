# Zinli — Prueba Técnica Front-End

### Demo en producción

<https://zinli-test.netlify.app/>

---

## Descripción general

Aplicación web que emula una red social ligera. Los usuarios pueden:

- registrarse e iniciar sesión,
- crear publicaciones con imagen, texto y ubicación,
- indicar “me gusta” (solo uno por usuario),
- gestionar borradores y eliminados,
- exportar / importar sus propias publicaciones en formato JSON.

Toda la información se mantiene en el navegador mediante **localStorage**.

---

## Funcionalidades principales

| Área              | Detalle                                                                            |
| ----------------- | ---------------------------------------------------------------------------------- |
| **Autenticación** | Registro (avatar, username, nombre, apellido) e inicio de sesión solo con username |
| **Publicaciones** | Estados _draft / published / deleted_, imagen opcional, ubicación                  |
| **Likes**         | Un like por usuario; animación con Framer Motion y listado completo en modal       |
| **Perfil**        | Pestañas _Publicados_, _Borradores_, _Eliminados_; exportación / importación JSON  |
| **Feed**          | Línea temporal global, filtro “Mis posts” y buscador en tiempo real                |
| **Persistencia**  | Contexto React + localStorage                                                      |

---

## Tecnologías utilizadas

- **React 18** + **Vite**
- **TypeScript**
- **Tailwind CSS** (paleta personalizada)
- **React Router v6**
- **Framer Motion** (animaciones)
- **Sonner** (notificaciones)
- **Vitest + React Testing Library** (tests unitarios)

---

## Cómo ejecutar el proyecto localmente

> Puedes usar **npm** (clásico) o **pnpm** (más rápido y ahorra espacio).  
> Los comandos son los mismos; solo cambia la palabra inicial.

| Tarea                                        | con **pnpm**   | con **npm**       |
| -------------------------------------------- | -------------- | ----------------- |
| Instalar dependencias                        | `pnpm install` | `npm install`     |
| Servidor de desarrollo (recarga en caliente) | `pnpm dev`     | `npm run dev`     |
| Compilar para producción                     | `pnpm build`   | `npm run build`   |
| Previsualizar la build                       | `pnpm preview` | `npm run preview` |
| Ejecutar tests unitarios                     | `pnpm test`    | `npm test`        |

> Si no tienes **pnpm**: `npm i -g pnpm` (un minuto) o utiliza los comandos de la columna npm.

---

## Flujo de trabajo en Git

- **`main`** es una rama protegida (no se admite push directo).
- Se trabaja en ramas temáticas: `feat/*`, `fix/*`, `chore/*`, `docs/*`.
- Todo se integra mediante **Pull Request** con al menos una aprobación.
- **GitHub Actions** comprueba que la aplicación compila (`pnpm build`) en cada push / PR.

Ejemplos de PR ya fusionados:  
`feat/login`, `feat/post-feed`, `docs/workflow`, `test/basic`.

---

## Tests incluidos

1. **PostForm**: verifica que al enviar el formulario se llama a `addPost` con los datos correctos.
2. **PostCard**: comprueba que `toggleLike` se ejecuta al pulsar el botón de “me gusta”.

Se ejecutan con `pnpm test` o `npm test`.

---
