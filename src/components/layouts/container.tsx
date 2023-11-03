import React , { ReactNode } from 'react'
import { Inter } from 'next/font/google'
import { useMobileSidebar } from '@/context/MobileSidebarContext';
import Sidebar from '@/components/layouts/sidebar';
import Navbar from '@/components/layouts/navbar';

const inter = Inter({ subsets: ['latin'] })

interface ContainerProps {
    children?: ReactNode,
    title: string,
    contentRight? : ReactNode
}

export default function Container({children ,title,contentRight}: ContainerProps) {
    const { showSidebar, setShowSidebar} = useMobileSidebar();
    return (
        <div className={`relative overflow-auto bg-primary-50 ${showSidebar? 'h-0' : 'h-screen'}`}>
            <Navbar 
                hamburgerClick={()=> setShowSidebar(!showSidebar)} 
            />
            <div className="flex w-full">
                <Sidebar 
                    showMobileSidebar={showSidebar} 
                    closeMobileSidebar={()=> setShowSidebar(false)}
                />
                <div className="relative w-full lg:ml-64">
                    <main className="w-full">
                        <div className={`mt-20 lg:-mt-0 ${inter.className}`}>
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
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
}