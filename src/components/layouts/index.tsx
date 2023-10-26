import React,{useState,ReactNode} from 'react'
import Sidebar from '@/components/sidebar';
import Navbar from '@/components/navbar';


interface LayoutsProps {
    children?: ReactNode,
}

export default function Layouts({children}:LayoutsProps) {
    const [showMobileSidebar, setShowMobileSidebar] = useState(false)

    const toggleMobileSidebar = () => {
        setShowMobileSidebar(prevState => !prevState);
    };

    return (
        <div className="relative">
            <Navbar 
                hamburgerClick={toggleMobileSidebar} 
            />
            <div className="flex w-full">
                <Sidebar 
                    showMobileSidebar={showMobileSidebar} 
                    closeMobileSidebar={toggleMobileSidebar}
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
