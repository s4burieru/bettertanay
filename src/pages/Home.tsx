import Hero from '../components/sections/Hero';
import ServicesSection from '../components/home/ServicesSection';
import GovernmentActivitySection from '../components/home/GovernmentActivitySection';
import StatsSection from '../components/home/StatsSection';
import WeatherMapSection from '../components/home/WeatherMapSection';
import HistorySection from '../components/home/HistorySection';
import LeadershipSection from '../components/home/LeadershipSection';
import ContactSection from '../components/home/ContactSection';
import TourismSection from '../components/home/TourismSection';
import SEO from '../components/SEO';

const Home: React.FC = () => {
  return (
    <>
      <SEO
        title="Home"
        description="Official community portal of the Municipality of Tanay, Rizal. Access local government information, public services, tourism destinations, barangays, and community resources."
        keywords="Tanay Rizal, Tanay, local government, LGU Tanay, municipal services, tourism Tanay, Rizal province, public information"
      />
      <main className="grow">
        <Hero />
        <ServicesSection />
        <StatsSection />
        <WeatherMapSection />
        <GovernmentActivitySection />
        <TourismSection />
        <HistorySection />
        <LeadershipSection />
        <ContactSection />
      </main>
    </>
  );
};

export default Home;
