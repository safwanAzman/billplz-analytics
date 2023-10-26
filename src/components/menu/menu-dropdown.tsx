import { Fragment,ReactNode } from 'react'
import { Transition,Menu } from '@headlessui/react';

interface MenuDropdownProps {
    dropdownBtn?: ReactNode,
    dropdownItem?: ReactNode,
}
export default function menuDropdown({dropdownBtn,dropdownItem}:MenuDropdownProps) {
    return (
        <div className="relative">
            <Menu as="div" className="relative inline-block text-left">
                {dropdownBtn}
                <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                    >
                    <Menu.Items className="absolute z-50 right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        {dropdownItem}
                    </Menu.Items>
                </Transition>
            </Menu>
        </div>
    )
}
