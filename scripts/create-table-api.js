#!/usr/bin/env node

/**
 * Script para crear la tabla usando la API REST de Supabase
 * Ejecuta: node scripts/create-table-api.js
 */

const https = require('https');

// Configuración
const projectId = 'ixdskleupuprxlcxiakh';
const supabaseUrl = 'https://ixdskleupuprxlcxiakh.supabase.co';
const serviceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml4ZHNrbGV1cHVwcnhsY3hpYWtoIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1OTc5NDkwNywiZXhwIjoyMDc1MzcwOTA3fQ.OasMVzKdFHiKrCN7PjTwtALWqHeqeYjKa50kCC73yI8';

console.log('🚀 Intentando crear tabla usando API REST de Supabase...\n');

// SQL para crear la tabla
const createTableSQL = `
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
`;

function makeRequest(options, postData) {
  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        try {
          const jsonData = JSON.parse(data);
          resolve({ status: res.statusCode, data: jsonData });
        } catch (e) {
          resolve({ status: res.statusCode, data: data });
        }
      });
    });
    
    req.on('error', (error) => {
      reject(error);
    });
    
    if (postData) {
      req.write(postData);
    }
    
    req.end();
  });
}

async function createTableViaAPI() {
  try {
    console.log('1. Intentando crear tabla usando API REST...');
    
    const options = {
      hostname: 'ixdskleupuprxlcxiakh.supabase.co',
      port: 443,
      path: '/rest/v1/rpc/exec_sql',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${serviceKey}`,
        'apikey': serviceKey,
        'Content-Length': Buffer.byteLength(JSON.stringify({ sql: createTableSQL }))
      }
    };

    const response = await makeRequest(options, JSON.stringify({ sql: createTableSQL }));
    
    if (response.status === 200 || response.status === 201) {
      console.log('✅ Tabla creada exitosamente via API!');
      console.log('📊 Respuesta:', response.data);
    } else {
      console.log('⚠️  No se pudo crear via API (esto es normal)');
      console.log('📊 Status:', response.status);
      console.log('📊 Respuesta:', response.data);
    }

  } catch (error) {
    console.log('⚠️  Error en API (esto es normal):', error.message);
  }

  console.log('\n2. Probando conexión con la aplicación...');
  
  // Probar con la aplicación
  const { createClient } = require('@supabase/supabase-js');
  const supabase = createClient(supabaseUrl, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml4ZHNrbGV1cHVwcnhsY3hpYWtoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk3OTQ5MDcsImV4cCI6MjA3NTM3MDkwN30.dv3ZpjVOinpd1FxqjjeNTjNFLTCQDdiUXoCy0augKKc');

  try {
    const { data, error } = await supabase.from('users').select('count').limit(1);
    
    if (error && error.message.includes('Could not find the table')) {
      console.log('⚠️  La tabla aún no existe');
    } else if (error) {
      console.log('⚠️  Error:', error.message);
    } else {
      console.log('✅ La tabla existe y es accesible!');
    }
  } catch (error) {
    console.log('⚠️  Error de conexión:', error.message);
  }

  console.log('\n📋 CONCLUSIÓN:');
  console.log('La forma más confiable es ejecutar el SQL manualmente en el dashboard.');
  console.log('\n🚀 INSTRUCCIONES FINALES:');
  console.log('1. Ve a: https://supabase.com/dashboard');
  console.log('2. Selecciona proyecto: ixdskleupuprxlcxiakh');
  console.log('3. Ve a SQL Editor → New Query');
  console.log('4. Copia y pega el contenido de: supabase-quick-setup.sql');
  console.log('5. Haz clic en Run');
  console.log('6. Reinicia el servidor: npm run dev');
  console.log('7. Prueba el login: egarcia@gmail.com / contraseña123456');
}

createTableViaAPI();
