# PetFinder – Documentación Técnica del Proyecto de Tesis

## 1. Introducción

### 1.1. Contexto del problema

En la mayoría de las ciudades, cuando una mascota se pierde, el proceso de búsqueda depende casi por completo de la buena voluntad de las personas y de mecanismos tradicionales como carteles en la calle, publicaciones en redes sociales o llamadas a veterinarias y refugios. Estos métodos suelen ser lentos, poco estructurados y rara vez permiten una comunicación inmediata entre quien encuentra a la mascota y su dueño.

Aunque existen chapas de identificación con nombre y teléfono, estos datos pueden quedar desactualizados, perderse o no ser suficientes para brindar información médica relevante (alergias, medicación, condiciones especiales). Además, no se registra de forma sistemática dónde y cuándo se encontró a la mascota.

### 1.2. Objetivo general del sistema

El objetivo general de PetFinder es desarrollar una plataforma web que permita **identificar y recuperar mascotas perdidas mediante códigos QR**, facilitando la conexión inmediata entre la persona que encuentra a la mascota y su dueño, y registrando eventos de escaneo para ayudar en el seguimiento de casos.

### 1.3. Objetivos específicos

- Permitir que los dueños de mascotas **registren un perfil completo** de cada mascota (datos básicos, información médica, contactos de emergencia, fotos).
- Generar un **código QR único por mascota** que pueda ser impreso o incorporado en una chapa física para el collar.
- Ofrecer una **interfaz pública accesible** al escanear el QR, donde la persona que encuentra la mascota pueda ver información relevante y contactar al dueño sin necesidad de instalar ninguna aplicación.
- Registrar **eventos de escaneo** con fecha, hora y ubicación aproximada, para ayudar al seguimiento del recorrido de la mascota.
- Enviar **notificaciones al dueño** (por email y, potencialmente, otros canales) cada vez que se escanea el código.
- Proveer herramientas adicionales como **alertas de mascota perdida** y funcionalidades de comunidad (por ejemplo, foro o comentarios) para amplificar la búsqueda.

### 1.4. Alcance del proyecto

El sistema PetFinder, tal como se implementa en este proyecto de tesis, se centra en:

- Una **aplicación web responsiva** orientada principalmente a dispositivos móviles y navegadores modernos.
- Un **módulo de autenticación de usuarios** con registro, login, verificación de email, recuperación de contraseña y gestión básica de cuenta.
- Un **módulo de gestión de mascotas**, incluyendo creación, edición y baja lógica de perfiles de mascotas.
- La **generación y uso de códigos QR** para identificar a cada mascota.
- El **registro de eventos de escaneo** y visualización de historial para el dueño.
- Módulos complementarios para **páginas informativas públicas** (cómo funciona, precios propuestos, ayuda, contacto) que contextualizan el sistema dentro de un posible producto real.

Quedan fuera de alcance en esta versión:

- Integraciones de pago reales (suscripciones de pago, pasarelas de pago en producción).
- Aplicaciones móviles nativas (Android/iOS).
- Integraciones profundas con sistemas de refugios o bases de datos gubernamentales.

### 1.5. Tecnologías principales

PetFinder está construido como una aplicación **full-stack** basada en el ecosistema de JavaScript/TypeScript:

- **Next.js 15 (App Router)** como framework principal para el frontend y el backend (rutas de aplicación y rutas de API en un mismo proyecto).
- **React 19** para la construcción de interfaces de usuario declarativas y componibles.
- **TypeScript** para añadir tipado estático y mejorar la robustez del código.
- **Prisma** como ORM para interactuar con la base de datos relacional (por ejemplo, PostgreSQL), gestionando el esquema y las migraciones.
- **NextAuth v5 (beta)** para la autenticación de usuarios, manejo de sesiones y estrategias de seguridad.
- **Tailwind CSS** y componentes basados en Radix/UI (carpeta `components/ui`) para el diseño de la interfaz.
- **Resend** y utilidades propias (`lib/mail.ts`, `lib/pet-scan-email.ts`, etc.) para el envío de emails transaccionales.
- **Librerías de soporte** como `zod` para validación de datos, `react-hook-form` para manejo de formularios, `uploadthing` y `cloudinary` para la gestión de archivos e imágenes, y `qrcode` para la generación de códigos QR.

Estas tecnologías se integran para ofrecer un sistema que combina **interfaz de usuario, lógica de negocio, persistencia de datos y servicios externos** en una única base de código mantenible.

---

## 2. Visión general de la arquitectura

### 2.1. Vista de alto nivel

Desde el punto de vista de arquitectura, PetFinder se puede entender como una **aplicación web monolítica modular**:

- El **frontend** y el **backend** conviven en el mismo proyecto Next.js.
- La **capa de presentación** se implementa con componentes React y rutas de la carpeta `app/`.
- La **lógica de negocio** se distribuye entre:
  - **Server Components y Server Actions** en la carpeta `app/(home)/_actions` y similares.
  - **Utilidades en `lib/`** (por ejemplo, generación de códigos, envío de emails, verificación de credenciales).
  - **Capa de datos en `data/`** que centraliza consultas a la base de datos usando Prisma.
