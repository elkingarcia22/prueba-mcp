#!/bin/bash

# Script para configurar Vercel automáticamente
# Este script configura las variables de entorno y hace deployment

echo "🚀 Configurando Vercel automáticamente..."

# Variables de entorno
SUPABASE_URL="https://ixdskleupuprxlcxiakh.supabase.co"
SUPABASE_ANON_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml4ZHNrbGV1cHVwcnhsY3hpYWtoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk3OTQ5MDcsImV4cCI6MjA3NTM3MDkwN30.dv3ZpjVOinpd1FxqjjeNTjNFLTCQDdiUXoCy0augKKc"

# Crear archivo .env.local para desarrollo local
echo "📝 Creando .env.local..."
cat > .env.local << EOF
NEXT_PUBLIC_SUPABASE_URL=$SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY=$SUPABASE_ANON_KEY
EOF

echo "✅ Archivo .env.local creado"

# Verificar si Vercel CLI está instalado
if ! command -v vercel &> /dev/null; then
    echo "📦 Instalando Vercel CLI..."
    npm install -g vercel
fi

# Hacer login en Vercel (requiere interacción manual)
echo "🔐 Iniciando sesión en Vercel..."
echo "   Necesitarás autenticarte manualmente en el navegador"
vercel login

# Configurar variables de entorno en Vercel
echo "⚙️ Configurando variables de entorno en Vercel..."
vercel env add NEXT_PUBLIC_SUPABASE_URL production <<< "$SUPABASE_URL"
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY production <<< "$SUPABASE_ANON_KEY"
vercel env add NEXT_PUBLIC_SUPABASE_URL preview <<< "$SUPABASE_URL"
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY preview <<< "$SUPABASE_ANON_KEY"
vercel env add NEXT_PUBLIC_SUPABASE_URL development <<< "$SUPABASE_URL"
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY development <<< "$SUPABASE_ANON_KEY"

# Hacer deployment
echo "🚀 Haciendo deployment a Vercel..."
vercel --prod

echo "✅ ¡Deployment completado!"
echo "🌐 Tu aplicación estará disponible en la URL que se muestre arriba"
