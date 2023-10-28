
import React,{ createContext, useState, useContext } from 'react';


interface MobileSidebarContextProps {
    showSidebar: boolean;
    setShowSidebar: React.Dispatch<React.SetStateAction<boolean>>;
}

type MobileSidebarProviderProps = {
    children: React.ReactNode;
};

const MobileSidebarContext = createContext<MobileSidebarContextProps | null>(null);

export const MobileSidebarProvider = ({ children }: MobileSidebarProviderProps) => {
    const [showSidebar, setShowSidebar] = useState(false);

    return (
        <MobileSidebarContext.Provider value={{ showSidebar, setShowSidebar }}>
            {children}
        </MobileSidebarContext.Provider>
    );
};

export const useMobileSidebar = (): MobileSidebarContextProps => {
    const context = useContext(MobileSidebarContext);
    if (!context) {
        throw new Error("useMobileSidebar must be used within a MobileSidebarProvider");
    }
    return context;
};
