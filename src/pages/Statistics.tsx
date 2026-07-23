import {
  BarChart3,
  Users,
  MapPin,
  Building2,
  Map,
  TrendingUp,
  FileText,
  ExternalLink,
  Trophy,
  Lightbulb,
  Shield,
  Zap,
  Globe,
} from 'lucide-react';
import SEO from '../components/SEO';

const SITE_URL = import.meta.env.VITE_WEBSITE_URL || 'https://bettertanay.org';

const STATS = [
  {
    icon: Users,
    value: '139,420',
    label: 'Population',
    desc: '2020 PSA Census data',
  },
  {
    icon: MapPin,
    value: '20',
    label: 'Barangays',
    desc: 'Political subdivisions',
  },
  {
    icon: Map,
    value: '200.00 km²',
    label: 'Total Land Area',
    desc: 'Municipal land area',
  },
  {
    icon: Building2,
    value: '1st Class',
    label: 'Income Classification',
    desc: 'Municipal income class',
  },
  {
    icon: TrendingUp,
    value: '3.60%',
    label: 'Annual Growth Rate',
    desc: '2015–2020 census period',
  },
  {
    icon: Users,
    value: '69,466',
    label: 'Registered Voters',
    desc: '2019 COMELEC data',
  },
  {
    icon: Map,
    value: '10.5 m',
    label: 'Elevation',
    desc: 'Above sea level',
  },
  {
    icon: Trophy,
    value: '76th',
    label: 'CMCI Overall Rank',
    desc: '2024 CMCI municipal ranking',
  },
];

const CMCI_PILLARS = [
  {
    icon: Zap,
    label: 'Economic Dynamism',
    rank: '66th',
    score: '4.209',
    color: 'text-yellow-700 bg-yellow-50 border-yellow-200',
    iconColor: 'text-yellow-600 bg-yellow-100',
    highlights: [
      'Safety Compliant Business: 9th',
      'Financial Deepening: 14th',
      'Local Economy Growth: 64th',
    ],
  },

  {
    icon: Building2,
    label: 'Government Efficiency',
    rank: '66th',
    score: '9.2674',
    color: 'text-blue-700 bg-blue-50 border-blue-200',
    iconColor: 'text-blue-600 bg-blue-100',
    highlights: [
      'ARTA Citizens Charter: 1st',
      'Getting Business Permits: 1st',
      'Compliance to National Directives: 4th',
    ],
  },

  {
    icon: Globe,
    label: 'Infrastructure',
    rank: '35th',
    score: '3.2366',
    color: 'text-purple-700 bg-purple-50 border-purple-200',
    iconColor: 'text-purple-600 bg-purple-100',
    highlights: [
      'Information Technology Capacity: 13th',
      'Education: 18th',
      'Transportation Vehicles: 26th',
    ],
  },

  {
    icon: Shield,
    label: 'Resiliency',
    rank: '69th',
    score: '11.6864',
    color: 'text-green-700 bg-green-50 border-green-200',
    iconColor: 'text-green-600 bg-green-100',
    highlights: [
      'Local Risk Assessments: 1st',
      'Utilities: 2nd',
      'Land Use Plan: 4th',
    ],
  },

  {
    icon: Lightbulb,
    label: 'Innovation',
    rank: '57th',
    score: '7.5023',
    color: 'text-orange-700 bg-orange-50 border-orange-200',
    iconColor: 'text-orange-600 bg-orange-100',
    highlights: [
      'ICT Plan: 1st',
      'E-BPLS Software: 1st',
      'Online Payment Facilities: 1st',
    ],
  },
];

const RESOURCES = [
  {
    label: 'Philippine Statistics Authority',
    href: 'https://psa.gov.ph',
    desc: 'Census & population data',
  },
  {
    label: 'PhilAtlas – Tanay',
    href: 'https://www.philatlas.com/luzon/r04a/rizal/tanay.html',
    desc: 'Geographic & demographic data',
  },
  {
    label: 'DTI CMCI Profile – Tanay',
    href: 'https://cmci.dti.gov.ph/lgu-profile.php?lgu=Tanay',
    desc: 'City/municipality competitiveness index',
  },
  {
    label: 'Open Data Philippines',
    href: 'https://data.gov.ph',
    desc: 'Government open datasets',
  },
  {
    label: 'BLGF – Local Finance',
    href: 'https://blgf.gov.ph',
    desc: 'Bureau of Local Government Finance',
  },
];

