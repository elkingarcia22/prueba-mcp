# 🚀 MCP Design System App

Proyecto Next.js completo con MCPs conectados, Chakra UI, Storybook y tokens del Design System.

## ✨ Características

- **🎨 Design System**: Chakra UI + Style Dictionary + Tokens CSS
- **📚 Storybook**: Documentación visual de componentes
- **🔌 MCPs**: Tavily, Firecrawl, GitHub, Supabase conectados
- **🔐 Autenticación**: Sistema de login completo con Supabase
- **🌙 Modo Claro/Oscuro**: Toggle automático con Chakra UI
- **📊 Analytics**: Microsoft Clarity integrado
- **⚡ Performance**: Next.js 15 + TypeScript + Tailwind
- **♿ Accesibilidad**: ESLint + Storybook a11y

## 🚀 Inicio rápido

### 1. Instalar dependencias
```bash
npm install
```

### 2. Configurar variables de entorno
```bash
cp .env.example .env.local
# Edita .env.local con tus claves API
```

### 3. Configurar Supabase
1. Crea un proyecto en [Supabase](https://supabase.com/)
2. Ejecuta el SQL del archivo `supabase-schema.sql` en el SQL Editor
3. Copia la URL y Anon Key a tu `.env.local`

### 4. Compilar tokens del Design System
```bash
npm run tokens
```

### 5. Iniciar desarrollo
```bash
npm run dev
```

### 6. Probar autenticación
- Ve a `http://localhost:3000/login`
- Usa: `egarcia@gmail.com` / `contraseña123456`

### 7. Abrir Storybook (en otra terminal)
```bash
npm run storybook
```

## 📋 Comandos disponibles

```bash
# Desarrollo
npm run dev                 # Servidor de desarrollo Next.js
npm run storybook          # Servidor de Storybook
npm run build              # Build de producción
npm run lint               # Linter ESLint

# Tokens y Design System
npm run tokens             # Compilar tokens con Style Dictionary
npm run tokens:watch       # Watch mode para tokens

# Testing
npm run test               # Tests con Vitest
npm run test:ui            # UI de tests
```

## 🔧 Configuración de MCPs

### 1. Configurar Cursor
El archivo `.cursor/mcp.json` ya está configurado con todos los servidores MCP. Solo necesitas:

1. Activar "Manual tool approval" en Cursor
2. Configurar las claves API en las variables de entorno

### 2. Claves API necesarias

- **Tavily**: [https://tavily.com/](https://tavily.com/)
- **Firecrawl**: [https://firecrawl.dev/](https://firecrawl.dev/)
- **GitHub**: [https://github.com/settings/tokens](https://github.com/settings/tokens)
- **Clarity**: [https://clarity.microsoft.com/](https://clarity.microsoft.com/)

## 🎨 Design System

### Tokens
Los tokens se definen en `tokens/` y se compilan a:
- `src/styles/tokens.css` - Variables CSS
- `src/styles/tokens.ts` - Tipos TypeScript

### Componentes
- `src/components/ui/` - Componentes base
- Cada componente tiene su `.stories.tsx` en Storybook

### Tema
- `src/theme/theme.ts` - Configuración de Chakra UI
- Mapea tokens CSS a propiedades de Chakra

## 📚 Storybook

Accede a [http://localhost:6006](http://localhost:6006) para ver:
- Documentación de componentes
- Controles interactivos
- Tests de accesibilidad
- Variantes y estados

## 🔌 Conectar servicios

### GitHub
```bash
gh auth login
gh repo create <owner>/<project> --private --source=. --remote=origin --push
```

### Vercel + Clarity
```bash
vercel link --project <project>
printf "%s\n" "<CLARITY_ID>" | vercel env add NEXT_PUBLIC_CLARITY_PROJECT_ID development
printf "%s\n" "<CLARITY_ID>" | vercel env add NEXT_PUBLIC_CLARITY_PROJECT_ID preview
printf "%s\n" "<CLARITY_ID>" | vercel env add NEXT_PUBLIC_CLARITY_PROJECT_ID production
```

### Supabase (opcional)
```bash
npm i -g supabase
supabase init
supabase link --project-ref <your-ref>
```

## 🔐 Sistema de Autenticación

### Usuario de Prueba
- **Email**: `egarcia@gmail.com`
- **Contraseña**: `contraseña123456`
- **Rol**: `admin`

### Configuración de Supabase
1. Ejecuta `supabase-setup.sql` en Supabase Dashboard
2. Ejecuta `fix-password-hash.sql` para corregir el hash
3. El sistema usa autenticación personalizada con tabla `users`

### Características del Login
- ✅ Validación de credenciales con bcrypt
- ✅ Sesión persistente en localStorage
- ✅ Modo claro/oscuro integrado
- ✅ Redirección automática después del login
- ✅ Manejo de errores detallado

## 🧪 Smoke tests

Ejecuta estos comandos en Cursor para verificar MCPs:

1. **Tavily**: "Busca 3 artículos recientes sobre onboarding"
2. **Firecrawl**: "Crawlea esta URL y devuélveme un resumen"
3. **GitHub**: "Crea un issue 'Definir tokens v1'"
4. **Storybook**: "Lista componentes y props de Button"
5. **Supabase**: "Lista tablas y genera 3 consultas read-only"

## 📁 Estructura del proyecto

```
src/
├── components/          # Componentes UI reutilizables
│   └── ui/             # Componentes base (Button, Card, etc.)
├── theme/              # Configuración del tema Chakra
├── styles/             # Tokens CSS y estilos globales
├── app/                # Páginas de Next.js App Router
└── lib/                # Utilidades y helpers

tokens/                 # Tokens del Design System
├── core.colors.json    # Colores
├── core.typography.json # Tipografía
└── core.spacing.json   # Espaciados y radios

.cursor/                # Configuración de Cursor
├── mcp.json           # Servidores MCP
└── rules/             # Reglas del agente
```

## 🎯 Estándares

- **Conventional Commits**: `feat/fix/chore/docs/test`
- **Reutiliza componentes del DS**; no dupliques estilos
- **Usa tokens, no valores fijos**
- **Genera story por componente**
- **Accesibilidad obligatoria**

## 📖 Documentación

- [AGENTS.md](./AGENTS.md) - Guía completa del proyecto
- [Storybook](http://localhost:6006) - Documentación de componentes
- [Tokens CSS](./src/styles/tokens.css) - Variables generadas

## 🚀 Deploy

### Vercel
```bash
vercel --prod
```

### Build local
```bash
npm run build
npm run start
```

---

**¡Listo!** Tu proyecto está configurado con todas las herramientas modernas para desarrollo eficiente. 🎉
