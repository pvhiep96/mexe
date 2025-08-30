'use client';

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import BrandCard from '@/components/BrandCard';
import { MagnifyingGlassIcon, FunnelIcon } from '@heroicons/react/24/outline';

export default function BrandsPage() {
  const t = useTranslations('brands');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCountry, setFilterCountry] = useState('all');

  // Brand data - this would typically come from an API
  const brands = [
    {
      id: 'honda',
      name: 'Honda',
      logo: '/images/brand-logos/honda-logo.png',
      description: t('honda_description'),
      foundedYear: 1948,
      country: t('japan'),
      specialties: [t('reliability'), t('fuel_efficiency'), t('innovation'), t('motorcycles')],
      popularModels: ['Civic', 'Accord', 'CR-V', 'Pilot', 'Fit', 'HR-V'],
      rating: 4.5,
      totalProducts: 125,
      backgroundImage: '/images/brands/honda-bg.jpg'
    },
    {
      id: 'toyota',
      name: 'Toyota',
      logo: '/images/brand-logos/toyota-logo.png',
      description: t('toyota_description'),
      foundedYear: 1937,
      country: t('japan'),
      specialties: [t('hybrid_technology'), t('durability'), t('safety'), t('quality')],
      popularModels: ['Camry', 'Corolla', 'RAV4', 'Prius', 'Highlander', 'Vios'],
      rating: 4.7,
      totalProducts: 150,
      backgroundImage: '/images/brands/toyota-bg.jpg'
    },
    {
      id: 'hyundai',
      name: 'Hyundai',
      logo: '/images/brand-logos/hyundai-logo.png',
      description: t('hyundai_description'),
      foundedYear: 1967,
      country: t('south_korea'),
      specialties: [t('design'), t('value'), t('warranty'), t('electric_vehicles')],
      popularModels: ['Elantra', 'Tucson', 'Santa Fe', 'Sonata', 'Kona', 'i10'],
      rating: 4.3,
      totalProducts: 95,
      backgroundImage: '/images/brands/hyundai-bg.jpg'
    }
  ];

  const countries = ['all', t('japan'), t('south_korea')];

  const filteredBrands = brands.filter(brand => {
    const matchesSearch = brand.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         brand.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCountry = filterCountry === 'all' || brand.country === filterCountry;
    return matchesSearch && matchesCountry;
  });

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-900 via-blue-800 to-purple-800 text-white py-20">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            {t('page_title')}
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed">
            {t('page_description')}
          </p>
          <div className="flex justify-center space-x-8 text-lg">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
              <span>{brands.length} {t('trusted_brands')}</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-blue-400 rounded-full animate-pulse"></div>
              <span>{brands.reduce((sum, brand) => sum + brand.totalProducts, 0)}+ {t('products')}</span>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        {/* Search and Filter Section */}
        <div className="mb-12">
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Search */}
              <div className="flex-1 relative">
                <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder={t('search_brands')}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                />
              </div>

              {/* Country Filter */}
              <div className="relative">
                <FunnelIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <select
                  value={filterCountry}
                  onChange={(e) => setFilterCountry(e.target.value)}
                  className="pl-10 pr-8 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-white min-w-[150px]"
                >
                  {countries.map((country) => (
                    <option key={country} value={country}>
                      {country === 'all' ? t('all_countries') : country}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Results Summary */}
        <div className="mb-8">
          <p className="text-lg text-gray-700">
            {t('showing_results', { count: filteredBrands.length, total: brands.length })}
          </p>
        </div>

        {/* Brands Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 mb-12">
          {filteredBrands.map((brand) => (
            <BrandCard key={brand.id} brand={brand} />
          ))}
        </div>

        {/* No Results */}
        {filteredBrands.length === 0 && (
          <div className="text-center py-16">
            <div className="text-6xl text-gray-400 mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              {t('no_brands_found')}
            </h3>
            <p className="text-gray-500 mb-6">
              {t('try_different_search')}
            </p>
            <button
              onClick={() => {
                setSearchTerm('');
                setFilterCountry('all');
              }}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              {t('clear_filters')}
            </button>
          </div>
        )}

        {/* Call to Action */}
        <section className="mt-20 bg-gradient-to-r from-purple-600 to-blue-600 rounded-3xl p-8 md:p-12 text-white text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {t('cta_title')}
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            {t('cta_description')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-purple-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              {t('contact_us')}
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-purple-600 transition-colors">
              {t('view_products')}
            </button>
          </div>
        </section>
      </div>
    </main>
  );
}