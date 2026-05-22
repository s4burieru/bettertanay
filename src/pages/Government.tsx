import Section from '../components/ui/Section';
import { useParams, Link } from 'react-router-dom';
import { Heading } from '../components/ui/Heading';
import { Text } from '../components/ui/Text';
import {
  governmentCategories,
  getCategorySubcategories,
  type Subcategory,
  type CategoryIndex,
} from '../data/yamlLoader';
import * as LucideIcons from 'lucide-react';
import { Building2 } from 'lucide-react';
import Breadcrumbs from '../components/ui/Breadcrumbs';
import SEO from '../components/SEO';
import { Card, CardContent } from '@bettergov/kapwa/card';
import { Banner } from '@bettergov/kapwa/banner';
import { useState, useEffect } from 'react';

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

  if (!category) {
    return (
      <>
        <SEO
          title="Government"
          description={`Government departments and offices of the ${import.meta.env.VITE_GOVERNMENT_NAME} government. Find information about local government structure and services.`}
          keywords="government, departments, offices, local government, civic services"
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
              <h1 className="text-4xl sm:text-5xl font-black mb-3">
                Government
              </h1>
              <p className="text-blue-100 text-lg max-w-xl mx-auto">
                Meet the leadership and offices serving Tanay, Rizal, including
                elected officials and municipal departments.
              </p>
            </div>
          </div>

          {/* Government Categories */}
          <section className="bg-white py-12 border-b border-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
              <div className="mb-8">
                <h2 className="text-xl font-black text-gray-900">
                  Government Departments
                </h2>
                <p className="text-sm text-gray-500 mt-0.5">
                  Explore the various departments and offices of the municipal
                  government.
                </p>
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {governmentCategories.categories.map(categoryItem => {
                  const CategoryIcon = LucideIcons[
                    categoryItem.icon as keyof typeof LucideIcons
                  ] as React.ComponentType<{ className?: string }>;
                  return (
                    <Link
                      key={categoryItem.slug}
                      to={`/government/${categoryItem.slug}`}
                    >
                      <Card
                        hoverable
                        className="h-full border-t-4 border-primary-500"
                      >
                        <CardContent>
                          <div className="flex items-start gap-3 mb-3">
                            {CategoryIcon && (
                              <CategoryIcon className="h-6 w-6 text-primary-600 shrink-0" />
                            )}
                            <h3 className="text-lg font-semibold text-gray-900">
                              {categoryItem.category}
                            </h3>
                          </div>
                          {categoryItem.description && (
                            <p className="text-sm text-gray-600">
                              {categoryItem.description}
                            </p>
                          )}
                        </CardContent>
                      </Card>
                    </Link>
                  );
                })}
              </div>
            </div>
          </section>
        </main>
      </>
    );
  }
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
        keywords={`${categoryData.category}, government services, public services, local government`}
      />
      <Section className="p-3 mb-12">
        <Breadcrumbs className="mb-8" />
        <Icon className="h-8 w-8 mb-4 text-primary-600 rounded-md" />
        <Heading>{categoryData.category || category}</Heading>
        <Text className="text-gray-600 mb-6">{categoryData.description}</Text>

        {loading ? (
          <div className="flex justify-center items-center p-8">
            <Text>Loading services...</Text>
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
};

export default Government;
