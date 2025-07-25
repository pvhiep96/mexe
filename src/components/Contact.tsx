'use client';

import { useForm, Controller } from 'react-hook-form';
import { useTranslations } from 'next-intl';
import { PaperAirplaneIcon } from '@heroicons/react/24/outline';
import { useFlashTooltip } from '@/context/FlashTooltipContext';

interface ContactForm {
  name: string;
  phone: string;
  email?: string;
  role?: string;
}

const roles = [
  'DISTRIBUTOR',
  'AFFILIATE',
  'CORPORATE_GIFTS',
  'CONTENT_CREATOR',
];

export default function Contact() {
  const t = useTranslations('contact');
  const { showTooltip } = useFlashTooltip();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ContactForm>({
    defaultValues: {
      name: '',
      phone: '',
      email: '',
      role: roles[0], // Default to first role
    },
  });

  const onSubmit = (data: ContactForm) => {
    try {
      showTooltip(t('alerts.success'), 'success');
      console.log('Contact Form Data:', data);
      // Simulate API call
      // Example: await fetch('/api/contact', { method: 'POST', body: JSON.stringify(data) });
    } catch {
      showTooltip(t('alerts.error'), 'error');
    }
    // TODO: Implement API call or further submission logic
    // Example: await fetch('/api/contact', { method: 'POST', body: JSON.stringify(data) });
  };

  return (
    <div>
      {/* Desktop version */}
      <div>
        <section className='w-full bg-[#0A115F]/10 py-8'>
          <div className='mx-auto max-w-3xl px-2'>
            <h2 className='mb-8 text-center text-3xl font-extrabold tracking-wide text-[#0A115F]'>
              {t('title')}
            </h2>
            <div className='flex flex-col items-center justify-center gap-6 md:flex-row'>
              {/* Box chọn bạn là ai */}
              <div className='flex max-w-md min-w-[220px] flex-1 flex-col items-center rounded-3xl bg-white p-6 shadow-lg'>
                <div className='mb-4 text-lg font-semibold text-[#0A115F]'>
                  {t('you_are')}
                </div>
                <div
                  className='flex w-full flex-col gap-3'
                  id='contact-role-group'
                >
                  <Controller
                    name='role'
                    control={control}
                    render={({ field }) => (
                      <>
                        {roles.map((role, idx) => (
                          <button
                            type='button'
                            key={role}
                            data-index={idx}
                            className={`role-btn w-full rounded-full py-3 text-center text-base font-bold shadow transition hover:cursor-pointer ${
                              field.value === role
                                ? 'bg-[#0A115F] text-white'
                                : 'bg-gray-100 text-[#0A115F]'
                            }`}
                            onClick={() => field.onChange(role)}
                          >
                            {t(`roles.${role.toLowerCase()}`)}
                          </button>
                        ))}
                      </>
                    )}
                  />
                </div>
              </div>
              <form
                onSubmit={handleSubmit(onSubmit)}
                className='flex max-w-md flex-1 flex-col gap-4'
              >
                <div>
                  <input
                    {...register('name', { required: t('errors.required') })}
                    type='text'
                    placeholder={t('name')}
                    className='w-full rounded-full bg-white px-6 py-3 text-base text-[#0A115F] placeholder-gray-500 focus:outline-none'
                  />
                  {errors.name && (
                    <p className='mt-1 text-sm text-red-500'>
                      {errors.name.message}
                    </p>
                  )}
                </div>
                <div>
                  <input
                    {...register('phone', { required: t('errors.required') })}
                    type='text'
                    placeholder={t('phone')}
                    className='w-full rounded-full bg-white px-6 py-3 text-base text-[#0A115F] placeholder-gray-500 focus:outline-none'
                  />
                  {errors.phone && (
                    <p className='mt-1 text-sm text-red-500'>
                      {errors.phone.message}
                    </p>
                  )}
                </div>
                <div>
                  <input
                    {...register('email')}
                    type='email'
                    placeholder={t('email')}
                    className='w-full rounded-full bg-white px-6 py-3 text-base text-[#0A115F] placeholder-gray-500 focus:outline-none'
                  />
                </div>
                <button
                  type='submit'
                  className='mt-2 flex items-center justify-center gap-2 rounded-full bg-[#0A115F] px-8 py-3 text-lg font-bold text-white shadow transition hover:cursor-pointer hover:bg-[#0A115F]/80'
                >
                  {t('register')}
                  <PaperAirplaneIcon className='h-6 w-6' />
                </button>
              </form>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
