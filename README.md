# CyberForensics AI - Security Intelligence Platform

Advanced cyber security forensics platform with AI-powered threat detection, network vulnerability scanning, behavioral analytics, and real-time monitoring.

## Features

### Core Modules

- **Dashboard** - Real-time security overview with threat activity, risk scores, and system health
- **Network Vulnerability Scanner** - Scan networks for open ports, services, and security vulnerabilities
- **Threat Detection** - Real-time threat monitoring with rule-based and ML detection
- **Data Analytics** - Traffic analysis, attack patterns, and security metrics
- **Behavior Analytics** - AI-powered user profiling and anomaly detection
- **AI Models** - Attack prediction and risk classification models
- **Log Forensics** - Searchable log viewer with filtering and analysis tools
- **Settings** - Comprehensive configuration for monitoring modes, alerts, and integrations

### Key Capabilities

- Real-time threat monitoring and alerts
- Multiple detection methods (rule-based, ML, behavioral)
- Network scanning and vulnerability assessment
- User behavior analysis with K-means clustering
- Customizable monitoring modes (Passive, Standard, Aggressive)
- Manual threat and log entry creation
- Search and filtering across logs, IPs, and users
- Local storage persistence for settings
- Dark theme with cyberpunk aesthetic

## Tech Stack

- **Framework**: Next.js 16 with App Router
- **UI**: React 19 with shadcn/ui components
- **Styling**: Tailwind CSS 4
- **State Management**: React hooks
- **Charts**: Recharts
- **Icons**: Lucide React
- **Notifications**: Sonner
- **Type Safety**: TypeScript

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm (recommended) or npm

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd cyber-forensics-platform
```

2. Install dependencies
```bash
pnpm install
```

3. Set up environment variables
```bash
cp .env.example .env.local
```

4. Start development server
```bash
pnpm dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
├── app/
│   ├── page.tsx                 # Dashboard
│   ├── scanner/page.tsx         # Network Scanner
│   ├── threats/page.tsx         # Threat Detection
│   ├── analytics/page.tsx       # Data Analytics
│   ├── behavior/page.tsx        # Behavior Analytics
│   ├── models/page.tsx          # AI Models
│   ├── logs/page.tsx            # Log Viewer
│   ├── settings/page.tsx        # Settings
│   └── layout.tsx               # Root layout
├── components/
│   ├── cyber/                   # Platform-specific components
│   └── ui/                      # shadcn/ui components
├── lib/
│   ├── types.ts                 # Type definitions
│   ├── constants.ts             # Constants and enums
│   ├── data.ts                  # Mock data generators
│   ├── config.ts                # Configuration
│   ├── validations.ts           # Input validation utilities
│   ├── format.ts                # Data formatting utilities
│   ├── hooks.ts                 # Custom React hooks
│   └── utils.ts                 # General utilities
└── public/                      # Static assets
```

## Configuration

### Environment Variables

See `.env.example` for all available configuration options.

Key variables:
- `NEXT_PUBLIC_ENV` - Environment (development/production/staging)
- `NEXT_PUBLIC_API_URL` - API base URL
- `LOG_LEVEL` - Logging level (debug/info/warn/error)
- `ENABLE_DEBUG_MODE` - Enable debug logging

### Monitoring Modes

Three monitoring levels available in Settings:

1. **Passive** - Low sensitivity, minimal CPU usage
2. **Standard** - Balanced detection and performance
3. **Aggressive** - High sensitivity, maximum detection

## Usage

### Creating Threats Manually

1. Navigate to Threats page
2. Click "Create Threat" button
3. Fill in source IP, target, threat type, severity, and description
4. Click "Create Threat"

### Running Network Scans

1. Navigate to Network Scanner
2. Enter target IP or hostname
3. Click "Start Scan"
4. View results in real-time

### Searching Logs

1. Navigate to Logs page
2. Use the search bar with dropdown to filter by:
   - All (default)
   - Logs (message, category)
   - IP addresses
   - Usernames

### Configuring Settings

1. Navigate to Settings
2. Choose monitoring level
3. Enable/disable features as needed
4. Click "Save Settings"

## Data Persistence

- Settings are saved to browser's localStorage
- Search history is maintained during session
- Configuration persists across page refreshes

## Performance Optimization

- Component-level code splitting
- Optimized renders with React.memo where needed
- Debounced search queries
- Efficient state management
- Lazy loading of heavy components

## Security Considerations

- Input validation for all user submissions
- XSS protection through React's built-in escaping
- CORS configuration for API requests
- Session timeout after 30 minutes of inactivity
- Secure storage of API keys in environment variables

## API Integration Ready

The platform is structured for easy API integration:

1. Replace mock data generators in `lib/data.ts` with API calls
2. Use `useAsyncOperation` hook for API calls with error handling
3. Implement proper authentication and authorization
4. Add request/response interceptors for API client

## Deployment

### Vercel (Recommended)

```bash
# Push to GitHub and connect to Vercel
# Automatic deployment on push to main branch
```

### Docker

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY . .
RUN pnpm install
RUN pnpm build
CMD ["pnpm", "start"]
```

### Manual Deployment

```bash
pnpm build
pnpm start
```

## Contributing

1. Create a feature branch
2. Make your changes
3. Test thoroughly
4. Submit a pull request

## License

Proprietary - All rights reserved

## Support

For issues and feature requests, create an issue in the repository.

## Roadmap

- [ ] Backend API implementation
- [ ] Database integration (PostgreSQL)
- [ ] User authentication and authorization
- [ ] Real-time WebSocket updates
- [ ] Advanced ML threat prediction
- [ ] Multi-tenant support
- [ ] Mobile app
- [ ] API documentation and SDKs
