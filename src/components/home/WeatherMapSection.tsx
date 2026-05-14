import { useState, useEffect } from 'react';
import { Wind, Thermometer, Cloud } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import { Heading } from '../ui/Heading';

interface WeatherData {
  temp: number;
  windspeed: number;
  weathercode: number;
}

function getWeatherLabel(code: number, t: (k: string) => string): string {
  if (code === 0) return t('weatherMap.clear') || 'Clear sky';
  if (code <= 3) return t('weatherMap.partlyCloudy') || 'Partly cloudy';
  if (code <= 48) return t('weatherMap.foggy') || 'Foggy';
  if (code <= 67) return t('weatherMap.rainy') || 'Rainy';
  if (code <= 82) return t('weatherMap.showers') || 'Showers';
  if (code <= 99) return t('weatherMap.thunderstorm') || 'Thunderstorm';
  return t('weatherMap.defaultCondition');
}

export default function WeatherMapSection() {
  const { t } = useTranslation('common');
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const ref = useScrollReveal<HTMLElement>();

  useEffect(() => {
    const cached = localStorage.getItem('bi_weather_full');
    const cachedTime = localStorage.getItem('bi_weather_full_time');
    const THIRTY_MIN = 1_800_000;

    if (
      cached &&
      cachedTime &&
      Date.now() - parseInt(cachedTime) < THIRTY_MIN
    ) {
      setWeather(JSON.parse(cached));
      return;
    }

    fetch(
      'https://api.open-meteo.com/v1/forecast?latitude=14.4968&longitude=121.2846&current_weather=true'
    )
      .then(r => r.json())
      .then(data => {
        if (data?.current_weather) {
          const w: WeatherData = {
            temp: Math.round(data.current_weather.temperature),
            windspeed: Math.round(data.current_weather.windspeed),
            weathercode: data.current_weather.weathercode,
          };
          localStorage.setItem('bi_weather_full', JSON.stringify(w));
          localStorage.setItem('bi_weather_full_time', String(Date.now()));
          setWeather(w);
        }
      })
      .catch(() => {});
  }, []);

  return (
    <section
      ref={ref}
      className="reveal bg-gray-50 py-12 border-b border-gray-100"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <Heading level={4} className="font-black mb-6">
          {t('weatherMap.title')}
        </Heading>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Weather widget */}
          <div className="bg-primary-700 rounded-2xl p-6 text-white flex flex-col justify-between min-h-55">
            <div>
              <p className="text-blue-200 text-sm font-semibold mb-1">
                {t('weatherMap.location')}
              </p>
              <div className="flex items-end gap-3 mb-2">
                <span className="text-6xl font-black leading-none">
                  {weather ? `${weather.temp}°` : '27°'}
                </span>
                <span className="text-2xl font-semibold text-blue-200 pb-1">
                  C
                </span>
              </div>
              <p className="text-blue-100 text-base font-medium">
                {weather
                  ? getWeatherLabel(weather.weathercode, t)
                  : t('weatherMap.defaultCondition')}
              </p>
            </div>
            <div className="flex gap-6 mt-6 pt-4 border-t border-white/20">
              <span className="flex items-center gap-1.5 text-sm text-blue-100">
                <Wind className="h-4 w-4 opacity-70" />
                {weather
                  ? `${weather.windspeed} ${t('weatherMap.wind')}`
                  : `-- ${t('weatherMap.wind')}`}
              </span>
              <span className="flex items-center gap-1.5 text-sm text-blue-100">
                <Thermometer className="h-4 w-4 opacity-70" />
                {t('weatherMap.climate')}
              </span>
            </div>
            {!weather && (
              <div className="mt-3 flex items-center gap-2 text-blue-200 text-xs">
                <Cloud className="h-3.5 w-3.5 animate-pulse" />
                {t('weatherMap.loading')}
              </div>
            )}
          </div>

          {/* OpenStreetMap — centered on Tanay, Rizal */}
          <div className="rounded-2xl overflow-hidden border border-gray-200 shadow-sm min-h-55">
            <iframe
              title={t('weatherMap.mapTitle')}
              src="https://www.openstreetmap.org/export/embed.html?bbox=121.2615104280789%2C14.480140443518907%2C121.31425338614774%2C14.514999923785654&amp;layer=mapnik"
              className="w-full h-full min-h-55"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