export default function Statistics() {
  return (
    <>
      <SEO
        title="Statistics & Municipal Profile"
        description="Key statistics, demographic data, and DTI competitiveness rankings for the Municipality of Tanay, Rizal. View population figures, land area, income classification, and CMCI 2024 pillar scores."
        keywords="Tanay statistics, Tanay population 2020, Tanay demographics, Rizal CMCI, Tanay competitiveness, Tanay land area, Tanay barangay population, 1st class municipality Tanay, PSA census Tanay, DTI Tanay profile"
        url={`${SITE_URL}/statistics`}
        image={`${SITE_URL}/bettertanay-logo-icon.png`}
        jsonLd={[
          {
            '@context': 'https://schema.org',
            '@type': 'StatisticalPopulation',
            name: 'Tanay, Rizal Population Statistics',
            description:
              'Population data and demographic statistics for the Municipality of Tanay, Rizal based on PSA 2020 census data.',
            populationType: 'Municipality',
            numConstraints: [
              {
                '@type': 'Constraint',
                property: 'location',
                value: 'Tanay, Rizal, Philippines',
              },
            ],
          },
        ]}
        section="Statistics"
      />
      <main className="grow">
        {/* Page Header */}
        <div
          className="relative text-white py-16 overflow-hidden"
          style={{
            backgroundColor: '#003087',
            backgroundImage:
              'radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px)',
            backgroundSize: '24px 24px',
          }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
            <div
              className="flex items-center justify-center gap-2 mb-2 w-fit mx-auto px-3 py-1.5 rounded-full"
              style={{ backgroundColor: 'rgba(255, 255, 255, 0.12)' }}
            >
              <BarChart3 className="h-5 w-5 text-blue-100" />
              <span className="text-blue-100 text-xs font-medium uppercase tracking-widest">
                Municipality of Tanay
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-black mb-3">Statistics</h1>
            <p className="text-blue-100 text-lg max-w-xl mx-auto">
              Key figures and competitiveness data for Tanay, Rizal based on
              official government sources.
            </p>
          </div>
        </div>

        {/* Municipality Profile */}
        <section className="bg-white py-12 border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-black text-gray-900">
                  Municipal Profile
                </h2>
                <p className="text-sm text-gray-500 mt-0.5">
                  Mayor Rex Manuel C. Tanjuatco · M.H. Del Pilar Street, Plaza
                  Aldea, Tanay, Rizal 1980 · Tel: (02) 8924-7174
                </p>
              </div>
              <a
                href="https://cmci.dti.gov.ph/lgu-profile.php?lgu=Tanay"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:flex items-center gap-1.5 text-sm font-semibold text-primary-700 hover:text-primary-800 transition-colors"
              >
                DTI CMCI Profile
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {STATS.map(({ icon: Icon, value, label, desc }) => (
                <div
                  key={label}
                  className="bg-gray-50 rounded-xl p-5 border border-gray-100 border-t-5 border-t-primary-700 hover:shadow-md transition-shadow"
                >
                  <div className="bg-primary-100 text-primary-700 w-9 h-9 rounded-lg flex items-center justify-center mb-3">
                    <Icon className="h-4 w-4" />
                  </div>
                  <div className="text-xl font-black text-gray-900 leading-tight mb-1">
                    {value}
                  </div>
                  <div className="text-sm font-semibold text-gray-800 mb-0.5">
                    {label}
                  </div>
                  <div className="text-xs text-gray-500">{desc}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CMCI 2024 */}
        <section className="bg-gray-50 py-12 border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="flex items-start justify-between gap-4 mb-2">
              <div>
                <h2 className="text-xl font-black text-gray-900">
                  DTI CMCI 2024 — 5 Pillars
                </h2>
                <p className="text-sm text-gray-500 mt-0.5">
                  Cities &amp; Municipalities Competitiveness Index · 149th
                  overall out of 509 municipalities (1st–2nd Class)
                </p>
              </div>
              <a
                href="https://cmci.dti.gov.ph/lgu-profile.php?lgu=Indang"
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 hidden sm:flex items-center gap-1.5 text-sm font-semibold text-primary-700 hover:text-primary-800 transition-colors"
              >
                Full Profile
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>

            {/* Innovation callout */}
            <div className="bg-orange-50 border border-orange-200 rounded-xl px-5 py-4 mb-6 flex items-start gap-3">
              <Lightbulb className="h-5 w-5 text-orange-500 shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-bold text-orange-800">
                  Rizal Province ranked as the Most Competitive Province in the
                  Philippines.
                </p>
                <p className="text-xs text-orange-700 mt-0.5">
                  Based on the 2024 DTI Cities and Municipalities
                  Competitiveness Index (CMCI), Rizal ranked 1st nationwide in
                  overall provincial competitiveness.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {CMCI_PILLARS.map(
                ({
                  icon: Icon,
                  label,
                  rank,
                  score,
                  color,
                  iconColor,
                  highlights,
                }) => (
                  <div key={label} className={`rounded-xl border p-5 ${color}`}>
                    <div className="flex items-center gap-3 mb-3">
                      <div
                        className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${iconColor}`}
                      >
                        <Icon className="h-4 w-4" />
                      </div>
                      <div>
                        <div className="font-black text-sm leading-tight">
                          {label}
                        </div>
                        <div className="text-xs opacity-70 font-medium">
                          Score: {score}
                        </div>
                      </div>
                      <div className="ml-auto text-right">
                        <div className="text-lg font-black leading-none">
                          {rank}
                        </div>
                        <div className="text-xs opacity-60">rank</div>
                      </div>
                    </div>
                    <ul className="space-y-1">
                      {highlights.map(h => (
                        <li
                          key={h}
                          className="text-xs opacity-80 flex items-start gap-1.5"
                        >
                          <span className="mt-1 w-1 h-1 rounded-full bg-current shrink-0 opacity-60" />
                          {h}
                        </li>
                      ))}
                    </ul>
                  </div>
                )
              )}
            </div>
          </div>
        </section>

        {/* Barangay list */}
        <section className="bg-white py-12 border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <h2 className="text-xl font-black text-gray-900 mb-2">
              20 Barangays of Tanay, Rizal
            </h2>

            <p className="text-sm text-gray-500 mb-6">
              Population figures from the 2020 Philippine Statistics Authority
              (PSA) Census
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {[
                ['Cayabu', '1,013'],
                ['Cuyambay', '4,112'],
                ['Daraitan', '5,743'],
                ['Katipunan-Bayan (Poblacion)', '6,100'],
                ['Kaybuto (Poblacion)', '9,166'],
                ['Laiban', '2,425'],
                ['Mag-Ampon (Poblacion)', '1,989'],
                ['Mamuyao', '919'],
                ['Pinagkamaligan (Poblacion)', '3,629'],
                ['Plaza Aldea (Poblacion)', '33,322'],
                ['Sampaloc', '31,000'],
                ['San Andres', '1,477'],
                ['San Isidro (Poblacion)', '3,288'],
                ['Santa Inez', '2,460'],
                ['Santo Niño', '1,549'],
                ['Tabing Ilog (Poblacion)', '1,891'],
                ['Tandang Kutyo (Poblacion)', '21,243'],
                ['Tinucan', '1,230'],
                ['Wawa (Poblacion)', '8,394'],
                ['Madilay-dilay', '2,842'],
              ].map(([name, pop]) => (
                <div
                  key={name}
                  className="bg-gray-50 rounded-lg border border-gray-100 p-5 hover:border-primary-200 transition-colors"
                >
                  <div className="text-sm font-semibold text-gray-800 leading-tight">
                    {name}
                  </div>

                  <div className="text-sm text-primary-600 font-bold mt-1">
                    {pop}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Data Sources */}
        <section className="bg-gray-50 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <h2 className="text-xl font-black text-gray-900 mb-6">
              Data Sources &amp; Resources
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {RESOURCES.map(r => (
                <a
                  key={r.label}
                  href={r.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 bg-white rounded-xl border border-gray-100 p-5 hover:shadow-md hover:border-primary-200 transition-all group"
                >
                  <FileText className="h-5 w-5 text-primary-500 shrink-0 mt-0.5" />
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-bold text-gray-900 group-hover:text-primary-700 transition-colors">
                      {r.label}
                    </div>
                    <div className="text-xs text-gray-500 mt-0.5">{r.desc}</div>
                  </div>
                  <ExternalLink className="h-4 w-4 text-gray-400 shrink-0 mt-0.5" />
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Back link */}
      </main>
    </>
  );
}
