# 🎯 SOLUCIÓN FINAL - Configuración de Supabase

## ✅ Estado Actual
- ✅ Conexión a Supabase: **FUNCIONANDO**
- ✅ Variables de entorno: **CONFIGURADAS**
- ✅ Aplicación: **LISTA**
- ⚠️  Base de datos: **NECESITA CREACIÓN MANUAL**

## 🚀 PASO FINAL (Solo esto falta)

### 1. Abrir Dashboard de Supabase
- Ve a: **https://supabase.com/dashboard**
- Inicia sesión con tu cuenta
- Selecciona el proyecto: **`ixdskleupuprxlcxiakh`**

### 2. Ejecutar SQL
- Haz clic en **"SQL Editor"** en el menú lateral
- Haz clic en **"New Query"**
- Copia y pega **TODO** el contenido del archivo `supabase-quick-setup.sql`
- Haz clic en **"Run"** (botón verde)

### 3. Verificar Resultado
Deberías ver al final algo como:
```
id | email | full_name | role | is_active | created_at
---|-------|-----------|------|-----------|------------
[UUID] | egarcia@gmail.com | Eduardo Garcia | admin | true | [timestamp]
```

## 🧪 Probar la Configuración

### 1. Reiniciar Servidor
```bash
npm run dev
```

### 2. Probar Login
- Ve a: `http://localhost:3000/login`
- Email: `egarcia@gmail.com`
- Contraseña: `contraseña123456`

### 3. Verificar Funcionamiento
- ✅ Deberías ser redirigido al home
- ✅ Ver tu información de usuario en la parte superior
- ✅ Poder hacer logout

## 🔍 Script de Verificación
```bash
node scripts/setup-database.js
```

## 📋 Contenido del SQL (supabase-quick-setup.sql)

```sql
-- Crear tabla de usuarios
CREATE TABLE IF NOT EXISTS public.users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  full_name VARCHAR(255),
  role VARCHAR(50) DEFAULT 'user' CHECK (role IN ('admin', 'user', 'moderator')),
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insertar usuario de prueba
INSERT INTO public.users (email, password_hash, full_name, role, is_active) 
VALUES (
  'egarcia@gmail.com', 
  '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi',
  'Eduardo Garcia',
  'admin',
  true
) ON CONFLICT (email) DO UPDATE SET
  password_hash = EXCLUDED.password_hash,
  full_name = EXCLUDED.full_name,
  role = EXCLUDED.role,
  updated_at = NOW();

-- Habilitar RLS
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- Políticas de seguridad
CREATE POLICY "Users can view own profile" ON public.users
  FOR SELECT USING (auth.uid()::text = id::text);

CREATE POLICY "Users can update own profile" ON public.users
  FOR UPDATE USING (auth.uid()::text = id::text);

CREATE POLICY "Admins can view all users" ON public.users
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.users 
      WHERE id::text = auth.uid()::text 
      AND role = 'admin'
    )
  );

-- Función para actualizar updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger para actualizar updated_at
CREATE TRIGGER update_users_updated_at 
  BEFORE UPDATE ON public.users 
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();

-- Índices
CREATE INDEX IF NOT EXISTS idx_users_email ON public.users(email);
CREATE INDEX IF NOT EXISTS idx_users_role ON public.users(role);

-- Verificar que el usuario se creó correctamente
SELECT 
  id,
  email,
  full_name,
  role,
  is_active,
  created_at
FROM public.users 
WHERE email = 'egarcia@gmail.com';
```

## 🎯 Usuario de Prueba
- **Email:** `egarcia@gmail.com`
- **Contraseña:** `contraseña123456`
- **Rol:** `admin`
- **Estado:** `activo`

---

**¡Una vez ejecutado el SQL, todo estará funcionando perfectamente!** 🚀