- La **capa de persistencia** está manejada por Prisma y el esquema definido en `prisma/schema.prisma`.
- La **autenticación** se configura a través de `auth.ts` y `auth.config.ts`, integrándose con NextAuth y Prisma.

A nivel de interacción básica:

1. El usuario accede a la aplicación mediante un navegador y navega por las rutas públicas (`app/(public)/...`).
2. Si quiere gestionar mascotas o ver información privada, se registra o inicia sesión a través de las rutas de autenticación (`app/(auth)/...`).
3. Una vez autenticado, accede a las secciones internas (`app/(home)/...`) donde puede crear mascotas, generar códigos QR y revisar escaneos.
4. Cuando alguien escanea un código QR, se accede a una ruta pública específica asociada al identificador de la mascota, la aplicación registra el evento de escaneo en la base de datos y ejecuta la lógica de notificación.

### 2.2. Frontend (Next.js – App Router)

El frontend se estructura principalmente en la carpeta `app/`, aprovechando el **App Router** de Next.js:

- `app/layout.tsx` define el layout raíz compartido (temas globales, estilos, navegación principal, proveedor de autenticación, etc.).
- `app/(public)/...` contiene páginas accesibles sin autenticación, como:
  - `about`, `pricing`, `help`, `contact`, `how-it-works`, entre otras.
- `app/(auth)/...` agrupa las páginas relacionadas con el flujo de autenticación:
  - login, registro, verificación de email, reseteo de contraseña, etc.
- `app/(home)/...` contiene las páginas para usuarios autenticados:
  - gestión de mascotas, alertas, foro, perfil, etc. (según lo definido en el proyecto).
- `app/api/...` contiene rutas de API que exponen endpoints para ciertas operaciones específicas (por ejemplo, registro de eventos de escaneo o manejo de uploads).

Los componentes de interfaz reutilizables se encuentran en `components/` y, en particular, en `components/ui/`, que agrupa botones, inputs, diálogos, formularios y otros elementos basados en Tailwind y Radix.

En las vistas se combinan:

- **Server Components** para obtener datos desde el servidor en el momento de renderizado.
- **Client Components** para manejar interacción del usuario, formularios y estados locales.

### 2.3. Backend (API Routes / Server Actions)

La lógica de backend se distribuye en:

- **Rutas de API** dentro de `app/api/`, que manejan peticiones HTTP directas (por ejemplo, para registrar eventos de escaneo o subir archivos).
- **Server Actions** ubicadas en carpetas como `app/(home)/_actions/`, que encapsulan operaciones de escritura/lectura sobre la base de datos y se invocan directamente desde componentes del frontend.

Este enfoque permite mantener una arquitectura monolítica pero bien organizada, donde cada flujo de negocio (por ejemplo, “crear mascota”, “generar alerta”, “registrar escaneo”) tiene una acción o endpoint claramente definido.

### 2.4. Base de datos y ORM (Prisma + PostgreSQL)

PetFinder utiliza **Prisma** como capa de acceso a datos. El esquema de la base de datos se define en `prisma/schema.prisma`, y las migraciones se almacenan en `prisma/migrations/`.

La información de dominio principal incluye, entre otras:

- Usuarios y sus credenciales (integrados con NextAuth).
- Mascotas y sus atributos.
- Alertas asociadas a mascotas perdidas.
- Eventos de escaneo de códigos QR.
- Tokens de verificación de email, reseteo de contraseña y cambio de email.
- Entidades relacionadas con el foro o interacción comunitaria (si están activas en la versión actual).

La carpeta `data/` contiene funciones que encapsulan consultas y operaciones típicas sobre estas entidades, evitando repetir lógica de acceso a datos en múltiples lugares del código.

### 2.5. Autenticación y autorización (NextAuth)

La autenticación se implementa con **NextAuth v5 (beta)**, integrada con Prisma mediante `@auth/prisma-adapter`:

- `auth.config.ts` define la configuración de proveedores, callbacks y opciones de seguridad.
- `auth.ts` expone los helpers necesarios para usar la autenticación en componentes y rutas.
- Los tipos relacionados con la sesión y el usuario extendido se encuentran en `types/next-auth.d.ts`.

Las rutas agrupadas bajo `app/(auth)/` gestionan:

- Registro de nuevos usuarios.
- Inicio y cierre de sesión.
- Verificación de correo electrónico mediante tokens.
- Flujos de reseteo de contraseña y cambio de email.

La autorización se aplica combinando:

- El uso de `middleware.ts` para proteger ciertas rutas.
- Comprobaciones de sesión en Server Components y Server Actions dentro de `app/(home)/...`.

### 2.6. Servicios externos (emails, almacenamiento, QR, etc.)

