import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PortfolioClient from './PortfolioClient';
import PortfolioHeroSlider from '@/components/PortfolioHeroSlider';
import AnimatedPage from '@/components/AnimatedPage';

async function getProjects() {
  try {
    const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000';
    const res = await fetch(`${baseUrl}/api/projects`, {
      cache: 'no-store'
    });
    if (!res.ok) return [];
    return res.json();
  } catch (error) {
    console.error('Failed to fetch projects:', error);
    return [];
  }
}

async function getCategories() {
  try {
    const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000';
    const res = await fetch(`${baseUrl}/api/categories`, {
      cache: 'no-store'
    });
    if (!res.ok) return [];
    return res.json();
  } catch (error) {
    console.error('Failed to fetch categories:', error);
    return [];
  }
}

async function getSliders() {
  try {
    const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000';
    const res = await fetch(`${baseUrl}/api/slider`, {
      cache: 'no-store'
    });
    if (!res.ok) return [];
    return res.json();
  } catch (error) {
    console.error('Failed to fetch sliders:', error);
    return [];
  }
}

export default async function PortfolioPage() {
  const [projects, categories, sliders] = await Promise.all([
    getProjects(),
    getCategories(),
    getSliders()
  ]);

  return (
    <AnimatedPage>
      <Navbar />
      <main className="pt-16">
        {/* Portfolio Hero Slider */}
        <PortfolioHeroSlider slides={sliders} />

        <PortfolioClient initialProjects={projects} initialCategories={categories} />
      </main>
      <Footer />
    </AnimatedPage>
  );
}
