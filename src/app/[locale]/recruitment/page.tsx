'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { 
  BriefcaseIcon, 
  MapPinIcon, 
  ClockIcon, 
  BuildingOfficeIcon,
  CheckCircleIcon,
  StarIcon,
  PaperAirplaneIcon,
  PhoneIcon
} from '@heroicons/react/24/outline';

// Mock job data
const JOB_POSITIONS = [
  {
    id: 1,
    title: 'Marketing Executive',
    department: 'Marketing',
    type: 'fulltime',
    location: 'Hà Nội',
    experience: '2-3 năm',
    salary: '15-20 triệu',
    hot: true,
    requirements: [
      'Tốt nghiệp Đại học chuyên ngành Marketing, Kinh tế hoặc tương đương',
      'Có ít nhất 2-3 năm kinh nghiệm trong lĩnh vực Marketing',
      'Thành thạo các công cụ Marketing online và offline',
      'Kỹ năng giao tiếp và thuyết trình tốt',
      'Có khả năng làm việc nhóm và chịu được áp lực cao'
    ],
    benefits: [
      'Lương thưởng cạnh tranh theo năng lực',
      'Bảo hiểm xã hội, bảo hiểm y tế đầy đủ',
      'Môi trường làm việc trẻ trung, năng động',
      'Cơ hội thăng tiến rõ ràng',
      'Được đào tạo và phát triển kỹ năng thường xuyên'
    ]
  },
  {
    id: 2,
    title: 'Sales Executive',
    department: 'Sales',
    type: 'fulltime',
    location: 'TP. Hồ Chí Minh',
    experience: '1-2 năm',
    salary: '12-18 triệu',
    hot: false,
    requirements: [
      'Tốt nghiệp Đại học các chuyên ngành Kinh tế, Marketing',
      'Có kinh nghiệm bán hàng từ 1-2 năm',
      'Kỹ năng giao tiếp và thuyết phục khách hàng tốt',
      'Có khả năng làm việc độc lập và theo nhóm',
      'Có xe máy và bằng lái xe'
    ],
    benefits: [
      'Lương cơ bản + hoa hồng theo doanh số',
      'Bảo hiểm xã hội, bảo hiểm y tế đầy đủ',
      'Thưởng theo thành tích bán hàng',
      'Môi trường làm việc năng động, cạnh tranh',
      'Cơ hội thăng tiến nhanh chóng'
    ]
  },
  {
    id: 3,
    title: 'Customer Service',
    department: 'Customer Service',
    type: 'fulltime',
    location: 'Hà Nội',
    experience: '1-2 năm',
    salary: '10-15 triệu',
    hot: false,
    requirements: [
      'Tốt nghiệp Đại học các chuyên ngành liên quan',
      'Có kinh nghiệm chăm sóc khách hàng từ 1-2 năm',
      'Kỹ năng giao tiếp và xử lý tình huống tốt',
      'Thành thạo tin học văn phòng',
      'Có khả năng làm việc theo ca'
    ],
    benefits: [
      'Lương cơ bản + thưởng theo hiệu suất',
      'Bảo hiểm xã hội, bảo hiểm y tế đầy đủ',
      'Môi trường làm việc thân thiện',
      'Được đào tạo kỹ năng chuyên môn',
      'Cơ hội chuyển đổi sang các vị trí khác'
    ]
  }
];

export default function RecruitmentPage() {
  const t = useTranslations('footer.recruitment');
  const [selectedJobType, setSelectedJobType] = useState('all');
  const [selectedDepartment, setSelectedDepartment] = useState('all');

  const filteredJobs = JOB_POSITIONS.filter(job => {
    const typeMatch = selectedJobType === 'all' || job.type === selectedJobType;
    const deptMatch = selectedDepartment === 'all' || job.department === selectedDepartment;
    return typeMatch && deptMatch;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            {t('title')}
          </h1>
          <p className="text-xl md:text-2xl mb-6 opacity-90">
            {t('hero_subtitle')}
          </p>
          <p className="text-lg md:text-xl opacity-80 max-w-3xl mx-auto">
            {t('hero_description')}
          </p>
        </div>
      </div>

      {/* Filter Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 text-gray-800">
            {t('filter_title')}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('job_type_label')}
              </label>
              <select
                value={selectedJobType}
                onChange={(e) => setSelectedJobType(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">{t('all')}</option>
                <option value="fulltime">{t('fulltime')}</option>
                <option value="parttime">{t('parttime')}</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('department_label')}
              </label>
              <select
                value={selectedDepartment}
                onChange={(e) => setSelectedDepartment(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">{t('all')}</option>
                <option value="Marketing">Marketing</option>
                <option value="Sales">Sales</option>
                <option value="Customer Service">Customer Service</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Job Listings */}
      <div className="container mx-auto px-4 pb-12">
        {filteredJobs.length > 0 ? (
          <div className="space-y-6">
            {filteredJobs.map((job) => (
              <div key={job.id} className="bg-white rounded-lg shadow-lg p-6 md:p-8 hover:shadow-xl transition-shadow">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl md:text-2xl font-bold text-gray-800">
                        {job.title}
                      </h3>
                      {job.hot && (
                        <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                          {t('hot')}
                        </span>
                      )}
                    </div>
                    
                    <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-4">
                      <div className="flex items-center gap-1">
                        <BuildingOfficeIcon className="h-4 w-4" />
                        <span>{job.department}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPinIcon className="h-4 w-4" />
                        <span>{job.location}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <ClockIcon className="h-4 w-4" />
                        <span>{job.experience}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <BriefcaseIcon className="h-4 w-4" />
                        <span>{job.salary}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-4 md:mt-0">
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 sm:px-6 py-2 sm:py-3 rounded-lg font-medium transition-colors text-sm sm:text-base whitespace-nowrap min-w-[100px] sm:min-w-[120px]">
                      {t('apply_now')}
                    </button>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                      <CheckCircleIcon className="h-5 w-5 text-green-500" />
                      {t('requirements')}
                    </h4>
                    <ul className="space-y-2">
                      {job.requirements.map((req, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm text-gray-600">
                          <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></span>
                          {req}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                      <StarIcon className="h-5 w-5 text-yellow-500" />
                      {t('benefits')}
                    </h4>
                    <ul className="space-y-2">
                      {job.benefits.map((benefit, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm text-gray-600">
                          <span className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></span>
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="bg-white rounded-lg shadow-lg p-8 max-w-md mx-auto">
              <BriefcaseIcon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {t('no_jobs_found')}
              </h3>
              <p className="text-gray-600">
                {t('no_jobs_description')}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Why Join Us Section */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800">
            {t('why_join_title')}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {Object.entries(t.raw('why_join_items')).map(([key, item]: [string, any]) => (
              <div key={key} className="text-center">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <StarIcon className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">
                  {item.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div className="bg-gray-100 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800">
              {t('contact_title')}
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              {t('contact_description')}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 sm:px-8 py-3 sm:py-4 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 text-sm sm:text-base whitespace-nowrap">
                <PaperAirplaneIcon className="h-4 w-4 sm:h-5 sm:w-5" />
                {t('send_cv')}
              </button>
              <button className="bg-white hover:bg-gray-50 text-blue-600 border-2 border-blue-600 px-4 sm:px-8 py-3 sm:py-4 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 text-sm sm:text-base whitespace-nowrap">
                <PhoneIcon className="h-4 w-4 sm:h-5 sm:w-5" />
                {t('contact_consultation')}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
