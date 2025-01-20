import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { WorkflowSchema } from '@/lib/types'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'


type Props = {
    title: string,
    subHeading: string
}

function WorkflowForm({ title, subHeading }: Props) {
    const form = useForm<z.infer<typeof WorkflowSchema>>({
        mode: 'onChange',
        resolver: zodResolver(WorkflowSchema),
        defaultValues: {
            title: '',
            subHeading: ''
        },
    })
    const isLoading = form.formState.isLoading;
    const router = useRouter()
    const handleSubmit = () => { }
    return (
        <Card className='w-full max-w-[650px] border-none mx-auto'>
            {title && subHeading && (
                <>
                    <CardHeader>
                        <CardTitle className='text-2xl'>{title}</CardTitle>
                        <CardDescription>{subHeading}</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Form {...form}>
                            <form
                                onSubmit={form.handleSubmit(handleSubmit)}
                                className='flex flex-col gap-4 text-left'
                            >
                                <FormField
                                    disabled={isLoading}
                                    name='title'
                                    control={form.control}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                Name
                                            </FormLabel>
                                            <FormControl>
                                                <Input placeholder='Name' {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    disabled={isLoading}
                                    name='subHeading'
                                    control={form.control}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                Description
                                            </FormLabel>
                                            <FormControl>
                                                <Input placeholder='Description' {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <Button
                                onClick={()=>{console.log('loog');
                                }}
                                    className='mt-4'
                                    disabled={isLoading}
                                    type='submit'>
                                    {isLoading ? <Loader2 /> : 'Save Settings'}
                                </Button>

                            </form>
                        </Form>
                    </CardContent>
                </>
            )}
        </Card>
    )
}

export default WorkflowForm