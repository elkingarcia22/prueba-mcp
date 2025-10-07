#!/usr/bin/env node

/**
 * Script para configurar la base de datos de Supabase directamente
 * Ejecuta: node scripts/setup-database.js
 */

const { createClient } = require('@supabase/supabase-js');

// Configuración
const supabaseUrl = 'https://ixdskleupuprxlcxiakh.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml4ZHNrbGV1cHVwcnhsY3hpYWtoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk3OTQ5MDcsImV4cCI6MjA3NTM3MDkwN30.dv3ZpjVOinpd1FxqjjeNTjNFLTCQDdiUXoCy0augKKc';

console.log('🚀 Configurando base de datos de Supabase...\n');

const supabase = createClient(supabaseUrl, supabaseKey);

async function setupDatabase() {
  try {
    console.log('1. Probando conexión...');
    
    // Probar conexión básica
    const { data, error } = await supabase.from('users').select('count').limit(1);
    
    if (error && error.message.includes('Could not find the table')) {
      console.log('✅ Conexión exitosa - La tabla no existe aún (esto es normal)');
    } else if (error) {
      console.error('❌ Error de conexión:', error.message);
      return false;
    } else {
      console.log('✅ Conexión exitosa - La tabla ya existe');
    }

    console.log('\n2. Creando tabla de usuarios...');
    
    // Crear tabla usando SQL directo
    const createTableSQL = `
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
    `;

    const { data: createData, error: createError } = await supabase.rpc('exec_sql', {
      sql: createTableSQL
    });

    if (createError) {
      console.log('⚠️  No se pudo crear la tabla automáticamente');
      console.log('💡 Esto es normal - necesitas ejecutar el SQL manualmente');
      console.log('   Ve a: https://supabase.com/dashboard');
      console.log('   Proyecto: ixdskleupuprxlcxiakh');
      console.log('   SQL Editor → New Query');
      console.log('   Copia el contenido de: supabase-quick-setup.sql');
    } else {
      console.log('✅ Tabla creada exitosamente');
    }

    console.log('\n3. Verificando si el usuario de prueba existe...');
    
    // Intentar consultar la tabla
    const { data: usersData, error: usersError } = await supabase
      .from('users')
      .select('*')
      .eq('email', 'egarcia@gmail.com')
      .single();

    if (usersError && usersError.message.includes('Could not find the table')) {
      console.log('⚠️  La tabla aún no existe');
      console.log('📋 Necesitas ejecutar el SQL manualmente en el dashboard');
    } else if (usersError) {
      console.log('⚠️  El usuario no existe aún');
      console.log('📋 Necesitas ejecutar el SQL para crear el usuario');
    } else {
      console.log('✅ Usuario de prueba encontrado:');
      console.log(`   - Email: ${usersData.email}`);
      console.log(`   - Nombre: ${usersData.full_name}`);
      console.log(`   - Rol: ${usersData.role}`);
    }

    console.log('\n4. Probando autenticación...');
    
    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
      email: 'egarcia@gmail.com',
      password: 'contraseña123456'
    });

    if (authError) {
      console.log('⚠️  Autenticación falló:', authError.message);
      console.log('💡 Esto es normal si la tabla/usuario no existe aún');
    } else {
      console.log('✅ Autenticación exitosa!');
      console.log(`👤 Usuario: ${authData.user.email}`);
      await supabase.auth.signOut();
    }

    console.log('\n📋 RESUMEN:');
    console.log('✅ Conexión a Supabase: OK');
    console.log('⚠️  Tabla de usuarios: Necesita creación manual');
    console.log('⚠️  Usuario de prueba: Necesita creación manual');
    
    console.log('\n🚀 PRÓXIMOS PASOS:');
    console.log('1. Ve a: https://supabase.com/dashboard');
    console.log('2. Selecciona proyecto: ixdskleupuprxlcxiakh');
    console.log('3. Ve a SQL Editor → New Query');
    console.log('4. Copia y pega el contenido de: supabase-quick-setup.sql');
    console.log('5. Haz clic en Run');
    console.log('6. Reinicia el servidor: npm run dev');
    console.log('7. Prueba el login: egarcia@gmail.com / contraseña123456');

    return true;

  } catch (error) {
    console.error('❌ Error inesperado:', error.message);
    return false;
  }
}

// Ejecutar configuración
setupDatabase().then(success => {
  process.exit(success ? 0 : 1);
});
