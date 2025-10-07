#!/bin/bash

# Script para configurar las variables de entorno de Supabase
# Ejecuta: bash setup-env.sh

echo "🔧 Configurando variables de entorno para Supabase..."

# Crear archivo .env.local
cat > .env.local << EOF
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://ixdskleupuprxlcxiakh.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml4ZHNrbGV1cHVwcnhsY3hpYWtoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk3OTQ5MDcsImV4cCI6MjA3NTM3MDkwN30.dv3ZpjVOinpd1FxqjjeNTjNFLTCQDdiUXoCy0augKKc

# Microsoft Clarity Analytics (opcional)
NEXT_PUBLIC_CLARITY_PROJECT_ID=your_clarity_project_id_here

# GitHub (para MCP)
GITHUB_PAT=your_github_pat_here

# Tavily (para MCP)
TAVILY_API_KEY=your_tavily_api_key_here

# Firecrawl (para MCP)
FIRECRAWL_API_KEY=your_firecrawl_api_key_here
EOF

echo "✅ Archivo .env.local creado exitosamente"
echo "📝 Variables de Supabase configuradas:"
echo "   - URL: https://ixdskleupuprxlcxiakh.supabase.co"
echo "   - Anon Key: configurada"
echo ""
echo "🚀 Próximos pasos:"
echo "1. Ejecuta la migración SQL en el dashboard de Supabase"
echo "2. Reinicia el servidor: npm run dev"
echo "3. Prueba el login con: egarcia@gmail.com / contraseña123456"
