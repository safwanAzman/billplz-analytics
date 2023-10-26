import Link from 'next/link';
import { Menu } from '@headlessui/react'
import clipboard from 'clipboard-copy';
import { EllipsisVerticalIcon, Square2StackIcon } from '@heroicons/react/24/outline'
import MenuDropdown from '@/components/menu/menu-dropdown';

interface CollectionTableProps {
    data: Array<{
        id: number;
        collection_name: string;
        collection_id: string;
        total_collected: number;
        volume: number; 
    }>;
}

export default function CollectionTable({data}:CollectionTableProps) {
    const handleCopyToClipboard = (text:string) => {
        clipboard(text)
    };
    return (
        <>
            {/* desktop */}
            <div className="hidden lg:block">
                <div className="relative  flex flex-col">
                    <div className="-my-2 overflow-x-auto">
                        <div className="inline-block min-w-full py-2 align-middle">
                            <div className="overflow-hidden bg-white">
                                <table className="min-w-full">
                                    <thead className="relative border-b">
                                        <tr>
                                            <th className="px-6 py-3 text-[0.65rem] leading-4 font-medium uppercase text-left">
                                                Collection Name
                                            </th>
                                            <th className="px-6 py-3 text-[0.65rem] leading-4 font-medium uppercase text-left">
                                                Collection Id
                                            </th>
                                            <th className="px-6 py-3 text-[0.65rem] leading-4 font-medium uppercase text-right">
                                                Total Collected
                                            </th>
                                            <th className="px-6 py-3 text-[0.65rem] leading-4 font-medium uppercase text-right">
                                                Volume
                                            </th>
                                            <th className="px-6 py-3 text-[0.65rem] leading-4 font-medium uppercase text-center">
                                                Action
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-600">
                                        {data.map((item) => (
                                            <tr key={item.id}>
                                                <td className="px-6 text-[0.65rem] py-2 whitespace-no-wrap leading-5">
                                                    {item.collection_name}
                                                </td>
                                                <td className="px-6 text-[0.65rem] py-2 whitespace-no-wrap leading-5">
                                                    <div className="flex items-center">
                                                        {item.collection_id}
                                                        <button 
                                                            onClick={() => handleCopyToClipboard(item.collection_id)}
                                                            className="ml-1 hover:scale-110">
                                                            <Square2StackIcon className=" h-4 w-4 "/>
                                                        </button>
                                                    </div>
                                                </td>
                                                <td className="px-6 text-[0.65rem] py-2 whitespace-no-wrap leading-5">
                                                    <div className="flex space-x-2 justify-end items-center">
                                                        <div className="bg-green-500 w-2 h-2 rounded-full"></div>
                                                        <p>RM {item.total_collected.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                                                    </div>
                                                </td>
                                                <td className="px-6 text-[0.65rem] py-2 whitespace-no-wrap leading-5 text-right">
                                                    {item.volume}
                                                </td>
                                                <td className="px-6 text-[0.65rem] py-2 whitespace-no-wrap leading-5 text-center h-12 z-50">
                                                    <div>
                                                        <MenuDropdown
                                                            dropdownBtn={
                                                                <Menu.Button className="border p-1 rounded-md">
                                                                    <EllipsisVerticalIcon className=" h-4 w-4 "/>
                                                                </Menu.Button>
                                                            }
                                                            dropdownItem={
                                                                <>
                                                                    <Link href="">
                                                                        <div className="px-4 py-1 hover:bg-blue-50 ">
                                                                            View Collection
                                                                        </div>
                                                                    </Link>
                                                                    <Link href="">
                                                                        <div className="px-4 py-1 hover:bg-blue-50">
                                                                            Action 2
                                                                        </div>
                                                                    </Link>
                                                                </>
                                                            }
                                                        />
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                        <tr>
                                            <td colSpan={6} className="py-10">
                                                <div className="flex items-center justify-center space-x-2 -mt-6">
                                                    <button className="border px-4 py-2 rounded-md text-xs hover:bg-gray-50">
                                                        Previous
                                                    </button>
                                                    <button className="border px-4 py-2 rounded-md text-xs  hover:bg-gray-50">
                                                        Next
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* mobile */}
            <div className="block lg:hidden">
                {data.map((item) => (
                    <div key={item.id} className="border-b p-4">
                        <div className="flex items-start justify-between">
                            <div>
                                <h1 className="font-semibold">{item.collection_name}</h1>
                                <div className="flex items-center space-x-2 pt-1">
                                    <p className="text-xs">{item.collection_id}</p>
                                    <button 
                                        onClick={() => handleCopyToClipboard(item.collection_id)}
                                        className="ml-1 hover:scale-110">
                                        <Square2StackIcon className=" h-4 w-4 "/>
                                    </button>
                                </div>
                            </div>
                            <MenuDropdown
                                dropdownBtn={
                                    <Menu.Button className=" border p-1 rounded-md">
                                        <EllipsisVerticalIcon className=" h-4 w-4 "/>
                                    </Menu.Button>
                                }
                                dropdownItem={
                                    <>
                                        <Link href="">
                                            <div className="px-4 py-1 hover:bg-blue-50  text-xs">
                                                View Collection
                                            </div>
                                        </Link>
                                        <Link href="">
                                            <div className="px-4 py-1 hover:bg-blue-50 text-xs">
                                                Action 2
                                            </div>
                                        </Link>
                                    </>
                                }
                            />
                        </div>
                        <div className="mt-4">
                            <div className="flex items-center space-x-2 text-xs">
                                <p>COLLECTED</p>
                                <div className="flex space-x-2 justify-end items-center">
                                    <div className="bg-green-500 w-2 h-2 rounded-full"></div>
                                    <p>RM {item.total_collected.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                                </div>
                            </div>
                            <div className="flex items-center space-x-2 text-xs pt-4">
                                <p>VOLUME</p>
                                <p>
                                    {item.volume}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
                <div className="mt-4 pb-6">
                    <div className="flex items-center justify-center space-x-2">
                        <button className="border px-4 py-2 rounded-md text-xs hover:bg-gray-50">
                            Previous
                        </button>
                        <button className="border px-4 py-2 rounded-md text-xs  hover:bg-gray-50">
                            Next
                        </button>
                    </div>
                </div>
            </div>
            
        </>
    );
}
