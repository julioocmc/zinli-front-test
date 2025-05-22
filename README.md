# Zinli Front-End Test

![CI](https://github.com/tu-user/tu-repo/actions/workflows/ci.yml/badge.svg)

Pequeña red social tipo Instagram/Twitter hecha con **React + Vite**, **TypeScript**, **Tailwind** y persistencia en `localStorage`.

## Features principales

- Registro y login (solo `username` para login)
- Crear publicaciones con imagen, ubicación, estados **draft/published/deleted**
- Likes únicos con animación (Framer Motion)
- Perfil con pestañas **Publicados / Borradores / Eliminados**
- Estado persistente mediante `PostsContext`
- UI accesible y responsiva

## Workflow

| Paso          | Regla                                               |
| ------------- | --------------------------------------------------- |
| `main`        | Rama **protegida** – no se permiten pushes directos |
| Ramas feature | `feat/*`, correcciones `fix/*`, tareas `chore/*`    |
| Pull Requests | Revisión obligatoria (1 approval) para merge        |
| CI            | GitHub Actions ejecuta `pnpm build` en cada push/PR |

Ejemplos de PR cerrados:  
`setup/project-structure`, `feat/login`, `feat/post`, `docs/workflow`.

---

## Scripts

| Comando        | Descripción                   |
| -------------- | ----------------------------- |
| `pnpm dev`     | Servidor local con HMR        |
| `pnpm build`   | Compilación producción        |
| `pnpm preview` | Vista previa producción local |

## Stack

- React 18 + Vite + TS
- Tailwind CSS con paleta custom
- React Router v6
- Sonner (toasts)
- Heroicons, Lucide, Framer Motion
