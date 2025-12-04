# MatchCV Frontend

A modern React application built with Vite, React, TypeScript, and Tailwind CSS for AI-powered CV management.

## Prerequisites

- Node.js 18+ and npm
- Backend API running on `http://localhost:5185`

## Getting Started

### Installation

```bash
npm install
```

### Development

Start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:3000`

### Build

Build for production:

```bash
npm run build
```

### Preview Production Build

Preview the production build:

```bash
npm run preview
```

## Project Structure

```
frontend/
├── src/                    # Source files (React components, utilities)
│   ├── components/         # React components
│   ├── api/                # API client configuration
│   └── services/           # Service layer
├── components/             # Shared UI components
├── features/               # Feature-based pages
├── hooks/                  # Custom React hooks
├── lib/                    # Utilities and types
├── routes/                 # Route configuration
├── contexts/               # React contexts
└── app/                    # Global styles
```

## Technology Stack

- **Vite** - Build tool and dev server
- **React 19** - UI library
- **TypeScript** - Type safety
- **React Router** - Client-side routing
- **Tailwind CSS** - Styling
- **TanStack Query** - Data fetching
- **Axios** - HTTP client

## Features

- CV Builder with live editing
- AI-powered CV analysis
- Job matching and search
- CV export to PDF
- Dark/Light theme support

## API Configuration

The application proxies API requests to `http://localhost:5185/api` during development. Make sure your backend is running on this port.

## Path Aliases

- `@/` - Root directory
- `@/api` - API directory (`src/api`)





