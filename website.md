# BVK Radnički Water Polo Club - Web Application Blueprint

## 1. Project Breakdown

**App Name:** BVK Radnički Water Polo Hub  
**Platform:** Web application (responsive)  

**Summary:**  
The BVK Radnički Water Polo Hub is a comprehensive web platform designed to centralize all club information, streamline communication, and enhance engagement for players, staff, and fans. The application will serve as the digital home for the water polo club, providing real-time updates, schedules, team information, and match results through an intuitive interface.

**Primary Use Case:**  
- Club members can access training schedules and match information  
- Staff can manage and update club information  
- Fans can follow team news and results  
- Players can view their roster details and performance statistics  

**Authentication Requirements:**  
- Google OAuth integration for club members and staff  
- Guest access with limited functionality (view-only mode)  
- Role-based access control (admin, staff, player, guest)  

## 2. Tech Stack Overview

**Frontend:**  
- React + Next.js (App Router) for SSR and optimized performance  
- TypeScript for type safety  

**UI Components:**  
- Tailwind CSS for utility-first styling  
- ShadCN for accessible, customizable UI components  

**Backend Services:**  
- Supabase for:  
  - PostgreSQL database (players, staff, matches)  
  - Authentication (Google OAuth)  
  - Real-time updates for match results  
  - Storage for PDF imports  

**Integration:**  
- Google Calendar API for training/match schedules  

**Deployment:**  
- Vercel for seamless Next.js deployment with edge functions  

## 3. Core Features

**1. Authentication System**  
- Google OAuth login flow  
- Guest mode with restricted access  
- Session management  

**2. News Module**  
- Admin-managed news posts  
- Rich text editing capabilities  
- Image upload support  

**3. Roster Management**  
- Player profiles with:  
  - Bio information  
  - Statistics  
  - Position details  
- PDF import functionality for initial data load  

**4. Staff Directory**  
- Coaching staff profiles  
- Support staff information  
- Contact details  

**5. Training Sessions**  
- Google Calendar integration  
- Weekly/monthly views  
- Session details (location, focus areas)  

**6. Matches Section**  
- Upcoming fixtures with opponent details  
- Past match results  
- Score reporting (admin-only)  

**7. Standings & Results**  
- Interactive league table  
- Match result archive  
- Real-time score updates  

## 4. User Flow

1. **Entry Point:**  
   - User lands on login page  
   - Chooses between Google login or guest access  

2. **Guest Flow:**  
   - View news section  
   - Access read-only roster and staff information  
   - See training schedules and match fixtures  
   - View standings and past results  

3. **Member Flow (additional capabilities):**  
   - Personalized dashboard  
   - Training attendance tracking  
   - Match statistics (for players)  

4. **Admin Flow:**  
   - Content management interface  
   - Data import/export tools  
   - Match result input system  

## 5. Design & UI/UX Guidelines

**Visual Identity:**  
- Primary color: Aquatic blue (#00A0B0)  
- Secondary color: Team red (#E74C3C)  
- Clean, sport-focused aesthetic  

**Layout Principles:**  
- Mobile-first responsive design  
- Card-based content organization  
- Consistent navigation header  

**Key Components:**  
- ShadCN-based:  
  - Data tables for rosters and standings  
  - Calendar component for schedules  
  - Accordions for player/staff details  
  - Toast notifications for updates  

**Accessibility:**  
- WCAG 2.1 AA compliance  
- Proper contrast ratios  
- Keyboard navigable interface  

## 6. Technical Implementation

**1. Authentication Setup:**  
```typescript
// Using Supabase Auth with Next.js
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

// Google OAuth provider
const { data, error } = await supabase.auth.signInWithOAuth({
  provider: 'google',
})
```

**2. PDF Data Import:**  
- Use Supabase Storage for PDF upload  
- Implement serverless function to parse PDF data  
- Map to structured database tables  

**3. Google Calendar Integration:**  
```typescript
// Next.js API route for calendar events
export async function GET() {
  const calendar = google.calendar({
    version: 'v3',
    auth: process.env.GOOGLE_API_KEY
  })
  
  const res = await calendar.events.list({
    calendarId: 'club_calendar_id',
    timeMin: new Date().toISOString(),
    maxResults: 10,
    singleEvents: true,
    orderBy: 'startTime',
  })
  
  return NextResponse.json(res.data.items)
}
```

**4. Real-time Standings:**  
- Supabase real-time subscriptions for score updates  
- Optimistic UI updates for immediate feedback  

**5. Component Architecture:**  
- Atomic design pattern:  
  - Atoms: Buttons, inputs  
  - Molecules: Player cards, match items  
  - Organisms: Roster table, standings view  
  - Templates: Page layouts  
  - Pages: Composed views  

## 7. Development Setup

**Requirements:**  
- Node.js v18+  
- Supabase account  
- Google Cloud project for OAuth and Calendar API  

**Setup Instructions:**  

1. Clone repository:  
```bash
git clone https://github.com/bvk-radnicki/web-app.git
cd web-app
```

2. Install dependencies:  
```bash
npm install
```

3. Environment setup:  
```bash
cp .env.example .env.local
# Fill in Supabase and Google API credentials
```

4. Database setup:  
- Run Supabase migration scripts  
- Set up tables: users, players, staff, matches, news  

5. Run development server:  
```bash
npm run dev
```

**Deployment:**  
1. Connect Vercel to GitHub repository  
2. Set environment variables in Vercel dashboard  
3. Enable automatic deployments on main branch  

**CI/CD:**  
- Pre-commit hooks with Husky for linting  
- Vercel preview deployments for PRs  
- Automated testing with Jest and React Testing Library