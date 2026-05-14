import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Calendar, Mountain } from 'lucide-react';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import { Heading } from '../ui/Heading';

const EVENT_KEYS = [
  'precolonial',
  'spanish',
  'relocation',
  'revolution',
  'american',
  'ww2',
  'present',
] as const;

function TimelineItem({
  eventKey,
  index,
}: {
  eventKey: string;
  index: number;
}) {
  const { t } = useTranslation('common');
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const year = t(`history.events.${eventKey}.year`);
  const title = t(`history.events.${eventKey}.title`);
  const text = t(`history.events.${eventKey}.text`);

  return (
    <div
      ref={ref}
      className="relative flex gap-6"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(20px)',
        transition: `opacity 0.5s ease ${index * 80}ms, transform 0.5s ease ${index * 80}ms`,
      }}
    >
      <div className="flex flex-col items-center shrink-0">
        <div className="w-3.5 h-3.5 rounded-full bg-primary-700 border-2 border-white ring-2 ring-primary-200 mt-1 shrink-0 z-10" />
        {index < EVENT_KEYS.length - 1 && (
          <div className="w-0.5 flex-1 bg-linear-to-b from-primary-300 to-primary-100 mt-1" />
        )}
      </div>

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 mb-5 flex-1 hover:shadow-md transition-shadow max-w-3xl">
        <span className="inline-block text-xs font-black text-primary-700 bg-primary-50 px-2.5 py-0.5 rounded-full mb-2 border border-primary-100">
          {year}
        </span>
        <h3 className="font-bold text-gray-900 text-sm mb-1">{title}</h3>
        <p className="text-gray-500 text-sm leading-relaxed">{text}</p>
      </div>
    </div>
  );
}

export default function HistorySection() {
  const { t } = useTranslation('common');
  const ref = useScrollReveal<HTMLElement>();
  const cardsRef = useRef<HTMLDivElement>(null);
  const [cardsVisible, setCardsVisible] = useState(false);

  useEffect(() => {
    const el = cardsRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setCardsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      className="reveal bg-gray-50 py-12 border-b border-gray-100"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <Heading level={4} className="font-black mb-6">
              {t('history.title')}
            </Heading>
            <div className="pl-2">
              {EVENT_KEYS.map((key, i) => (
                <TimelineItem key={key} eventKey={key} index={i} />
              ))}
            </div>
          </div>

          <div
            ref={cardsRef}
            className="flex flex-col gap-4 lg:sticky lg:top-12 lg:mt-16"
            style={{
              opacity: cardsVisible ? 1 : 0,
              transform: cardsVisible ? 'translateY(0)' : 'translateY(20px)',
              transition: 'opacity 0.5s ease, transform 0.5s ease',
            }}
          >
            <div className="bg-primary-700 rounded-2xl p-6 text-white max-w-md flex gap-4">
              <div className="bg-white/20 rounded-lg w-10 h-10 flex items-center justify-center shrink-0">
                <Calendar className="w-5 h-5" />
              </div>
              <div>
                <div className="text-blue-100 font-semibold text-sm mb-2">
                  {t('history.charteredYear')}
                </div>
                <p className="text-blue-200 text-sm leading-relaxed">
                  {t('history.charteredDesc')}
                </p>
              </div>
            </div>
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm max-w-md flex gap-4">
              <div className="bg-primary-100 rounded-lg w-10 h-10 flex items-center justify-center shrink-0">
                <Mountain className="w-5 h-5 text-primary-700" />
              </div>
              <div>
                <div className="text-gray-800 font-semibold text-sm mb-2">
                  {t('history.elevationLabel')}
                </div>
                <p className="text-gray-500 text-sm leading-relaxed">
                  {t('history.elevationDesc')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
