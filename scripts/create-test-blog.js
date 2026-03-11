const mongoose = require('mongoose');
require('dotenv').config();

// Blog Schema
const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  excerpt: { type: String, required: true },
  content: { type: String, required: true },
  featuredImage: { type: String, required: true },
  author: { type: String, default: 'Urban Design India' },
  category: { type: String, required: true },
  tags: [String],
  isPublished: { type: Boolean, default: true },
  isFeatured: { type: Boolean, default: false },
  seoTitle: String,
  seoDescription: String,
  seoKeywords: String,
  publishedAt: { type: Date, default: Date.now },
  readTime: { type: Number, default: 5 }
});

const Blog = mongoose.models.Blog || mongoose.model('Blog', blogSchema);

const sampleBlogContent = `
<h1>Complete Interior Design Guide 2024</h1>

<p>Welcome to our comprehensive interior design guide! This article covers everything you need to know about creating beautiful, functional spaces in your home.</p>

<h2>1. Understanding Design Principles</h2>

<p>Interior design is built on several fundamental principles that help create harmonious and visually appealing spaces:</p>

<ul>
<li><strong>Balance:</strong> Creating visual equilibrium in your space</li>
<li><strong>Proportion:</strong> Ensuring elements relate well to each other</li>
<li><strong>Rhythm:</strong> Creating flow and movement through repetition</li>
<li><strong>Emphasis:</strong> Highlighting focal points in your design</li>
<li><strong>Unity:</strong> Bringing all elements together cohesively</li>
</ul>

<h3>Color Theory in Interior Design</h3>

<p>Understanding color is crucial for any interior design project. Here's a quick reference table:</p>

<table>
<thead>
<tr>
<th>Color Type</th>
<th>Effect</th>
<th>Best Used In</th>
</tr>
</thead>
<tbody>
<tr>
<td>Warm Colors</td>
<td>Energizing, Cozy</td>
<td>Living rooms, Dining rooms</td>
</tr>
<tr>
<td>Cool Colors</td>
<td>Calming, Relaxing</td>
<td>Bedrooms, Bathrooms</td>
</tr>
<tr>
<td>Neutral Colors</td>
<td>Versatile, Timeless</td>
<td>Any room, Base colors</td>
</tr>
</tbody>
</table>

<h2>2. Room-by-Room Design Tips</h2>

<blockquote>
<p>"Design is not just what it looks like and feels like. Design is how it works." - Steve Jobs</p>
</blockquote>

<h3>Living Room Design</h3>

<p>The living room is the heart of your home. Here are key considerations:</p>

<ol>
<li>Start with a focal point (fireplace, TV, or artwork)</li>
<li>Choose a color scheme that reflects your personality</li>
<li>Ensure adequate lighting with multiple sources</li>
<li>Create conversation areas with furniture placement</li>
<li>Add texture through fabrics, rugs, and accessories</li>
</ol>

<h3>Kitchen Design Essentials</h3>

<p>Modern kitchens need to be both beautiful and functional:</p>

<ul>
<li>Follow the <strong>work triangle</strong> principle (sink, stove, refrigerator)</li>
<li>Maximize storage with smart cabinet solutions</li>
<li>Choose durable, easy-to-clean materials</li>
<li>Incorporate adequate task and ambient lighting</li>
<li>Consider an island for additional workspace and storage</li>
</ul>

<h2>3. Budget Planning Calculator</h2>

<p>Use this simple formula to plan your interior design budget:</p>

<div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
<h4>Budget Breakdown:</h4>
<ul>
<li>Furniture: 40-50% of total budget</li>
<li>Labor/Installation: 20-25% of total budget</li>
<li>Accessories & Decor: 15-20% of total budget</li>
<li>Lighting: 10-15% of total budget</li>
<li>Contingency: 10% of total budget</li>
</ul>
</div>

<h2>4. Current Design Trends</h2>

<p>Stay updated with the latest interior design trends:</p>

<h3>2024 Color Trends</h3>
<ul>
<li>Warm earth tones</li>
<li>Sage green and forest green</li>
<li>Soft pastels</li>
<li>Bold jewel tones as accents</li>
</ul>

<h3>Popular Materials</h3>
<ul>
<li>Natural wood finishes</li>
<li>Textured ceramics</li>
<li>Sustainable materials</li>
<li>Mixed metals</li>
</ul>

<h2>5. Professional Tips</h2>

<p>Here are some insider tips from professional interior designers:</p>

<blockquote>
<p>Always measure twice, buy once. Nothing ruins a design faster than furniture that doesn't fit the space properly.</p>
</blockquote>

<h3>Common Mistakes to Avoid</h3>

<ol>
<li><strong>Ignoring scale:</strong> Furniture too big or too small for the space</li>
<li><strong>Poor lighting:</strong> Relying only on overhead lighting</li>
<li><strong>Pushing furniture against walls:</strong> Creates awkward conversation areas</li>
<li><strong>Matching everything:</strong> Rooms need variety and interest</li>
<li><strong>Forgetting function:</strong> Beauty without functionality doesn't work</li>
</ol>

<h2>Conclusion</h2>

<p>Interior design is a journey of creating spaces that reflect your personality while meeting your functional needs. Remember that good design takes time, so be patient with the process and don't be afraid to experiment.</p>

<p>For professional interior design services, <a href="/contact">contact our team</a> today. We're here to help bring your vision to life!</p>

<div style="background-color: #dbeafe; border-left: 4px solid #3b82f6; padding: 16px; margin: 24px 0;">
<p><strong>Pro Tip:</strong> Start with one room at a time and gradually expand your design throughout your home. This approach is more budget-friendly and less overwhelming.</p>
</div>
`;

async function createTestBlog() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    const testBlog = new Blog({
      title: 'Complete Interior Design Guide 2024 - Test Blog',
      slug: 'complete-interior-design-guide-2024-test',
      excerpt: 'A comprehensive test blog with rich HTML content including tables, lists, blockquotes, and styled sections to test the preview functionality.',
      content: sampleBlogContent,
      featuredImage: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      author: 'Urban Design India',
      category: 'Tips & Guides',
      tags: ['interior design', 'home decor', 'design tips', 'color theory', 'furniture'],
      isPublished: true,
      isFeatured: true,
      seoTitle: 'Complete Interior Design Guide 2024 - Expert Tips & Trends',
      seoDescription: 'Discover expert interior design tips, color theory, room-by-room guides, and current trends in our comprehensive 2024 design guide.',
      seoKeywords: 'interior design, home decor, design tips, color theory, furniture placement, design trends 2024',
      readTime: 12
    });

    await testBlog.save();
    console.log('Test blog created successfully!');
    console.log('Blog ID:', testBlog._id);
    console.log('Blog Slug:', testBlog.slug);
    
  } catch (error) {
    console.error('Error creating test blog:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
}

createTestBlog();