El sistema integra varios servicios y librerías externas:

- **Emails transaccionales** mediante Resend, con lógica centralizada en archivos como `lib/mail.ts`, `lib/email-change-mail.ts` y `lib/pet-scan-email.ts`.
- **Gestión de archivos e imágenes** mediante `uploadthing` y `cloudinary`, configurados en `lib/uploadthing.ts` y relacionados.
- **Generación de códigos QR** con la librería `qrcode` y utilidades en `lib/pet-codes.ts`.
- **Geolocalización y mapas** usando `leaflet` y `react-leaflet` (visible en algunas vistas y flujos relacionados con eventos de escaneo o alertas).

Estos servicios complementan la funcionalidad central del sistema y permiten ofrecer una experiencia más completa al usuario final.

---

## 3. Modelo de datos

### 3.1. Visión general del modelo

El modelo de datos de PetFinder está diseñado para representar las entidades clave del dominio:

- **Usuarios**: personas que utilizan la plataforma para registrar y gestionar sus mascotas.
- **Mascotas**: animales registrados por los usuarios, cada uno con un identificador único que se asocia a un código QR.
- **Fotos de mascotas**: imágenes asociadas a cada mascota, con una foto principal opcional.
- **Alertas de mascotas**: publicaciones que representan situaciones de mascota perdida o encontrada.
- **Comentarios**: mensajes asociados a las alertas, que permiten la interacción de la comunidad.
- **Eventos de escaneo**: registros de cada vez que se escanea el código QR de una mascota.
- **Tokens**: entidades auxiliares para gestionar procesos de verificación de email, reseteo de contraseña y cambio de email.
- **Cuentas externas**: registros de integración con proveedores de autenticación externos (si se habilitan).

Todas estas entidades se modelan en `prisma/schema.prisma` y se mapean a tablas de una base de datos PostgreSQL. Prisma se encarga de generar el cliente tipado para interactuar con ellas desde el código TypeScript.

### 3.2. Entidades principales

#### 3.2.1. Usuario (`User`)

La entidad `User` representa a los usuarios de la plataforma.

Campos destacados:

- `id`: identificador único del usuario (tipo `String`, generado con `cuid()`).
- `name`: nombre del usuario (opcional).
- `email`: correo electrónico (opcional pero único, `@unique`).
- `emailVerified`: fecha de verificación del email.
- `image`: URL de avatar o foto de perfil.
- `password`: hash de la contraseña (cuando se usa autenticación con credenciales).
- `phone`: número de teléfono del usuario.
- `role`: rol del usuario (`USER` o `ADMIN`).

Relaciones:

- `accounts`: lista de cuentas externas (`Account`) asociadas al usuario.
- `verificationTokens`: tokens de verificación de email.
- `passwordResetTokens`: tokens de reseteo de contraseña.
- `emailChangeTokens`: tokens para cambio de email.
- `pets`: mascotas registradas por el usuario.
- `comments`: comentarios escritos por el usuario en posts de alerta.

Esta estructura permite manejar tanto usuarios con autenticación tradicional (email + contraseña) como posibles proveedores externos en el futuro.

#### 3.2.2. Mascota (`Pet`)

La entidad `Pet` representa a cada mascota registrada.

Campos destacados:

- `id`: identificador único de la mascota (tipo `String`). En este proyecto **no se genera automáticamente**, lo que permite usar un ID controlado que también puede estar relacionado con el código QR.
- `name`: nombre de la mascota.
- `type`: tipo de mascota (`PetType`: perro, gato, ave, etc.).
- `sex`: sexo de la mascota (`PetSex`: macho, hembra, desconocido).
- `birthDate`: fecha de nacimiento (opcional).
- `breed`: raza (opcional).
- `size`: tamaño (`PetSize`: pequeño, mediano, grande, extra grande).
- `hairType`: tipo de pelo (`HairType`: corto, largo, rizado, sin pelo, etc.).
- `hairPattern`: patrón de pelaje (texto libre, opcional).
- `color`: color principal de la mascota.
- `createdAt` / `updatedAt`: fechas de creación y última actualización.
- `userId`: referencia al dueño (usuario).

Relaciones:

- `user`: usuario propietario de la mascota.
- `photos`: lista de fotos (`PetPhoto`) asociadas.
- `scanEvents`: eventos de escaneo (`ScanEvent`) donde aparece esta mascota.
- `alertPosts`: publicaciones de alerta (`PetAlertPost`) asociadas a esta mascota.

Este modelo permite enriquecer el perfil de la mascota con información suficiente para ayudar a identificarla físicamente y contemplar necesidades médicas especiales.

#### 3.2.3. Fotos de mascota (`PetPhoto`)

`PetPhoto` almacena las imágenes asociadas a una mascota.

Campos destacados:

- `id`: identificador único de la foto.
- `url`: URL de la imagen almacenada (por ejemplo, en Cloudinary).
- `publicId`: identificador opcional del recurso en el proveedor de almacenamiento.
- `isPrimary`: indica si la foto es la principal de la mascota.
- `createdAt`: fecha de creación del registro.
- `petId`: referencia a la mascota.

