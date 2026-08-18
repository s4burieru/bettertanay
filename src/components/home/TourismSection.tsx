import { Link } from 'react-router-dom';
import {
  MapPin,
  Landmark,
  Waves,
  Tractor,
  BedDouble,
  Utensils,
  Zap,
  ChevronRight,
  ArrowRight,
  Church,
  Building,
  Droplets,
  Leaf,
} from 'lucide-react';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import { Heading } from '../ui/Heading';
import { Text } from '../ui/Text';
import establishmentsData from '../../../content/tourism/establishments.json';

const CATEGORY_NAV = [
  {
    id: 'heritage',
    label: 'Heritage & History',
    icon: Landmark,
    pill: 'bg-amber-100 text-amber-700',
  },
  {
    id: 'nature',
    label: 'Nature & Waterfalls',
    icon: Waves,
    pill: 'bg-blue-100 text-blue-700',
  },
  {
    id: 'farms',
    label: 'Farms & Agri-Tour',
    icon: Tractor,
    pill: 'bg-green-100 text-green-700',
  },
  {
    id: 'stay',
    label: 'Camping & Staycation',
    icon: BedDouble,
    pill: 'bg-purple-100 text-purple-700',
  },
  {
    id: 'restaurants',
    label: 'Cafés & Dining',
    icon: Utensils,
    pill: 'bg-orange-100 text-orange-700',
  },
  {
    id: 'adventure',
    label: 'Adventure & Eco',
    icon: Zap,
    pill: 'bg-red-100 text-red-700',
  },
];

const HIGHLIGHTS = [
  {
    icon: Church,
    title: 'Tanay Church (San Ildefonso de Toledo Parish Church)',
    desc: 'Built in 1773, this centuries-old church is known for its Baroque architecture and historical significance in Tanay.',
    tag: 'Heritage',
    tagColor: 'bg-amber-100 text-amber-700',
    href: '/tourism/heritage',
    image: '/establishment-images/san-ildefonso.jpg',
  },
  {
    icon: Building,
    title: 'Regina RICA',
    desc: 'A well-known pilgrimage destination featuring a giant statue of the Blessed Virgin Mary, retreat facilities, and scenic mountain views.',
    tag: 'Heritage',
    tagColor: 'bg-amber-100 text-amber-700',
    href: '/tourism/heritage',
    image: '/establishment-images/regina-rica.jpg',
  },
  {
    icon: Droplets,
    title: 'Daranak Falls',
    desc: 'One of Tanay’s most famous natural attractions, featuring cool waters surrounded by lush forests and rock formations.',
    tag: 'Nature',
    tagColor: 'bg-blue-100 text-blue-700',
    href: '/tourism/nature',
    image: '/establishment-images/daranak-falls.jpg',
  },
  {
    icon: Leaf,
    title: 'Calinawan Cave',
    desc: 'A historic cave system believed to have served as a hideout during wartime and now popular for guided exploration.',
    tag: 'Adventure',
    tagColor: 'bg-green-100 text-green-700',
    href: '/tourism/adventure',
    image: '/establishment-images/calinawan-cave.jpg',
  },
];

export default function TourismSection() {
  const headingRef = useScrollReveal<HTMLDivElement>();
  const highlightRef = useScrollReveal<HTMLDivElement>();
  const navRef = useScrollReveal<HTMLDivElement>();

  const total = establishmentsData.establishments.length;

  return (
    <section className="bg-white border-b border-gray-100 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div
          ref={headingRef}
          className="reveal flex flex-row items-center justify-between gap-4 mb-8"
        >
          <div className="flex-1">
            <Heading level={4} className="font-black mb-0">
              Discover Tanay
            </Heading>
            <Text className="text-gray-600">
              The Home of Adventure and Nature and Experience &#x28;HANE&#x29;.
            </Text>
          </div>
          <Link
            to="/tourism"
            className="shrink-0 inline-flex items-center gap-1.5 text-sm font-bold text-primary-700 hover:text-primary-900 transition-colors"
          >
            View All Tourism
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Highlight cards with images */}
        <div
          ref={highlightRef}
          className="reveal-stagger grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
        >
          {HIGHLIGHTS.map(h => (
            <Link
              key={h.title}
              to={h.href}
              className="group bg-white rounded-xl border border-gray-100 shadow-sm hover:border-primary-600 hover:shadow-md transition-all duration-200 overflow-hidden flex flex-col"
            >
              {/* Image */}
              <div className="relative h-40 overflow-hidden">
                <img
                  src={h.image}
                  alt={h.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/50 via-black/10 to-transparent" />
                <span
                  className={`absolute top-3 left-3 inline-block text-xs font-semibold px-2 py-0.5 rounded-full shadow-sm ${h.tagColor}`}
                >
                  {h.tag}
                </span>
                <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm text-primary-700 w-8 h-8 rounded-lg flex items-center justify-center shadow-sm">
                  <h.icon className="h-4 w-4" />
                </div>
              </div>

              {/* Content */}
              <div className="p-4 flex flex-col gap-2 flex-1">
                <h3 className="font-black text-sm text-gray-900 leading-snug line-clamp-2">
                  {h.title}
                </h3>
                <p className="text-xs text-gray-500 leading-relaxed flex-1 line-clamp-3">
                  {h.desc}
                </p>
                <span className="inline-flex items-center gap-1 text-xs font-bold text-primary-600 group-hover:text-primary-800 transition-colors mt-1">
                  Explore <ChevronRight className="h-3.5 w-3.5" />
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* Category navigation row */}
        <div ref={navRef} className="reveal">
          <p className="text-xs font-bold text-gray-600 uppercase tracking-widest mb-3">
            Browse by category
          </p>
          <div className="flex flex-wrap gap-2">
            {CATEGORY_NAV.map(({ id, label, icon: Icon, pill }) => {
              const count = establishmentsData.establishments.filter(
                e => e.category === id
              ).length;
              return (
                <Link
                  key={id}
                  to={`/tourism/${id}`}
                  className="group inline-flex items-center gap-2 bg-white border border-gray-100 shadow-sm hover:border-primary-200 hover:shadow-md rounded-lg px-4 py-2.5 transition-all duration-200"
                >
                  <div className="bg-primary-50 text-primary-700 w-6 h-6 rounded-md flex items-center justify-center group-hover:bg-primary-100 transition-colors">
                    <Icon className="h-3.5 w-3.5" />
                  </div>
                  <span className="text-sm font-semibold text-gray-800">
                    {label}
                  </span>
                  <span
                    className={`text-xs font-bold px-1.5 py-0.5 rounded-full ${pill}`}
                  >
                    {count}
                  </span>
                </Link>
              );
            })}
            <Link
              to="/tourism"
              className="inline-flex items-center gap-2 bg-primary-700 hover:bg-primary-800 text-white rounded-lg px-4 py-2.5 text-sm font-bold transition-colors"
            >
              <MapPin className="h-3.5 w-3.5" />
              All {total}
              <ChevronRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
