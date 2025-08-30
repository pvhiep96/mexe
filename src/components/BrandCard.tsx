'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { ArrowRightIcon, StarIcon } from '@heroicons/react/24/outline';

interface BrandCardProps {
  brand: {
    id: string;
    name: string;
    logo: string;
    description: string;
    foundedYear: number;
    country: string;
    specialties: string[];
    popularModels: string[];
    rating: number;
    totalProducts: number;
    backgroundImage?: string;
  };
}

export default function BrandCard({ brand }: BrandCardProps) {
  const t = useTranslations('brands');

  return (
    <div className="group relative overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
      {/* Background Image */}
      {brand.backgroundImage && (
        <div className="absolute inset-0 z-0">
          <Image
            src={brand.backgroundImage}
            alt={`${brand.name} background`}
            fill
            className="object-cover opacity-10 group-hover:opacity-20 transition-opacity duration-300"
          />
        </div>
      )}

      <div className="relative z-10 p-6">
        {/* Brand Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-white rounded-xl shadow-md flex items-center justify-center p-2">
              <Image
                src={brand.logo}
                alt={`${brand.name} logo`}
                width={48}
                height={48}
                className="object-contain"
              />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                {brand.name}
              </h3>
              <p className="text-sm text-gray-600">
                {t('founded_in')} {brand.foundedYear} • {brand.country}
              </p>
            </div>
          </div>
          
          {/* Rating */}
          <div className="flex items-center space-x-1">
            <StarIcon className="w-5 h-5 text-yellow-400 fill-current" />
            <span className="text-lg font-semibold text-gray-900">{brand.rating}</span>
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-700 mb-4 leading-relaxed">
          {brand.description}
        </p>

        {/* Specialties */}
        <div className="mb-4">
          <h4 className="text-sm font-semibold text-gray-900 mb-2">
            {t('specialties')}:
          </h4>
          <div className="flex flex-wrap gap-2">
            {brand.specialties.map((specialty, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-blue-100 text-blue-800 text-xs rounded-full font-medium"
              >
                {specialty}
              </span>
            ))}
          </div>
        </div>

        {/* Popular Models */}
        <div className="mb-6">
          <h4 className="text-sm font-semibold text-gray-900 mb-2">
            {t('popular_models')}:
          </h4>
          <div className="flex flex-wrap gap-2">
            {brand.popularModels.slice(0, 4).map((model, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
              >
                {model}
              </span>
            ))}
            {brand.popularModels.length > 4 && (
              <span className="px-3 py-1 bg-gray-100 text-gray-500 text-xs rounded-full">
                +{brand.popularModels.length - 4} {t('more')}
              </span>
            )}
          </div>
        </div>

        {/* Stats */}
        <div className="flex items-center justify-between mb-6 p-4 bg-gray-50 rounded-lg">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">{brand.totalProducts}+</div>
            <div className="text-xs text-gray-600">{t('products')}</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">{brand.rating}/5</div>
            <div className="text-xs text-gray-600">{t('rating')}</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">{brand.foundedYear}</div>
            <div className="text-xs text-gray-600">{t('established')}</div>
          </div>
        </div>

        {/* Action Button */}
        <Link
          href={`/brands/${brand.id}`}
          className="group/btn flex items-center justify-center w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105"
        >
          {t('explore_brand')}
          <ArrowRightIcon className="w-5 h-5 ml-2 group-hover/btn:translate-x-1 transition-transform" />
        </Link>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-4 right-4 w-20 h-20 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full transform rotate-45 group-hover:scale-110 transition-transform duration-300"></div>
      <div className="absolute bottom-4 left-4 w-12 h-12 bg-gradient-to-br from-pink-500/10 to-yellow-500/10 rounded-full group-hover:scale-110 transition-transform duration-300"></div>
    </div>
  );
}