Relación principal:

- `pet`: relación many-to-one con `Pet` (cada foto pertenece a una mascota).

#### 3.2.4. Alertas de mascota (`PetAlertPost`)

`PetAlertPost` representa una publicación de alerta relacionada con una mascota.

Campos destacados:

- `id`: identificador único de la alerta.
- `petId`: referencia a la mascota asociada.
- `status`: estado de la alerta (`AlertStatus`: `LOST` o `FOUND`).
- `description`: descripción libre de la situación.
- `latitude` / `longitude`: coordenadas aproximadas relacionadas con la alerta.
- `createdAt` / `updatedAt`: fechas de creación y actualización.

Relaciones:

- `pet`: relación many-to-one con `Pet`.
- `comments`: lista de comentarios (`Comment`) asociados a la alerta.

Este modelo permite registrar tanto publicaciones de mascotas perdidas como de mascotas encontradas, y situarlas geográficamente.

#### 3.2.5. Comentarios (`Comment`)

`Comment` permite que los usuarios comenten en las alertas de mascotas.

Campos destacados:

- `id`: identificador único del comentario.
- `content`: contenido textual del comentario.
- `createdAt` / `updatedAt`: fechas de creación y actualización.
- `postId`: referencia al `PetAlertPost` asociado.
- `authorId`: referencia al `User` que escribe el comentario.

Relaciones:

- `post`: alerta (`PetAlertPost`) a la que pertenece el comentario.
- `author`: usuario (`User`) que escribió el comentario.

Este modelo refuerza la dimensión comunitaria del sistema, permitiendo que otras personas aporten información útil sobre avistamientos o hallazgos.

#### 3.2.6. Eventos de escaneo (`ScanEvent`)

`ScanEvent` registra cada vez que se escanea el código QR de una mascota.

Campos destacados:

- `id`: identificador único del evento.
- `petId`: referencia a la mascota cuyo código fue escaneado.
- `latitude` / `longitude`: posición geográfica capturada en el momento del escaneo.
- `userAgent`: información del navegador/dispositivo que realizó el escaneo (opcional).
- `ipAddress`: dirección IP del dispositivo (opcional), útil para detectar patrones.
- `createdAt`: fecha y hora del escaneo.

Relaciones:

- `pet`: relación many-to-one con `Pet`.

Índices:

- Índice por `petId` para consultar rápidamente los eventos de una mascota.
- Índice por `createdAt` para ordenar o filtrar por fecha.

Esta entidad es clave para el seguimiento de la mascota en tiempo y espacio, y para disparar la lógica de notificaciones.

#### 3.2.7. Cuentas externas (`Account`)

`Account` representa cuentas asociadas a proveedores de autenticación externos.

Campos destacados:

- `id`: identificador único de la cuenta.
- `userId`: referencia al usuario dueño de la cuenta.
- `type`, `provider`, `providerAccountId`: información de la cuenta externa.
- Campos adicionales (`access_token`, `refresh_token`, etc.) para integraciones OAuth.

Relaciones:

- `user`: usuario (`User`) al que pertenece la cuenta.

Aunque el proyecto puede comenzar con autenticación por email y contraseña, este modelo deja preparada la base para ampliar a otros proveedores en el futuro.

#### 3.2.8. Tokens de verificación y recuperación

El proyecto define tres modelos específicos para tokens:

- `VerificationToken`: para verificación de email.
- `PasswordResetToken`: para recuperación de contraseña.
- `EmailChangeToken`: para procesos de cambio de email.

Campos comunes:

- `id`: identificador único del token.
- `token`: valor del token utilizado en los enlaces enviados por email (único).
- `expires`: fecha y hora de expiración.
- `createdAt`: fecha de creación.
- `userId`: referencia al usuario asociado.

Cada modelo se relaciona con `User` mediante una relación many-to-one con eliminación en cascada (`onDelete: Cascade`), de modo que si se elimina un usuario, también se eliminan los tokens asociados.

### 3.3. Enumeraciones

El esquema define varias enumeraciones para restringir valores válidos y hacer el dominio más explícito:

- `UserRole`: `USER`, `ADMIN`.
- `AlertStatus`: `LOST`, `FOUND`.
- `PetType`: `DOG`, `CAT`, `BIRD`, `RABBIT`, `HAMSTER`, `FISH`, `REPTILE`, `OTHER`.
- `PetSex`: `MALE`, `FEMALE`, `UNKNOWN`.
- `PetSize`: `SMALL`, `MEDIUM`, `LARGE`, `EXTRA_LARGE`.
- `HairType`: `SHORT`, `MEDIUM`, `LONG`, `CURLY`, `HAIRLESS`.

Estas enumeraciones mejoran la consistencia de los datos y facilitan la construcción de formularios y filtros en el frontend.

