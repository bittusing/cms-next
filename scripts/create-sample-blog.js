const mongoose = require('mongoose');

// Blog Schema
const BlogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  excerpt: {
    type: String,
    required: true,
    trim: true,
    maxlength: 300
  },
  content: {
    type: String,
    required: true
  },
  featuredImage: {
    type: String,
    required: true
  },
  author: {
    type: String,
    default: 'Urban Design India'
  },
  category: {
    type: String,
    required: true,
    enum: ['Interior Design', 'Home Decor', 'Architecture', 'Tips & Guides', 'Trends', 'Case Studies']
  },
  tags: [{
    type: String,
    trim: true
  }],
  isPublished: {
    type: Boolean,
    default: false
  },
  isFeatured: {
    type: Boolean,
    default: false
  },
  readTime: {
    type: Number,
    default: 5
  },
  seoTitle: {
    type: String,
    trim: true
  },
  seoDescription: {
    type: String,
    trim: true,
    maxlength: 160
  },
  seoKeywords: {
    type: String,
    trim: true
  },
  publishedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

const Blog = mongoose.models.Blog || mongoose.model('Blog', BlogSchema);

// Connect to MongoDB
async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/interior-design');
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('MongoDB connection error:', error);
  }
}

// Sample blog content with forms, tables, and rich formatting
const sampleBlogContent = `
<h1>Complete Interior Design Guide: Transform Your Home in 2024</h1>

<p>Welcome to the most comprehensive interior design guide that will help you transform your home into a stunning masterpiece. This guide includes practical tips, cost calculators, design checklists, and everything you need to create your dream space.</p>

<h2>🏠 Room-by-Room Design Planning</h2>

<p>Let's start with a systematic approach to designing each room in your home. Use our interactive planning tools below:</p>

<h3>Living Room Design Calculator</h3>

<div style="background: #f8f9fa; padding: 20px; border-radius: 10px; margin: 20px 0;">
  <h4>Calculate Your Living Room Requirements</h4>
  <form style="display: grid; gap: 15px; max-width: 500px;">
    <div>
      <label style="display: block; font-weight: bold; margin-bottom: 5px;">Room Length (feet):</label>
      <input type="number" placeholder="Enter length" style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 5px;">
    </div>
    <div>
      <label style="display: block; font-weight: bold; margin-bottom: 5px;">Room Width (feet):</label>
      <input type="number" placeholder="Enter width" style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 5px;">
    </div>
    <div>
      <label style="display: block; font-weight: bold; margin-bottom: 5px;">Budget Range:</label>
      <select style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 5px;">
        <option>₹50,000 - ₹1,00,000</option>
        <option>₹1,00,000 - ₹2,50,000</option>
        <option>₹2,50,000 - ₹5,00,000</option>
        <option>₹5,00,000+</option>
      </select>
    </div>
    <div>
      <label style="display: block; font-weight: bold; margin-bottom: 5px;">Design Style:</label>
      <select style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 5px;">
        <option>Modern Contemporary</option>
        <option>Traditional Indian</option>
        <option>Minimalist</option>
        <option>Industrial</option>
        <option>Scandinavian</option>
      </select>
    </div>
    <button type="button" style="background: #f59e0b; color: white; padding: 12px 20px; border: none; border-radius: 5px; font-weight: bold; cursor: pointer;">Calculate Requirements</button>
  </form>
</div>

<h2>📊 Interior Design Cost Breakdown</h2>

<p>Understanding the cost structure is crucial for planning your interior design project. Here's a detailed breakdown:</p>

<table style="width: 100%; border-collapse: collapse; margin: 20px 0; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
  <thead>
    <tr style="background: #1f2937; color: white;">
      <th style="padding: 15px; text-align: left; border: 1px solid #ddd;">Category</th>
      <th style="padding: 15px; text-align: left; border: 1px solid #ddd;">Budget Range</th>
      <th style="padding: 15px; text-align: left; border: 1px solid #ddd;">% of Total</th>
      <th style="padding: 15px; text-align: left; border: 1px solid #ddd;">Key Items</th>
    </tr>
  </thead>
  <tbody>
    <tr style="background: #f9fafb;">
      <td style="padding: 12px; border: 1px solid #ddd; font-weight: bold;">Furniture</td>
      <td style="padding: 12px; border: 1px solid #ddd;">₹1,50,000 - ₹4,00,000</td>
      <td style="padding: 12px; border: 1px solid #ddd;">40-50%</td>
      <td style="padding: 12px; border: 1px solid #ddd;">Sofa, Dining Table, Beds, Storage</td>
    </tr>
    <tr>
      <td style="padding: 12px; border: 1px solid #ddd; font-weight: bold;">Flooring</td>
      <td style="padding: 12px; border: 1px solid #ddd;">₹80,000 - ₹2,00,000</td>
      <td style="padding: 12px; border: 1px solid #ddd;">20-25%</td>
      <td style="padding: 12px; border: 1px solid #ddd;">Tiles, Wooden, Marble, Carpet</td>
    </tr>
    <tr style="background: #f9fafb;">
      <td style="padding: 12px; border: 1px solid #ddd; font-weight: bold;">Lighting</td>
      <td style="padding: 12px; border: 1px solid #ddd;">₹30,000 - ₹80,000</td>
      <td style="padding: 12px; border: 1px solid #ddd;">8-12%</td>
      <td style="padding: 12px; border: 1px solid #ddd;">Chandeliers, LED, Accent Lights</td>
    </tr>
    <tr>
      <td style="padding: 12px; border: 1px solid #ddd; font-weight: bold;">Paint & Wall</td>
      <td style="padding: 12px; border: 1px solid #ddd;">₹25,000 - ₹60,000</td>
      <td style="padding: 12px; border: 1px solid #ddd;">6-10%</td>
      <td style="padding: 12px; border: 1px solid #ddd;">Premium Paint, Wallpaper, Texture</td>
    </tr>
    <tr style="background: #f9fafb;">
      <td style="padding: 12px; border: 1px solid #ddd; font-weight: bold;">Accessories</td>
      <td style="padding: 12px; border: 1px solid #ddd;">₹20,000 - ₹50,000</td>
      <td style="padding: 12px; border: 1px solid #ddd;">5-8%</td>
      <td style="padding: 12px; border: 1px solid #ddd;">Curtains, Cushions, Art, Plants</td>
    </tr>
  </tbody>
</table>

<h2>🎨 Design Style Comparison</h2>

<p>Choose the perfect design style for your home with our comprehensive comparison:</p>

<table style="width: 100%; border-collapse: collapse; margin: 20px 0; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
  <thead>
    <tr style="background: #059669; color: white;">
      <th style="padding: 15px; text-align: left; border: 1px solid #ddd;">Style</th>
      <th style="padding: 15px; text-align: left; border: 1px solid #ddd;">Key Features</th>
      <th style="padding: 15px; text-align: left; border: 1px solid #ddd;">Color Palette</th>
      <th style="padding: 15px; text-align: left; border: 1px solid #ddd;">Best For</th>
      <th style="padding: 15px; text-align: left; border: 1px solid #ddd;">Budget</th>
    </tr>
  </thead>
  <tbody>
    <tr style="background: #f0fdf4;">
      <td style="padding: 12px; border: 1px solid #ddd; font-weight: bold;">Modern Contemporary</td>
      <td style="padding: 12px; border: 1px solid #ddd;">Clean lines, minimal clutter, functional</td>
      <td style="padding: 12px; border: 1px solid #ddd;">White, Grey, Black accents</td>
      <td style="padding: 12px; border: 1px solid #ddd;">Young professionals, small spaces</td>
      <td style="padding: 12px; border: 1px solid #ddd;">₹₹₹</td>
    </tr>
    <tr>
      <td style="padding: 12px; border: 1px solid #ddd; font-weight: bold;">Traditional Indian</td>
      <td style="padding: 12px; border: 1px solid #ddd;">Rich textures, carved furniture, ethnic</td>
      <td style="padding: 12px; border: 1px solid #ddd;">Gold, Red, Deep blues</td>
      <td style="padding: 12px; border: 1px solid #ddd;">Families, cultural enthusiasts</td>
      <td style="padding: 12px; border: 1px solid #ddd;">₹₹₹₹</td>
    </tr>
    <tr style="background: #f0fdf4;">
      <td style="padding: 12px; border: 1px solid #ddd; font-weight: bold;">Minimalist</td>
      <td style="padding: 12px; border: 1px solid #ddd;">Less is more, functional, serene</td>
      <td style="padding: 12px; border: 1px solid #ddd;">White, Beige, Natural wood</td>
      <td style="padding: 12px; border: 1px solid #ddd;">Busy professionals, meditation</td>
      <td style="padding: 12px; border: 1px solid #ddd;">₹₹</td>
    </tr>
    <tr>
      <td style="padding: 12px; border: 1px solid #ddd; font-weight: bold;">Industrial</td>
      <td style="padding: 12px; border: 1px solid #ddd;">Raw materials, exposed elements</td>
      <td style="padding: 12px; border: 1px solid #ddd;">Grey, Black, Rust, Metal</td>
      <td style="padding: 12px; border: 1px solid #ddd;">Lofts, creative spaces</td>
      <td style="padding: 12px; border: 1px solid #ddd;">₹₹₹</td>
    </tr>
  </tbody>
</table>

<h2>📝 Project Planning Checklist</h2>

<p>Use this comprehensive checklist to ensure your interior design project stays on track:</p>

<div style="background: #eff6ff; padding: 20px; border-radius: 10px; margin: 20px 0;">
  <h4>Pre-Design Phase</h4>
  <form>
    <div style="margin: 10px 0;">
      <input type="checkbox" id="budget" style="margin-right: 10px;">
      <label for="budget">Set realistic budget with 20% buffer</label>
    </div>
    <div style="margin: 10px 0;">
      <input type="checkbox" id="timeline" style="margin-right: 10px;">
      <label for="timeline">Create project timeline (typically 3-6 months)</label>
    </div>
    <div style="margin: 10px 0;">
      <input type="checkbox" id="research" style="margin-right: 10px;">
      <label for="research">Research and shortlist 3-5 interior designers</label>
    </div>
    <div style="margin: 10px 0;">
      <input type="checkbox" id="inspiration" style="margin-right: 10px;">
      <label for="inspiration">Collect inspiration images and create mood board</label>
    </div>
  </form>
</div>

<div style="background: #f0f9ff; padding: 20px; border-radius: 10px; margin: 20px 0;">
  <h4>Design Phase</h4>
  <form>
    <div style="margin: 10px 0;">
      <input type="checkbox" id="measurements" style="margin-right: 10px;">
      <label for="measurements">Take accurate room measurements</label>
    </div>
    <div style="margin: 10px 0;">
      <input type="checkbox" id="layout" style="margin-right: 10px;">
      <label for="layout">Finalize room layouts and furniture placement</label>
    </div>
    <div style="margin: 10px 0;">
      <input type="checkbox" id="materials" style="margin-right: 10px;">
      <label for="materials">Select materials, colors, and finishes</label>
    </div>
    <div style="margin: 10px 0;">
      <input type="checkbox" id="lighting" style="margin-right: 10px;">
      <label for="lighting">Plan lighting scheme (ambient, task, accent)</label>
    </div>
  </form>
</div>

<h2>💡 Expert Tips for Success</h2>

<blockquote style="background: #fef3c7; border-left: 4px solid #f59e0b; padding: 20px; margin: 20px 0; font-style: italic;">
  <p><strong>Pro Tip:</strong> Always start with the largest pieces of furniture first, then work your way down to accessories. This ensures proper scale and proportion in your design.</p>
</blockquote>

<h3>Room-Specific Guidelines</h3>

<ul style="line-height: 1.8;">
  <li><strong>Living Room:</strong> Ensure 3-4 feet of walking space around furniture</li>
  <li><strong>Bedroom:</strong> Position bed away from direct sunlight and noise</li>
  <li><strong>Kitchen:</strong> Follow the work triangle principle (sink, stove, refrigerator)</li>
  <li><strong>Bathroom:</strong> Prioritize ventilation and waterproofing</li>
</ul>

<h2>📞 Get Professional Help</h2>

<p>Ready to transform your space? Our expert team at Urban Design India is here to help you create the home of your dreams.</p>

<div style="background: linear-gradient(135deg, #f59e0b, #ea580c); color: white; padding: 30px; border-radius: 15px; margin: 30px 0; text-align: center;">
  <h3 style="margin-bottom: 15px;">Free Consultation Available!</h3>
  <p style="margin-bottom: 20px;">Get expert advice tailored to your space and budget</p>
  
  <form style="display: grid; gap: 15px; max-width: 400px; margin: 0 auto;">
    <input type="text" placeholder="Your Name" style="padding: 12px; border: none; border-radius: 8px; color: #333;">
    <input type="tel" placeholder="Phone Number" style="padding: 12px; border: none; border-radius: 8px; color: #333;">
    <input type="email" placeholder="Email Address" style="padding: 12px; border: none; border-radius: 8px; color: #333;">
    <select style="padding: 12px; border: none; border-radius: 8px; color: #333;">
      <option>Select Service</option>
      <option>Complete Home Interior</option>
      <option>Living Room Design</option>
      <option>Bedroom Design</option>
      <option>Kitchen Design</option>
      <option>Office Interior</option>
    </select>
    <textarea placeholder="Tell us about your project..." rows="3" style="padding: 12px; border: none; border-radius: 8px; color: #333; resize: vertical;"></textarea>
    <button type="submit" style="background: white; color: #f59e0b; padding: 15px; border: none; border-radius: 8px; font-weight: bold; cursor: pointer; font-size: 16px;">Get Free Quote</button>
  </form>
</div>

<h2>📈 Market Trends 2024</h2>

<p>Stay ahead with the latest interior design trends:</p>

<table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
  <thead>
    <tr style="background: #7c3aed; color: white;">
      <th style="padding: 15px; text-align: left;">Trend</th>
      <th style="padding: 15px; text-align: left;">Popularity</th>
      <th style="padding: 15px; text-align: left;">Cost Impact</th>
      <th style="padding: 15px; text-align: left;">Longevity</th>
    </tr>
  </thead>
  <tbody>
    <tr style="background: #f3f4f6;">
      <td style="padding: 12px; border: 1px solid #ddd;">Sustainable Materials</td>
      <td style="padding: 12px; border: 1px solid #ddd;">🔥🔥🔥🔥🔥</td>
      <td style="padding: 12px; border: 1px solid #ddd;">Medium</td>
      <td style="padding: 12px; border: 1px solid #ddd;">Long-term</td>
    </tr>
    <tr>
      <td style="padding: 12px; border: 1px solid #ddd;">Smart Home Integration</td>
      <td style="padding: 12px; border: 1px solid #ddd;">🔥🔥🔥🔥</td>
      <td style="padding: 12px; border: 1px solid #ddd;">High</td>
      <td style="padding: 12px; border: 1px solid #ddd;">Future-proof</td>
    </tr>
    <tr style="background: #f3f4f6;">
      <td style="padding: 12px; border: 1px solid #ddd;">Biophilic Design</td>
      <td style="padding: 12px; border: 1px solid #ddd;">🔥🔥🔥🔥</td>
      <td style="padding: 12px; border: 1px solid #ddd;">Low-Medium</td>
      <td style="padding: 12px; border: 1px solid #ddd;">Long-term</td>
    </tr>
  </tbody>
</table>

<h2>🎯 Conclusion</h2>

<p>Interior design is a journey that transforms not just your space, but your lifestyle. With proper planning, the right team, and attention to detail, you can create a home that reflects your personality and meets your functional needs.</p>

<p><strong>Remember:</strong> Great design is not about following trends blindly, but about creating spaces that work for YOU and your family.</p>

<div style="background: #1f2937; color: white; padding: 25px; border-radius: 10px; margin: 30px 0;">
  <h4>Ready to Start Your Interior Design Journey?</h4>
  <p>Contact Urban Design India today for a personalized consultation!</p>
  <p>📞 Call: +91 98765 43210 | 📧 Email: info@urbandesignindia.com</p>
</div>
`;

