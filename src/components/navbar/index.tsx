import { Bars4Icon } from '@heroicons/react/24/outline'
interface NavbarProps {
    hamburgerClick: () => void,
}

export default function Navbar({hamburgerClick}:NavbarProps) {
    return (
        <header className="fixed top-0 w-full py-3 lg:pr-4 border-b bg-primary-50 lg:bg-transparent lg:border-none z-10 lg:z-40">
            <div className="px-3 lg:pl-0">
                <div className="flex items-center space-x-4">
                    <div className="block lg:hidden">
                        <button onClick={hamburgerClick} className="rounded py-2">
                            <Bars4Icon className="w-8 h-8 text-black"/>
                        </button>
                    </div>
                    <h1 className="text-xl"><span className="text-primary-500 font-bold text-2xl">Billplz</span> Analytics</h1>
                </div>
            </div>
        </header>
    );
}