import { Eye, ExternalLink, ShieldCheck } from 'lucide-react';
import SEO from '../components/SEO';
import DPWHProjects from '../components/DPWHProjects';

const EXTERNAL = [
  {
    label: 'Freedom of Information',
    href: 'https://www.foi.gov.ph',
    desc: 'File an FOI request',
  },
  {
    label: 'PhilGEPS',
    href: 'https://www.philgeps.gov.ph',
    desc: 'Government procurement portal',
  },
  {
    label: 'Open Data Philippines',
    href: 'https://data.gov.ph',
    desc: 'Government datasets',
  },
  {
    label: 'BLGF – Local Finance',
    href: 'https://blgf.gov.ph',
    desc: 'Bureau of Local Government Finance',
  },
  {
    label: 'COA – Audit Reports',
    href: 'https://www.coa.gov.ph',
    desc: 'Commission on Audit',
  },
  {
    label: 'DBM – Budget',
    href: 'https://www.dbm.gov.ph',
    desc: 'Department of Budget and Management',
  },
];

export default function Transparency() {
  return (
    <>
      <SEO
        title="Transparency"
        description="Transparency documents, budget reports, and FOI releases for the Municipality of Tanay, Rizal."
        keywords="Tanay transparency, budget, FOI, public documents, accountability, Cavite"
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
              <Eye className="h-5 w-5 text-blue-100" />
              <span className="text-blue-100 text-xs font-medium uppercase tracking-widest">
                Open Government
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-black mb-3">
              Transparency
            </h1>
            <p className="text-blue-100 text-lg max-w-xl mx-auto">
              Public documents, budget disclosures, and accountability reports
              for the Municipality of Tanay, Rizal.
            </p>
          </div>
        </div>

        {/* Commitment banner */}
        <section className="bg-primary-50 border-b border-primary-100 py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <ShieldCheck className="h-8 w-8 text-primary-600 shrink-0" />
            <div>
              <h2 className="font-black text-gray-900 text-base">
                Full Disclosure Policy Commitment
              </h2>
              <p className="text-sm text-gray-600 mt-0.5">
                The Municipality of Tanay is committed to the DILG Full
                Disclosure Policy, making all financial and performance data
                available to the public in accordance with Republic Act 7160 and
                Executive Order 2.
              </p>
            </div>
          </div>
        </section>

        {/* DPWH Infrastructure Projects */}
        <DPWHProjects />

        {/* External links */}
        <section className="bg-gray-50 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <h2 className="text-xl font-black text-gray-900 mb-6">
              External Accountability Resources
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {EXTERNAL.map(r => (
                <a
                  key={r.label}
                  href={r.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 bg-white rounded-xl border border-gray-100 p-5 hover:shadow-md hover:border-primary-200 transition-all group"
                >
                  <ExternalLink className="h-4 w-4 text-primary-500 shrink-0 mt-0.5" />
                  <div>
                    <div className="text-sm font-bold text-gray-900 group-hover:text-primary-700 transition-colors">
                      {r.label}
                    </div>
                    <div className="text-xs text-gray-500 mt-0.5">{r.desc}</div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
