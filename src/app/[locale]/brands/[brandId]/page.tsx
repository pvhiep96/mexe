'use client';

import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import { 
  ArrowLeftIcon, 
  StarIcon, 
  CalendarIcon, 
  GlobeAltIcon,
  TruckIcon,
  ShieldCheckIcon,
  CogIcon,
  BoltIcon
} from '@heroicons/react/24/outline';

export default function BrandDetailPage() {
  const params = useParams();
  const router = useRouter();
  const t = useTranslations('brands');
  const brandId = params.brandId as string;

  // Brand detail data - this would typically come from an API
  const brandDetails = {
    honda: {
      id: 'honda',
      name: 'Honda',
      logo: '/images/brand-logos/honda-logo.png',
      description: t('honda_description'),
      foundedYear: 1948,
      country: t('japan'),
      headquarters: 'Tokyo, Japan',
      founder: 'Soichiro Honda',
      employees: '220,000+',
      revenue: '$138 billion',
      specialties: [t('reliability'), t('fuel_efficiency'), t('innovation'), t('motorcycles')],
      popularModels: ['Civic', 'Accord', 'CR-V', 'Pilot', 'Fit', 'HR-V'],
      rating: 4.5,
      totalProducts: 125,
      history: [
        { year: 1946, event: 'Honda Technical Research Institute founded' },
        { year: 1948, event: 'Honda Motor Company established' },
        { year: 1963, event: 'First four-wheel vehicle production' },
        { year: 1972, event: 'CVCC engine developed (low emissions)' },
        { year: 1999, event: 'Insight hybrid vehicle launched' },
        { year: 2018, event: '70th anniversary celebration' }
      ],
      achievements: [
        'World\'s largest motorcycle manufacturer',
        'Pioneer in VTEC engine technology',
        'Leader in fuel-efficient vehicles',
        'Advanced safety technology (Honda SENSING)'
      ],
      heroImage: '/images/brands/honda-hero.jpg',
      galleryImages: [
        '/images/brands/honda-1.jpg',
        '/images/brands/honda-2.jpg',
        '/images/brands/honda-3.jpg',
        '/images/brands/honda-4.jpg'
      ]
    },
    toyota: {
      id: 'toyota',
      name: 'Toyota',
      logo: '/images/brand-logos/toyota-logo.png',
      description: t('toyota_description'),
      foundedYear: 1937,
      country: t('japan'),
      headquarters: 'Toyota City, Japan',
      founder: 'Kiichiro Toyoda',
      employees: '370,000+',
      revenue: '$280 billion',
      specialties: [t('hybrid_technology'), t('durability'), t('safety'), t('quality')],
      popularModels: ['Camry', 'Corolla', 'RAV4', 'Prius', 'Highlander', 'Vios'],
      rating: 4.7,
      totalProducts: 150,
      history: [
        { year: 1924, event: 'Toyoda Automatic Loom Works founded' },
        { year: 1937, event: 'Toyota Motor Company established' },
        { year: 1957, event: 'First overseas sales in USA' },
        { year: 1997, event: 'Prius hybrid vehicle launched' },
        { year: 2012, event: 'Became world\'s largest automaker' },
        { year: 2020, event: 'Toyota Smart City project announced' }
      ],
      achievements: [
        'World\'s largest automaker',
        'Pioneer in hybrid technology',
        'Toyota Production System (TPS)',
        'Most reliable automotive brand'
      ],
      heroImage: '/images/brands/toyota-hero.jpg',
      galleryImages: [
        '/images/brands/toyota-1.jpg',
        '/images/brands/toyota-2.jpg',
        '/images/brands/toyota-3.jpg',
        '/images/brands/toyota-4.jpg'
      ]
    },
    hyundai: {
      id: 'hyundai',
      name: 'Hyundai',
      logo: '/images/brand-logos/hyundai-logo.png',
      description: t('hyundai_description'),
      foundedYear: 1967,
      country: t('south_korea'),
      headquarters: 'Seoul, South Korea',
      founder: 'Chung Ju-yung',
      employees: '120,000+',
      revenue: '$87 billion',
      specialties: [t('design'), t('value'), t('warranty'), t('electric_vehicles')],
      popularModels: ['Elantra', 'Tucson', 'Santa Fe', 'Sonata', 'Kona', 'i10'],
      rating: 4.3,
      totalProducts: 95,
      history: [
        { year: 1947, event: 'Hyundai Engineering & Construction founded' },
        { year: 1967, event: 'Hyundai Motor Company established' },
        { year: 1976, event: 'First independent model Pony launched' },
        { year: 1986, event: 'First exports to USA' },
        { year: 2018, event: 'Kona Electric launched globally' },
        { year: 2021, event: 'IONIQ electric sub-brand launched' }
      ],
      achievements: [
        'World\'s 5th largest automaker',
        'Leader in electric vehicle technology',
        '10-year/100,000-mile warranty',
        'Award-winning design philosophy'
      ],
      heroImage: '/images/brands/hyundai-hero.jpg',
      galleryImages: [
        '/images/brands/hyundai-1.jpg',
        '/images/brands/hyundai-2.jpg',
        '/images/brands/hyundai-3.jpg',
        '/images/brands/hyundai-4.jpg'
      ]
    }
  };

  const brand = brandDetails[brandId as keyof typeof brandDetails];

  if (!brand) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Brand Not Found</h1>
          <Link href="/brands" className="text-blue-600 hover:text-blue-800">
            Back to Brands
          </Link>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-96 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900">
        {brand.heroImage && (
          <div className="absolute inset-0">
            <Image
              src={brand.heroImage}
              alt={`${brand.name} hero`}
              fill
              className="object-cover opacity-30"
            />
          </div>
        )}
        <div className="relative z-10 flex items-center h-full">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {/* Back Button */}
            <div className="mb-8">
              <Link
                href="/brands"
                className="inline-flex items-center text-white hover:text-gray-300 font-medium"
              >
                <ArrowLeftIcon className="w-5 h-5 mr-2" />
                Back to Brands
              </Link>
            </div>

            <div className="flex items-center space-x-8">
              <div className="w-24 h-24 bg-white rounded-2xl shadow-lg flex items-center justify-center p-4">
                <Image
                  src={brand.logo}
                  alt={`${brand.name} logo`}
                  width={80}
                  height={80}
                  className="object-contain"
                />
              </div>
              <div className="text-white">
                <h1 className="text-5xl font-bold mb-2">{brand.name}</h1>
                <p className="text-xl text-gray-300 mb-4">
                  {brand.founder} • {brand.foundedYear} • {brand.country}
                </p>
                <div className="flex items-center space-x-1">
                  <StarIcon className="w-6 h-6 text-yellow-400 fill-current" />
                  <span className="text-2xl font-semibold">{brand.rating}/5</span>
                  <span className="text-gray-300 ml-2">({brand.totalProducts} products)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12">
            {/* About Section */}
            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">About {brand.name}</h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-8">
                {brand.description}
              </p>

              {/* Key Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                <div className="text-center p-6 bg-blue-50 rounded-xl">
                  <CalendarIcon className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-blue-600">{brand.foundedYear}</div>
                  <div className="text-sm text-gray-600">Founded</div>
                </div>
                <div className="text-center p-6 bg-green-50 rounded-xl">
                  <TruckIcon className="w-8 h-8 text-green-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-green-600">{brand.totalProducts}+</div>
                  <div className="text-sm text-gray-600">Products</div>
                </div>
                <div className="text-center p-6 bg-purple-50 rounded-xl">
                  <GlobeAltIcon className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-purple-600">{brand.employees}</div>
                  <div className="text-sm text-gray-600">Employees</div>
                </div>
                <div className="text-center p-6 bg-yellow-50 rounded-xl">
                  <StarIcon className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-yellow-600">{brand.rating}/5</div>
                  <div className="text-sm text-gray-600">Rating</div>
                </div>
              </div>
            </section>

            {/* History Timeline */}
            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">History & Milestones</h2>
              <div className="space-y-6">
                {brand.history.map((item, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-blue-600 font-bold text-sm">{item.year}</span>
                    </div>
                    <div className="flex-1 pt-2">
                      <p className="text-gray-800 font-medium">{item.event}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Achievements */}
            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Key Achievements</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {brand.achievements.map((achievement, index) => (
                  <div key={index} className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg">
                    <ShieldCheckIcon className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                    <span className="text-gray-800">{achievement}</span>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Quick Info */}
            <div className="bg-gray-50 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Quick Info</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Headquarters:</span>
                  <span className="font-medium">{brand.headquarters}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Revenue:</span>
                  <span className="font-medium">{brand.revenue}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Employees:</span>
                  <span className="font-medium">{brand.employees}</span>
                </div>
              </div>
            </div>

            {/* Specialties */}
            <div className="bg-white border border-gray-200 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Specialties</h3>
              <div className="flex flex-wrap gap-2">
                {brand.specialties.map((specialty, index) => (
                  <span
                    key={index}
                    className="px-3 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
                  >
                    {specialty}
                  </span>
                ))}
              </div>
            </div>

            {/* Popular Models */}
            <div className="bg-white border border-gray-200 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Popular Models</h3>
              <div className="space-y-2">
                {brand.popularModels.map((model, index) => (
                  <div key={index} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
                    <span className="font-medium">{model}</span>
                    <CogIcon className="w-4 h-4 text-gray-400" />
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl p-6 text-white">
              <BoltIcon className="w-8 h-8 mb-4" />
              <h3 className="text-xl font-bold mb-2">Explore {brand.name} Products</h3>
              <p className="text-blue-100 mb-4">
                Discover accessories and parts specifically designed for {brand.name} vehicles.
              </p>
              <button className="w-full bg-white text-blue-600 py-3 px-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                View Products
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}