
import NavItem from "@/components/sidebar/nav-item";
import Link from "next/link";
import { 
    HomeIcon,
    CurrencyDollarIcon,
    Cog8ToothIcon,
    ArrowTopRightOnSquareIcon,
    BuildingStorefrontIcon,

} from '@heroicons/react/24/outline'

interface SidebarProps {
    showMobileSidebar: boolean;
    closeMobileSidebar: () => void;
}

export default function Sidebar({showMobileSidebar ,closeMobileSidebar }:SidebarProps) {
    return (
        <aside onClick={closeMobileSidebar}>
            <div  className={`lg:block ${showMobileSidebar == true ? 'block' : 'hidden'}`}>
                <div  className={`fixed inset-0 z-10 bg-black/50 block md:hidden `}></div>
                <div className="">
                    <div  className={`fixed top-0 left-0 flex flex-col flex-shrink-0 h-full duration-75 lg:flex transition-width w-full lg:w-64 z-20 cursor-pointer`}>
                        <div className="relative flex flex-col flex-1 min-h-0 pt-0 bg-white lg:bg-blue-50">
                            <div className="flex items-center justify-between lg:justify-normal mt-4 lg:mt-20 px-4 border-b pb-4 lg:border-none">
                                <div className="flex items-center space-x-2 ">
                                    <div className="bg-black p-1 text-white rounded-full">
                                        <BuildingStorefrontIcon className="w-4 h-4"/>
                                    </div>   
                                    <h1 className="text-sm font-bold">Joy and Supply Store</h1> 
                                </div>
                                <div className="block lg:hidden">
                                    <button className="flex items-center justify-center rounded-full bg-gray-100 p-1 w-8 h-8">
                                        X
                                    </button>
                                </div>    
                            </div>

                            {/* Nav Item section */}
                            <div className="flex flex-col flex-1 pb-4 overflow-y-auto ">
                                <div className="flex-1 px-3 space-y-1 flex flex-col justify-between ">
                                    <ul className="pt-4 pb-2 space-y-2 list-none">
                                        <NavItem 
                                            title="Dashboard"
                                            icon={
                                                <HomeIcon className="w-5 h-5"/>
                                            }
                                            href='/'
                                        />
                                        <NavItem 
                                            title="Billing"
                                            icon={
                                                <CurrencyDollarIcon className="w-5 h-5"/>
                                            }
                                            href='/billing'
                                        />
                                        <NavItem 
                                            title="Subscription"
                                            icon={
                                                <CurrencyDollarIcon className="w-5 h-5"/>
                                            }
                                            href='/subscription'
                                        />
                                    </ul>

                                    <ul className="pt-4 pb-2 space-y-2 list-none">
                                        <NavItem 
                                            title="Account Setting"
                                            icon={
                                                <Cog8ToothIcon className="w-5 h-5"/>
                                            }
                                            href=''
                                        />
                                        <NavItem 
                                            title="Support"
                                            icon={
                                                <ArrowTopRightOnSquareIcon  className="w-5 h-5"/>
                                            }
                                            href=''
                                        />
                                        <NavItem 
                                            title="FAQ"
                                            icon={
                                                <ArrowTopRightOnSquareIcon  className="w-5 h-5"/>
                                            }
                                            href=''
                                        />
                                    
                                        <Link href="https://safwan-portfolio.vercel.app/">
                                            <div className="bg-primary-500 text-white py-2 rounded-md hover:bg-primary-700 mt-10">
                                                <p className="text-xs text-center"> &copy; code by SafwanAzman</p>
                                            </div>
                                        </Link>
                                    </ul>
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </aside>
    );
}