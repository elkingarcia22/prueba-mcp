# Variables de Entorno para Vercel

## Variables Requeridas:

1. **NEXT_PUBLIC_SUPABASE_URL**: `https://ixdskleupuprxlcxiakh.supabase.co`
2. **NEXT_PUBLIC_SUPABASE_ANON_KEY**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml4ZHNrbGV1cHVwcnhsY3hpYWtoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk3OTQ5MDcsImV4cCI6MjA3NTM3MDkwN30.dv3ZpjVOinpd1FxqjjeNTjNFLTCQDdiUXoCy0augKKc`

## Configuración Manual en Vercel Dashboard:

1. Ve a https://vercel.com/dashboard
2. Selecciona el proyecto: `mcp-design-system-app`
3. Ve a Settings → Environment Variables
4. Agrega las variables arriba para todos los entornos (Development, Preview, Production)
5. Haz redeploy del proyecto

## Error Actual:
```
Error: supabaseUrl is required.
```

Esto indica que las variables de entorno no están configuradas en Vercel.
