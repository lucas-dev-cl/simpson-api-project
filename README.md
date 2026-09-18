# Resumen del Proyecto: Node.js + TypeScript

<!-- 
Comentario de la Consigna 1.2:
El comando "npm init -y" inicializa la carpeta como un proyecto de Node.js creando automáticamente el archivo package.json con la configuración por defecto, evitando las preguntas iniciales.
-->

---

## 1. Inicialización del Proyecto (`npm init -y`)

* **¿Qué hace?**: Prepara tu carpeta para que Node.js entienda que ahí vas a crear un proyecto. Es como poner los cimientos. La parte de `-y` significa *"decirle que sí a todo automáticamente"* para que no te haga preguntas sobre el nombre, la versión o el autor.
* **¿Qué archivo genera?**: Genera un archivo llamado `package.json`.
* **¿Para qué sirve ese archivo?**: Es la "lista de compras" o el manual de instrucciones de tu proyecto. Ahí se anota qué herramientas usa tu proyecto y sus datos básicos.

---

## 2. Instalación de TypeScript (`--save-dev`)

Para entender la diferencia de cómo instalar paquetes:

* **`--save-dev` (Herramientas de construcción):**
  Solo sirven en tu computadora mientras desarrollas (ejemplos: TypeScript para traducir el código, o una herramienta que te avisa si cometiste errores de tipeo).
* **`--save` (Partes del motor del programa):**
  Son piezas de código creadas por otros que tú importas y usas dentro de tu programa para que haga cosas. El programa las necesita en vivo para no romperse.

> **¿Por qué TypeScript se guarda con `--save-dev`?**
> Para indicarle al sistema que solo necesitas TypeScript mientras estás en tu computadora construyendo el proyecto, no cuando el proyecto ya esté terminado y funcionando en producción.

---

## 3. Configuración de TypeScript (`tsconfig.json`)

* **`target`**: Define la versión de JavaScript a la que se traducirá (compilará) el código de TypeScript (en este caso, la versión de 2020).
* **`outDir`**: Especifica la carpeta de salida (en este caso `./dist`) donde se guardarán los archivos JavaScript ya traducidos.
* **`strict`**: Activa una revisión de código muy estricta para detectar la mayor cantidad de errores posibles mientras programamos.

---

## 4. Scripts en `package.json`

### 1. `"build": "tsc"`
* **¿Qué hace?**: Toma todo el código TypeScript que escribiste en la carpeta `src`, lo traduce a JavaScript y lo guarda en la carpeta `dist` (tal como lo configuraste en el `tsconfig.json`). Lo hace **una sola vez** y se apaga.
* **¿Cuándo se usa?**: Para verificar compilación o preparar la entrega final a producción.

### 2. `"watch": "tsc --watch"`
* **¿Qué hace?**: Ejecuta la traducción pero **se queda "escuchando" o vigilando** tus archivos. Cada vez que haces un cambio en algún archivo `.ts` y lo guardas, vuelve a traducir automáticamente a JavaScript en tiempo real sin que tengas que tocar la terminal de nuevo.
* **¿Cuándo se usa?**: Durante el desarrollo diario mientras estás programando.
