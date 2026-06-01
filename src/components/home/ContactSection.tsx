import { Phone, Mail, MapPin, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import { Heading } from '../ui/Heading';

export default function ContactSection() {
  const { t } = useTranslation('common');
  const ref = useScrollReveal<HTMLElement>();

  const CONTACTS = [
    {
      icon: Phone,
      labelKey: 'contact.phone',
      primary: import.meta.env.VITE_CONTACT_PHONE || '(02) 8924-7174',
      secondaryKey: 'contact.phoneHours',
      href: `tel:${(import.meta.env.VITE_CONTACT_PHONE || '0289247174').replace(/\D/g, '')}`,
      color: 'text-primary-700',
      bg: 'bg-primary-50',
    },
    {
      icon: Mail,
      labelKey: 'contact.email',
      primary: import.meta.env.VITE_CONTACT_EMAIL || 'contacts@tanay.gov.ph',
      secondaryKey: 'contact.emailResponse',
      href: `mailto:${import.meta.env.VITE_CONTACT_EMAIL || 'contacts@tanay.gov.ph'}`,
      color: 'text-green-700',
      bg: 'bg-green-50',
    },
    {
      icon: MapPin,
      labelKey: 'contact.address',
      primary: null,
      secondaryKey: 'contact.addressLine2',
      href: 'https://maps.google.com/?q=Tanay+Municipal+Hall+Rizal',
      color: 'text-orange-700',
      bg: 'bg-orange-50',
    },
  ];

  return (
    <section ref={ref} id="contact" className="reveal bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between mb-6">
          <Heading level={4} className="font-black mb-0">
            {t('contact.title')}
          </Heading>
          <Link
            to="/government#department-heads"
            className="text-sm font-semibold text-primary-700 hover:text-primary-800 flex items-center gap-1 transition-colors"
          >
            {t('contact.viewAll')}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {CONTACTS.map(
            ({
              icon: Icon,
              labelKey,
              primary,
              secondaryKey,
              href,
              color,
              bg,
            }) => (
              <a
                key={labelKey}
                href={href}
                target={labelKey === 'contact.address' ? '_blank' : undefined}
                rel="noreferrer"
                className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 flex gap-4 hover:shadow-md transition-shadow group"
              >
                <div
                  className={`shrink-0 w-11 h-11 rounded-xl ${bg} ${color} flex items-center justify-center`}
                >
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide mb-0.5">
                    {t(labelKey)}
                  </p>
                  <p
                    className={`font-bold text-sm ${color} group-hover:underline`}
                  >
                    {labelKey === 'contact.address'
                      ? t('contact.addressLine1')
                      : primary}
                  </p>
                  <p className="text-xs text-gray-600 mt-0.5">
                    {t(secondaryKey)}
                  </p>
                </div>
              </a>
            )
          )}
        </div>
      </div>
    </section>
  );
}
