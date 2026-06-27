# 🎬 FDC

> A film discovery tool inspired by [Letterboxd](https://letterboxd.com) & [Moctale](https://moctale.com).  
Discover, log, and rate films on your own terms.  
> 🌐 **[Live Site →](https://fdc-opal.vercel.app/)**

---

## What is this?

FDC is a personal film discovery and logging app. Browse films, track what you've watched, and rate them using a **vibe-based rating system** ,because not everything fits neatly into five stars.

---

## Stack

Next.js 16 · TypeScript · PostgreSQL · Prisma 7 · NextAuth v5 (Google OAuth) · Tailwind CSS v4

---

## Quick Start

```bash
git clone https://github.com/53rao/DBS-miniproject.git
cd DBS-miniproject
npm install
```

Create a `.env` file:

```env
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE"
AUTH_SECRET="your-secret"
AUTH_GOOGLE_ID="your-google-client-id"
AUTH_GOOGLE_SECRET="your-google-client-secret"
```

```bash
npx prisma migrate dev --name init
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

*Built as a DBS mini project.*