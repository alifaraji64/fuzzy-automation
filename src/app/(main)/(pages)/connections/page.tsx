import { CONNECTIONS } from '@/lib/constants'
import React from 'react'
import ConnectionCard from './_components/connection-card'

type Props = {}

function Connections({ }: Props) {
    return (
        <div className='flex flex-col gap-4'>
            <h1 className='sticky top-0 z-[10] flex
       items-center justify-between border-b
       bg-background/50 p-6 text-4xl'>
                <span>Connections</span>
            </h1>
            <div className="relative flex flex-col gap-4">
                <section className='flex flex-col
                 gap-4 p-6 text-muted-foreground'>
                    Connect all your apps directly from here. you may need to connect 
                    the apps regularly to refresh verification
                    {CONNECTIONS.map(connection=>(
                        <ConnectionCard 
                        title={connection.title}
                        description={connection.description}
                        key={connection.title}
                        icon={connection.image}
                        type={connection.title}
                        callBack={()=>{}}
                        connected={{}}
                        />
                    ))}
                </section>
            </div>
        </div>
    )
}

export default Connections