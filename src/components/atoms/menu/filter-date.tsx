import { ReactNode } from 'react'
import { Listbox } from '@headlessui/react';
import { CalendarIcon } from '@heroicons/react/24/outline'

interface MenuDropdownProps {
    dropdownBtn?: ReactNode;
    dropdownItem?: ReactNode;
    selected: any;
    setSelected: (item: any) => void;
    options: any[]; 
}
export default function filterDropdown({selected,options,setSelected}:MenuDropdownProps) {
    return (
        <div className="relative">
            <Listbox as="div" className="space-x-2 relative" value={selected} onChange={setSelected}>
                <Listbox.Button className="bg-white px-4 py-1 border rounded-md flex items-center justify-center space-x-1 hover:bg-gray-50">
                    <CalendarIcon className="w-4 h-4"/>
                    <h1 className="block truncate text-xs">{selected.label}</h1>
                </Listbox.Button>
                
                <Listbox.Options as="div" className="space-y-2 absolute z-10 top-full w-64 mt-2 py-2 bg-white border rounded-lg shadow-lg">
                    {options.map((option, index) => (
                        <Listbox.Option
                            key={index}
                            value={option}
                            className={({ active }) =>
                            `relative cursor-default select-none py-1 pl-2 pr-4 list-none ${
                                active ? 'bg-primary-100 text-primary-900' : 'text-gray-900'
                            }`
                            }
                        >
                        {({ active }) => (
                        <>
                            <span className={`block truncate text-xs list-none ${active ? 'font-medium' : 'font-normal'}`}>
                                {option.label}
                            </span>
                        </>
                        )}
                    </Listbox.Option>
                    ))}
                </Listbox.Options>
            </Listbox>
        </div>
    )
}
