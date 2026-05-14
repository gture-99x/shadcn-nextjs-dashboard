# Modern Next.js Dashboard with shadcn/ui

A modern, responsive dashboard application built with Next.js 14, TypeScript, and shadcn/ui components. This project implements best practices for building scalable web applications with a beautiful UI/UX.

![Dashboard](https://shadcn-nextjs-dashboard.vercel.app/og-image.png)

## 🚀 Features

- **Modern Tech Stack**: Built with Next.js 14, TypeScript, and Tailwind CSS
- **Beautiful UI Components**: Utilizes shadcn/ui for consistent and customizable components
- **Authentication Ready**: Prepared authentication routes and components
- **Dashboard Layout**: Professional dashboard layout with sidebar navigation
- **Responsive Design**: Mobile-first approach ensuring great UX across all devices
- **Type Safety**: Full TypeScript support for better development experience
- **Performance Optimized**: Built with performance best practices

## 📦 Prerequisites

- Node.js 18.17 or later
- npm or yarn package manager

## 🛠️ Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/naveenda/shacn-nextjs-dashboard.git
   cd shacn-nextjs-dashboard
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📁 Project Structure

```
├── app/
│   ├── (auth)/        # Authentication related pages
│   ├── (dashboard)/   # Dashboard pages and layouts
│   └── layout.tsx     # Root layout
├── components/
│   ├── ui/           # shadcn/ui components
│   └── shared/       # Shared components
├── lib/
│   ├── types/        # TypeScript types/interfaces
│   └── utils/        # Utility functions
└── public/
    └── images/       # Static images
```

## 🎨 Customization

This project uses shadcn/ui components which are fully customizable. You can modify the theme in:
- `app/globals.css` - For global styles
- `components.json` - For component configurations

## 📊 Analytics (PostHog) + Claude Code MCP

This project ships with [PostHog](https://posthog.com) for client-side user behavior analytics. Once data is flowing, you can connect Claude Code to PostHog's MCP server and query your analytics in natural language.

### 1. Configure environment variables

Copy `.env.local.example` to `.env.local` and fill in:

```bash
NEXT_PUBLIC_POSTHOG_KEY=phc_xxx
NEXT_PUBLIC_POSTHOG_HOST=https://us.i.posthog.com  # or https://eu.i.posthog.com
```

Grab the project API key from your PostHog project settings.

### 2. Configure GitHub Pages deploy

Add these repository secrets under **Settings → Secrets and variables → Actions**:

- `POSTHOG_KEY` — your PostHog project API key
- `POSTHOG_HOST` — `https://us.i.posthog.com` or `https://eu.i.posthog.com`

They are inlined into the static bundle at build time by `.github/workflows/deploy-github-pages.yml`.

### 3. What's tracked out of the box

- `$pageview` — fired on every client-side route change
- `$pageleave` — fired when users leave a page
- Autocapture — clicks, form submissions, and rage clicks (default PostHog behavior)
- Custom events:
  - `dashboard_viewed` — when the main dashboard mounts
  - `theme_toggled` — when the user changes the theme
  - `settings_saved` — when the profile form is submitted

### 4. Wire up Claude Code (MCP)

Once you have data flowing, register PostHog's MCP server in Claude Code:

```bash
npx @posthog/wizard mcp add
```

This walks through OAuth and registers `https://mcp.posthog.com/mcp` (auto-routes US/EU). The MCP server is free and does not count against your event quota.

After that you can ask Claude Code things like:

- "What pages are users spending the most time on this week?"
- "Build a funnel from `/login` → `/dashboard` → `settings_saved`."
- "Show me retention for users who fired `dashboard_viewed`."
- "Which dashboard route has the highest bounce rate?"

## 📚 Documentation

For detailed documentation about the used technologies:

- [Next.js Documentation](https://nextjs.org/docs)
- [shadcn/ui Documentation](https://ui.shadcn.com)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## ✅ Improvement Checklist

### 📈 Basic Improvements
- [ ] Add live demo link to deployment
- [ ] Create proper screenshots/GIFs showcasing key features
- [ ] Fix repository name typo in clone command (shacn → shadcn)
- [ ] Add badges (build status, license, version, stars)
- [ ] Include code coverage metrics

### 🚀 Technical Enhancements
- [ ] Add proper authentication implementation (NextAuth.js)
- [ ] Implement database integration (Prisma + PostgreSQL/SQLite)
- [ ] Add real data visualization components (charts/graphs)
- [ ] Implement search functionality across dashboard
- [ ] Add data export features (CSV, PDF)
- [ ] Integrate with external APIs for dynamic content

### 🎨 UI/UX Improvements
- [ ] Add dark/light mode toggle implementation
- [ ] Create loading states and skeletons
- [ ] Implement proper error boundaries and error pages
- [ ] Add animations and micro-interactions
- [ ] Improve mobile responsiveness
- [ ] Add accessibility features (ARIA labels, keyboard navigation)

### 📚 Documentation & Developer Experience
- [ ] Add comprehensive component documentation
- [ ] Create Storybook for component library
- [ ] Add API documentation
- [ ] Include deployment guides (Vercel, Netlify, Docker)
- [ ] Add contributing guidelines
- [ ] Create issue and PR templates

### 🧪 Testing & Quality
- [ ] Add unit tests (Jest/Vitest + Testing Library)
- [ ] Implement E2E tests (Playwright/Cypress)
- [ ] Add ESLint and Prettier configuration
- [ ] Set up pre-commit hooks (Husky)
- [ ] Add GitHub Actions for CI/CD
- [ ] Include performance monitoring

### 🔧 Advanced Features
- [ ] Add multi-language support (i18n)
- [ ] Implement real-time notifications
- [ ] Add role-based access control
- [ ] Create admin panel functionality
- [ ] Add email templates and notifications
- [ ] Implement file upload/management system

### 📦 Production Ready
- [ ] Environment variable configuration
- [ ] Add proper logging system
- [ ] Implement monitoring and analytics
- [ ] Add proper SEO optimization
- [ ] Create production Docker setup
- [ ] Add security headers and CSRF protection

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
