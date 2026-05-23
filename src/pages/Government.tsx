import {
  governmentCategories,
  getCategorySubcategories,
  type Subcategory,
  type CategoryIndex,
} from '../data/yamlLoader';
import { useParams, Link } from 'react-router-dom';
import * as LucideIcons from 'lucide-react';
import { Building2, Mail, Phone, Users, Briefcase, MapPin } from 'lucide-react';
import SEO from '../components/SEO';
import Section from '../components/ui/Section';
import { Heading } from '../components/ui/Heading';
import { Text } from '../components/ui/Text';
import Breadcrumbs from '../components/ui/Breadcrumbs';
import { Card, CardContent } from '@bettergov/kapwa/card';
import { Banner } from '@bettergov/kapwa/banner';
import { useState, useEffect } from 'react';

interface Official {
  name: string;
  title: string;
  position: string;
  phone: string;
  email: string;
  initials: string;
}

const OFFICIALS: Official[] = [
  {
    name: 'Hon. Rex Manuel C. Tanjuatco',
    title: 'Elected Mayor',
    position: 'Municipal Mayor',
    phone: '(02) 8924-7174',
    email: 'contacts@tanay.gov.ph',
    initials: 'RM',
  },
  {
    name: 'Hon. Ruel P. Estrella',
    title: 'Elected Vice Mayor',
    position: 'Municipal Vice Mayor',
    phone: '(02) 8924-7174',
    email: 'vmruelestrella@gmail.com',
    initials: 'RE',
  },
];

