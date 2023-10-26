import Link from 'next/link';
import { useRouter } from 'next/router';
import React , { ReactNode } from 'react'


interface NavItemProps {
    icon: ReactNode;
    title: string;
    href: string;
}

export default function NavItem({icon ,title,href} : NavItemProps) {
    const { asPath } = useRouter();
    const isActiveNavItem = asPath === href ? 'text-primary-500 bg-primary-100' : '';
    
    return (
        <>
            <li>
                <Link
                    href={href}
                    className={`flex items-center  text-base font-normal rounded-lg  hover:text-primary-600 py-2 px-2 ${isActiveNavItem}`}
                >
                    <span>
                        {icon}
                    </span>
                    <span className={`ml-3 font-normal text-sm`}>
                        {title}
                    </span>
                </Link>
            </li>

            
        </>
    );
}