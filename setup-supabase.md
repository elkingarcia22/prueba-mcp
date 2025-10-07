# 🚀 Configuración Completa de Supabase

## Paso 1: Crear Proyecto en Supabase

1. Ve a [https://supabase.com](https://supabase.com)
2. Haz clic en "Start your project"
3. Crea una cuenta o inicia sesión
4. Haz clic en "New Project"
5. Configura:
   - **Name:** `prueba-mcp`
   - **Database Password:** (guarda esta contraseña)
   - **Region:** `US East (N. Virginia)` o la más cercana
   - **Pricing Plan:** Free

## Paso 2: Obtener Credenciales

Una vez creado el proyecto:

1. Ve a **Settings** > **API**
2. Copia:
   - **Project URL** (algo como `https://xxxxx.supabase.co`)
   - **anon public** key (empieza con `eyJ...`)

## Paso 3: Configurar Variables de Entorno

Crea el archivo `.env.local`:

```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://tu-proyecto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_anon_key_aqui

# Microsoft Clarity Analytics (opcional)
NEXT_PUBLIC_CLARITY_PROJECT_ID=tu_clarity_project_id_here

# GitHub (para MCP)
GITHUB_PAT=tu_github_pat_here

# Tavily (para MCP)
TAVILY_API_KEY=tu_tavily_api_key_here

# Firecrawl (para MCP)
FIRECRAWL_API_KEY=tu_firecrawl_api_key_here
```

## Paso 4: Ejecutar Migración SQL

1. En el dashboard de Supabase, ve a **SQL Editor**
2. Haz clic en **New Query**
3. Copia y pega todo el contenido del archivo `supabase-migration.sql`
4. Haz clic en **Run** para ejecutar la migración

## Paso 5: Configurar Autenticación

En el dashboard de Supabase:

1. Ve a **Authentication** > **Settings**
2. Configura:
   - **Site URL:** `http://localhost:3000`
   - **Redirect URLs:** `http://localhost:3000/**`
   - **Disable email confirmations:** ✅ (para desarrollo)

## Paso 6: Probar la Configuración

1. Reinicia tu servidor de desarrollo:
   ```bash
   npm run dev
   ```

2. Ve a `http://localhost:3000/login`

3. Prueba con las credenciales:
   - **Email:** `egarcia@gmail.com`
   - **Contraseña:** `contraseña123456`

## ✅ Verificación

Si todo está configurado correctamente:

- ✅ Deberías poder hacer login
- ✅ Ser redirigido al home
- ✅ Ver tu información de usuario en la parte superior
- ✅ Poder hacer logout

## 🔧 Solución de Problemas

### Error: "Invalid login credentials"
- Verifica que las variables de entorno estén correctas
- Asegúrate de que la migración SQL se ejecutó sin errores

### Error: "Failed to fetch"
- Verifica que `NEXT_PUBLIC_SUPABASE_URL` esté correcto
- Asegúrate de que el proyecto de Supabase esté activo

### Error: "RLS policy violation"
- Verifica que las políticas RLS se crearon correctamente
- Revisa que el usuario tenga el rol correcto

## 📊 Estructura de la Base de Datos

Después de la migración tendrás:

- **`users`** - Tabla principal de usuarios
- **`user_sessions`** - Tracking de sesiones
- **Políticas RLS** - Seguridad a nivel de fila
- **Índices** - Para mejor rendimiento
- **Triggers** - Para actualización automática de timestamps

## 🎯 Usuario de Prueba Creado

- **Email:** `egarcia@gmail.com`
- **Contraseña:** `contraseña123456`
- **Rol:** `admin`
- **Estado:** `activo`

¡Listo para usar! 🚀
