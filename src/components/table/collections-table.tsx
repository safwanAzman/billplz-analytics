import React,{useState} from 'react'
import Link from 'next/link';
import { Menu } from '@headlessui/react'
import clipboard from 'clipboard-copy';
import { EllipsisVerticalIcon, Square2StackIcon } from '@heroicons/react/24/outline'
import MenuDropdown from '@/components/menu/menu-dropdown';
import {moneyFormat , dateFormat} from '@/utils/formartter'

interface CollectionTableProps {
    data: Array<{
        id: number,
        collection_name: string,
        collection_id: string,
        total_collected: number,
        status:string,
        volume: number,
        created_at: string,
    }>;
    search:string,
    startDate?: Date | null;
    endDate?: Date | null;
}

export default function CollectionTable({data,search, startDate, endDate}:CollectionTableProps) {
    const itemsPerPage = 5; 
    const [currentPage, setCurrentPage] = useState(1);

    
    const filteredData = data.filter((item) => {
        const nameMatch = item.collection_name.toLowerCase().includes(search.toLowerCase());
        const idMatch = item.collection_id.toLowerCase().includes(search.toLowerCase());
        const date = new Date(item.created_at);
        if (endDate === null || endDate === undefined)  {
            const startDateMatch = !startDate || date.toDateString() == startDate.toDateString();
            return (nameMatch || idMatch) && startDateMatch;
        } else {
            const startDateMatch = !startDate || date >= startDate;
            const endDateMatch = date <= endDate;
            return (nameMatch || idMatch) && startDateMatch && endDateMatch;
        }
    });


    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentData = filteredData.slice(indexOfFirstItem, indexOfLastItem);

    const paginate = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    const getStartNumber = () => {
        return (currentPage - 1) * itemsPerPage + 1;
    };

    const handleCopyToClipboard = (text:string) => {
        clipboard(text)
    };
    return (
        <>
            {/* desktop */}
            <div className="hidden md:block">
                <div className="relative  flex flex-col">
                    <div className="-my-2 overflow-x-auto">
                        <div className="inline-block min-w-full py-2 align-middle">
                            <div className="overflow-hidden bg-white">
                                <table className="min-w-full">
                                    <thead className="relative border-b">
                                        <tr>
                                            <th className="px-6 py-3 text-[0.65rem] leading-4 font-medium uppercase text-left">
                                                No
                                            </th>
                                            <th className="px-6 py-3 text-[0.65rem] leading-4 font-medium uppercase text-left">
                                                Date
                                            </th>
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
                                        {currentData.length > 0 ? (
                                            currentData.map((item, index) => (
                                                <tr key={item.id}>
                                                    <td className="px-6 text-[0.65rem] py-2 whitespace-no-wrap leading-5">
                                                        {getStartNumber() + index}
                                                    </td>
                                                    <td className="px-6 text-[0.65rem] py-2 whitespace-no-wrap leading-5">
                                                        {dateFormat(item.created_at, 'dd MMM yyyy')}
                                                    </td>
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
                                                            <div className={`w-2 h-2 rounded-full ${item.status == 'active' ? 'bg-green-500' : 'bg-red-500'}`}></div>
                                                            <p>{moneyFormat(item.total_collected)}</p>
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
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan={7} className="py-4 text-center bg-gray-50 text-sm">
                                                    No data found.
                                                </td>
                                            </tr>
                                        )}
                                        <tr>
                                            <td colSpan={6} className="py-10">
                                                <div className="flex items-center justify-center space-x-2 -mt-6">
                                                    <button
                                                            onClick={() => paginate(currentPage - 1)}
                                                            className={`border px-4 py-2 rounded-md text-xs hover:bg-gray-50
                                                            ${currentPage === 1 ? 'cursor-not-allowed bg-gray-50' : ''}`}
                                                            disabled={currentPage === 1}
                                                        >
                                                            Previous
                                                        </button>
                                                        <button
                                                            onClick={() => paginate(currentPage + 1)}
                                                            className={`border px-4 py-2 rounded-md text-xs hover:bg-gray-50
                                                            ${indexOfLastItem >= data.length ? 'cursor-not-allowed bg-gray-50' : ''}`}
                                                            disabled={indexOfLastItem >= data.length}
                                                        >
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
            <div className="block md:hidden">
                {currentData.length > 0 ? (
                    currentData.map((item, index) => (
                        <div key={item.id} className="border-b p-4">
                            <div className="flex items-start justify-between">
                                <div>
                                    <div className="flex items-center space-x-2">
                                        <p className="text-sm">{getStartNumber() + index} -</p>
                                        <h1 className="font-semibold">{item.collection_name}</h1>
                                    </div>
                                    <div className="flex items-center space-x-2 pt-1 ml-7">
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
                            <div className="mt-4 ml-7">
                                <div className="flex items-center space-x-2 text-xs">
                                    <p>COLLECTED</p>
                                    <div className="flex space-x-2 justify-end items-center">
                                        <div className={`w-2 h-2 rounded-full ${item.status == 'active' ? 'bg-green-500' : 'bg-red-500'}`}></div>
                                        <p>{moneyFormat(item.total_collected)}</p>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-2 text-xs pt-2">
                                    <p>VOLUME</p>
                                    <p>
                                        {item.volume}
                                    </p>
                                </div>
                                <div className="flex items-center space-x-2 text-xs pt-2">
                                    <p>Date</p>
                                    <p>
                                        {dateFormat(item.created_at, 'dd MMM yyyy')}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="py-4 text-center bg-gray-50 text-sm">
                        No data found.
                    </p>
                )}
                
                <div className="mt-4 pb-6">
                    <div className="flex items-center justify-center space-x-2">
                    <button
                            onClick={() => paginate(currentPage - 1)}
                            className={`border px-4 py-2 rounded-md text-xs hover:bg-gray-50
                            ${currentPage === 1 ? 'cursor-not-allowed bg-gray-50' : ''}`}
                            disabled={currentPage === 1}
                        >
                            Previous
                        </button>
                        <button
                            onClick={() => paginate(currentPage + 1)}
                            className={`border px-4 py-2 rounded-md text-xs hover:bg-gray-50
                            ${indexOfLastItem >= data.length ? 'cursor-not-allowed bg-gray-50' : ''}`}
                            disabled={indexOfLastItem >= data.length}
                        >
                            Next
                    </button>
                    </div>
                </div>
            </div>
        </>
    );
}
