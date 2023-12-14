'use client'

import { useState, useRef, Fragment } from 'react';
import { Menu, Popover, Transition, Listbox } from '@headlessui/react';
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline';
import {
  MagnifyingGlassIcon,
  PaperClipIcon,
  CalendarIcon,
  TagIcon,
  UserCircleIcon,
} from '@heroicons/react/20/solid';


const user = {
  name: 'Tom Cook',
  email: 'tom@example.com',
  imageUrl:
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
};
const navigation = [
  { name: 'Home', href: '#', current: true },
  { name: 'Profile', href: '#', current: false },
  { name: 'Resources', href: '#', current: false },
  { name: 'Company Directory', href: '#', current: false },
  { name: 'Openings', href: '#', current: false },
];
const userNavigation = [
  { name: 'Your Profile', href: '#' },
  { name: 'Settings', href: '#' },
  { name: 'Sign out', href: '#' },
];

const assignees = [
  { name: 'Unassigned', value: null },
  {
    name: 'Wade Cooper',
    value: 'wade-cooper',
    avatar:
      'https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  // More items...
];
const labels = [
  { name: 'Unlabelled', value: null },
  { name: 'Engineering', value: 'engineering' },
  // More items...
];
const dueDates = [
  { name: 'No due date', value: null },
  { name: 'Today', value: 'today' },
  // More items...
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}


export default function ImageUploader() {
   const [assigned, setAssigned] = useState(assignees[0]);
   const [labelled, setLabelled] = useState(labels[0]);
   const [dated, setDated] = useState(dueDates[0]);
   const [image, setImage] = useState(null);
   const [description, setDescription] = useState('');
   const [error, setError] = useState('');
  

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
    <>
      <div className='min-h-full'>
        <Popover as='header' className='bg-indigo-600 pb-24'>
          {({ open }) => (
            <>
              <div className='mx-auto max-w-3xl px-4 sm:px-6 lg:max-w-7xl lg:px-8'>
                <div className='relative flex items-center justify-center py-5 lg:justify-between'>
                  {/* Logo */}
                  <div className='absolute left-0 flex-shrink-0 lg:static'>
                    <a href='#'>
                      <span className='sr-only'>Your Company</span>
                      <img
                        className='h-8 w-auto'
                        src='https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=300'
                        alt='Your Company'
                      />
                    </a>
                  </div>

                  {/* Right section on desktop */}
                  <div className='hidden lg:ml-4 lg:flex lg:items-center lg:pr-0.5'>
                    <button
                      type='button'
                      className='relative flex-shrink-0 rounded-full p-1 text-indigo-200 hover:bg-white hover:bg-opacity-10 hover:text-white focus:outline-none focus:ring-2 focus:ring-white'>
                      <span className='absolute -inset-1.5' />
                      <span className='sr-only'>View notifications</span>
                      <BellIcon className='h-6 w-6' aria-hidden='true' />
                    </button>

                    {/* Profile dropdown */}
                    <Menu as='div' className='relative ml-4 flex-shrink-0'>
                      <div>
                        <Menu.Button className='relative flex rounded-full bg-white text-sm ring-2 ring-white ring-opacity-20 focus:outline-none focus:ring-opacity-100'>
                          <span className='absolute -inset-1.5' />
                          <span className='sr-only'>Open user menu</span>
                          <img
                            className='h-8 w-8 rounded-full'
                            src={user.imageUrl}
                            alt=''
                          />
                        </Menu.Button>
                      </div>
                      <Transition
                        as={Fragment}
                        leave='transition ease-in duration-75'
                        leaveFrom='transform opacity-100 scale-100'
                        leaveTo='transform opacity-0 scale-95'>
                        <Menu.Items className='absolute -right-2 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
                          {userNavigation.map((item) => (
                            <Menu.Item key={item.name}>
                              {({ active }) => (
                                <a
                                  href={item.href}
                                  className={classNames(
                                    active ? 'bg-gray-100' : '',
                                    'block px-4 py-2 text-sm text-gray-700'
                                  )}>
                                  {item.name}
                                </a>
                              )}
                            </Menu.Item>
                          ))}
                        </Menu.Items>
                      </Transition>
                    </Menu>
                  </div>

                  {/* Search */}
                  <div className='min-w-0 flex-1 px-12 lg:hidden'>
                    <div className='mx-auto w-full max-w-xs'>
                      <label htmlFor='desktop-search' className='sr-only'>
                        Search
                      </label>
                      <div className='relative text-white focus-within:text-gray-600'>
                        <div className='pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3'>
                          <MagnifyingGlassIcon
                            className='h-5 w-5'
                            aria-hidden='true'
                          />
                        </div>
                        <input
                          id='desktop-search'
                          className='block w-full rounded-md border-0 bg-white/20 py-1.5 pl-10 pr-3 text-white placeholder:text-white focus:bg-white focus:text-gray-900 focus:ring-0 focus:placeholder:text-gray-500 sm:text-sm sm:leading-6'
                          placeholder='Search'
                          type='search'
                          name='search'
                        />
                      </div>
                    </div>
                  </div>

                  {/* Menu button */}
                  <div className='absolute right-0 flex-shrink-0 lg:hidden'>
                    {/* Mobile menu button */}
                    <Popover.Button className='relative inline-flex items-center justify-center rounded-md bg-transparent p-2 text-indigo-200 hover:bg-white hover:bg-opacity-10 hover:text-white focus:outline-none focus:ring-2 focus:ring-white'>
                      <span className='absolute -inset-0.5' />
                      <span className='sr-only'>Open main menu</span>
                      {open ? (
                        <XMarkIcon
                          className='block h-6 w-6'
                          aria-hidden='true'
                        />
                      ) : (
                        <Bars3Icon
                          className='block h-6 w-6'
                          aria-hidden='true'
                        />
                      )}
                    </Popover.Button>
                  </div>
                </div>
                <div className='hidden border-t border-white border-opacity-20 py-5 lg:block'>
                  <div className='grid grid-cols-3 items-center gap-8'>
                    <div className='col-span-2'>
                      <nav className='flex space-x-4'>
                        {navigation.map((item) => (
                          <a
                            key={item.name}
                            href={item.href}
                            className={classNames(
                              item.current ? 'text-white' : 'text-indigo-100',
                              'rounded-md bg-white bg-opacity-0 px-3 py-2 text-sm font-medium hover:bg-opacity-10'
                            )}
                            aria-current={item.current ? 'page' : undefined}>
                            {item.name}
                          </a>
                        ))}
                      </nav>
                    </div>
                    <div>
                      <div className='mx-auto w-full max-w-md'>
                        <label htmlFor='mobile-search' className='sr-only'>
                          Search
                        </label>
                        <div className='relative text-white focus-within:text-gray-600'>
                          <div className='pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3'>
                            <MagnifyingGlassIcon
                              className='h-5 w-5'
                              aria-hidden='true'
                            />
                          </div>
                          <input
                            id='mobile-search'
                            className='block w-full rounded-md border-0 bg-white/20 py-1.5 pl-10 pr-3 text-white placeholder:text-white focus:bg-white focus:text-gray-900 focus:ring-0 focus:placeholder:text-gray-500 sm:text-sm sm:leading-6'
                            placeholder='Search'
                            type='search'
                            name='search'
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <Transition.Root as={Fragment}>
                <div className='lg:hidden'>
                  <Transition.Child
                    as={Fragment}
                    enter='duration-150 ease-out'
                    enterFrom='opacity-0'
                    enterTo='opacity-100'
                    leave='duration-150 ease-in'
                    leaveFrom='opacity-100'
                    leaveTo='opacity-0'>
                    <Popover.Overlay className='fixed inset-0 z-20 bg-black bg-opacity-25' />
                  </Transition.Child>

                  <Transition.Child
                    as={Fragment}
                    enter='duration-150 ease-out'
                    enterFrom='opacity-0 scale-95'
                    enterTo='opacity-100 scale-100'
                    leave='duration-150 ease-in'
                    leaveFrom='opacity-100 scale-100'
                    leaveTo='opacity-0 scale-95'>
                    <Popover.Panel
                      focus
                      className='absolute inset-x-0 top-0 z-30 mx-auto w-full max-w-3xl origin-top transform p-2 transition'>
                      <div className='divide-y divide-gray-200 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5'>
                        <div className='pb-2 pt-3'>
                          <div className='flex items-center justify-between px-4'>
                            <div>
                              <img
                                className='h-8 w-auto'
                                src='https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600'
                                alt='Your Company'
                              />
                            </div>
                            <div className='-mr-2'>
                              <Popover.Button className='relative inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500'>
                                <span className='absolute -inset-0.5' />
                                <span className='sr-only'>Close menu</span>
                                <XMarkIcon
                                  className='h-6 w-6'
                                  aria-hidden='true'
                                />
                              </Popover.Button>
                            </div>
                          </div>
                          <div className='mt-3 space-y-1 px-2'>
                            <a
                              href='#'
                              className='block rounded-md px-3 py-2 text-base font-medium text-gray-900 hover:bg-gray-100 hover:text-gray-800'>
                              Home
                            </a>
                            <a
                              href='#'
                              className='block rounded-md px-3 py-2 text-base font-medium text-gray-900 hover:bg-gray-100 hover:text-gray-800'>
                              Profile
                            </a>
                            <a
                              href='#'
                              className='block rounded-md px-3 py-2 text-base font-medium text-gray-900 hover:bg-gray-100 hover:text-gray-800'>
                              Resources
                            </a>
                            <a
                              href='#'
                              className='block rounded-md px-3 py-2 text-base font-medium text-gray-900 hover:bg-gray-100 hover:text-gray-800'>
                              Company Directory
                            </a>
                            <a
                              href='#'
                              className='block rounded-md px-3 py-2 text-base font-medium text-gray-900 hover:bg-gray-100 hover:text-gray-800'>
                              Openings
                            </a>
                          </div>
                        </div>
                        <div className='pb-2 pt-4'>
                          <div className='flex items-center px-5'>
                            <div className='flex-shrink-0'>
                              <img
                                className='h-10 w-10 rounded-full'
                                src={user.imageUrl}
                                alt=''
                              />
                            </div>
                            <div className='ml-3 min-w-0 flex-1'>
                              <div className='truncate text-base font-medium text-gray-800'>
                                {user.name}
                              </div>
                              <div className='truncate text-sm font-medium text-gray-500'>
                                {user.email}
                              </div>
                            </div>
                            <button
                              type='button'
                              className='relative ml-auto flex-shrink-0 rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'>
                              <span className='absolute -inset-1.5' />
                              <span className='sr-only'>
                                View notifications
                              </span>
                              <BellIcon
                                className='h-6 w-6'
                                aria-hidden='true'
                              />
                            </button>
                          </div>
                          <div className='mt-3 space-y-1 px-2'>
                            {userNavigation.map((item) => (
                              <a
                                key={item.name}
                                href={item.href}
                                className='block rounded-md px-3 py-2 text-base font-medium text-gray-900 hover:bg-gray-100 hover:text-gray-800'>
                                {item.name}
                              </a>
                            ))}
                          </div>
                        </div>
                      </div>
                    </Popover.Panel>
                  </Transition.Child>
                </div>
              </Transition.Root>
            </>
          )}
        </Popover>
        <main className='-mt-24 pb-8'>
          <div className='mx-auto max-w-3xl px-4 sm:px-6 lg:max-w-7xl lg:px-8'>
            <h1 className='sr-only'>Page title</h1>
            {/* -----------------------------------------Main 3 column grid------------------------------------------ */}
            <div className='grid grid-cols-1 items-start gap-4 lg:grid-cols-3 lg:gap-8 bg-white p-4 rounded-lg'>
              {/* Left column */}
              <form action='#' className='relative'>
                <div className='overflow-hidden rounded-lg border border-gray-300 shadow-sm focus-within:border-indigo-500 focus-within:ring-1 focus-within:ring-indigo-500'>
                  <label htmlFor='title' className='sr-only'>
                    Title
                  </label>
                  <input
                    type='text'
                    name='title'
                    id='title'
                    className='block w-full border-0 pt-2.5 text-lg font-medium placeholder:text-gray-400 focus:ring-0'
                    placeholder='Title'
                  />
                  <label htmlFor='description' className='sr-only'>
                    Description
                  </label>
                  <textarea
                    rows={2}
                    name='description'
                    id='description'
                    className='block w-full resize-none border-0 py-0 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6'
                    placeholder='Write a description...'
                    defaultValue={''}
                  />

                  {/* Spacer element to match the height of the toolbar */}
                  <div aria-hidden='true'>
                    <div className='py-2'>
                      <div className='h-9' />
                    </div>
                    <div className='h-px' />
                    <div className='py-2'>
                      <div className='py-px'>
                        <div className='h-9' />
                      </div>
                    </div>
                  </div>
                </div>

                <div className='absolute inset-x-px bottom-0'>
                  {/* Actions: These are just examples to demonstrate the concept, replace/wire these up however makes sense for your project. */}
                  <div className='flex flex-nowrap justify-end space-x-2 px-2 py-2 sm:px-3'>
                    <Listbox
                      as='div'
                      value={assigned}
                      onChange={setAssigned}
                      className='flex-shrink-0'>
                      {({ open }) => (
                        <>
                          <Listbox.Label className='sr-only'>
                            Assign
                          </Listbox.Label>
                          <div className='relative'>
                            <Listbox.Button className='relative inline-flex items-center whitespace-nowrap rounded-full bg-gray-50 px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 sm:px-3'>
                              {assigned.value === null ? (
                                <UserCircleIcon
                                  className='h-5 w-5 flex-shrink-0 text-gray-300 sm:-ml-1'
                                  aria-hidden='true'
                                />
                              ) : (
                                <img
                                  src={assigned.avatar}
                                  alt=''
                                  className='h-5 w-5 flex-shrink-0 rounded-full'
                                />
                              )}

                              <span
                                className={classNames(
                                  assigned.value === null
                                    ? ''
                                    : 'text-gray-900',
                                  'hidden truncate sm:ml-2 sm:block'
                                )}>
                                {assigned.value === null
                                  ? 'Assign'
                                  : assigned.name}
                              </span>
                            </Listbox.Button>

                            <Transition
                              show={open}
                              as={Fragment}
                              leave='transition ease-in duration-100'
                              leaveFrom='opacity-100'
                              leaveTo='opacity-0'>
                              <Listbox.Options className='absolute right-0 z-10 mt-1 max-h-56 w-52 overflow-auto rounded-lg bg-white py-3 text-base shadow ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm'>
                                {assignees.map((assignee) => (
                                  <Listbox.Option
                                    key={assignee.value}
                                    className={({ active }) =>
                                      classNames(
                                        active ? 'bg-gray-100' : 'bg-white',
                                        'relative cursor-default select-none px-3 py-2'
                                      )
                                    }
                                    value={assignee}>
                                    <div className='flex items-center'>
                                      {assignee.avatar ? (
                                        <img
                                          src={assignee.avatar}
                                          alt=''
                                          className='h-5 w-5 flex-shrink-0 rounded-full'
                                        />
                                      ) : (
                                        <UserCircleIcon
                                          className='h-5 w-5 flex-shrink-0 text-gray-400'
                                          aria-hidden='true'
                                        />
                                      )}

                                      <span className='ml-3 block truncate font-medium'>
                                        {assignee.name}
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

                    <Listbox
                      as='div'
                      value={labelled}
                      onChange={setLabelled}
                      className='flex-shrink-0'>
                      {({ open }) => (
                        <>
                          <Listbox.Label className='sr-only'>
                            Add a label
                          </Listbox.Label>
                          <div className='relative'>
                            <Listbox.Button className='relative inline-flex items-center whitespace-nowrap rounded-full bg-gray-50 px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 sm:px-3'>
                              <TagIcon
                                className={classNames(
                                  labelled.value === null
                                    ? 'text-gray-300'
                                    : 'text-gray-500',
                                  'h-5 w-5 flex-shrink-0 sm:-ml-1'
                                )}
                                aria-hidden='true'
                              />
                              <span
                                className={classNames(
                                  labelled.value === null
                                    ? ''
                                    : 'text-gray-900',
                                  'hidden truncate sm:ml-2 sm:block'
                                )}>
                                {labelled.value === null
                                  ? 'Label'
                                  : labelled.name}
                              </span>
                            </Listbox.Button>

                            <Transition
                              show={open}
                              as={Fragment}
                              leave='transition ease-in duration-100'
                              leaveFrom='opacity-100'
                              leaveTo='opacity-0'>
                              <Listbox.Options className='absolute right-0 z-10 mt-1 max-h-56 w-52 overflow-auto rounded-lg bg-white py-3 text-base shadow ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm'>
                                {labels.map((label) => (
                                  <Listbox.Option
                                    key={label.value}
                                    className={({ active }) =>
                                      classNames(
                                        active ? 'bg-gray-100' : 'bg-white',
                                        'relative cursor-default select-none px-3 py-2'
                                      )
                                    }
                                    value={label}>
                                    <div className='flex items-center'>
                                      <span className='block truncate font-medium'>
                                        {label.name}
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

                    <Listbox
                      as='div'
                      value={dated}
                      onChange={setDated}
                      className='flex-shrink-0'>
                      {({ open }) => (
                        <>
                          <Listbox.Label className='sr-only'>
                            Add a due date
                          </Listbox.Label>
                          <div className='relative'>
                            <Listbox.Button className='relative inline-flex items-center whitespace-nowrap rounded-full bg-gray-50 px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 sm:px-3'>
                              <CalendarIcon
                                className={classNames(
                                  dated.value === null
                                    ? 'text-gray-300'
                                    : 'text-gray-500',
                                  'h-5 w-5 flex-shrink-0 sm:-ml-1'
                                )}
                                aria-hidden='true'
                              />
                              <span
                                className={classNames(
                                  dated.value === null ? '' : 'text-gray-900',
                                  'hidden truncate sm:ml-2 sm:block'
                                )}>
                                {dated.value === null ? 'Due date' : dated.name}
                              </span>
                            </Listbox.Button>

                            <Transition
                              show={open}
                              as={Fragment}
                              leave='transition ease-in duration-100'
                              leaveFrom='opacity-100'
                              leaveTo='opacity-0'>
                              <Listbox.Options className='absolute right-0 z-10 mt-1 max-h-56 w-52 overflow-auto rounded-lg bg-white py-3 text-base shadow ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm'>
                                {dueDates.map((dueDate) => (
                                  <Listbox.Option
                                    key={dueDate.value}
                                    className={({ active }) =>
                                      classNames(
                                        active ? 'bg-gray-100' : 'bg-white',
                                        'relative cursor-default select-none px-3 py-2'
                                      )
                                    }
                                    value={dueDate}>
                                    <div className='flex items-center'>
                                      <span className='block truncate font-medium'>
                                        {dueDate.name}
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
                  <div className='flex items-center justify-between space-x-3 border-t border-gray-200 px-2 py-2 sm:px-3'>
                    <div className='flex'>
                      <button
                        type='button'
                        className='group -my-2 -ml-2 inline-flex items-center rounded-full px-3 py-2 text-left text-gray-400'>
                        <PaperClipIcon
                          className='-ml-1 mr-2 h-5 w-5 group-hover:text-gray-500'
                          aria-hidden='true'
                        />
                        <span className='text-sm italic text-gray-500 group-hover:text-gray-600'>
                          Attach a file
                        </span>
                      </button>
                    </div>
                    <div className='flex-shrink-0'>
                      <button
                        type='submit'
                        className='inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'>
                        Create
                      </button>
                    </div>
                  </div>
                </div>
              </form>

              {/* Right column */}
              <div className='grid grid-cols-1 gap-4'>
                <section aria-labelledby='section-2-title'>
                  <h2 className='sr-only' id='section-2-title'>
                    Section title
                  </h2>
                  <div className='overflow-hidden rounded-lg bg-white text-black shadow'>
                    <div className='p-6'>test test test</div>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </main>
        <footer>
          <div className='mx-auto max-w-3xl px-4 sm:px-6 lg:max-w-7xl lg:px-8'>
            <div className='border-t border-gray-200 py-8 text-center text-sm text-gray-500 sm:text-left'>
              <span className='block sm:inline'>
                &copy; 2021 Your Company, Inc.
              </span>{' '}
              <span className='block sm:inline'>All rights reserved.</span>
            </div>
          </div>
        </footer>
      </div>
    </>
  );


}