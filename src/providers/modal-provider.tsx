'use client'

import { s } from "framer-motion/client"
import { createContext, useContext, useEffect, useState } from "react"
interface ModalProviderProps {
    children: React.ReactNode
}
export type ModalData = {}
type ModalContextType = {
    data: ModalData
    isOpen: boolean,
    setOpen: (modal: React.ReactNode, fetchData: () => Promise<any>) => void,
    setClose: () => void
}
export const ModalContext = createContext<ModalContextType>({
    data: {},
    isOpen: false,
    setOpen: (modal: React.ReactNode, fetchData: () => Promise<any>) => { },
    setClose: () => { }
})

const ModalProvider: React.FC<ModalProviderProps> = ({ children }) => {
    const [isOpen, setisOpen] = useState(false)
    const [data, setdata] = useState<ModalData>({})
    const [showingModal, setshowingModal] =
        useState<React.ReactNode>(null)
    const [isMounted, setisMounted] = useState(false)
    useEffect(() => {
        setisMounted(true)
    }, [])

    const setOpen = async (
        modal: React.ReactNode,
        fetchData: () => Promise<any>
    ) => {
        if (modal) {
            setdata({ ...data, ...(await fetchData()) })
        }
        setshowingModal(modal)
        setisOpen(true)
    }

    const setClose = () => {
        setisOpen(false)
        setdata({})
    }
    if (!isMounted) return null;

    return <ModalContext.Provider value={{ data, setOpen, setClose, isOpen }}>
        {children}
        {showingModal}
    </ModalContext.Provider>
}

export const useModal = ()=>{
    const context = useContext(ModalContext)
    if(!context){
        throw new Error('useModal must be used within the modal provider')
    }
    return context;
}

export default ModalProvider; 