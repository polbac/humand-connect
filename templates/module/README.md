# Feature Module Template

Template para crear nuevos módulos MCP. Copia esta estructura a `src/modules/[feature]/`.

## Estructura

```
src/modules/[feature]/
├── feature.service.ts   # Lógica de negocio y llamadas a la API
└── feature.module.ts    # Registro de herramientas MCP
```

## Uso

1. Copia la carpeta `templates/module/` a `src/modules/[feature]/`
2. Renombra `feature` al nombre de tu módulo
3. Actualiza los endpoints de API en el servicio
4. Personaliza los schemas según los campos de la API
5. Registra el módulo en `src/index.ts`:

```typescript
import { registerFeatureModule } from './modules/feature/feature.module.js';
registerFeatureModule(server);
```

## Patrones

### Service

- Usa `apiService.get()`, `apiService.post()`, `apiService.patch()`, `apiService.delete()`
- Tipar inputs con Zod schemas (`CreateDtoSchema`, `UpdateDtoSchema`)
- Tipar responses con `z.infer<typeof ResponseSchema>`
- Exportar singleton: `export const featureService = new FeatureService()`

### Module

- Definir schemas con `as const` para inferencia correcta
- Usar `.describe()` en todos los campos
- Siempre usar try/catch en handlers
- Crear alias en español para cada herramienta
- Retornar `{ content: [{ type: 'text' as const, text: JSON.stringify(result, null, 2) }] }`

## Checklist

- [ ] Renombrar archivos de `feature.*` a `[feature].*`
- [ ] Actualizar imports en `index.ts`
- [ ] Definir schemas de request/response
- [ ] Implementar métodos del servicio
- [ ] Agregar try/catch a todos los handlers
- [ ] Crear aliases en español
- [ ] Ejecutar `npm run typecheck`
- [ ] Ejecutar `npm run build`
