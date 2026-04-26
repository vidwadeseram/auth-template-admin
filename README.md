# Auth Template — Admin Panel

Admin dashboard for managing users, roles, and (optionally) tenants. Built with Next.js 16, TypeScript, Tailwind CSS, and shadcn/ui.

**Auto-detects** whether the connected backend is single-tenant or multi-tenant and shows/hides the Tenants section accordingly.

Works with **all 6 backend auth templates** — Python, Rust, Go × single-tenant and multi-tenant.

## Features

- 📊 **Admin Dashboard** — Overview with user/role counts
- 👥 **User Management** — List, search, view users with role and status badges
- 🔑 **Role Management** — View roles with permissions in card grid
- 🏢 **Tenant Management** — List, search, view tenants (MT backends only, auto-detected)
- 🔍 **MT Auto-Detection** — Fetches OpenAPI spec, checks for `/tenants` endpoints
- 📱 **Responsive Sidebar** — Desktop sidebar + mobile sheet navigation
- 🌗 **Dark Mode** — System/theme toggle

## Multi-Tenant Auto-Detection

The admin panel automatically detects if the connected backend supports multi-tenancy by:

1. Fetching the OpenAPI spec at startup
2. Checking if any paths contain `/tenants`
3. Showing/hiding the Tenants navigation section

This means the **same admin template** works with both single-tenant and multi-tenant backends without configuration changes.

## Tech Stack

- **Next.js 16** (App Router, Turbopack)
- **TypeScript** (strict mode)
- **Tailwind CSS v4** + **shadcn/ui**
- **@vidwadeseram/auth-ui-shared** — Shared API client + auth hooks
- **TanStack Query v5** — Server state management

## Getting Started

```bash
git clone https://github.com/vidwadeseram/auth-template-admin.git
cd auth-template-admin
npm install --legacy-peer-deps
```

### Configuration

Create `.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:8001
```

### Development

```bash
npm run dev
```

## Project Structure

```
src/
├── app/
│   ├── (auth)/
│   │   ├── login/                 # Admin login
│   │   ├── forgot-password/       # Forgot password
│   │   └── reset-password/        # Reset password
│   ├── (dashboard)/
│   │   ├── dashboard/             # Admin dashboard
│   │   ├── users/                 # User list + detail
│   │   ├── roles/                 # Role management
│   │   └── tenants/               # Tenant management (MT)
│   ├── layout.tsx
│   └── page.tsx                   # Redirect to /dashboard
├── components/
│   ├── auth-guard.tsx             # Route protection
│   ├── sidebar.tsx                # Conditional MT sidebar
│   ├── mobile-nav.tsx             # Mobile nav
│   ├── providers.tsx              # Providers
│   └── ui/                        # shadcn/ui
└── lib/
    └── utils.ts
```

## Pages

| Route | Description | MT Only |
|-------|-------------|:-------:|
| `/dashboard` | Admin overview | ❌ |
| `/users` | User list with search | ❌ |
| `/users/[id]` | User detail | ❌ |
| `/roles` | Role list with permissions | ❌ |
| `/tenants` | Tenant list with search | ✅ |
| `/tenants/[id]` | Tenant detail | ✅ |
| `/login` | Admin login | ❌ |

## Related Repositories

### Frontend Templates
- [auth-ui-shared](https://github.com/vidwadeseram/auth-ui-shared) — Shared npm package
- [auth-template-landing](https://github.com/vidwadeseram/auth-template-landing) — Landing page
- [auth-template-client](https://github.com/vidwadeseram/auth-template-client) — User dashboard
- [auth-template-superadmin](https://github.com/vidwadeseram/auth-template-superadmin) — Superadmin panel

### Backend Templates
- [python-auth-template](https://github.com/vidwadeseram/python-auth-template)
- [python-multi-tenant-auth-template](https://github.com/vidwadeseram/python-multi-tenant-auth-template)
- [rust-auth-template](https://github.com/vidwadeseram/rust-auth-template)
- [rust-multi-tenant-auth-template](https://github.com/vidwadeseram/rust-multi-tenant-auth-template)
- [go-auth-template](https://github.com/vidwadeseram/go-auth-template)
- [go-multi-tenant-auth-template](https://github.com/vidwadeseram/go-multi-tenant-auth-template)

## License

MIT
