import {
  governmentCategories,
  getCategorySubcategories,
  type Subcategory,
  type CategoryIndex,
} from '../data/yamlLoader';
import { useParams, Link } from 'react-router-dom';
import * as LucideIcons from 'lucide-react';
import {
  Building2,
  Mail,
  Phone,
  Users,
  Briefcase,
  MapPin,
  ExternalLink,
} from 'lucide-react';
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

interface Councilor {
  name: string;
  title: string;
  designation: string;
  initials: string;
}

interface Department {
  name: string;
  phone?: string;
  phones?: string[];
  email?: string;
  icon: keyof typeof LucideIcons;
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

const SANGGUNIANG_BAYAN_MEMBERS: Councilor[] = [
  {
    name: 'Hon. Joy T. Tica',
    title: 'Chairperson of the Committee on Health and Sanitation',
    designation: 'SB Member',
    initials: 'JT',
  },
  {
    name: 'Hon. Gina P. Berdan',
    title: 'Chairperson of the Committee on Tourism and Cultural Heritage',
    designation: 'SB Member',
    initials: 'GB',
  },
  {
    name: 'Hon. Nelson M. Ocampo',
    title: 'Chairperson of the Committee on Appropriations and Finance',
    designation: 'SB Member',
    initials: 'NO',
  },
  {
    name: 'Hon. Angelo S. Pitoral',
    title: 'Chairperson of the Committee on Public Works and Infrastructure',
    designation: 'SB Member',
    initials: 'AP',
  },
  {
    name: 'Hon. Enrique S. Vergel De Dios',
    title:
      'Chairperson of the Committee on Public Order, Safety, and Disaster Risk Reduction',
    designation: 'SB Member',
    initials: 'EV',
  },
  {
    name: 'Hon. Rogelio D. Cartolos Jr.',
    title: 'Chairperson of the Committee on Agriculture, Fishery, and Food',
    designation: 'SB Member',
    initials: 'RC',
  },
  {
    name: 'Hon. Harold F. Catameo',
    title: 'Chairperson of the Committee on Trade, Commerce, and Industry',
    designation: 'SB Member',
    initials: 'HC',
  },
  {
    name: 'Hon. Paula B. De Guzman',
    title: 'Chairperson of the Committee on Women, Family, and Social Services',
    designation: 'SB Member',
    initials: 'PG',
  },
  {
    name: 'Hon. Arlene Bacos',
    title: 'President of the Liga ng mga Barangay',
    designation: 'Ex-Officio SB Member',
    initials: 'AB',
  },
  {
    name: 'Hon. Keith Dallen Juco',
    title: 'President of the Pederasyon ng mga Sangguniang Kabataan',
    designation: 'Ex-Officio SB Member',
    initials: 'KJ',
  },
  {
    name: 'Hon. Virginia Arbulado',
    title: 'Indigenous Peoples Mandatory Representative',
    designation: 'Sectoral Representative',
    initials: 'VA',
  },
];

const DEPARTMENTS: Department[] = [
  {
    name: 'Office of the Mayor',
    phone: '(02) 8655-2195',
    icon: 'Building2',
  },
  {
    name: 'Municipal Administrator Office',
    phone: '(02) 8655-2195',
    icon: 'Briefcase',
  },
  {
    name: 'Municipal Legal Office',
    phone: '(02) 8942-7174 loc. 239',
    icon: 'Scale',
  },
  {
    name: 'Office of the Sangguniang Bayan',
    phone: '(02) 8655-2195',
    icon: 'Users',
  },
  {
    name: 'Secretary to the Sanggunian',
    phone: '(02) 8655-2195',
    icon: 'FileText',
  },
  {
    name: "Municipal Treasurer's Office",
    phone: '(02) 8655-2195',
    icon: 'DollarSign',
  },
  {
    name: 'Municipal Budget Office',
    phone: '(02) 8655-2195',
    icon: 'BarChart3',
  },
  {
    name: "Municipal Accountant's Office",
    phone: '(02) 8655-2195',
    icon: 'Calculator',
  },
  {
    name: 'Business Permits and Licensing Office (BPLO)',
    phone: '(02) 8655-2195',
    icon: 'FileCheck',
  },
  {
    name: 'Municipal Planning and Development Office (MPDO)',
    phone: '(02) 8655-2195',
    icon: 'Map',
  },
  {
    name: "Municipal Assessor's Office",
    phone: '(02) 8655-2195',
    icon: 'Home',
  },
  {
    name: 'Municipal Engineering Office',
    phone: '(02) 8655-2195',
    icon: 'Hammer',
  },
  {
    name: 'General Services Department (GSD)',
    phone: '(02) 8655-2195',
    icon: 'Settings',
  },
  {
    name: 'Municipal Agricultural Office',
    phone: '(02) 8655-2195',
    icon: 'Leaf',
  },
  {
    name: 'Municipal Social Welfare and Development Office (MSWDO)',
    phone: '(02) 8655-2195',
    icon: 'Heart',
  },
  {
    name: 'Municipal Health Office (MHO)',
    phone: '(02) 8655-2195',
    icon: 'Stethoscope',
  },
  {
    name: 'Municipal Disaster Risk Reduction and Management Office (MDRRMO)',
    phone: '(02) 8655-2195',
    icon: 'AlertTriangle',
  },
  {
    name: 'Municipal Population Management Office',
    phone: '(02) 8655-2195',
    icon: 'Users',
  },
  {
    name: 'Human Resource Management Office (HRMO)',
    phone: '(02) 8655-2195',
    icon: 'Users',
  },
  {
    name: 'Tourism Office',
    phone: '(02) 8655-2195',
    icon: 'MapPin',
  },
  {
    name: 'Municipal Environment and Natural Resources Office (MENRO)',
    phone: '(02) 8655-2195',
    icon: 'TreePine',
  },
  {
    name: 'Municipal Anti-Drug Abuse Council (MADAC)',
    phone: '(02) 8655-2195',
    icon: 'Shield',
  },
  {
    name: 'Public Employment Service Office (PESO)',
    phone: '(02) 8942-7174 loc. 228',
    email: 'pesotanayjobs@gmail.com',
    icon: 'Zap',
  },
  {
    name: 'Information Management Systems (IMS) Office',
    phone: '(02) 8655-2195',
    icon: 'Settings',
  },
  {
    name: 'Public Information Office (PIO)',
    phone: '(02) 8655-2195',
    icon: 'FileText',
  },
  {
    name: 'Tanay Technology and Livelihood Development Center (TTLDC)',
    phone: '(02) 8655-2195',
    icon: 'Zap',
  },
  {
    name: 'Himlayang Bayan Office',
    phone: '(02) 8655-2195',
    icon: 'Flower2',
  },
  {
    name: 'Tanay Municipal Police Station',
    phones: ['(02) 8654-9347', '0907-827-9401'],
    icon: 'Shield',
  },
  {
    name: 'Tanay Water District',
    phones: [
      '(02) 8654-4450',
      '(02) 8654-0033',
      '0929-171-8099',
      '0915-173-6017',
    ],
    email: 'ogm.tanwd@gmail.com',
    icon: 'Droplet',
  },
  {
    name: 'Municipal Trial Court (MTC) Tanay',
    phones: ['(02) 8655-5726', '0917-504-2829'],
    icon: 'Scale',
  },
];

interface Barangay {
  name: string;
  captain: string;
  contact: string;
}

const BARANGAYS: Barangay[] = [
  {
    name: 'Cayabu',
    captain: 'to follow',
    contact: 'to follow',
  },
  {
    name: 'Cuyambay',
    captain: 'to follow',
    contact: 'to follow',
  },
  {
    name: 'Daraitan',
    captain: 'to follow',
    contact: 'to follow',
  },
  {
    name: 'Katipunan-Bayan (Poblacion)',
    captain: 'to follow',
    contact: 'to follow',
  },
  {
    name: 'Kaybuto (Poblacion)',
    captain: 'to follow',
    contact: 'to follow',
  },
  {
    name: 'Laiban',
    captain: 'to follow',
    contact: 'to follow',
  },
  {
    name: 'Mag-Ampon (Poblacion)',
    captain: 'to follow',
    contact: 'to follow',
  },
  {
    name: 'Mamuyao',
    captain: 'to follow',
    contact: 'to follow',
  },
  {
    name: 'Pinagkamaligan (Poblacion)',
    captain: 'to follow',
    contact: 'to follow',
  },
  {
    name: 'Plaza Aldea (Poblacion)',
    captain: 'to follow',
    contact: 'to follow',
  },
  {
    name: 'Sampaloc',
    captain: 'to follow',
    contact: 'to follow',
  },
  {
    name: 'San Andres',
    captain: 'to follow',
    contact: 'to follow',
  },
  {
    name: 'San Isidro (Poblacion)',
    captain: 'to follow',
    contact: 'to follow',
  },
  {
    name: 'Santa Inez',
    captain: 'to follow',
    contact: 'to follow',
  },
  {
    name: 'Santo Niño',
    captain: 'to follow',
    contact: 'to follow',
  },
  {
    name: 'Tabing Ilog (Poblacion)',
    captain: 'to follow',
    contact: 'to follow',
  },
  {
    name: 'Tandang Kutyo (Poblacion)',
    captain: 'to follow',
    contact: 'to follow',
  },
  {
    name: 'Tinucan',
    captain: 'to follow',
    contact: 'to follow',
  },
  {
    name: 'Wawa (Poblacion)',
    captain: 'Kap. Sigfredo A. Santos',
    contact: '86544263',
  },
  {
    name: 'Madilay-dilay',
    captain: 'to follow',
    contact: 'to follow',
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
          {Icon && <Icon className="h-8 w-8 mb-4 text-green-600 rounded-md" />}
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
                  <LucideIcons.Crown className="h-8 w-8 text-primary-700 shrink-0 mt-1" />
                  <div className="flex-1">
                    <h2 className="text-xl font-black text-gray-900 mb-2">
                      Executive Branch
                    </h2>
                    <p className="text-sm text-gray-500">
                      The executive officials leading Tanay's governance
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {OFFICIALS.map(official => (
                    <div
                      key={official.initials}
                      className="bg-white rounded-xl border border-gray-100 border-t-4 border-t-primary-700 shadow-sm overflow-hidden hover:shadow-md transition-shadow"
                    >
                      <div className="p-5 flex gap-4">
                        {/* Avatar */}
                        <div className="shrink-0 w-14 h-14 rounded-full bg-primary-100 text-primary-700 flex items-center justify-center font-black text-xs text-center leading-tight">
                          {official.initials}
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <span className="inline-block text-xs font-semibold text-primary-700 bg-primary-50 px-2 py-0.5 rounded-full border border-primary-100 mb-1.5">
                            {official.title}
                          </span>
                          <h3 className="font-black text-gray-900 text-sm leading-snug mb-0.5 truncate">
                            {official.name}
                          </h3>
                          <p className="text-gray-500 text-xs mb-3">
                            {official.position}
                          </p>

                          {/* Contact Info */}
                          <div className="flex flex-col gap-1.5">
                            <a
                              href={`tel:${official.phone}`}
                              className="flex items-center gap-2 text-xs text-gray-600 hover:text-primary-700 transition-colors"
                            >
                              <Phone className="h-3.5 w-3.5 text-primary-500" />
                              {official.phone}
                            </a>
                            <a
                              href={`mailto:${official.email}`}
                              className="flex items-center gap-2 text-xs text-gray-600 hover:text-primary-700 transition-colors"
                            >
                              <Mail className="h-3.5 w-3.5 text-primary-500" />
                              {official.email}
                            </a>
                          </div>
                        </div>

                        {/* External Link */}
                        <div className="shrink-0 self-start">
                          <Link
                            to="/government"
                            className="text-primary-400 hover:text-primary-700 transition-colors"
                            aria-label="View profile"
                          >
                            <ExternalLink className="h-4 w-4" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Sangguniang Bayan Members */}
              <div className="border-b border-gray-100 pb-12">
                <div className="flex items-start gap-4 mb-6">
                  <Users className="h-8 w-8 text-primary-700 shrink-0 mt-1" />
                  <div className="flex-1">
                    <h2 className="text-xl font-black text-gray-900 mb-2">
                      Sangguniang Bayan Members
                    </h2>
                    <p className="text-sm text-gray-500">
                      Municipal Councilors serving the people of Tanay
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {SANGGUNIANG_BAYAN_MEMBERS.map(councilor => (
                    <div
                      key={councilor.initials}
                      className={`bg-white rounded-xl border border-gray-100 border-l-4 ${councilor.initials === 'AB' ? 'border-l-green-700' : councilor.initials === 'KJ' ? 'border-l-orange-700' : councilor.initials === 'VA' ? 'border-l-amber-800' : 'border-l-primary-700'} shadow-sm overflow-hidden hover:shadow-md transition-shadow`}
                    >
                      <div className="p-5 flex gap-4">
                        {/* Avatar */}
                        <div
                          className={`shrink-0 w-14 h-14 rounded-full ${councilor.initials === 'AB' ? 'bg-green-100 text-green-700' : councilor.initials === 'KJ' ? 'bg-orange-100 text-orange-700' : councilor.initials === 'VA' ? 'bg-amber-100 text-amber-800' : 'bg-primary-100 text-primary-700'} flex items-center justify-center font-black text-xs text-center leading-tight`}
                        >
                          {councilor.initials}
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <span
                            className={`inline-block text-xs font-semibold ${councilor.initials === 'AB' ? 'text-green-700 bg-green-50 border-green-200' : councilor.initials === 'KJ' ? 'text-orange-700 bg-orange-50 border-orange-200' : councilor.initials === 'VA' ? 'text-amber-800 bg-amber-50 border-amber-200' : 'text-primary-700 bg-primary-50 border-primary-100'} px-2 py-0.5 rounded-full border mb-1.5`}
                          >
                            {councilor.designation}
                          </span>
                          <h3 className="font-black text-gray-900 text-sm leading-snug mb-0.5 truncate">
                            {councilor.name}
                          </h3>
                          <p className="text-gray-500 text-xs line-clamp-2">
                            {councilor.title}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Department Heads & Key Offices */}
              <div className="border-b border-gray-100 pb-12">
                <div className="flex items-start gap-4 mb-6">
                  <Briefcase className="h-8 w-8 text-primary-700 shrink-0 mt-1" />
                  <div className="flex-1">
                    <h2 className="text-xl font-black text-gray-900 mb-2">
                      Department Heads & Key Offices
                    </h2>
                    <p className="text-sm text-gray-500">
                      Municipal offices providing services to citizens
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {DEPARTMENTS.map(dept => {
                    const DeptIcon = LucideIcons[
                      dept.icon
                    ] as React.ComponentType<{ className?: string }>;
                    return (
                      <div
                        key={dept.name}
                        className="bg-white rounded-xl border border-gray-100 border-l-4 border-l-primary-700 shadow-sm overflow-hidden hover:shadow-md transition-shadow"
                      >
                        <div className="p-5 flex gap-4">
                          {/* Icon */}
                          <div className="shrink-0 text-primary-700">
                            {DeptIcon && <DeptIcon className="h-6 w-6" />}
                          </div>

                          {/* Content */}
                          <div className="flex-1 min-w-0">
                            <h3 className="font-black text-gray-900 text-sm leading-snug mb-3">
                              {dept.name}
                            </h3>

                            {/* Contact Info */}
                            <div className="flex flex-col gap-1.5">
                              {dept.phones ? (
                                dept.phones.map((phoneNum, idx) => (
                                  <a
                                    key={idx}
                                    href={`tel:${phoneNum.replace(/\D/g, '')}`}
                                    className="flex items-center gap-2 text-xs text-gray-600 hover:text-primary-700 transition-colors"
                                  >
                                    <Phone className="h-3.5 w-3.5 text-primary-500" />
                                    <span className="truncate">{phoneNum}</span>
                                  </a>
                                ))
                              ) : dept.phone && dept.phone !== '—' ? (
                                <a
                                  href={`tel:${dept.phone}`}
                                  className="flex items-center gap-2 text-xs text-gray-600 hover:text-primary-700 transition-colors"
                                >
                                  <Phone className="h-3.5 w-3.5 text-primary-500" />
                                  <span className="truncate">{dept.phone}</span>
                                </a>
                              ) : (
                                <div className="flex items-center gap-2 text-xs text-gray-600">
                                  <Phone className="h-3.5 w-3.5 text-primary-500" />
                                  <span className="truncate">{dept.phone}</span>
                                </div>
                              )}
                              {dept.email && (
                                <a
                                  href={`mailto:${dept.email}`}
                                  className="flex items-center gap-2 text-xs text-gray-600 hover:text-primary-700 transition-colors"
                                >
                                  <Mail className="h-3.5 w-3.5 text-primary-500" />
                                  <span className="truncate">{dept.email}</span>
                                </a>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Barangays of Tanay */}
              <div className="border-b border-gray-100 pb-12 last:border-0">
                <div className="flex items-start gap-4 mb-6">
                  <MapPin className="h-8 w-8 text-primary-700 shrink-0 mt-1" />
                  <div className="flex-1">
                    <h2 className="text-xl font-black text-gray-900 mb-2">
                      Barangays of Tanay
                    </h2>
                    <p className="text-sm text-gray-500">
                      20 Barangays serving our community
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {BARANGAYS.map((barangay, idx) => (
                    <Card
                      key={idx}
                      hoverable
                      className="border-t-4 border-primary-700"
                    >
                      <CardContent>
                        <div className="flex items-start gap-2 mb-3">
                          <MapPin className="h-5 w-5 text-primary-700 shrink-0 mt-0.5" />
                          <h3 className="font-black text-gray-900 text-sm">
                            {barangay.name}
                          </h3>
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-gray-600">
                              {barangay.captain}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Phone className="h-3 w-3 text-primary-700 shrink-0" />
                            <span className="text-xs text-gray-600">
                              {barangay.contact}
                            </span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Government;
