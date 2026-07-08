# Architecture Documentation

Comprehensive architecture guide for the CyberForensics AI Platform.

## Overview

CyberForensics AI is a modern, scalable security intelligence platform built with Next.js 16, React 19, and TypeScript. The architecture follows industry best practices with separation of concerns, type safety, and production-ready patterns.

## System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        Client Layer                          │
│  (Next.js App Router, React Components, State Management)    │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       ├── API Calls (fetch/axios)
                       ├── Local Storage
                       └── Real-time Updates (future: WebSocket)
                       │
┌──────────────────────┴──────────────────────────────────────┐
│                      Server Layer                            │
│        (API Routes, Authentication, Authorization)          │
└──────────────────────┬──────────────────────────────────────┘
                       │
        ┌──────────────┼──────────────┐
        │              │              │
┌───────▼────┐  ┌──────▼────┐  ┌────▼──────┐
│  Database  │  │  External │  │  Cache    │
│(PostgreSQL)│  │  Services │  │  (Redis)  │
└────────────┘  └───────────┘  └───────────┘
```

## Directory Structure

### `/app` - Page Components
```
/app
├── page.tsx                 # Dashboard (index route)
├── scanner/page.tsx         # Network Vulnerability Scanner
├── threats/page.tsx         # Threat Detection
├── analytics/page.tsx       # Data Analytics
├── behavior/page.tsx        # Behavior Analytics
├── models/page.tsx          # AI Models
├── logs/page.tsx            # Log Forensics Viewer
├── settings/page.tsx        # Configuration
└── layout.tsx               # Root layout
```

### `/components` - React Components
```
/components
├── cyber/
│   ├── sidebar.tsx          # Navigation sidebar
│   ├── header.tsx           # Page header with time/alerts
│   ├── stats-cards.tsx      # Dashboard statistics
│   ├── threat-chart.tsx     # Threat analytics chart
│   ├── alerts-panel.tsx     # Real-time alerts
│   ├── network-status.tsx   # Network health
│   ├── risk-score.tsx       # Risk assessment gauge
│   └── live-logs.tsx        # Live log streaming
└── ui/                      # shadcn/ui components
```

### `/lib` - Utilities & Logic
```
/lib
├── types.ts                 # Type definitions
├── constants.ts             # Application constants
├── config.ts                # Configuration management
├── data.ts                  # Mock data generators
├── hooks.ts                 # Custom React hooks
├── validations.ts           # Input validation
├── format.ts                # Data formatting utilities
├── api.ts                   # API client
└── logger.ts                # Logging utility
```

## Data Flow Architecture

### Page Load Flow
```
1. Next.js Router
   └─> Layout.tsx (Global context/providers)
       └─> Page Component
           ├─> Fetch initial data (API or mock)
           ├─> Initialize state (useState)
           ├─> Set up effects (useEffect)
           └─> Render UI
```

### Data Management Flow
```
Component Props
  ↓
Local State (useState)
  ↓
Custom Hooks (useLocalStorage, useAsyncOperation)
  ↓
Local Storage / API
  ↓
Component Re-render
```

### State Management Layers

1. **Local Component State** - Single component concerns
2. **Custom Hooks** - Shared logic between components
3. **Context (Future)** - Global state like auth
4. **localStorage** - Persistence across sessions
5. **Backend API (Future)** - Server-side state

## Component Architecture

### Page Components Pattern
```typescript
export default function PageName() {
  // 1. State Management
  const [data, setData] = useState(initialValue)
  const [loading, setLoading] = useState(false)
  
  // 2. Effects
  useEffect(() => {
    // Fetch or initialize data
  }, [])
  
  // 3. Event Handlers
  const handleAction = () => { /* ... */ }
  
  // 4. Render
  return (
    <div>
      <CyberSidebar />
      <div className="pl-64">
        <CyberHeader />
        <main className="p-6">
          {/* Page content */}
        </main>
      </div>
    </div>
  )
}
```

### Feature Components Pattern
```typescript
interface Props {
  data: DataType
  onAction: (value: string) => void
  isLoading?: boolean
}

export function FeatureComponent({ data, onAction, isLoading }: Props) {
  const [localState, setLocalState] = useState("")
  
  return (
    <div>
      {/* Component JSX */}
    </div>
  )
}
```

## Type System

### Core Types
```typescript
// Domain Models
type ThreatEvent = { /* ... */ }
type LogEntry = { /* ... */ }
type ScanResult = { /* ... */ }

// API Types
type ApiResponse<T> = { /* ... */ }
type PaginatedResponse<T> = { /* ... */ }

