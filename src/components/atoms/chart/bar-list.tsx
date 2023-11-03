import { ReactNode } from 'react'

interface BarListProps {
    title?: string;
    percentageValue?: number;
    total?: string;
}
export default function BarList({ title, percentageValue, total }: BarListProps) {
    const percentage = percentageValue ? percentageValue : 0; // No need to convert to string

    return (
        <div className="pb-1">
            <h1 className="uppercase text-gray-500 text-xs pb-1">{title}</h1>
            <div className="flex items-center justify between space-x-2">
                <div className="w-full bg-gray-200 ">
                    <div
                        className="bg-blue-500 text-xs font-medium text-white text-left p-1 leading-none border-r-[6px] border-cyan-300"
                        style={{ width: `${percentage}%` }}
                    >
                        {total}
                    </div>
                </div>
                <div className="text-xs font-semibold">
                    <p>{percentageValue ? `${percentageValue}%` : '0%'}</p>
                </div>
            </div>
        </div>
    );
}
