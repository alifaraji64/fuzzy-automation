'use client'

import { useBilling } from '@/providers/billing-provider'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { SubscriptionCard } from './subscription-card'
import CreditTracker from './credits-tracker'
import SVGLoader from '@/components/global/svg-loader'
import { getTierAndCredits } from '../_actions/get-payment-details'

type Props = {}

const BillingDashboard = (props: Props) => {
    const { credits, tier, setTier, setCredits } = useBilling()
    const [stripeProducts, setStripeProducts] = useState<any>([])
    const [loading, setLoading] = useState<boolean>(false)

    const onStripeProducts = async () => {
        setLoading(true)
        const { data } = await axios.get('/api/payment')
        if (data) {
            setStripeProducts(data)
            setLoading(false)
        }
        setLoading(false)
    }
    const getBillingdetails = async () => {
        const tierAndCredits = await getTierAndCredits()
        setTier(tierAndCredits?.tier || tier)
        setCredits(tierAndCredits?.credits || credits)
    }

    useEffect(() => {
        onStripeProducts()
        getBillingdetails()
    }, [])

    const onPayment = async (id: string) => {
        const { data } = await axios.post(
            '/api/payment',
            {
                priceId: id,
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        )
        window.location.assign(data)
    }

    return (
        <>
            {loading ? (
                <SVGLoader />
            ) : (
                <>
                    <div className="flex gap-5 p-6">
                        <SubscriptionCard
                            onPayment={onPayment}
                            tier={tier}
                            products={stripeProducts}
                        />
                    </div>
                    <CreditTracker
                        tier={tier}
                        credits={parseInt(credits)}
                    />
                </>
            )}
        </>
    )
}

export default BillingDashboard