# Next.js Portfolio Migration

This project is a modern migration of the original HTML/CSS portfolio to Next.js, using standard best practices and a premium UI kit (Shadcn UI + Framer Motion).

## Features
- **Modern Stack**: Next.js 14 (App Router), TypeScript, Tailwind CSS.
- **UI Components**: Shadcn UI (accessible, customizable).
- **Animations**: Framer Motion (3D Tilt, Staggered Fade-in, Infinite Marquee).
- **Theming**: Dark mode support via `next-themes`.
- **Performance**: Optimized images, code splitting, static generation.

## Setup
1. Install dependencies:
   ```bash
   npm install
   ```
2. Run development server:
   ```bash
   npm run dev
   ```
3. Build for production:
   ```bash
   npm run build
   ```

## Project Structure
- `src/components`: Reusable UI components (Navbar, Hero, Projects, etc.).
- `src/app`: Pages and layout.
- `public/img`: Project images.
- `src/lib/utils.ts`: Utility functions.

## Customization
- **Colors**: Brand colors are defined in `src/app/globals.css` under `:root` and `@theme`.
- **Content**: Edit individual components in `src/components` to update text/links.
