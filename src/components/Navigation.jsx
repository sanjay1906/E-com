"use client";

import { Fragment, useState } from "react";
import { Dialog, Popover, Tab, Transition } from "@headlessui/react";
import {
  Bars3Icon,
  MagnifyingGlassIcon,
  ShoppingBagIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Navigation({ menuItems }) {
  const [open, setOpen] = useState(false);

  return (
    <div className='bg-white'>
      {/* Mobile menu */}
      <Transition.Root show={open} as={Fragment}>
        <Dialog as='div' className='relative z-40 lg:hidden' onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter='transition-opacity ease-linear duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='transition-opacity ease-linear duration-300'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'>
            <div className='fixed inset-0 bg-black bg-opacity-25' />
          </Transition.Child>

          <div className='fixed inset-0 z-40 flex'>
            <Transition.Child
              as={Fragment}
              enter='transition ease-in-out duration-300 transform'
              enterFrom='-translate-x-full'
              enterTo='translate-x-0'
              leave='transition ease-in-out duration-300 transform'
              leaveFrom='translate-x-0'
              leaveTo='-translate-x-full'>
              <Dialog.Panel className='relative flex w-full max-w-xs flex-col overflow-y-auto bg-white pb-12 shadow-xl'>
                <div className='flex px-4 pb-2 pt-5'>
                  <button
                    type='button'
                    className='relative -m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400'
                    onClick={() => setOpen(false)}>
                    <span className='absolute -inset-0.5' />
                    <span className='sr-only'>Close menu</span>
                    <XMarkIcon className='h-6 w-6' aria-hidden='true' />
                  </button>
                </div>

                {/* Links */}
                <Tab.Group as='div' className='mt-2'>
                  <div className='border-b border-gray-200'>
                    <Tab.List className='-mb-px flex space-x-8 px-4'>
                      {menuItems?.map((item) => (
                        <Tab
                          key={item.title}
                          className={({ selected }) =>
                            classNames(
                              selected
                                ? "border-indigo-600 text-indigo-600"
                                : "border-transparent text-gray-900",
                              "flex-1 whitespace-nowrap border-b-2 px-1 py-4 text-base font-medium"
                            )
                          }>
                          {item.title}
                        </Tab>
                      ))}
                    </Tab.List>
                  </div>
                  <Tab.Panels as={Fragment}>
                    {menuItems.map((item) => (
                      <Tab.Panel
                        key={item.title}
                        className='space-y-10 px-4 pb-8 pt-10'>
                        <div className='grid grid-cols-2 gap-x-4'>
                          {item.items.map((item) => (
                            <div
                              key={item.title}
                              className='group relative text-sm'>
                              <div className='aspect-h-1 aspect-w-1 overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-75'>
                                <img
                                  src={item.imageSrc}
                                  alt={item.imageAlt}
                                  className='object-cover object-center'
                                />
                              </div>
                              <Link
                                href={item.url}
                                className='mt-6 block font-medium text-gray-900'>
                                <span
                                  className='absolute inset-0 z-10'
                                  aria-hidden='true'
                                />
                                {item.title}
                              </Link>
                              <p aria-hidden='true' className='mt-1'>
                                Shop now
                              </p>
                            </div>
                          ))}
                        </div>
                        {item.items.map((item) => (
                          <div key={item.title}>
                            <p
                              id={`${item.id}-${item.id}-heading-mobile`}
                              className='font-medium text-gray-900'>
                              {item.title}
                            </p>
                            <ul
                              role='list'
                              aria-labelledby={`${item.id}-${item.id}-heading-mobile`}
                              className='mt-6 flex flex-col space-y-6'>
                              {item.items.map((item) => (
                                <li key={item.title} className='flow-root'>
                                  <Link
                                    href={item.url}
                                    className='-m-2 block p-2 text-gray-500'>
                                    {item.title}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </Tab.Panel>
                    ))}
                  </Tab.Panels>
                </Tab.Group>

                <div className='space-y-6 border-t border-gray-200 px-4 py-6'>
                  {menuItems?.map((page) => (
                    <div key={page.title} className='flow-root'>
                      <Link
                        href={page.url}
                        className='-m-2 block p-2 font-medium text-gray-900'>
                        {page.title}
                      </Link>
                    </div>
                  ))}
                </div>

                <div className='space-y-6 border-t border-gray-200 px-4 py-6'>
                  <div className='flow-root'>
                    <Link
                      href='#'
                      className='-m-2 block p-2 font-medium text-gray-900'>
                      Sign in
                    </Link>
                  </div>
                  <div className='flow-root'>
                    <Link
                      href='#'
                      className='-m-2 block p-2 font-medium text-gray-900'>
                      Create account
                    </Link>
                  </div>
                </div>

                <div className='border-t border-gray-200 px-4 py-6'>
                  <Link href='#' className='-m-2 flex items-center p-2'>
                    <img
                      src='https://tailwindui.com/img/flags/flag-canada.svg'
                      alt=''
                      className='block h-auto w-5 flex-shrink-0'
                    />
                    <span className='ml-3 block text-base font-medium text-gray-900'>
                      CAD
                    </span>
                    <span className='sr-only'>, change currency</span>
                  </Link>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

      <header className='relative bg-white'>
        <p className='flex h-10 items-center justify-center bg-indigo-600 px-4 text-sm font-medium text-white sm:px-6 lg:px-8'>
          Get free delivery on orders over $100
        </p>

        <nav
          aria-label='Top'
          className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
          <div className='border-b border-gray-200'>
            <div className='flex h-16 items-center'>
              <button
                type='button'
                className='relative rounded-md bg-white p-2 text-gray-400 lg:hidden'
                onClick={() => setOpen(true)}>
                <span className='absolute -inset-0.5' />
                <span className='sr-only'>Open menu</span>
                <Bars3Icon className='h-6 w-6' aria-hidden='true' />
              </button>

              {/* Logo */}
              <div className='ml-4 flex lg:ml-0'>
                <Link href='#'>
                  <span className='sr-only'>Your Company</span>
                  <img
                    className='h-8 w-auto'
                    src='https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600'
                    alt=''
                  />
                </Link>
              </div>

              {/* Flyout menus */}
              <Popover.Group className='hidden lg:ml-8 lg:block lg:self-stretch'>
                <div className='flex h-full space-x-8'>
                  {menuItems?.map((item) => (
                    <Fragment key={item.title}>
                      {item.items.length > 0 ? (
                        <Popover className='flex'>
                          {({ open }) => (
                            <>
                              <div className='relative flex'>
                                <Popover.Button
                                  className={classNames(
                                    open
                                      ? "border-indigo-600 text-indigo-600"
                                      : "border-transparent text-gray-700 hover:text-gray-800",
                                    "relative z-10 -mb-px flex items-center border-b-2 pt-px text-sm font-medium transition-colors duration-200 ease-out focus:outline-none"
                                  )}>
                                  {item.title}
                                </Popover.Button>
                              </div>

                              <Transition
                                as={Fragment}
                                enter='transition ease-out duration-200'
                                enterFrom='opacity-0'
                                enterTo='opacity-100'
                                leave='transition ease-in duration-150'
                                leaveFrom='opacity-100'
                                leaveTo='opacity-0'>
                                <Popover.Panel className='absolute inset-x-0 top-full text-sm text-gray-500 z-[1]'>
                                  {/* Presentational element used to render the bottom shadow, if we put the shadow on the actual panel it pokes out the top, so we use this shorter element to hide the top of the shadow */}
                                  <div
                                    className='absolute inset-0 top-1/2 bg-white shadow'
                                    aria-hidden='true'
                                  />

                                  <div className='relative bg-white'>
                                    <div className='mx-auto max-w-7xl px-8'>
                                      <div className='grid grid-cols-2 gap-x-8 gap-y-10 py-16'>
                                        <div className='col-start-2 grid grid-cols-2 gap-x-8'>
                                          {item.items.map((item) => (
                                            <div
                                              key={item.title}
                                              className='group relative text-base sm:text-sm'>
                                              <div className='aspect-h-1 aspect-w-1 overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-75'>
                                                <img
                                                  src={item.imageSrc}
                                                  alt={item.imageAlt}
                                                  className='object-cover object-center'
                                                />
                                              </div>
                                              <Link
                                                href={item.url}
                                                className='mt-6 block font-medium text-gray-900'>
                                                <span
                                                  className='absolute inset-0 z-10'
                                                  aria-hidden='true'
                                                />
                                                {item.title}
                                              </Link>
                                              <p
                                                aria-hidden='true'
                                                className='mt-1'>
                                                Shop now
                                              </p>
                                            </div>
                                          ))}
                                        </div>
                                        <div className='row-start-1 grid grid-cols-3 gap-x-8 gap-y-10 text-sm'>
                                          {item.items.map((item) => (
                                            <div key={item.title}>
                                              <p
                                                id={`${item.title}-heading`}
                                                className='font-medium text-gray-900'>
                                                {item.title}
                                              </p>
                                              <ul
                                                role='list'
                                                aria-labelledby={`${item.title}-heading`}
                                                className='mt-6 space-y-6 sm:mt-4 sm:space-y-4'>
                                                {item.items.map((item) => (
                                                  <li
                                                    key={item.title}
                                                    className='flex'>
                                                    <Link
                                                      href={item.url}
                                                      className='hover:text-gray-800'>
                                                      {item.title}
                                                    </Link>
                                                  </li>
                                                ))}
                                              </ul>
                                            </div>
                                          ))}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </Popover.Panel>
                              </Transition>
                            </>
                          )}
                        </Popover>
                      ) : (
                        <Link
                          href={item.url}
                          className='flex items-center text-sm font-medium text-gray-700 hover:text-gray-800'>
                          {item.title}
                        </Link>
                      )}
                    </Fragment>
                  ))}
                </div>
              </Popover.Group>

              <div className='ml-auto flex items-center'>
                <div className='hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6'>
                  <Link
                    href='#'
                    className='text-sm font-medium text-gray-700 hover:text-gray-800'>
                    Sign in
                  </Link>
                  <span className='h-6 w-px bg-gray-200' aria-hidden='true' />
                  <Link
                    href='#'
                    className='text-sm font-medium text-gray-700 hover:text-gray-800'>
                    Create account
                  </Link>
                </div>

                <div className='hidden lg:ml-8 lg:flex'>
                  <Link
                    href='#'
                    className='flex items-center text-gray-700 hover:text-gray-800'>
                    <img
                      src='https://tailwindui.com/img/flags/flag-canada.svg'
                      alt=''
                      className='block h-auto w-5 flex-shrink-0'
                    />
                    <span className='ml-3 block text-sm font-medium'>CAD</span>
                    <span className='sr-only'>, change currency</span>
                  </Link>
                </div>

                {/* Search */}
                <div className='flex lg:ml-6'>
                  <Link
                    href='#'
                    className='p-2 text-gray-400 hover:text-gray-500'>
                    <span className='sr-only'>Search</span>
                    <MagnifyingGlassIcon
                      className='h-6 w-6'
                      aria-hidden='true'
                    />
                  </Link>
                </div>

                {/* Cart */}
                <div className='ml-4 flow-root lg:ml-6'>
                  <Link href='#' className='group -m-2 flex items-center p-2'>
                    <ShoppingBagIcon
                      className='h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500'
                      aria-hidden='true'
                    />
                    <span className='ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800'>
                      0
                    </span>
                    <span className='sr-only'>items in cart, view bag</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
}