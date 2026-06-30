import SmoothScroll from '@/components/SmoothScroll';
import Navbar from '@/components/Navbar';
import ScrollProgress from '@/components/ScrollProgress';
import LuxuryHomepage from '@/components/LuxuryHomepage';

const faqItems = [
  {
    question: 'Do you offer Zurich Airport transfers?',
    answer:
      'Yes. ALAIR NOIR arranges private transfers to and from Zurich Airport with flight-aware timing, direct communication, luggage consideration, and onward movement to hotels, residences, offices, events, or long-distance destinations.',
  },
  {
    question: 'Can I book for a CEO, principal, executive, guest, or client?',
    answer:
      'Yes. Many requests are made by executive assistants, family offices, corporate bookers, concierge teams, and private offices arranging travel on behalf of someone else.',
  },
  {
    question: 'Which vehicles are available?',
    answer:
      'ALAIR NOIR offers the BMW i7 xDrive60 and Mercedes-Benz V-Class. Vehicle recommendation depends on passenger count, luggage, journey type, and preferred cabin experience.',
  },
  {
    question: 'Do you operate outside Zurich?',
    answer:
      'Yes. ALAIR NOIR arranges journeys across Switzerland and selected European routes by request, including Davos, St. Moritz, Basel, Geneva, Lucerne, Gstaad, Milan, and Munich.',
  },
];

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'LocalBusiness',
      '@id': 'https://alairnoir.ch/#business',
      name: 'ALAIR NOIR GmbH',
      description:
        'Private chauffeur service in Zurich for CEOs, executives, private clients, family offices, airport arrivals, events, and long-distance journeys across Switzerland and selected European routes.',
      telephone: '+41772870956',
      email: 'booking@alairnoir.ch',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Zurich',
        addressCountry: 'CH',
      },
      areaServed: ['Zurich', 'Switzerland', 'Davos', 'St. Moritz', 'Geneva', 'Basel', 'Lucerne', 'Milan', 'Munich'],
    },
    {
      '@type': 'Organization',
      '@id': 'https://alairnoir.ch/#organization',
      name: 'ALAIR NOIR GmbH',
      url: 'https://alairnoir.ch',
      contactPoint: {
        '@type': 'ContactPoint',
        contactType: 'booking',
        telephone: '+41772870956',
        email: 'booking@alairnoir.ch',
      },
    },
    {
      '@type': 'Service',
      name: 'Private chauffeur service in Zurich',
      provider: { '@id': 'https://alairnoir.ch/#business' },
      serviceType: 'Private chauffeur service',
      areaServed: 'Switzerland',
      offers: {
        '@type': 'Offer',
        availability: 'https://schema.org/InStock',
        priceSpecification: {
          '@type': 'PriceSpecification',
          priceCurrency: 'CHF',
          description: 'Rates confirmed by route, vehicle, waiting time, passenger count, luggage, schedule requirements, and event demand.',
        },
      },
    },
    {
      '@type': 'FAQPage',
      mainEntity: faqItems.map((item) => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: item.answer,
        },
      })),
    },
  ],
};

export default function Home() {
  return (
    <SmoothScroll>
      <Navbar />
      <ScrollProgress />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <LuxuryHomepage />
    </SmoothScroll>
  );
}
