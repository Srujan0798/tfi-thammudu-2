# TFI Timeline

A modern, AI-powered calendar and timeline application for the Telugu Film Industry (TFI).

## 🎬 Features

- **Smart Calendar** - Track movie releases, birthdays, and TFI events
- **AI Assistant** - Powered by Google Gemini for intelligent recommendations
- **Social Platform** - Follow creators, comment, and react to events
- **PWA Support** - Install on mobile, works offline
- **Real-time Updates** - Live notifications and event updates
- **Gamification** - Points, badges, and leaderboards

## 🚀 Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Database:** PostgreSQL (Supabase)
- **ORM:** Prisma
- **Validation:** Zod
- **Styling:** Tailwind CSS
- **State:** React Query + Context API
- **Auth:** Supabase Auth
- **AI:** Google Gemini
- **Hosting:** Vercel

## � Installation

```bash
# Clone repository
git clone https://github.com/your-username/tfi-timeline.git
cd tfi-timeline

# Install dependencies
npm install

# Setup environment variables
cp .env.example .env.local
# Fill in your actual values in .env.local

# Generate Prisma client
npx prisma generate

# Sync database schema
npx prisma db push

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🔧 Environment Variables

See `.env.example` for required environment variables.

**Required:**
- `NEXT_PUBLIC_SUPABASE_URL` - Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Supabase anon key
- `DATABASE_URL` - PostgreSQL connection string
- `GEMINI_API_KEY` - Google Gemini API key

**Optional:**
- `STRIPE_SECRET_KEY` - For payments
- `RESEND_API_KEY` - For emails
- `TMDB_API_KEY` - For movie data

## 📚 Documentation

- [Deployment Guide](./DEPLOYMENT.md) - How to deploy to production
- [Golden Stack Quickstart](./GOLDEN_STACK_QUICKSTART.md) - Using Prisma & Zod
- [Tech Stack Details](./tech_stack.md) - Complete architecture overview

## 🛠️ Development

```bash
# Run dev server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linting
npm run lint

# Prisma commands
npm run prisma:generate  # Generate client
npm run prisma:push      # Push schema to DB
npm run prisma:pull      # Pull schema from DB
npm run prisma:studio    # Open Prisma Studio

# Seed database
npm run seed-events
```

## 🚀 Deployment

Deploy to Vercel with one click:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/your-username/tfi-timeline)

Or follow the [Deployment Guide](./DEPLOYMENT.md) for detailed instructions.

## 📱 PWA

This app is a Progressive Web App (PWA):
- Install on mobile devices
- Works offline
- Push notifications
- Fast loading

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## � License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- Telugu Film Industry for inspiration
- Supabase for backend infrastructure
- Google Gemini for AI capabilities
- Vercel for hosting

## � Support

For support, email support@tfitimeline.com or open an issue on GitHub.

---

**Built with ❤️ for TFI fans worldwide 🎬**
