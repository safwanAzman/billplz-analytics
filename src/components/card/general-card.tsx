import React , { ReactNode } from 'react'

interface ContainerProps {
    content?: ReactNode,
    title: string,
}

export default function GenetalCard({content ,title,}: ContainerProps) {
    return (
    <div className="bg-white p-2 rounded-md shadow-md relative">
        <div className="px-4 py-4 space-y-2">
            <div className="text-xs font-semibold">
                <p>{title}</p>
            </div>
            {content}
        </div>
    </div>
    );
}