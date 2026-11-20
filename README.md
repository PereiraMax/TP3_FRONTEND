# Matchdeverdad · Dos sentencias. Dos soluciones.
### Trabajo Práctico Nº 3 · Desarrollo de Sistemas Web (Front End)
**2do Cuatrimestre 2026 · IFTS 29**  
**Fecha de Entrega:** 26/11/2026  
**Modalidad:** Grupal · Evaluación sin nota numérica (Rúbrica · Aprobado / Desaprobado)  
**Metodología:** Desafío de Construcción 100% Agéntica («Ustedes dirigen. El agente construye»)

---

## 🔗 Enlaces del Proyecto (Criterio 02 · Rúbrica)

- **Repositorio en GitHub:** [https://github.com/PereiraMax/TP3_FRONTEND](https://github.com/PereiraMax/TP3_FRONTEND)
- **Landing Page Publicada:** [https://proyectoifts29tp3grupo26.vercel.app/](https://proyectoifts29tp3grupo26.vercel.app/)

> **Verificación sin sesión:** Ambos enlaces son de acceso público irrestricto y no requieren inicio de sesión ni permisos especiales para su visualización y auditoría técnica.

---

## 📌 Asignación Docente y Startup

- **Startup asignada:** **Matchdeverdad**
- **Rubro:** Deportes y organización de partidos
- **Objetivo de la startup:** Organizador de fútbol 5 que ayuda a reunir diez jugadores confirmados.
- **Origen de las reglas:** Lógica proposicional formulada por estudiantes del **IFTS 16**.
- **Bloque Asignado:** **S07-B · Permiso para invitar** (Grupo 26 en el sorteo docente).
- **Sentencias asignadas (redacción original textual intacta):**
  - **FRASE 1 · R3:**  
    > *«Si un candidato sigue siendo compatible, el organizador autorizó invitarlo, todavía faltan jugadores y no hay una invitación vigente para ese candidato, el sistema solicita enviar la invitación.»*
  - **FRASE 2 · R4:**  
    > *«Si hay un candidato propuesto, todavía faltan jugadores y no consta autorización del organizador para invitarlo, el sistema solicita ese permiso y no envía la invitación.»*

---

## 👥 Integrantes del Grupo (Criterio 01 · Nivel Propone)

| Integrante | GitHub | Aporte concreto |
| :--- | :--- | :--- |
| Maximo Ariel Pereira | [PereiraMax](https://github.com/PereiraMax) | Uso de Google Antigravity IDE con Gemini 3.8 Flash para la generación agéntica de la landing (HTML, CSS, JS, SVG). |
| Julian Piedrabuena | [juliganSW](https://github.com/juliganSW) | Uso de Claude (Sonnet 5.5) para auditar la landing contra la consigna y el README (inconsistencias de enlaces) y para mejorar la accesibilidad por teclado: patrón ARIA y navegación con flechas en las pestañas de diagramas, y `aria-controls` y paneles cerrados fuera del foco en los 14 desplegables. Cambios propuestos mediante rama y Pull Request. |
| Martin Savia | [martin-2t](https://github.com/martin-2t) | 	Uso de Claude Code (Sonnet 5.5), Corrección de estilos (CSS) de la landing; revisión de la lógica contra la consigna y corrección del simulador (separación del cupo en R4 y R3, resultado final explícito), renombrado de elementos para no sugerir ejecución de agentes reales, ajuste de las insignias ⚙ diseño en el diagrama R3, de la decisión 6 y del caso límite 6. |
| Emmanuel Valdez | [Emmanuel-Valdez](https://github.com/Emmanuel-Valdez) | Uso de OpenCode (plan Go) con DeepSeek 4.1 y Qwen 3.7 para iteraciones de código, revisión contra consigna, accesibilidad y responsive. |
| Matias Mazzitelli | [mdev-repos](https://github.com/mdev-repos) | Uso de Claude Code (Sonnet 5.5) para revisar las consignas y los criterios de evaluación, iterar con el agente para elaborar una propuesta de solución ("Un Tinder para partidos de futbol 5) y revisar el código generado por los demás agentes. |

### 🔍 Revisión Cruzada Documentada y Mejora Concreta (Nivel Propone)
Durante la sesión de revisión interna del grupo, se contrastó el diagrama preliminar generado por el agente frente a la realidad del producto:
- **Problema detectado por el equipo:** El agente inicialmente proponía que, al recibir la autorización del organizador en R4, el sistema enviara directamente la invitación al jugador. El equipo advirtió que el organizador puede demorar horas o días en contestar. Si el envío se produjera de inmediato, se podría invitar a alguien cuando el partido ya se hubiera llenado con otros confirmados, o cuando el jugador ya no estuviese libre.
- **Mejora concreta consensuada:** Se instruyó al agente desacoplar tajantemente la autorización del envío: la salida afirmativa de R4 no contacta al jugador, sino que simplemente registra la autorización y transfiere el caso a R3. R3 actúa como una aduana de consistencia de último segundo, revalidando compatibilidad, cupo y ausencia de invitaciones duplicadas antes de solicitar la orden de despacho.

---

## 🛠️ Herramientas de IA y Modelos Utilizados (Criterio 05 · Nivel Propone)

El desarrollo del proyecto se ejecutó bajo la consigna de **Construcción 100% Agéntica**, sin edición manual de código:

### Herramientas y modelos

| Herramienta | Modelo | Uso y aporte concreto |
| :--- | :--- | :--- |
| **Google Antigravity IDE** | Gemini 3.8 Flash | Entorno de programación agéntica. Se utilizó para generar y modificar todos los archivos del proyecto (HTML, CSS, JS y SVG) mediante instrucciones en lenguaje natural, sin edición manual de código. |
| **OpenCode** | DeepSeek 4.1 / Qwen 3.7 | Editor agéntico en terminal (plan OpenCode Go). Se utilizó para dirigirlas iteraciones de código, revisión de archivos, comparación con la consigna y ajustes de accesibilidad, responsive y estructura del README. |
| **Claude** (Julián) | Sonnet 5.5 | Auditoría de la landing y del README contra la consigna; mejora de accesibilidad (ARIA y teclado en pestañas de diagramas y desplegables), aplicada por rama y Pull Request. |
| **Claude Code** | Sonnet 5.5 | Aplicación de escritorio de Claude. Se utilizó para evaluar los primeros intercambios del grupo, pulir ideas y generar una propuesta que se ajuste de mejor manera a la consigna y los criterios de evaluación. |

### Registro de Iteración Agéntica (Nivel Propone)

1. **Instrucción inicial:** «Generá la landing page con la información de Matchdeverdad, las dos sentencias y diagramas de flujo en HTML/CSS/JS».
2. **Problema detectado:** La primera versión presentaba las sentencias como procesos aislados sin explicitar que R4 antecede a R3, omitía la etiqueta `⚙ diseño` en los supuestos no definidos por la lógica y no contemplaba la navegación por teclado en los acordeones.
3. **Pedido de mejora y resultado:** Se proporcionó el documento *«PROPUESTAS TP3»*, ordenando:
   - Incorporar la paleta de colores original de Matchdeverdad (Azul Marino Profundo `#0b2347`, Dorado Deportivo `#ffcc00`, Azul Hielo `#edf4fb`).
   - Rotular cada supuesto con el badge `⚙ diseño`.
   - Implementar los 3 diagramas vectoriales SVG (R4, R3 y Recorrido Completo).
   - Añadir un simulador interactivo que permita recorrer en tiempo real casos que cumplen y casos que fallan.
   - Implementar soporte total para teclado (`Enter`, `Espacio`, `aria-expanded`).

---

## 📐 Decisiones de Diseño del Grupo (`⚙ diseño` · Criterio 04)

Las sentencias proposicionales originales definen condiciones mínimas pero dejan vacíos operativos. Para completar la solución agéntica, el grupo adoptó **12 decisiones de diseño**, marcadas explícitamente en la landing y los diagramas con la etiqueta `⚙ diseño`:

1. **Matcher automático (R4):** El sistema propone candidatos compatibles a partir de la base de jugadores disponibles; el organizador valida.
2. **Organizador único (R3 y R4):** Es la persona que creó el partido; no se modelan roles delegados.
3. **Autorización granular (R3 y R4):** El visto bueno se otorga individualmente por cada jugador (Sí/No).
4. **Criterio de compatibilidad (R3):** Coincidencia en franja horaria, zona geográfica y posición requerida.
5. **Criterio de cupo (R3 y R4):** «Faltan jugadores» significa estrictamente menos de 10 confirmados.
6. **Invitación vigente (R3):** Invitación cursada para este mismo partido que aún no venció ni fue respondida; evita spam.
7. **Rechazo explícito (R4):** Si el organizador rechaza, se registra el rechazo y se descarta al candidato, evitando bucles infinitos.
8. **Registro de fallo en R3 (R3):** Si alguna condición no se cumple, se asienta la causa específica y se cancela el envío.
9. **Destino del despacho (R3):** La solicitud de envío se dirige a la función interna de mensajería de la aplicación.
10. **Silencio del organizador (R4):** Si el organizador no responde, el candidato permanece en espera y no se envía nada.
11. **Partido completo al proponer (R4):** Si el cupo ya está lleno (10/10), no se molesta al organizador pidiendo permisos.
12. **Traspaso de estado (R4 y R3):** La autorización afirmativa de R4 es el insumo que satisface la Condición 1 de R3.

---

## ⚡ Casos Límite y Excepciones Modeladas (Nivel Propone)

1. **En R3 (Cupo colmado durante espera):** Entre la autorización y el despacho, el partido alcanza los 10 confirmados por otra vía. *Resolución:* El agente detecta cupo lleno y aborta el envío.
2. **En R3 (Pérdida de compatibilidad):** El candidato cambia sus preferencias de horario o zona mientras se procesaba el permiso. *Resolución:* El agente detecta la incompatibilidad y descarta el despacho.
3. **En R3 (Invitación vigente preexistente):** Ya existía un mensaje enviado a ese mismo jugador aún no respondido. *Resolución:* Se frena la duplicación protegiendo la reputación de la app.
4. **En R4 (Rechazo explícito):** El organizador rechaza la sugerencia. *Resolución:* Se registra el rechazo y no se vuelve a reiterar la consulta.
5. **En R4 (Falta de respuesta / timeout):** El organizador no abre la app. *Resolución:* El candidato queda congelado en espera; no se asume silencio positivo bajo ningún concepto.
6. **En R4 (Partido completado en pantalla):** Mientras el organizador miraba la tarjeta de permiso, entraron los últimos jugadores. *Resolución:* La tarjeta se deshabilita automáticamente.

---

## 💻 Instrucciones para Reproducir el Proyecto Localmente

El proyecto fue desarrollado utilizando tecnologías web estándar (HTML5 semántico, CSS3 modular y JavaScript ES6+), garantizando máxima portabilidad sin dependencias externas complejas:

### Opción 1: Apertura directa
1. Descargue o clone el repositorio en su computadora:
   ```bash
   git clone https://github.com/PereiraMax/TP3_FRONTEND.git
   ```
2. Ingrese a la carpeta del proyecto:
   ```bash
   cd TP3_FRONTEND
   ```
3. Haga doble clic sobre el archivo `index.html` para abrirlo directamente en Google Chrome, Firefox, Edge o Safari.

### Opción 2: Mediante servidor local ligero
Si desea ejecutarlo con un servidor web local:
- **Con Python:**
  ```bash
  python -m http.server 8080
  ```
- **Con Node / npx:**
  ```bash
  npx serve .
  ```
Abra `http://localhost:8080` en su navegador.

---

## 📋 Estructura de Archivos del Repositorio

```
TP3_FRONTEND/
├── index.html                           # Landing page completa, semántica y accesible
├── style.css                            # Estilos y variables con paleta oficial de Matchdeverdad
├── script.js                            # Controlador interactivo (acordeones, tabs y simulador)
├── README.md                            # Documentación integral según rúbrica docente
└── assets/
    └── images/
        ├── logo-matchdeverdad.svg       # Logo vectorial original en alta fidelidad
        ├── diagram-r4.svg               # Diagrama de flujo vectorial: Sentencia R4
        ├── diagram-r3.svg               # Diagrama de flujo vectorial: Sentencia R3
        └── diagram-recorrido-completo.svg # Diagrama integral del recorrido de R4 a R3
```

---
*Proyecto elaborado en el marco del cierre de cursada 2026 de Desarrollo de Sistemas Web (Front End) · IFTS 29.*