### 3.4. Relaciones entre entidades

En términos de relaciones, el modelo de datos puede resumirse así:

- **Un `User` tiene muchas `Pet`** (relación uno-a-muchos).
- **Un `Pet` tiene muchas `PetPhoto`, muchos `ScanEvent` y muchos `PetAlertPost`**.
- **Un `PetAlertPost` tiene muchos `Comment`**.
- **Un `User` tiene muchos `Comment`** (comentarios que ha escrito).
- **Un `User` tiene muchas `Account`** (si se usan proveedores externos).
- **Un `User` tiene muchos tokens (`VerificationToken`, `PasswordResetToken`, `EmailChangeToken`)**.

Todas las relaciones están configuradas con `onDelete: Cascade` en Prisma, lo que garantiza que, por ejemplo, al eliminar una mascota se eliminen también sus fotos, alertas y eventos de escaneo asociados, evitando datos huérfanos.

### 3.5. Consideraciones de diseño

Algunas decisiones de diseño relevantes del modelo de datos son:

- El `id` de `Pet` se maneja manualmente en lugar de generarse automáticamente. Esto permite utilizar identificadores más controlados, por ejemplo, para codificarlos en el QR o migrar desde sistemas externos.
- La separación de entidades de token (`VerificationToken`, `PasswordResetToken`, `EmailChangeToken`) hace que cada flujo de seguridad tenga su propia tabla, simplificando la lógica de limpieza y auditoría.
- El uso de enumeraciones para roles, tipo de mascota, tamaño, etc., reduce errores y facilita la representación en la interfaz de usuario (selectores, radios, etc.).
- Los índices en `ScanEvent` (por `petId` y `createdAt`) están orientados al caso de uso principal: ver el historial de escaneos ordenado por fecha para una mascota en particular.

Este modelo proporciona una base consistente y extensible sobre la cual se construyen los distintos módulos funcionales del sistema PetFinder.

---

_(En las siguientes iteraciones se documentarán en detalle los módulos funcionales: autenticación, gestión de mascotas, escaneos, alertas, comunidad e imágenes, así como validación, seguridad y despliegue.)_

## 4. Módulos funcionales

### 4.1. Autenticación y gestión de usuarios

La autenticación en PetFinder combina **NextAuth v5**, **Prisma** y una capa de lógica de negocio propia distribuida entre `auth.ts`, `auth.config.ts`, `data/` y las rutas en `app/(auth)/...`.

#### 4.1.1. Flujo de registro

1. El usuario accede a la página de registro en `app/(auth)/auth/register`.
2. Un formulario (basado en `react-hook-form` y esquemas `zod`) solicita datos como nombre, email y contraseña.
3. Al enviar el formulario, se invoca una **Server Action** que:

- Valida los datos recibidos.
- Comprueba si el email ya está registrado utilizando las funciones de `data/user.ts`.
- Hashea la contraseña (por ejemplo, con `bcryptjs`).
- Crea un nuevo registro `User` en la base de datos a través de Prisma.
- Genera un `VerificationToken` y envía un email de verificación utilizando `lib/verification-token.ts` y `lib/mail.ts`.

4. El usuario recibe un email con un enlace de verificación que incluye el token.
5. Al abrir el enlace, una ruta en `app/(auth)/auth/verify-email` procesa el token:

- Localiza el token en la tabla `VerificationToken`.
- Verifica que no haya expirado.
- Marca el email del usuario como verificado (`emailVerified`).
- Elimina o invalida el token utilizado.

Este flujo garantiza que solo emails válidos y accesibles puedan asociarse a cuentas activas.

#### 4.1.2. Inicio de sesión (login)

1. El usuario accede a la página de login en `app/(auth)/auth/login`.
2. El formulario de login solicita email y contraseña.
3. Al enviar el formulario, se invoca la estrategia de credenciales configurada en `auth.config.ts`:

- Se busca el usuario en la base de datos (`data/user.ts`).
- Se compara la contraseña enviada con el hash almacenado.
- Si las credenciales son válidas, NextAuth crea una sesión y emite las cookies correspondientes.

4. Tras iniciar sesión, el usuario es redirigido al área interna (`app/(home)/...`), donde puede gestionar mascotas, alertas, etc.

Opcionalmente, el sistema puede comprobar si el email está verificado antes de permitir acceso completo a ciertas funcionalidades.

#### 4.1.3. Cierre de sesión (logout)

El cierre de sesión se gestiona mediante las utilidades de NextAuth (por ejemplo, `signOut` en el frontend o acciones específicas en el backend), que eliminan la sesión y limpian las cookies asociadas.

#### 4.1.4. Recuperación de contraseña

1. El usuario que olvidó su contraseña accede a la página `app/(auth)/auth/reset`.
2. Introduce su email en un formulario.
3. El sistema:

- Busca el usuario asociado a ese email.
- Si existe, genera un `PasswordResetToken` con un `token` aleatorio y fecha de expiración.
- Envía un email con un enlace de reseteo, utilizando utilidades de `lib/password-reset-token.ts` y `lib/mail.ts`.

