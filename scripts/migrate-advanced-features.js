const { MongoClient } = require('mongodb');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/interior-design';

async function migrateData() {
  const client = new MongoClient(MONGODB_URI);
  
  try {
    await client.connect();
    console.log('Connected to MongoDB');
    
    const db = client.db();
    
    // 1. Update existing ads sliders to add isPublished field
    console.log('Updating ads sliders...');
    await db.collection('adssliders').updateMany(
      { isPublished: { $exists: false } },
      { $set: { isPublished: true } }
    );
    
    // 2. Create default services
    console.log('Creating default services...');
    const defaultServices = [
      {
        title: 'Residential Design',
        description: 'Transform your home into a personalized sanctuary with our residential design services.',
        features: [
          'Living room design',
          'Bedroom design', 
          'Kitchen design',
          'Bathroom design',
          'Home office design'
        ],
        order: 1,
        isActive: true
      },
      {
        title: 'Commercial Design',
        description: 'Create inspiring workspaces that enhance productivity and reflect your brand.',
        features: [
          'Office design',
          'Retail space design',
          'Restaurant design', 
          'Hotel design',
          'Co-working spaces'
        ],
        order: 2,
        isActive: true
      },
      {
        title: 'Renovation & Remodeling',
        description: 'Breathe new life into your existing spaces with our renovation services.',
        features: [
          'Space planning',
          'Structural changes',
          'Material selection',
          'Project management',
          'Budget optimization'
        ],
        order: 3,
        isActive: true
      },
      {
        title: 'Consultation',
        description: 'Get expert advice and guidance for your interior design projects.',
        features: [
          'Design consultation',
          'Color consultation',
          'Furniture selection',
          'Lighting design',
          'Material sourcing'
        ],
        order: 4,
        isActive: true
      }
    ];
    
    for (const service of defaultServices) {
      await db.collection('services').updateOne(
        { title: service.title },
        { $setOnInsert: { ...service, createdAt: new Date(), updatedAt: new Date() } },
        { upsert: true }
      );
    }
    
    // 3. Create default process steps
    console.log('Creating default process steps...');
    const defaultProcessSteps = [
      {
        stepNumber: 1,
        title: 'Consultation',
        description: 'We discuss your vision and requirements',
        order: 1,
        isActive: true
      },
      {
        stepNumber: 2,
        title: 'Design',
        description: 'We create detailed design concepts',
        order: 2,
        isActive: true
      },
      {
        stepNumber: 3,
        title: 'Implementation',
        description: 'We bring the design to life',
        order: 3,
        isActive: true
      },
      {
        stepNumber: 4,
        title: 'Completion',
        description: 'Final touches and handover',
        order: 4,
        isActive: true
      }
    ];
    
    for (const step of defaultProcessSteps) {
      await db.collection('processsteps').updateOne(
        { stepNumber: step.stepNumber },
        { $setOnInsert: { ...step, createdAt: new Date(), updatedAt: new Date() } },
        { upsert: true }
      );
    }
    
    // 4. Create default theme settings
    console.log('Creating default theme settings...');
    await db.collection('themesettings').updateOne(
      { isActive: true },
      { 
        $setOnInsert: {
          primaryColor: '#1f2937',
          secondaryColor: '#f3f4f6', 
          accentColor: '#f59e0b',
          isActive: true,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      },
      { upsert: true }
    );
    
    // 5. Create sample FAQs
    console.log('Creating sample FAQs...');
    const defaultFAQs = [
      {
        question: 'How long does a typical interior design project take?',
        answer: 'The timeline varies depending on the scope of work. A single room can take 2-4 weeks, while a full home renovation may take 2-6 months. We provide detailed timelines during consultation.',
        category: 'General',
        order: 1,
        isActive: true
      },
      {
        question: 'Do you provide 3D visualizations?',
        answer: 'Yes, we create detailed 3D renderings and virtual walkthroughs so you can visualize your space before implementation begins.',
        category: 'Services',
        order: 1,
        isActive: true
      },
      {
        question: 'What is included in your design consultation?',
        answer: 'Our consultation includes space assessment, style discussion, budget planning, timeline overview, and initial design concepts.',
        category: 'Process',
        order: 1,
        isActive: true
      },
      {
        question: 'How do you determine project pricing?',
        answer: 'Pricing is based on project scope, space size, design complexity, and material selections. We provide transparent quotes after initial consultation.',
        category: 'Pricing',
        order: 1,
        isActive: true
      }
    ];
    
    for (const faq of defaultFAQs) {
      await db.collection('faqs').updateOne(
        { question: faq.question },
        { $setOnInsert: { ...faq, createdAt: new Date(), updatedAt: new Date() } },
        { upsert: true }
      );
    }
    
    // 6. Update existing testimonials to add new fields
    console.log('Updating existing testimonials...');
    await db.collection('testimonials').updateMany(
      { rating: { $exists: false } },
      { 
        $set: { 
          rating: 5,
          serviceType: 'All',
          isPublished: true,
          isFeatured: false,
          order: 0
        }
      }
    );
    
    console.log('Migration completed successfully!');
    
  } catch (error) {
    console.error('Migration failed:', error);
  } finally {
    await client.close();
  }
}

// Run migration if called directly
if (require.main === module) {
  migrateData();
}

module.exports = { migrateData };