import React,{useState,ReactNode} from 'react'
import Sidebar from '@/components/sidebar';
import Navbar from '@/components/navbar';
import { useMobileSidebar } from '@/context/MobileSidebarContext';


interface LayoutsProps {
    children?: ReactNode,
}

export default function Layouts({children}:LayoutsProps) {
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
                        {children}
                    </main>
                </div>
            </div>
        </div>
    )
}
