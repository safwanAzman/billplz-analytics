import React , { ReactNode } from 'react'
import Layouts from '@/components/layouts'
import { Inter } from 'next/font/google'
const inter = Inter({ subsets: ['latin'] })

interface ContainerProps {
    children?: ReactNode,
    title: string,
    contentRight? : ReactNode
}

export default function Container({children ,title,contentRight}: ContainerProps) {
    return (
        <Layouts>
            <main className={`mt-20 lg:-mt-0 ${inter.className}`}>
                <div className="px-4 lg:px-8 relative mt-0 lg:-mt-16 z-0 lg:z-50 ">
                    <div className="flex items-start lg:items-center justify-center flex-col z-50 lg:flex-row lg:justify-between lg:sticky -top-3 bg-primary-50 lg:pb-4 lg:pt-1">
                        <h1 className="pt-6 text-xl font-bold text-black capitalize">
                            {title}
                        </h1>
                        <div className="relative mt-4">
                            {contentRight}
                        </div>
                    </div>
                    <div className="mb-24 pt-4 lg:pt-0 mt-0 lg:mt-16">
                        <div>
                            {children}
                        </div>
                    </div>
                </div>
            </main>
        </Layouts>
    );
}