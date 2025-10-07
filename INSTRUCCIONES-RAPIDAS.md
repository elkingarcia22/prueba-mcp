# 🚀 Instrucciones Rápidas - Supabase Setup

## ✅ Ya Configurado

- ✅ Variables de entorno configuradas en `.env.local`
- ✅ Conexión a Supabase verificada
- ✅ Proyecto: `https://ixdskleupuprxlcxiakh.supabase.co`

## 🔧 Paso Final: Ejecutar Migración SQL

### 1. Ve al Dashboard de Supabase
- Abre: https://supabase.com/dashboard
- Selecciona tu proyecto: `ixdskleupuprxlcxiakh`

### 2. Ejecuta la Migración
- Ve a **SQL Editor**
- Haz clic en **New Query**
- Copia y pega todo el contenido del archivo `supabase-quick-setup.sql`
- Haz clic en **Run**

### 3. Verificar la Migración
Deberías ver al final del resultado:
```
id | email | full_name | role | is_active | created_at
---|-------|-----------|------|-----------|------------
[UUID] | egarcia@gmail.com | Eduardo Garcia | admin | true | [timestamp]
```

## 🧪 Probar la Configuración

### 1. Reiniciar el Servidor
```bash
npm run dev
```

### 2. Probar el Login
- Ve a: `http://localhost:3000/login`
- Email: `egarcia@gmail.com`
- Contraseña: `contraseña123456`

### 3. Verificar Funcionamiento
- ✅ Deberías ser redirigido al home
- ✅ Ver tu información de usuario en la parte superior
- ✅ Poder hacer logout

## 🔍 Script de Prueba

Si quieres verificar la conexión:
```bash
node scripts/test-supabase.js
```

## 🎯 Usuario de Prueba Creado

- **Email:** `egarcia@gmail.com`
- **Contraseña:** `contraseña123456`
- **Rol:** `admin`
- **Estado:** `activo`

## 🚨 Solución de Problemas

### Error: "Invalid login credentials"
- Verifica que la migración SQL se ejecutó sin errores
- Asegúrate de que el usuario se creó correctamente

### Error: "Failed to fetch"
- Verifica que el servidor esté corriendo en `http://localhost:3000`
- Revisa la consola del navegador para errores

### Error: "RLS policy violation"
- Verifica que las políticas RLS se crearon correctamente
- Revisa que el usuario tenga el rol `admin`

---

**¡Una vez ejecutada la migración SQL, todo estará listo para usar!** 🎉