// Create sample blog
async function createSampleBlog() {
  await connectDB();
  
  const sampleBlog = new Blog({
    title: "Complete Interior Design Guide: Transform Your Home in 2024",
    slug: "complete-interior-design-guide-transform-home-2024",
    excerpt: "Discover the ultimate interior design guide with interactive calculators, cost breakdowns, design checklists, and expert tips. Transform your home with professional insights and practical tools.",
    content: sampleBlogContent,
    featuredImage: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1200&h=600&fit=crop",
    author: "Urban Design India Team",
    category: "Tips & Guides",
    tags: ["interior design", "home decor", "design tips", "cost calculator", "planning guide", "2024 trends"],
    isPublished: true,
    isFeatured: true,
    readTime: 12,
    seoTitle: "Complete Interior Design Guide 2024 - Transform Your Home | Urban Design India",
    seoDescription: "Ultimate interior design guide with cost calculators, planning tools, and expert tips. Transform your home with professional insights from Urban Design India.",
    seoKeywords: "interior design guide, home interior cost, design planning, interior design tips, home transformation, Urban Design India"
  });

  try {
    await sampleBlog.save();
    console.log('Sample blog created successfully!');
    console.log('Blog URL: /blogs/complete-interior-design-guide-transform-home-2024');
  } catch (error) {
    console.error('Error creating sample blog:', error);
  }
  
  mongoose.connection.close();
}

createSampleBlog();