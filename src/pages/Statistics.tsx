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
    rank: '—',
    score: '—',
    color: 'text-yellow-700 bg-yellow-50 border-yellow-200',
    iconColor: 'text-yellow-600 bg-yellow-100',
    highlights: [
      'Growing tourism and local enterprises',
      'Agriculture and eco-tourism contribute to the local economy',
      'Gateway municipality to eastern Rizal destinations',
    ],
  },

  {
    icon: Building2,
    label: 'Government Efficiency',
    rank: '—',
    score: '—',
    color: 'text-blue-700 bg-blue-50 border-blue-200',
    iconColor: 'text-blue-600 bg-blue-100',
    highlights: [
      'Public services and municipal governance initiatives',
      'Business permit and licensing operations modernization',
      'Compliance with national government directives',
    ],
  },

  {
    icon: Globe,
    label: 'Infrastructure',
    rank: '—',
    score: '—',
    color: 'text-purple-700 bg-purple-50 border-purple-200',
    iconColor: 'text-purple-600 bg-purple-100',
    highlights: [
      'Road connectivity to Metro Manila and Rizal towns',
      'Tourism-support infrastructure development',
      'Ongoing improvements in utilities and transport access',
    ],
  },

  {
    icon: Shield,
    label: 'Resiliency',
    rank: '—',
    score: '—',
    color: 'text-green-700 bg-green-50 border-green-200',
    iconColor: 'text-green-600 bg-green-100',
    highlights: [
      'Disaster preparedness and DRRM programs',
      'Flood and landslide risk management initiatives',
      'Environmental protection and watershed conservation',
    ],
  },

  {
    icon: Lightbulb,
    label: 'Innovation',
    rank: '—',
    score: '—',
    color: 'text-orange-700 bg-orange-50 border-orange-200',
    iconColor: 'text-orange-600 bg-orange-100',
    highlights: [
      'Digitalization and online public information services',
      'Tourism promotion through digital platforms',
      'Community-based innovation and sustainability initiatives',
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
        title="Statistics"
        description="Key statistics and demographic data for the Municipality of Tanay, Rizal."
        keywords="Tanay statistics, Rizal demographics, population data, municipality profile, CMCI"
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
                  Cities &amp; Municipalities Competitiveness Index · Tanay,
                  Rizal
                </p>
              </div>

              <a
                href="https://cmci.dti.gov.ph/"
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 hidden sm:flex items-center gap-1.5 text-sm font-semibold text-primary-700 hover:text-primary-800 transition-colors"
              >
                Full Profile
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>

            {/* Rizal Province callout */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl px-5 py-4 mb-6 flex items-start gap-3">
              <Trophy className="h-5 w-5 text-blue-500 shrink-0 mt-0.5" />

              <div>
                <p className="text-sm font-bold text-blue-800">
                  Rizal Province ranked as the Most Competitive Province in the
                  Philippines
                </p>

                <p className="text-xs text-blue-700 mt-0.5">
                  Based on the 2024 DTI Cities and Municipalities
                  Competitiveness Index (CMCI), Rizal ranked 1st nationwide in
                  overall provincial competitiveness.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {CMCI_PILLARS.map(
                ({ icon: Icon, label, color, iconColor, highlights }) => (
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
                          DTI CMCI Pillar
                        </div>
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
