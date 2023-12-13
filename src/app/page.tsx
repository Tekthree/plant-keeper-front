'use client';

import React, { useState, useRef, Fragment } from 'react'; // Combine useState and Fragment into a single import
import {
  FaceFrownIcon,
  FaceSmileIcon,
  FireIcon,
  HandThumbUpIcon,
  HeartIcon,
  PaperClipIcon,
  XMarkIcon,
} from '@heroicons/react/20/solid';
import { Listbox, Transition } from '@headlessui/react';

const moods = [
  {
    name: 'Excited',
    value: 'excited',
    icon: FireIcon,
    iconColor: 'text-white',
    bgColor: 'bg-red-500',
  },
  {
    name: 'Loved',
    value: 'loved',
    icon: HeartIcon,
    iconColor: 'text-white',
    bgColor: 'bg-pink-400',
  },
  {
    name: 'Happy',
    value: 'happy',
    icon: FaceSmileIcon,
    iconColor: 'text-white',
    bgColor: 'bg-green-400',
  },
  {
    name: 'Sad',
    value: 'sad',
    icon: FaceFrownIcon,
    iconColor: 'text-white',
    bgColor: 'bg-yellow-400',
  },
  {
    name: 'Thumbsy',
    value: 'thumbsy',
    icon: HandThumbUpIcon,
    iconColor: 'text-white',
    bgColor: 'bg-blue-500',
  },
  {
    name: 'I feel nothing',
    value: null,
    icon: XMarkIcon,
    iconColor: 'text-gray-400',
    bgColor: 'bg-transparent',
  },
];

 

 
function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function ImageUploader() {
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const [selected, setSelected] = useState(moods[5]);

  const fileInputRef = useRef(null);

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };


  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
    setDescription(''); // Reset description when a new image is selected
    setError(''); // Reset error as well
  };

  const handleSubmit = async () => {
    if (!image) {
      setError('Please select an image first.');
      return;
    }

    const formData = new FormData();
    formData.append('image', image);

    try {
      const response = await fetch('http://localhost:3001/api/describe-image', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();
      setDescription(data.description);
    } catch (err) {
      console.error(err);
      setError('Failed to describe the image. Please try again.');
    }
  };

  return (
    <div className='relative bg-white'>
      {/* Background image and overlap */}
      <div
        aria-hidden='true'
        className='absolute inset-0 hidden sm:flex sm:flex-col'>
        <div className='relative w-full flex-1 bg-gray-800'>
          <div className='absolute inset-0 overflow-hidden'>
            <img
              src='https://tailwindui.com/img/ecommerce-images/home-page-04-hero-full-width.jpg'
              alt=''
              className='h-full w-full object-cover object-center'
            />
          </div>
          <div className='absolute inset-0 bg-gray-900 opacity-50' />
        </div>
        <div className='h-32 w-full bg-white md:h-40 lg:h-48' />
      </div>

      <div className='relative mx-auto max-w-3xl px-4 pb-96 text-center sm:px-6 sm:pb-0 lg:px-8'>
        {/* Background image and overlap */}
        <div
          aria-hidden='true'
          className='absolute inset-0 flex flex-col sm:hidden'>
          <div className='relative w-full flex-1 bg-gray-800'>
            <div className='absolute inset-0 overflow-hidden'>
              <img
                src='https://tailwindui.com/img/ecommerce-images/home-page-04-hero-full-width.jpg'
                alt=''
                className='h-full w-full object-cover object-center'
              />
            </div>
            <div className='absolute inset-0 bg-gray-900 opacity-50' />
          </div>
          <div className='h-48 w-full bg-white' />
        </div>
        <div className='relative py-32'>
          <h1 className='text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl'>
            Mid-Season Sale
          </h1>
          <div className='mt-4 sm:mt-6'>
            <a
              href='#'
              className='inline-block rounded-md border border-transparent bg-indigo-600 px-8 py-3 font-medium text-white hover:bg-indigo-700'>
              Shop Collection
            </a>
          </div>
        </div>
      </div>

      <section
        aria-labelledby='collection-heading'
        className='relative -mt-96 sm:mt-0'>
        <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='flex items-start space-x-4'>
            <div className='flex-shrink-0'>
              <img
                className='inline-block h-10 w-10 rounded-full'
                src='https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
                alt=''
              />
            </div>
            <div className='min-w-0 flex-1'>
              <form action='#' className='relative'>
                <div className='overflow-hidden rounded-lg shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-indigo-600'>
                  <label htmlFor='comment' className='sr-only'>
                    Add your comment
                  </label>
                  <textarea
                    rows={3}
                    name='comment'
                    id='comment'
                    className='block w-full resize-none border-0 bg-transparent py-1.5 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6'
                    placeholder='Add your comment...'
                    defaultValue={''}
                  />

                  {/* Spacer element to match the height of the toolbar */}
                  <div className='py-2' aria-hidden='true'>
                    {/* Matches height of button in toolbar (1px border + 36px content height) */}
                    <div className='py-px'>
                      <div className='h-9' />
                    </div>
                  </div>
                </div>

                <div className='absolute inset-x-0 bottom-0 flex justify-between py-2 pl-3 pr-2'>
                  <div className='flex items-center space-x-5'>
                    <div className='flex items-center'>
                      <input
                        type='file'
                        ref={fileInputRef}
                        onChange={handleImageChange}
                        style={{ display: 'none' }}
                      />

                      {/* Your button styled as a file input */}
                      <button
                        type='button' // Change this to 'button'
                        onClick={handleButtonClick} // Use onClick to handle the button click
                        className='-m-2.5 flex h-10 w-10 items-center justify-center rounded-full text-gray-400 hover:text-gray-500'>
                        <PaperClipIcon className='h-5 w-5' aria-hidden='true' />
                        <span className='sr-only'>Attach a file</span>
                      </button>
                      <span className='sr-only'>Attach a file</span>
                    </div>
                    <div className='flex items-center'>
                      <Listbox value={selected} onChange={setSelected}>
                        {({ open }) => (
                          <>
                            <Listbox.Label className='sr-only'>
                              Your mood
                            </Listbox.Label>
                            <div className='relative'>
                              <Listbox.Button className='relative -m-2.5 flex h-10 w-10 items-center justify-center rounded-full text-gray-400 hover:text-gray-500'>
                                <span className='flex items-center justify-center'>
                                  {selected.value === null ? (
                                    <span>
                                      <FaceSmileIcon
                                        className='h-5 w-5 flex-shrink-0'
                                        aria-hidden='true'
                                      />
                                      <span className='sr-only'>
                                        Add your mood
                                      </span>
                                    </span>
                                  ) : (
                                    <span>
                                      <span
                                        className={classNames(
                                          selected.bgColor,
                                          'flex h-8 w-8 items-center justify-center rounded-full'
                                        )}>
                                        <selected.icon
                                          className='h-5 w-5 flex-shrink-0 text-white'
                                          aria-hidden='true'
                                        />
                                      </span>
                                      <span className='sr-only'>
                                        {selected.name}
                                      </span>
                                    </span>
                                  )}
                                </span>
                              </Listbox.Button>

                              <Transition
                                show={open}
                                as={Fragment}
                                leave='transition ease-in duration-100'
                                leaveFrom='opacity-100'
                                leaveTo='opacity-0'>
                                <Listbox.Options className='absolute z-10 -ml-6 mt-1 w-60 rounded-lg bg-white py-3 text-base shadow ring-1 ring-black ring-opacity-5 focus:outline-none sm:ml-auto sm:w-64 sm:text-sm'>
                                  {moods.map((mood) => (
                                    <Listbox.Option
                                      key={mood.value}
                                      className={({ active }) =>
                                        classNames(
                                          active ? 'bg-gray-100' : 'bg-white',
                                          'relative cursor-default select-none px-3 py-2'
                                        )
                                      }
                                      value={mood}>
                                      <div className='flex items-center'>
                                        <div
                                          className={classNames(
                                            mood.bgColor,
                                            'flex h-8 w-8 items-center justify-center rounded-full'
                                          )}>
                                          <mood.icon
                                            className={classNames(
                                              mood.iconColor,
                                              'h-5 w-5 flex-shrink-0'
                                            )}
                                            aria-hidden='true'
                                          />
                                        </div>
                                        <span className='ml-3 block truncate font-medium'>
                                          {mood.name}
                                        </span>
                                      </div>
                                    </Listbox.Option>
                                  ))}
                                </Listbox.Options>
                              </Transition>
                            </div>
                          </>
                        )}
                      </Listbox>
                    </div>
                  </div>
                  <div className='flex-shrink-0'>
                    <button
                      type='submit'
                      onClick={handleSubmit}
                      className='inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'>
                      Post
                    </button>
                  </div>
                </div>
              </form>
              <div>
                {description && <p>{description}</p>}
                {error && <p style={{ color: 'red' }}>{error}</p>}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