// UI State Types
type LoadingState = "idle" | "loading" | "success" | "error"
```

## Configuration Management

### Environment Variables
```
Development: .env.development.local
Production: .env.production.local
Test: .env.test.local
```

### Config Resolution Order
1. Environment variables
2. `lib/config.ts` (with defaults)
3. Feature flags
4. Application constants

## Error Handling Strategy

### Client-Side
```typescript
try {
  const data = await fetchData()
} catch (error) {
  logger.error("Failed to fetch", error)
  toast.error("Operation failed")
}
```

### Error Boundary
```typescript
<ErrorBoundary fallback={<ErrorFallback />}>
  <Page />
</ErrorBoundary>
```

### User Feedback
- Toast notifications for user actions
- Console logging for developers
- Error tracking for monitoring

## Performance Optimization

### Code Splitting
- Next.js App Router automatic code splitting
- Dynamic imports for heavy components
- Route-based splitting by page

### Rendering Optimization
- Memoization for expensive computations
- React.memo for stable components
- Debounced search/filter operations

### Caching Strategy
```
Browser Cache
  └─> (Static assets: images, fonts)
Local Storage
  └─> (User settings, preferences)
In-Memory Cache
  └─> (Component state, derived data)
```

## API Integration Pattern

### For Future Backend Integration

```typescript
// 1. Define API client
const apiClient = new ApiClient(config.api.baseUrl)

// 2. Create data fetching hooks
function useThreats() {
  return useAsyncOperation(() => apiClient.get<ThreatEvent[]>("/threats"))
}

// 3. Use in components
function ThreatsPage() {
  const { data: threats, loading, error } = useThreats()
  // Render UI
}
```

## Security Architecture

### Input Validation
- Form validation on submit
- Type validation with TypeScript
- Sanitization of user input

### Data Protection
- XSS prevention through React escaping
- CSRF tokens for state-changing operations
- Secure storage of sensitive data

### Authentication Flow (Future)
```
1. User Login
   └─> Authentication Server
       └─> JWT Token
           └─> Store in secure cookie
               └─> Include in API requests
```

## Scaling Considerations

### Horizontal Scaling
- Stateless components
- No server-side sessions
- Local storage for user preferences
- API calls for shared data

### Vertical Scaling
- Code splitting for faster loads
- Lazy loading of components
- Image optimization
- Caching strategies

### Data Scaling
- Pagination for large datasets
- Virtual scrolling for lists
- Efficient filtering/searching
- Database query optimization

## Deployment Architecture

### Development
```
Local Machine
  └─> Next.js Dev Server (http://localhost:3000)
      └─> Hot reload on file changes
```

### Production
```
GitHub
  └─> Vercel (Recommended)
      ├─> Automatic deployments
      ├─> Edge caching
      └─> Auto-scaling
```

### Docker Deployment
```
Dockerfile (multi-stage build)
  ├─> Dependencies stage
  ├─> Builder stage
  └─> Production stage
      └─> Docker registry
          └─> Kubernetes/Cloud deployment
```

## Monitoring & Observability

### Logging Strategy
```
Client Logs
  └─> Development: Console output
  └─> Production: Sentry/Datadog

Server Logs
  └─> Application logs
  └─> Request/response logs
  └─> Error tracking
```

### Performance Monitoring
- Web Vitals tracking
- Custom performance metrics
- Error rate monitoring
- Uptime monitoring

### User Analytics
- Page view tracking
- Feature usage
- User journeys
- Conversion funnels

## Future Enhancements

### Phase 2
- [ ] Backend API implementation
- [ ] PostgreSQL database
- [ ] User authentication
- [ ] Real-time WebSocket updates

### Phase 3
- [ ] Advanced ML models
- [ ] Multi-tenant support
- [ ] Custom dashboards
- [ ] Report generation

### Phase 4
- [ ] Mobile application
- [ ] API webhooks
- [ ] Third-party integrations
- [ ] Machine learning operations (MLOps)

## Best Practices

### Code Quality
1. Always use TypeScript
2. No any types without `// @ts-ignore` comment
3. Use semantic HTML
4. Follow accessibility guidelines
5. Write self-documenting code

### Component Development
1. Single responsibility
2. Prop drilling avoided with hooks
3. Error boundaries for feature modules
4. Consistent naming conventions

### State Management
1. Keep state as close to usage as possible
2. Use custom hooks for logic sharing
3. Avoid unnecessary re-renders
4. Persist important state to localStorage

### Testing (Future)
1. Unit tests for utilities
2. Integration tests for features
3. E2E tests for workflows
4. Accessibility tests

## References

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS](https://tailwindcss.com)
