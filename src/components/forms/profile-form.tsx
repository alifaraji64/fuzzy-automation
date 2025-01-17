'use client'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { EditUserProfileSchema } from '@/lib/types'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { Loader2 } from 'lucide-react'

type Props = {}

function ProfileForm({ }: Props) {
    const [isLoading, setIsLoading] = useState(false)
    const form = useForm<z.infer<typeof EditUserProfileSchema>>({
        mode: 'onChange',
        resolver: zodResolver(EditUserProfileSchema),
        defaultValues: {
            name: '',
            email: ''
        }
    })
    return (
        <Form {...form}>
            <form className='flex flex-col gap-5'
                onSubmit={() => { }}>
                <FormField
                    control={form.control}
                    disabled={isLoading}
                    name='name'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className='text-lg'>
                                User Full Name
                            </FormLabel>
                            <FormControl>
                                <Input placeholder='Name' type='email' {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    disabled
                    name='email'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className='text-lg'>
                                Email
                            </FormLabel>
                            <FormControl>
                                <Input placeholder='placeholder@gmail.com' {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type='submit' className='
                hover:bg-[#2F006B] hover:text-white'>
                    {isLoading ?
                        <>
                            <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                            saving
                        </>
                        : 'Save User Settings'}
                </Button>
            </form>
        </Form>
    )
}

export default ProfileForm