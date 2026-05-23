import { governmentCategories } from '../data/yamlLoader';
import * as LucideIcons from 'lucide-react';
import { Building2 } from 'lucide-react';
import SEO from '../components/SEO';

const Government: React.FC = () => {
  return (
    <>
      <SEO
        title="Government"
        description={`Government departments and offices of the ${import.meta.env.VITE_GOVERNMENT_NAME} government. Find information about local government structure and services.`}
        keywords="government, departments, offices, local government, civic services, executive, sangguniang bayan"
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
              <Building2 className="h-5 w-5 text-blue-100" />
              <span className="text-blue-100 text-xs font-medium uppercase tracking-widest">
                Structure & Officials
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-black mb-3">Government</h1>
            <p className="text-blue-100 text-lg max-w-xl mx-auto">
              Meet the leadership and offices serving Tanay, Rizal, including
              elected officials and municipal departments.
            </p>
          </div>
        </div>

        {/* Government Categories */}
        <section className="bg-white py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="space-y-12">
              {governmentCategories.categories.map(category => {
                const CategoryIcon = LucideIcons[
                  category.icon as keyof typeof LucideIcons
                ] as React.ComponentType<{ className?: string }>;
                return (
                  <div
                    key={category.slug}
                    className="border-b border-gray-100 pb-12 last:border-0"
                  >
                    <div className="flex items-start gap-4 mb-4">
                      {CategoryIcon && (
                        <CategoryIcon className="h-8 w-8 text-primary-600 shrink-0 mt-1" />
                      )}
                      <div className="flex-1">
                        <h2 className="text-2xl font-black text-gray-900 mb-2">
                          {category.category}
                        </h2>
                        <p className="text-gray-600">{category.description}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Government;
