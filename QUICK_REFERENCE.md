# Quick Reference Guide

Fast lookup for common tasks and patterns.

## Project Setup

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start

# Type checking
pnpm tsc --noEmit

# Lint code
pnpm lint
```

## File Locations

| What | Where |
|------|-------|
| Page components | `/app/**/page.tsx` |
| Shared components | `/components/cyber/` |
| UI components | `/components/ui/` |
| Types | `/lib/types.ts` |
| Constants | `/lib/constants.ts` |
| Utilities | `/lib/*.ts` |
| Configuration | `/lib/config.ts` |
| Styling | `/app/globals.css` |

## Common Tasks

### Adding a New Page

```typescript
// 1. Create /app/newpage/page.tsx
"use client"

import { CyberSidebar } from "@/components/cyber/sidebar"
import { CyberHeader } from "@/components/cyber/header"

export default function NewPage() {
  return (
    <div className="flex min-h-screen bg-background">
      <CyberSidebar />
      <div className="pl-64 flex-1">
        <CyberHeader />
        <main className="p-6 space-y-6">
          {/* Page content */}
        </main>
      </div>
    </div>
  )
}
```

### Creating a Custom Hook

```typescript
// /lib/hooks.ts
export function useCustomHook(initialValue: string) {
  const [value, setValue] = useState(initialValue)
  
  const handleChange = useCallback((newValue: string) => {
    setValue(newValue)
  }, [])
  
  return { value, handleChange }
}
```

### Using the API Client

```typescript
import { apiClient } from "@/lib/api"
import { ThreatEvent } from "@/lib/types"

const response = await apiClient.get<ThreatEvent[]>("/threats")
if (response.success) {
  const threats = response.data
}
```

### Using the Logger

```typescript
import { logger } from "@/lib/logger"

logger.info("Application started")
logger.warn("Something unusual", { code: 123 })
logger.error("Critical error", error)
```

### Validation

```typescript
import { validations, isValidThreatDescription } from "@/lib/validations"

if (!validations.isValidIP("192.168.1.1")) {
  // Invalid IP
}

if (!isValidThreatDescription(description)) {
  // Invalid description
}
```

### Formatting Data

```typescript
import { formatBytes, formatDateTime, formatConfidence } from "@/lib/format"

formatBytes(1024 * 1024) // "1 MB"
formatDateTime(new Date()) // "Apr 09, 2026 10:30:45"
formatConfidence(0.85) // "85%"
```

### Toast Notifications

```typescript
import { toast } from "sonner"

toast.success("Operation successful")
toast.error("Operation failed")
toast.info("Information")
toast.warning("Warning")
```

## Component Patterns

### Form with Validation

```typescript
"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { validations } from "@/lib/validations"
import { toast } from "sonner"

export function MyForm() {
  const [data, setData] = useState({ ip: "" })
  const [error, setError] = useState("")

  const handleSubmit = () => {
    if (!validations.isValidIP(data.ip)) {
      setError("Invalid IP address")
      toast.error("Invalid IP address")
      return
    }
    
    setError("")
    // Process valid data
  }

  return (
    <div>
      <Input 
        value={data.ip}
        onChange={(e) => setData({ ip: e.target.value })}
        placeholder="Enter IP"
      />
      {error && <p className="text-cyber-red">{error}</p>}
      <Button onClick={handleSubmit}>Submit</Button>
    </div>
  )
}
```

### Data Table with Filtering

```typescript
"use client"

import { useState, useMemo } from "react"
import { useDebounce } from "@/lib/hooks"

