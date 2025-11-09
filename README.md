# Tea Shop

## Features

### Pages
1. **Home Page** - Grid layout showcasing all available teas
2. **Tea Detail Page** - Dynamic route showing individual tea information
3. **Tea Rules Page** - Static page (SSG) with brewing guidelines
4. **Favorites Page** - Displays user's liked teas with an info modal


## Tech Stack

### Frontend
- **Next.js 15**
- **React 19** 
- **SCSS Modules** 
- **TypeScript** 

### Backend
- **Next.js API Routes**
- **TypeORM** 
- **PostgreSQL**
- **Cookie-based** 


## Getting Started

### Option 1: Docker (Recommended)

The easiest way to run the project:

```bash
# Start everything with Docker Compose
docker-compose up -d

# Or in development mode with hot reload
docker-compose --profile dev up app-dev
```

Visit [http://localhost:3000](http://localhost:3000) (production) or [http://localhost:3001](http://localhost:3001) (dev).


### Option 2: Local Development

#### Prerequisites
- Node.js 18+
- PostgreSQL database
- Yarn package manager

#### Installation

1. Clone the repository and install dependencies:
```bash
yarn install
```

2. Set up your database credentials in `.env.local`:
```env
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USER=postgres
DATABASE_PASSWORD=postgres
DATABASE_NAME=teashop
```

3. Create the PostgreSQL database:
```bash
createdb teashop
```

4. Run the development server:
```bash
yarn dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

The database will automatically initialize and seed with sample data on first run.


## Project Structure

```
├── app/
│   ├── actions/          # Server actions
│   ├── favorites/        # Favorites page
│   ├── tea/[id]/         # Dynamic tea detail page
│   ├── tea-rules/        # Static SSG page
│   ├── layout.tsx        # Root layout with navbar
│   ├── page.tsx          # Home page
│   ├── error.tsx         # Error boundary
│   └── loading.tsx       # Loading state
├── components/
│   ├── Navbar.tsx        # Navigation component
│   ├── TeaCard.tsx       # Tea display card
│   ├── LikeButton.tsx    # Like button with useOptimistic
│   ├── Modal.tsx         # Portal-based modal
│   └── FavoritesInfo.tsx # Info modal component
├── entities/
│   ├── Tea.ts            # Tea entity
│   └── StaticPage.ts     # Static page entity
├── lib/
│   ├── db.ts             # Database connection
│   └── seed.ts           # Database seeding
└── ormconfig.ts          # TypeORM configuration
```


## Scripts

```bash
yarn dev       # Start development server with Turbopack
yarn build     # Build for production
yarn start     # Start production server
yarn lint      # Run ESLint
```

## License

MIT
