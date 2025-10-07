# 🔧 Configurar MCP de Supabase Correctamente

## ✅ Problema Identificado

El MCP de Supabase estaba configurado incorrectamente:
- ❌ Usaba un servidor HTTP genérico
- ❌ No tenía las credenciales correctas
- ❌ No estaba conectado a tu proyecto específico

## 🚀 Solución Implementada

### 1. MCP Reconfigurado

El archivo `.cursor/mcp.json` ahora tiene la configuración correcta:

```json
"supabase": {
  "command": "npx",
  "args": [
    "-y",
    "@supabase/mcp-server"
  ],
  "env": {
    "SUPABASE_URL": "https://ixdskleupuprxlcxiakh.supabase.co",
    "SUPABASE_ANON_KEY": "tu_anon_key",
    "SUPABASE_SERVICE_ROLE_KEY": "tu_service_role_key"
  }
}
```

### 2. Pasos para Activar el MCP

#### Paso 1: Reiniciar Cursor
- Cierra Cursor completamente
- Vuelve a abrirlo
- Esto carga la nueva configuración del MCP

#### Paso 2: Verificar MCP en Cursor
- Ve a **Cursor Settings** → **Extensions** → **MCP**
- Verifica que el servidor **"supabase"** esté activo
- Debería mostrar: `@supabase/mcp-server`

#### Paso 3: Activar Manual Tool Approval
- En Cursor Settings, busca **"Manual tool approval"**
- Actívalo si no está activado
- Esto te permitirá aprobar comandos del MCP

### 3. Probar el MCP

Una vez configurado, ejecuta estos comandos en Cursor:

```
Lista las tablas en Supabase
```

```
Muestra la información del proyecto de Supabase
```

```
Ejecuta SQL: SELECT 1 as test
```

### 4. Crear la Tabla con MCP

Si el MCP funciona, podrás crear la tabla directamente:

```
Crea una tabla llamada 'users' con estos campos:
- id: UUID (primary key)
- email: VARCHAR(255) UNIQUE NOT NULL
- password_hash: VARCHAR(255) NOT NULL
- full_name: VARCHAR(255)
- role: VARCHAR(50) DEFAULT 'user'
- is_active: BOOLEAN DEFAULT true
- created_at: TIMESTAMP WITH TIME ZONE DEFAULT NOW()
- updated_at: TIMESTAMP WITH TIME ZONE DEFAULT NOW()
```

### 5. Insertar Usuario de Prueba

```
Inserta un usuario en la tabla 'users' con:
- email: 'egarcia@gmail.com'
- password_hash: '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi'
- full_name: 'Eduardo Garcia'
- role: 'admin'
- is_active: true
```

### 6. Configurar Políticas RLS

```
Habilita Row Level Security en la tabla 'users' y crea políticas para que:
- Los usuarios puedan ver su propio perfil
- Los usuarios puedan actualizar su propio perfil
- Los administradores puedan ver todos los usuarios
```

## 🧪 Script de Verificación

Ejecuta este script para verificar la configuración:

```bash
node scripts/test-mcp-supabase.js
```

## 🎯 Ventajas del MCP Funcionando

Una vez que el MCP esté funcionando correctamente:

- ✅ **Crear tablas directamente** desde Cursor
- ✅ **Ejecutar SQL** sin usar el dashboard
- ✅ **Gestionar políticas RLS** automáticamente
- ✅ **Insertar datos** de prueba
- ✅ **Configurar autenticación** completa
- ✅ **Gestionar la base de datos** desde el chat

## 🚨 Solución de Problemas

### Error: "MCP server not found"
- Verifica que `@supabase/mcp-server` esté instalado
- Reinicia Cursor completamente

### Error: "Authentication failed"
- Verifica que las credenciales en `.cursor/mcp.json` sean correctas
- Asegúrate de que el proyecto de Supabase esté activo

### Error: "Permission denied"
- Verifica que el Service Role Key tenga permisos de administrador
- Revisa las políticas de seguridad en Supabase

## 🎉 Resultado Final

Con el MCP funcionando correctamente, podrás:

1. **Crear la tabla de usuarios** directamente desde Cursor
2. **Insertar el usuario de prueba** automáticamente
3. **Configurar políticas RLS** sin usar el dashboard
4. **Gestionar toda la base de datos** desde el chat
5. **Probar la autenticación** inmediatamente

¡El MCP de Supabase estará completamente funcional y podrás gestionar todo desde Cursor! 🚀