export function DataTable({ items }) {
  const [search, setSearch] = useState("")
  const debouncedSearch = useDebounce(search, 300)

  const filtered = useMemo(() => {
    return items.filter(item =>
      item.name.toLowerCase().includes(debouncedSearch.toLowerCase())
    )
  }, [items, debouncedSearch])

  return (
    <div>
      <input 
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search..."
      />
      {filtered.map(item => (
        <div key={item.id}>{item.name}</div>
      ))}
    </div>
  )
}
```

## Environment Variables

### Development
```
NEXT_PUBLIC_ENV=development
LOG_LEVEL=debug
ENABLE_DEBUG_MODE=true
```

### Production
```
NEXT_PUBLIC_ENV=production
LOG_LEVEL=warn
ENABLE_DEBUG_MODE=false
```

## Tailwind CSS Classes

Common utility classes used:

```css
/* Layout */
flex flex-1 items-center justify-between gap-4
grid grid-cols-2 lg:grid-cols-3 gap-4
space-y-6

/* Styling */
bg-card border border-border rounded-md
text-foreground text-muted-foreground
hover:bg-primary/90 transition-colors

/* Responsive */
md:grid-cols-2 lg:grid-cols-3
hidden md:block

/* Spacing */
p-4 px-6 py-4
m-2 mx-auto
gap-4 space-y-2
```

## TypeScript Tips

### Type a React Component

```typescript
import { ReactNode } from "react"

interface Props {
  title: string
  children: ReactNode
  onClick?: () => void
}

export function Component({ title, children, onClick }: Props) {
  return <div onClick={onClick}>{children}</div>
}
```

### Type Event Handlers

```typescript
import { ChangeEvent, FormEvent } from "react"

const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
  const value = e.target.value
}

const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
  e.preventDefault()
}
```

### Union Types

```typescript
type Status = "pending" | "success" | "error"
type Level = "low" | "medium" | "high" | "critical"

const status: Status = "success" // ✅
const status: Status = "invalid" // ❌ Type error
```

## Deployment Commands

### Vercel
```bash
# Deploy with Vercel CLI
vercel deploy --prod
```

### Docker
```bash
# Build
docker build -t cyber-forensics:latest .

# Run
docker run -p 3000:3000 cyber-forensics:latest

# Deploy to registry
docker tag cyber-forensics:latest registry/cyber-forensics:latest
docker push registry/cyber-forensics:latest
```

### Manual
```bash
# Build and start
pnpm build
pnpm start
```

## Debugging

### Enable Debug Logging
```typescript
import { logger } from "@/lib/logger"

logger.setDebugMode(true)
logger.debug("Debug message", { key: "value" })
```

### Performance Profiling
```typescript
import { measurePerformance, measureAsyncPerformance } from "@/lib/logger"

const result = measurePerformance("operation", () => {
  // Expensive operation
})

const result = await measureAsyncPerformance("api-call", async () => {
  // Async operation
})
```

### Browser DevTools

```javascript
// In browser console
// Check config
window.__CONFIG__

// Access logger
window.__LOGGER__

// Performance marks
performance.mark("my-mark")
performance.measure("my-measure", "my-mark")
```

## Common Errors & Solutions

| Error | Solution |
|-------|----------|
| "Cannot find module" | Check import path and file exists |
| "Type 'X' is not assignable to type 'Y'" | Check type definition in `lib/types.ts` |
| "useState not defined" | Add `"use client"` at top of file |
| "Environment variable undefined" | Check `.env.local` file exists |
| "Hydration mismatch" | Wrap date/time in useEffect with null check |
| "Memory leak warning" | Cleanup effects with return function |

## Resources

- [Next.js Docs](https://nextjs.org/docs)
- [React Docs](https://react.dev)
- [TypeScript Docs](https://www.typescriptlang.org/docs/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [shadcn/ui](https://ui.shadcn.com)
- [Lucide Icons](https://lucide.dev)

## Support Contacts

- **Technical Issues**: Check ARCHITECTURE.md
- **Deployment Issues**: Check DEPLOYMENT.md
- **Type/Code Issues**: Check QUICK_REFERENCE.md
- **Production**: Check PRODUCTION_CHECKLIST.md

---

**Last Updated**: April 9, 2026
