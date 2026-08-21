import { useEffect, useRef, useState } from 'react';
import { ExternalLink, Facebook, Newspaper } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import { Heading } from '../ui/Heading';

const facebookPageUrl = 'https://www.facebook.com/tanayrizalgov/';

const facebookEmbedUrl = `https://www.facebook.com/plugins/page.php?href=${encodeURIComponent(
  facebookPageUrl
)}&tabs=timeline&width=500&height=620&small_header=true&adapt_container_width=true&hide_cover=false&show_facepile=false`;

export default function NewsSection() {
  const { t } = useTranslation('common');
  const [shouldLoadFeed, setShouldLoadFeed] = useState(false);
  const [feedLoaded, setFeedLoaded] = useState(false);
  const revealRef = useScrollReveal<HTMLElement>();
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    if (!('IntersectionObserver' in window)) {
      setShouldLoadFeed(true);
      return;
    }

    const observer = new IntersectionObserver(
      entries => {
        if (entries.some(entry => entry.isIntersecting)) {
          setShouldLoadFeed(true);
          observer.disconnect();
        }
      },
      { rootMargin: '300px 0px' }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  const setRefs = (el: HTMLElement | null) => {
    sectionRef.current = el;
    revealRef.current = el;
  };

  return (
    <section
      ref={setRefs}
      aria-labelledby="city-updates-title"
      className="reveal border-b border-gray-100 bg-gray-50 py-12 md:py-16"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,0.8fr)_minmax(320px,500px)] lg:items-center lg:justify-between">
          <div className="max-w-2xl">
            <span className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-primary-50 text-primary-700">
              <Newspaper className="h-6 w-6" />
            </span>
            <p className="mb-2 text-xs font-bold uppercase tracking-widest text-primary-700">
              {t('news.eyebrow')}
            </p>
            <Heading level={4} className="font-black mb-0">
              {t('news.heading')}
            </Heading>
            <p className="mt-3 leading-relaxed text-gray-500">
              {t('news.description')}
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href={facebookPageUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center gap-2 rounded-lg bg-primary-700 px-5 py-2.5 font-semibold text-white transition-colors hover:bg-primary-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
              >
                {t('news.viewOnFacebook')}
                <ExternalLink className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div className="mx-auto w-full max-w-125">
            {shouldLoadFeed ? (
              <div className="relative overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm">
                {!feedLoaded && (
                  <div className="absolute inset-x-0 top-0 z-10 flex h-155 flex-col items-center justify-center bg-white p-8 text-center">
                    <span className="flex h-14 w-14 animate-pulse items-center justify-center rounded-full bg-primary-50 text-primary-700">
                      <Facebook className="h-7 w-7" />
                    </span>
                    <p className="mt-4 font-semibold text-gray-800">
                      {t('news.loading')}
                    </p>
                  </div>
                )}
                <iframe
                  title={t('news.iframeTitle')}
                  src={facebookEmbedUrl}
                  width="500"
                  height="620"
                  className="block h-155 w-full border-0"
                  scrolling="no"
                  allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                  loading="lazy"
                  referrerPolicy="strict-origin-when-cross-origin"
                  onLoad={() => setFeedLoaded(true)}
                />
                <div className="border-t border-gray-100 bg-gray-50 p-3 text-center text-xs text-gray-500">
                  {t('news.fallbackText')}{' '}
                  <a
                    href={facebookPageUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-primary-700 hover:underline"
                  >
                    {t('news.openDirectly')}
                  </a>
                  .
                </div>
              </div>
            ) : (
              <div className="flex min-h-155 flex-col items-center justify-center rounded-xl border border-dashed border-gray-200 bg-white p-8 text-center">
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-primary-50 text-primary-700">
                  <Facebook className="h-7 w-7" />
                </span>
                <h3 className="mt-4 text-lg font-bold text-gray-900">
                  {t('news.placeholderTitle')}
                </h3>
                <p className="mt-2 max-w-sm text-sm leading-relaxed text-gray-500">
                  {t('news.placeholderDesc')}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
