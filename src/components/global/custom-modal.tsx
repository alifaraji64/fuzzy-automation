import React from 'react'
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"
import { Button } from '../ui/button'
import { useModal } from '@/providers/modal-provider'
type Props = {
    children: React.ReactNode,
    defaultOpen: boolean
}

function CustomModal({ children, defaultOpen }: Props) {
    const { isOpen, setClose } = useModal()
    const handleClose = () => setClose()
    return (
        <Drawer open={isOpen} onClose={setClose}>
            <DrawerTrigger>Open</DrawerTrigger>
            <DrawerContent>
                <DrawerTitle></DrawerTitle>
                <DrawerHeader>
                    <DrawerDescription>

                        {children}
                    </DrawerDescription>
                </DrawerHeader>
            </DrawerContent>
        </Drawer>
    )
}

export default CustomModal