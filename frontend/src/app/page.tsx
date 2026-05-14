import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Ticker from '@/components/Ticker';
import About from '@/components/About';
import Products from '@/components/Products';
import Process from '@/components/Process';
import Certifications from '@/components/Certifications';
import WhyUs from '@/components/WhyUs';
import Contact from '@/components/Contact';
import GemDashboard from '@/components/GemDashboard';
import Footer from '@/components/Footer';

export default function HomePage() {
  return (
    <>
      <Navbar />
      <Hero />
      <Ticker />
      <About />
      <Products />
      <Process />
      <Certifications />
      <WhyUs />
      <Contact />
      <GemDashboard />
      <Footer />
    </>
  );
}