const Government: React.FC = () => {
  const { category } = useParams();
  const [categoryIndex, setCategoryIndex] = useState<CategoryIndex>({
    layout: 'list',
    pages: [],
  });
  const [loading, setLoading] = useState(false);
  const subcategories: Subcategory[] = categoryIndex.pages;

  const getCategory = () => {
    return governmentCategories.categories.find(c => c.slug === category);
  };

  const categoryData = getCategory();
  const Icon = LucideIcons[
    categoryData?.icon as keyof typeof LucideIcons
  ] as React.ComponentType<{ className?: string }>;

  useEffect(() => {
    if (category && categoryData) {
      setLoading(true);
      getCategorySubcategories(category)
        .then(setCategoryIndex)
        .catch(console.error)
        .finally(() => setLoading(false));
    }
  }, [category, categoryData]);

  // Category detail view
  if (category) {
    if (!categoryData) {
      return (
        <Section className="p-3 mb-12">
          <Breadcrumbs className="mb-8" />
          <Banner
            type="error"
            title="Category not found"
            description="The category you are looking for does not exist."
            icon
          />
        </Section>
      );
    }

    return (
      <>
        <SEO
          title={categoryData.category || category}
          description={categoryData.description}
          keywords={`${categoryData.category}, government, local government`}
        />
        <Section className="p-3 mb-12">
          <Breadcrumbs className="mb-8" />
          {Icon && (
            <Icon className="h-8 w-8 mb-4 text-primary-600 rounded-md" />
          )}
          <Heading>{categoryData.category || category}</Heading>
          <Text className="text-gray-600 mb-6">{categoryData.description}</Text>

          {loading ? (
            <div className="flex justify-center items-center p-8">
              <Text>Loading officials...</Text>
            </div>
          ) : (
            <>
              {categoryIndex.title && (
                <Heading level={3}>{categoryIndex.title}</Heading>
              )}
              {categoryIndex.description && (
                <Text className="text-gray-600 mb-4">
                  {categoryIndex.description}
                </Text>
              )}
              {categoryIndex.layout === 'grid' ? (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {subcategories.map(subcategory => (
                    <Link
                      key={subcategory.slug}
                      to={`/government/${category}/${subcategory.slug}`}
                    >
                      <Card
                        hoverable
                        className="h-full border-t-4 border-primary-500"
                      >
                        <CardContent>
                          <h4 className="text-lg font-medium text-gray-900">
                            {subcategory.name}
                          </h4>
                          {subcategory.description && (
                            <p className="mt-2 text-sm text-gray-600">
                              {subcategory.description}
                            </p>
                          )}
                          <span className="inline-block px-2 py-1 mt-2 text-xs font-medium rounded-sm bg-gray-100 text-gray-800">
                            {categoryData.category || category}
                          </span>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  {subcategories.map(subcategory => (
                    <Link
                      key={subcategory.slug}
                      to={`/government/${category}/${subcategory.slug}`}
                    >
                      <Card hoverable className="mb-4">
                        <CardContent>
                          <h4 className="text-lg font-medium text-gray-900">
                            {subcategory.name}
                          </h4>
                          {subcategory.description && (
                            <p className="mt-2 text-sm text-gray-600">
                              {subcategory.description}
                            </p>
                          )}
                          <span className="inline-block px-2 py-1 mt-2 text-xs font-medium rounded-sm bg-gray-100 text-gray-800">
                            {categoryData.category || category}
                          </span>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              )}
            </>
          )}
        </Section>
      </>
    );
  }

  // Main government page (category list)
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
              {/* Executive Branch - Inline Officials */}
              <div className="border-b border-gray-100 pb-12">
                <div className="flex items-start gap-4 mb-6">
                  <LucideIcons.Crown className="h-8 w-8 text-primary-600 shrink-0 mt-1" />
                  <div className="flex-1">
                    <h2 className="text-2xl font-black text-gray-900 mb-2">
                      Executive Branch
                    </h2>
                    <p className="text-gray-600">
                      The executive officials leading Tanay's governance
                    </p>
                  </div>
                </div>
                <div className="space-y-4">
                  {OFFICIALS.map(official => (
                    <Card
                      key={official.initials}
                      hoverable
                      className="border-l-4 border-primary-500"
                    >
                      <CardContent>
                        <div className="flex items-start gap-4">
                          {/* Avatar */}
                          <div className="shrink-0 w-12 h-12 rounded-lg bg-primary-100 flex items-center justify-center">
                            <span className="text-lg font-bold text-primary-700">
                              {official.initials}
                            </span>
                          </div>

                          {/* Content */}
                          <div className="flex-1">
                            <p className="text-xs font-semibold text-primary-600 uppercase tracking-wide mb-1">
                              {official.title}
                            </p>
                            <h3 className="text-lg font-bold text-gray-900 mb-1">
                              {official.name}
                            </h3>
                            <p className="text-sm text-gray-600 mb-3">
                              {official.position}
                            </p>

                            {/* Contact Info */}
                            <div className="flex flex-col gap-2">
                              <a
                                href={`tel:${official.phone}`}
                                className="flex items-center gap-2 text-sm text-gray-700 hover:text-primary-600 transition-colors"
                              >
                                <Phone className="h-4 w-4 text-gray-400" />
                                {official.phone}
                              </a>
                              <a
                                href={`mailto:${official.email}`}
                                className="flex items-center gap-2 text-sm text-gray-700 hover:text-primary-600 transition-colors"
                              >
                                <Mail className="h-4 w-4 text-gray-400" />
                                {official.email}
                              </a>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Sangguniang Bayan Members */}
              <div className="border-b border-gray-100 pb-12">
                <div className="flex items-start gap-4 mb-6">
                  <Users className="h-8 w-8 text-primary-600 shrink-0 mt-1" />
                  <div className="flex-1">
                    <h2 className="text-2xl font-black text-gray-900 mb-2">
                      Sangguniang Bayan Members
                    </h2>
                    <p className="text-gray-600">
                      Municipal Councilors serving the people of Tanay
                    </p>
                  </div>
                </div>
                <Card hoverable className="border-l-4 border-primary-500">
                  <CardContent>
                    <p className="text-gray-600">
                      Coming soon - Information about our municipal councilors
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* Department Heads & Key Offices */}
              <div className="border-b border-gray-100 pb-12">
                <div className="flex items-start gap-4 mb-6">
                  <Briefcase className="h-8 w-8 text-primary-600 shrink-0 mt-1" />
                  <div className="flex-1">
                    <h2 className="text-2xl font-black text-gray-900 mb-2">
                      Department Heads & Key Offices
                    </h2>
                    <p className="text-gray-600">
                      Municipal offices providing services to citizens
                    </p>
                  </div>
                </div>
                <Card hoverable className="border-l-4 border-primary-500">
                  <CardContent>
                    <p className="text-gray-600">
                      Coming soon - Information about municipal departments
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* Barangays of Tanay */}
              <div className="border-b border-gray-100 pb-12 last:border-0">
                <div className="flex items-start gap-4 mb-6">
                  <MapPin className="h-8 w-8 text-primary-600 shrink-0 mt-1" />
                  <div className="flex-1">
                    <h2 className="text-2xl font-black text-gray-900 mb-2">
                      Barangays of Tanay
                    </h2>
                    <p className="text-gray-600">
                      20 Barangays serving our community
                    </p>
                  </div>
                </div>
                <Card hoverable className="border-l-4 border-primary-500">
                  <CardContent>
                    <p className="text-gray-600">
                      Coming soon - Information about our barangays
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Government;
