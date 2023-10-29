import React , { ReactNode } from 'react'
import Link from 'next/link';
import { ArrowUpIcon,ArrowDownIcon} from '@heroicons/react/24/outline'

interface ChartCardProps {
    displayChart?: ReactNode,
    title: string,
    total:string,
    viewAllClick?:  () => void,
    viewAllTitle:string,
    percentage:string,
    type?:string,
}

export default function ChartCard({
    displayChart,
    title,
    total,
    percentage,
    viewAllClick,
    viewAllTitle,
    type
}: ChartCardProps) {
    const types = 'dropPercentage'
    return (
        <div className="bg-white  p-2 rounded-md shadow-md">
            <div className="px-4 py-4 space-y-2">
                <div className="flex items-center justify-between  text-xs font-semibold">
                    <p>{title}</p>
                    <button onClick={viewAllClick} className="text-primary-600 hover:text-primary-500">
                        {viewAllTitle}
                    </button>
                </div>
                <div className="flex items-center space-x-2">
                    <h1 className="text-lg font-semibold">
                        {total}
                    </h1>
                    <div className={`font-normal text-green-500 flex items-center space-x-1
                        ${type == types ? 'text-red-500': 'text-green-500'}`}>
                        {type == types ? 
                            <ArrowDownIcon className="w-4 h-4"/>
                        :
                            <ArrowUpIcon className="w-4 h-4"/>
                        }
                        <p>{percentage}%</p>
                    </div>
                </div>
            </div>
            {displayChart}
        </div>
    );
}