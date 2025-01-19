'use client'

import { createContext, useContext, useEffect, useState } from "react"
type ModalContextType = {
    data: ModalData
    isOpen: boolean,
    setOpen: (modal: React.ReactNode, fetchData: () => Promise<any>) => void,
    setClose: () => void
}
type ModalContext = createContext<ModalContextType>({

})