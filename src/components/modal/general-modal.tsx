import React,{ReactNode} from 'react'


interface GeneralModalProps {
    children?: ReactNode,
    title?: string,
    size?: string,
    header?:boolean,
    openModal: boolean,
    onClose: () => void,
}

export default function generalModal({children,openModal,onClose,title,size,header}:GeneralModalProps) {
    const sizeClassName = size
        ? {
            sm: "max-w-sm",
            md: "max-w-md",
            lg: "max-w-lg",
            xl: "max-w-xl",
        }[size] || "max-w-2xl"
        : "lg:max-w-2xl";
    return (
        <>
        {openModal ?
            <div className="fixed inset-0 backdrop-blur-md bg-black/40 z-50">
                <div className={`fixed inset-0 z-50 lg:relative p-4 lg:pt-0 mx-auto bg-white ${sizeClassName} my-auto mt-0 shadow-lg rounded-lg pt-20 lg:mt-6`}>
                    <div className="">
                        {header ?
                        <div className="flex items-center justify-between pt-4 border-b pb-2">
                            <h1>{title}</h1>
                            <button onClick={onClose} className="flex items-center justify-center rounded-full bg-gray-100 p-1 w-8 h-8 hover:bg-gray-200">
                                X
                            </button>
                        </div>
                        : null}
                        {children}
                    </div>
                </div>  
            </div>
        :null}
        </>
    )
}