4. El usuario abre el enlace que apunta a `app/(auth)/auth/reset-password`, donde puede introducir una nueva contraseña.
5. La Server Action responsable de este formulario:

- Valida el token (existencia, asociación a un usuario y no expirado).
- Hashea la nueva contraseña y la guarda en `User.password`.
- Invalida el token utilizado para evitar reutilización.

#### 4.1.5. Cambio de email y teléfono

Además de la recuperación de contraseña, el usuario puede actualizar sus datos de contacto desde el área interna (`app/(home)/...`), a través de acciones como:

- **Cambio de email**:

  - Se genera un `EmailChangeToken` con `currentEmail`, `newEmail` y un `token` único.
  - Se envía un email de confirmación a la nueva dirección.
  - Al hacer clic en el enlace, se valida el token y se actualiza el email del usuario.

- **Actualización de teléfono**:
  - Una Server Action actualiza el campo `phone` de la entidad `User` directamente.

Estas operaciones se implementan combinando funciones en `data/user.ts`, utilidades en `lib/email-change-token.ts` y rutas/acciones en `app/(home)/_actions`.

#### 4.1.6. Eliminación de cuenta

El sistema incluye una opción para que el usuario elimine su cuenta desde el área interna.

Cuando se ejecuta este flujo:

1. Se verifica la identidad del usuario (por ejemplo, solicitando la contraseña actual o confirmación explícita).
2. Una Server Action invoca las funciones de `data/user.ts` para eliminar el registro `User`.
3. Gracias a la configuración `onDelete: Cascade` en Prisma, se eliminan automáticamente tokens, comentarios, mascotas y demás entidades asociadas, o se gestionan las dependencias según las reglas definidas.

Este mecanismo garantiza el cumplimiento de principios de privacidad, permitiendo al usuario solicitar la eliminación de sus datos.

---

### 4.2. Gestión de mascotas y códigos QR

La gestión de mascotas es uno de los núcleos funcionales de PetFinder. Se apoya en:

- El modelo de datos `Pet` y `PetPhoto` descrito en la sección de modelo de datos.
- Las Server Actions ubicadas en `app/(home)/_actions/` (por ejemplo, `create-pet.ts`, `update-pet.ts`, `delete-pet.ts`).
- Las vistas y componentes dentro de `app/(home)/pet` y `app/(home)/home`.
- Las utilidades para códigos en `lib/pet-codes.ts`.

#### 4.2.1. Alta de mascota

1. El usuario autenticado accede a la sección de creación de mascota, dentro del grupo de rutas `app/(home)/pet` o `app/(home)/new`.
2. Se presenta un formulario donde se solicitan datos como:
   - Nombre.
   - Tipo de mascota (`PetType`).
   - Sexo (`PetSex`).
   - Fecha de nacimiento.
   - Raza, tamaño (`PetSize`), tipo de pelo (`HairType`), color, etc.
3. Al enviar el formulario, se invoca la Server Action definida en `app/(home)/_actions/create-pet.ts`, que:
   - Valida los datos con un esquema `zod`.
   - Llama a utilidades de `lib/pet-codes.ts` para **generar un identificador único de mascota** mediante `generateUniquePetCode()`.
   - Crea el registro `Pet` en la base de datos usando Prisma, asignando el código generado al campo `id`.
4. Opcionalmente, el usuario puede subir una o más fotos que se almacenan como `PetPhoto`.

El uso de `generateUniquePetCode()` garantiza que cada mascota tenga un identificador corto, legible y apto para codificarse en un QR.

#### 4.2.2. Edición y baja de mascota

Una vez creada una mascota, el usuario puede editarla o eliminarla desde el área interna:

- **Edición**:

  - La vista de detalle de mascota carga los datos actuales desde la base de datos (`data/pets.ts`).
  - Un formulario permite modificar campos como nombre, datos físicos, información médica o estado.
  - La Server Action en `app/(home)/_actions/update-pet.ts` valida los cambios y actualiza el registro `Pet` correspondiente.

- **Eliminación**:
  - La acción de borrar mascota llama a `app/(home)/_actions/delete-pet.ts`.
  - Esta acción elimina el registro `Pet` de la base de datos.
  - Debido a las relaciones definidas en Prisma, también se eliminan fotos, alertas y escaneos asociados (según las reglas `onDelete: Cascade`).

Este módulo asegura que cada usuario pueda mantener actualizado el conjunto de mascotas que gestiona dentro de la plataforma.

#### 4.2.3. Generación de códigos QR

La asociación entre cada mascota y su código QR se basa en el campo `id` de `Pet`, que almacena un código alfanumérico corto.

La lógica de generación se encuentra en `lib/pet-codes.ts`:

