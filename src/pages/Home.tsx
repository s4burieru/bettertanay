import Hero from '../components/sections/Hero';
import ServicesSection from '../components/home/ServicesSection';
import StatsSection from '../components/home/StatsSection';
import WeatherMapSection from '../components/home/WeatherMapSection';
import HistorySection from '../components/home/HistorySection';
import LeadershipSection from '../components/home/LeadershipSection';
import ContactSection from '../components/home/ContactSection';
import TourismSection from '../components/home/TourismSection';
import SEO from '../components/SEO';

const SITE_URL = import.meta.env.VITE_WEBSITE_URL || 'https://bettertanay.org';

const homeJsonLd = [
  {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'BetterTanay.org — Home',
    description:
      'Official community portal of the Municipality of Tanay, Rizal. Access local government information, public services, tourism destinations, and community resources.',
    url: SITE_URL,
    mainEntity: {
      '@type': 'GovernmentOrganization',
      name: 'Municipality of Tanay',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Tanay',
        addressRegion: 'Rizal',
        addressCountry: 'PH',
      },
    },
    about: {
      '@type': 'Thing',
      name: 'Tanay, Rizal — Local Government Portal',
      description:
        'A community-run portal to find information and services of the Municipality of Tanay, Rizal.',
    },
  },
];

const Home: React.FC = () => {
  return (
    <>
      <SEO
        title="Home — Community Portal"
        description="Official community portal of the Municipality of Tanay, Rizal. Access local government services, public documents, tourism destinations like Daranak Falls and Masungi Georeserve, barangay information, and community resources — all in one place."
        keywords="Tanay Rizal, Tanay, local government, LGU Tanay, municipal services, tourism Tanay, Rizal province, public information, BetterTanay, community portal, Tanay transparency, barangay Tanay, Tanay officials, Daranak Falls, Sierra Madre, Masungi Georeserve, Regina Rica, Hane Festival"
        image={`${SITE_URL}/bettertanay-logo-icon.png`}
        url={SITE_URL}
        jsonLd={homeJsonLd}
        section="Home"
      />
      <main className="grow">
        <Hero />
        <ServicesSection />
        <StatsSection />
        <WeatherMapSection />
        <TourismSection />
        <HistorySection />
        <LeadershipSection />
        <ContactSection />
      </main>
    </>
  );
};

export default Home;
