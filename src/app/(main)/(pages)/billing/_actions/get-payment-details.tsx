'use server'
import { db } from "@/lib/db";
import { auth, currentUser } from "@clerk/nextjs/server";

export async function getTierAndCredits() {
    try {
        const user = await currentUser()
        if (!user) throw new Error('user is required for getTierAndCredits')
        const tierAndCredits = await db.user.findUnique({
            where: {
                clerkId: user.id
            },
            select: {
                tier: true, credits: true
            }
        })
        return tierAndCredits;
    } catch (error) {
        console.log(error);

    }
}