- `generateUniquePetCode()`:

  - Genera un string de 8 caracteres usando letras mayúsculas y números, excluyendo caracteres confusos (como `0`, `O`, `I`, `1`).
  - Comprueba en la base de datos (`db.pet.findUnique`) si el código está ya en uso.
  - Repite el proceso hasta encontrar un código **único**, con un máximo de 50 intentos.
  - Si no encuentra un código después de varios intentos, usa un método de respaldo basado en una combinación de caracteres aleatorios y un fragmento de timestamp.

- `isValidPetCode(code: string)`:

  - Verifica que el código tenga exactamente 8 caracteres y que todos pertenezcan al conjunto permitido.

- `isPetCodeAvailable(code: string)`:

  - Comprueba si un código propuesto está libre en la base de datos.

- `getPetCodeStats()`:
  - Calcula estadísticas de uso: cantidad total de mascotas registradas, cantidad total de combinaciones posibles y porcentaje de uso.

Una vez asignado el código a la mascota, la aplicación puede generar un **código QR** cuya URL incluya ese identificador (por ejemplo, una ruta pública bajo `app/(public)/p/[petId]` o similar). Al escanear el QR, el navegador accede a esa ruta y dispara el flujo de escaneo y notificación descrito en el módulo correspondiente.

#### 4.2.4. Listado y detalle de mascotas

En el área interna (`app/(home)/home` y `app/(home)/pet`), el usuario dispone de:

- Un **listado de mascotas**, obtenido mediante funciones de `data/pets.ts`, donde se muestran datos básicos (nombre, tipo, foto principal y estado).
- Una **vista de detalle**, donde se visualiza la información completa de la mascota, sus fotos y, potencialmente, enlaces para ver el historial de escaneos y generar/descargar el QR.

Estas vistas utilizan componentes de interfaz en `app/(home)/_components` y formularios basados en `react-hook-form` + `zod` para mantener una experiencia de usuario consistente.

---

_(En iteraciones posteriores se documentarán los submódulos de escaneos y notificaciones, alertas y comentarios, y manejo de imágenes y uploads.)_

### 4.3. Escaneos y notificaciones

Este módulo describe qué ocurre cuando alguien escanea el código QR de una mascota.

Intervienen principalmente:

- La ruta de API `app/api/scan-event/route.ts`.
- El modelo `ScanEvent` en la base de datos.
- Las funciones de acceso a datos en `data/scan-events.ts`.
- La utilidad de envío de email `lib/pet-scan-email.ts`.

#### 4.3.1. Flujo de escaneo del código QR

1. La chapa o etiqueta de la mascota contiene un **código QR** que apunta a una URL del dominio de PetFinder con el identificador de la mascota (`petId`).
2. Desde el frontend (página pública de escaneo), se obtiene la ubicación aproximada del dispositivo (si el usuario otorga permisos) y se envía una petición `POST` a la ruta `app/api/scan-event/route.ts` con:
   - `petId`.
   - `latitude` y `longitude`.
3. La ruta de API:
   - Valida que `petId` esté presente.
   - Valida que `latitude` y `longitude` sean números válidos.
   - Consulta la base de datos para obtener la mascota (`db.pet.findUnique`) incluyendo los datos de su dueño (nombre y email).
   - Si la mascota no existe o no tiene email de dueño, devuelve un error adecuado.
4. Si todo es válido, la API obtiene:
   - El `user-agent` desde las cabeceras de la petición.
   - La dirección IP desde `x-forwarded-for` o `x-real-ip`.
5. Con esta información, crea un nuevo registro `ScanEvent` en la base de datos con:
   - `petId`.
   - `latitude` y `longitude`.
   - `userAgent`.
   - `ipAddress`.
6. Finalmente, invoca `sendPetScanNotification` de `lib/pet-scan-email.ts` para notificar al dueño por email, y devuelve una respuesta JSON indicando:
   - Que el evento de escaneo se registró correctamente.
   - Si el email se envió con éxito o no.

Este flujo permite registrar cada escaneo de forma estructurada y disparar acciones de notificación en tiempo (casi) real.

#### 4.3.2. Registro y consulta de eventos de escaneo

La tabla `ScanEvent` almacena los escaneos asociados a cada mascota. Para consultarlos, el sistema utiliza funciones en `data/scan-events.ts`:

- `getPetScanEvents(petId: string)`:

  - Recupera todos los eventos de escaneo de una mascota, ordenados por fecha de creación descendente.
  - Devuelve campos como `latitude`, `longitude`, `userAgent`, `ipAddress` y `createdAt`.

- `getPetScanStats(petId: string)`:
  - Calcula estadísticas agregadas para una mascota:
    - `totalScans`: total histórico de escaneos.
    - `scansToday`: escaneos realizados desde el inicio del día actual.
    - `scansThisWeek`: escaneos realizados en los últimos 7 días.
    - `lastScan`: fecha y hora del último escaneo.

Estas funciones se utilizan en las vistas internas para mostrar al dueño el **historial de escaneos** y métricas que ayudan a entender la frecuencia y recencia de avistamientos.

