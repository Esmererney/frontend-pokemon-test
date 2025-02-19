# Pokémon test

Una aplicación web desarrollada con React y TypeScript que consume la PokéAPI para mostrar una lista de Pokémon con paginación, búsqueda y detalles interactivos.

## Tecnologías Utilizadas
- **React 18**: Componentes reutilizables y eficiente manejo del estado.
- **TypeScript**: Tipado estático para mayor seguridad y mantenibilidad.
- **TanStack Query**: Gestor de estados asíncronos y cacheo de datos.
- **Zod**: Validación de datos obtenidos de la API.
- **Tailwind CSS**: Estilizado rápido y mantenible.
- **Axios**: Peticiones HTTP eficientes.
- **Radix UI**: Implementación de modales accesibles.

## Instalación y Ejecución
1. Clona el repositorio:
   ```sh
   git clone https://github.com/Esmererney/frontend-pokemon-test.git
   cd pokemon-explorer
   ```
2. Instala las dependencias:
   ```sh
   npm install
   ```
3. Inicia la aplicación en modo desarrollo:
   ```sh
   npm run dev
   ```

## Características
- 🔍 **Búsqueda** de Pokémon por nombre.
- 📜 **Paginación** para explorar Pokémon de manera eficiente.
- 🔎 **Vista de detalles** con información sobre habilidades y características.
- ⚡ **Optimizado** con React Query para mejorar la experiencia de usuario.
- ✅ **Validación de datos** para evitar errores en la estructura de la API.

## Estructura del Proyecto
```
src/
├── components/        # Componentes reutilizables (PokemonTable, PokemonModal, etc.)
├── hooks/             # Hooks personalizados para la obtención de datos
├── services/          # Llamadas a la API y validaciones con Zod
├── types/             # Tipado y validación de datos
```

## Contribución
1. Haz un fork del repositorio.
2. Crea una nueva rama (`git checkout -b feature-nueva-funcionalidad`).
3. Realiza tus cambios y haz un commit (`git commit -m "Agrega nueva funcionalidad"`).
4. Sube los cambios (`git push origin feature-nueva-funcionalidad`).
5. Abre un Pull Request.
