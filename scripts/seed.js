const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/portfolio';

// Define schemas
const categorySchema = new mongoose.Schema({
  name: String,
  slug: String,
});

const projectSchema = new mongoose.Schema({
  title: String,
  slug: String,
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
  images: [String],
  description: String,
  location: String,
  clientName: String,
  year: Number,
  createdAt: Date,
});

const sliderSchema = new mongoose.Schema({
  image: String,
  title: String,
  subtitle: String,
  order: Number,
});

const testimonialSchema = new mongoose.Schema({
  name: String,
  text: String,
  image: String,
});

const adminSchema = new mongoose.Schema({
  email: String,
  password: String,
});

const Category = mongoose.models.Category || mongoose.model('Category', categorySchema);
const Project = mongoose.models.Project || mongoose.model('Project', projectSchema);
const Slider = mongoose.models.Slider || mongoose.model('Slider', sliderSchema);
const Testimonial = mongoose.models.Testimonial || mongoose.model('Testimonial', testimonialSchema);
const Admin = mongoose.models.Admin || mongoose.model('Admin', adminSchema);

async function seed() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing data
    await Promise.all([
      Category.deleteMany({}),
      Project.deleteMany({}),
      Slider.deleteMany({}),
      Testimonial.deleteMany({}),
      Admin.deleteMany({}),
    ]);
    console.log('Cleared existing data');

    // Create categories
    const categories = await Category.insertMany([
      { name: 'Residential', slug: 'residential' },
      { name: 'Commercial', slug: 'commercial' },
      { name: 'Hospitality', slug: 'hospitality' },
      { name: 'Retail', slug: 'retail' },
    ]);
    console.log('Created categories');

    // Create projects
    const projects = [];
    const projectData = [
      { title: 'Modern Living Room', location: 'New York', client: 'John Doe', year: 2023 },
      { title: 'Luxury Bedroom Suite', location: 'Los Angeles', client: 'Jane Smith', year: 2023 },
      { title: 'Contemporary Kitchen', location: 'Chicago', client: 'Bob Johnson', year: 2022 },
      { title: 'Office Space Design', location: 'San Francisco', client: 'Tech Corp', year: 2023 },
      { title: 'Restaurant Interior', location: 'Miami', client: 'Food Co', year: 2022 },
      { title: 'Hotel Lobby', location: 'Las Vegas', client: 'Hotel Group', year: 2023 },
      { title: 'Retail Store', location: 'Seattle', client: 'Fashion Brand', year: 2022 },
      { title: 'Minimalist Apartment', location: 'Boston', client: 'Sarah Lee', year: 2023 },
      { title: 'Cozy Home Office', location: 'Austin', client: 'Mike Brown', year: 2023 },
      { title: 'Elegant Dining Room', location: 'Denver', client: 'Emily White', year: 2022 },
      { title: 'Spa Interior', location: 'Portland', client: 'Wellness Center', year: 2023 },
      { title: 'Boutique Shop', location: 'Nashville', client: 'Local Business', year: 2022 },
    ];

    for (let i = 0; i < projectData.length; i++) {
      const data = projectData[i];
      const category = categories[i % categories.length];
      
      projects.push({
        title: data.title,
        slug: data.title.toLowerCase().replace(/\s+/g, '-'),
        category: category._id,
        images: [
          `https://images.unsplash.com/photo-${1600000000000 + i}?w=800&h=600&fit=crop`,
          `https://images.unsplash.com/photo-${1600000000000 + i + 100}?w=800&h=600&fit=crop`,
          `https://images.unsplash.com/photo-${1600000000000 + i + 200}?w=800&h=600&fit=crop`,
        ],
        description: `A beautiful ${data.title.toLowerCase()} project that showcases modern design principles and exceptional craftsmanship. This project combines functionality with aesthetics to create a space that truly reflects the client's vision and lifestyle.`,
        location: data.location,
        clientName: data.client,
        year: data.year,
        createdAt: new Date(),
      });
    }

    await Project.insertMany(projects);
    console.log('Created projects');

    // Create slider items
    await Slider.insertMany([
      {
        image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1920&h=1080&fit=crop',
        title: 'Transform Your Space',
        subtitle: 'Exceptional Interior Design Solutions',
        order: 1,
      },
      {
        image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1920&h=1080&fit=crop',
        title: 'Modern Living',
        subtitle: 'Creating Beautiful Spaces',
        order: 2,
      },
      {
        image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1920&h=1080&fit=crop',
        title: 'Timeless Design',
        subtitle: 'Where Elegance Meets Functionality',
        order: 3,
      },
    ]);
    console.log('Created slider items');

    // Create testimonials
    await Testimonial.insertMany([
      {
        name: 'Sarah Johnson',
        text: 'The team transformed our home beyond our expectations. Their attention to detail and creativity is unmatched!',
        image: 'https://i.pravatar.cc/150?img=1',
      },
      {
        name: 'Michael Chen',
        text: 'Professional, creative, and a pleasure to work with. Our office space has never looked better!',
        image: 'https://i.pravatar.cc/150?img=2',
      },
      {
        name: 'Emily Rodriguez',
        text: 'They listened to our needs and delivered a design that perfectly reflects our style. Highly recommended!',
        image: 'https://i.pravatar.cc/150?img=3',
      },
    ]);
    console.log('Created testimonials');

    // Create admin user
    const hashedPassword = await bcrypt.hash('admin123', 10);
    await Admin.create({
      email: 'admin@portfolio.com',
      password: hashedPassword,
    });
    console.log('Created admin user (email: admin@portfolio.com, password: admin123)');

    console.log('Seed completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Seed failed:', error);
    process.exit(1);
  }
}

seed();