#### 4.3.3. Notificación al dueño por email

La función `sendPetScanNotification` en `lib/pet-scan-email.ts` se encarga de enviar un email al dueño cuando se registra un nuevo escaneo.

Parámetros principales:

- `ownerEmail`: email del dueño.
- `ownerName`: nombre del dueño.
- `petName`: nombre de la mascota.
- `scanLocation`: objeto opcional con `latitude` y `longitude`.
- `scanTime`: fecha y hora del escaneo.

Comportamiento:

1. Formatea la fecha y hora del escaneo según la zona horaria de Argentina (`America/Argentina/Buenos_Aires`).
2. Determina si hay ubicación válida (`latitude` y `longitude` distintos de 0).
3. Si hay ubicación, construye un enlace de Google Maps (`https://www.google.com/maps?q=lat,long&z=15`).
4. Envía un email usando el servicio **Resend** (`resend.emails.send`), con un HTML que incluye:
   - Nombre de la mascota y del dueño.
   - Fecha y hora del escaneo.
   - Información sobre la ubicación (disponible o no).
   - Un botón para abrir la ubicación en Google Maps (si se proporcionó).
   - Consejos prácticos sobre cómo proceder para buscar a la mascota.
5. Maneja errores de envío y devuelve un objeto con `success` y, en caso de fallo, un mensaje de error.

De este modo, cada escaneo relevante puede generar una **alerta inmediata** para el dueño, incrementando las probabilidades de una reunificación rápida.

### 4.4. Alertas, foro y comentarios

Además de los escaneos individuales, PetFinder permite publicar alertas y aprovechar la comunidad para difundir casos de mascotas perdidas o encontradas.

Este módulo se apoya en:

- El modelo `PetAlertPost` y `Comment`.
- Las funciones de acceso a datos en `data/pet-alerts.ts`.
- Las vistas bajo `app/(home)/forum` y secciones relacionadas en `app/(home)/home`.

#### 4.4.1. Creación y gestión de alertas

Una alerta (`PetAlertPost`) representa un aviso sobre una mascota perdida o encontrada.

Flujo típico:

1. Desde el área interna, el usuario selecciona una de sus mascotas y crea una alerta indicando:
   - Estado: `LOST` (perdida) o `FOUND` (encontrada).
   - Descripción de la situación.
   - Ubicación aproximada (latitud y longitud), si está disponible.
2. Una Server Action (por ejemplo, `create-pet-alert.ts` en `app/(home)/_actions`) valida los datos y crea el registro `PetAlertPost` asociado a la mascota.
3. El usuario puede actualizar el estado o la descripción de la alerta mediante `update-pet-alert.ts`.

Para consultar alertas, el sistema utiliza las funciones de `data/pet-alerts.ts`:

- `getPetAlerts(petId: string)`:

  - Obtiene todas las alertas asociadas a una mascota específica, ordenadas por fecha de creación descendente.

- `getPetAlertById(alertId: string)`:
  - Recupera una alerta particular, incluyendo los datos básicos de la mascota asociada.

#### 4.4.2. Listado de mascotas perdidas

Para ofrecer una vista general de casos activos, el sistema expone un listado de todas las mascotas marcadas como perdidas (`status = "LOST"`):

- `getAllLostPetAlerts()` en `data/pet-alerts.ts`:
  - Recupera todos los posts de alerta con estado `LOST`.
  - Incluye información de la mascota (`pet`) y su foto principal.
  - Incluye datos de contacto del dueño (nombre, email, teléfono).
  - Ordena los resultados por fecha de creación descendente.

Esta función sirve de base para una sección tipo **“tablero de mascotas perdidas”** donde la comunidad puede ver rápidamente los casos recientes.

#### 4.4.3. Foro y comentarios

El proyecto incluye una vista de tipo foro donde las alertas se presentan como posts y los usuarios pueden comentar.

Funciones clave en `data/pet-alerts.ts`:

- `getForumPosts()`:

  - Obtiene una lista de posts (`PetAlertPost`) junto con:
    - La mascota asociada y su foto principal.
    - El usuario dueño de la mascota (nombre, email, id).
    - El conteo de comentarios (`_count.comments`).
  - Ordena los posts por fecha de creación descendente.

- `getPostWithComments(postId: string)`:
  - Recupera un post específico con:
    - La mascota (incluyendo todas sus fotos).
    - El dueño de la mascota.
    - La lista completa de comentarios (`Comment`), incluyendo datos de los autores (id, nombre, email, imagen), ordenados por fecha ascendente.

La creación de comentarios se implementa mediante Server Actions en `app/(home)/_actions` que:

- Validan que el usuario esté autenticado.
- Verifican que el post exista.
- Crean un nuevo `Comment` asociado al post y al usuario actual.

Este módulo fomenta la **colaboración comunitaria**, permitiendo que vecinos y otros usuarios compartan avistamientos, sugerencias o información relevante para la búsqueda.
