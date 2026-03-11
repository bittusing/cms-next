# Interior Design Portfolio Website

A full-stack SEO-friendly portfolio website built with Next.js 14 (App Router), MongoDB, and Tailwind CSS.

## Features

- 🎨 Modern responsive design
- 📱 Mobile-first approach
- 🔐 Secure admin panel
- 🖼️ Image optimization with Cloudinary
- 🚀 SEO optimized (metadata, sitemap, robots.txt)
- ⚡ Fast performance with ISR
- 📊 Admin dashboard with analytics
- 🎭 Hero slider
- 📝 Contact form
- ⭐ Testimonials
- 🏷️ Category filtering

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Database**: MongoDB with Mongoose
- **Styling**: Tailwind CSS
- **Image Storage**: Cloudinary
- **Authentication**: JWT
- **Icons**: React Icons

## Getting Started

### Prerequisites

- Node.js 18+ installed
- MongoDB installed and running
- Cloudinary account (for image uploads)

### Installation

1. Clone the repository and navigate to the project:

```bash
cd interior
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the root directory:

```env
MONGODB_URI=mongodb://localhost:27017/portfolio
NEXTAUTH_SECRET=your-secret-key-here
NEXTAUTH_URL=http://localhost:3000
JWT_SECRET=your-jwt-secret-here
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
```

4. Seed the database with sample data:

```bash
npm run seed
```

This will create:
- 4 categories
- 12 sample projects
- 3 slider items
- 3 testimonials
- 1 admin user (email: admin@portfolio.com, password: admin123)

5. Run the development server:

```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser

## Admin Panel

Access the admin panel at [http://localhost:3000/admin](http://localhost:3000/admin)

**Default credentials:**
- Email: admin@portfolio.com
- Password: admin123

### Admin Features

- Dashboard with statistics
- Manage projects (CRUD)
- Manage categories (CRUD)
- Manage slider images
- Manage testimonials
- View contact form submissions

## Project Structure

```
interior/
├── app/
│   ├── admin/          # Admin panel pages
│   ├── api/            # API routes
│   ├── portfolio/      # Portfolio pages
│   ├── about/          # About page
│   ├── services/       # Services page
│   ├── contact/        # Contact page
│   ├── layout.tsx      # Root layout
│   ├── page.tsx        # Home page
│   ├── globals.css     # Global styles
│   ├── sitemap.ts      # Dynamic sitemap
│   └── robots.ts       # Robots.txt
├── components/         # Reusable components
├── lib/               # Database connection
├── models/            # Mongoose models
├── utils/             # Utility functions
├── scripts/           # Seed script
└── public/            # Static assets
```

## API Routes

### Public Routes
- `GET /api/projects` - Get all projects
- `GET /api/projects/[id]` - Get single project
- `GET /api/categories` - Get all categories
- `GET /api/slider` - Get slider items
- `GET /api/testimonials` - Get testimonials
- `POST /api/contact` - Submit contact form

### Protected Routes (Admin only)
- `POST /api/projects` - Create project
- `PUT /api/projects/[id]` - Update project
- `DELETE /api/projects/[id]` - Delete project
- `POST /api/categories` - Create category
- `PUT /api/categories/[id]` - Update category
- `DELETE /api/categories/[id]` - Delete category
- `POST /api/slider` - Create slider item
- `PUT /api/slider/[id]` - Update slider item
- `DELETE /api/slider/[id]` - Delete slider item
- `POST /api/testimonials` - Create testimonial
- `PUT /api/testimonials/[id]` - Update testimonial
- `DELETE /api/testimonials/[id]` - Delete testimonial
- `GET /api/contact` - Get all contacts
- `DELETE /api/contact/[id]` - Delete contact

### Authentication Routes
- `POST /api/auth/login` - Admin login
- `POST /api/auth/logout` - Admin logout
- `GET /api/auth/session` - Check session

## SEO Features

- Dynamic metadata generation
- OpenGraph tags for social sharing
- Twitter Card metadata
- Automatic sitemap generation
- Robots.txt configuration
- Image alt tags
- Semantic HTML structure

## Performance Optimization

- Next.js Image component for optimized images
- Incremental Static Regeneration (ISR)
- Code splitting
- Lazy loading
- Font optimization

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy

### Other Platforms

Make sure to:
1. Set all environment variables
2. Use MongoDB Atlas for production database
3. Configure Cloudinary for image uploads

## License

MIT

## Support

For issues and questions, please open an issue on GitHub.
