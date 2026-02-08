import dayjs from "dayjs";
import {createRequire} from "module";
const require = createRequire(import.meta.url);
const { serve } = require('@upstash/workflow/express');
import Subscription from "../models/subscription.model.js";
import { sendRemainderEmail } from "../utils/send-email.js";

const REMAINDERS = [7,5,2,1];

export const sendRemainders = serve(async(context)=>{
    const {subscriptionId} = context.requestPayload;
    const subscription = await fetchSubscription(context,subscriptionId);

    //iske necche cheks hai
    if(!subscription || subscription.status !== 'active' ) return;

    const renewalDate = dayjs(subscription.renewalDate);

    if(renewalDate.isBefore(dayjs())){
        console.log(`Renewal date has passed for subscription ${subscriptionId}. Stopping workflow.`)
        return;
    }

    //yaha apna asli reminder send karne wala logic
    for(const daysBefore of REMAINDERS ){
        const remaindersDate = renewalDate.subtract(daysBefore,'day');

        if(remaindersDate.isAfter(dayjs())){
            await sleepUntilRemainder(context,`${daysBefore} days before remainder`,remaindersDate);
        }

        if(dayjs().isSame(remaindersDate,'day')) {
        await triggerRemainder(context,`${daysBefore} days before remainder`,subscription);
        }
    }
})

export const fetchSubscription = async (context,subscriptionId) =>{
    return await context.run('get Subscription ',async ()=>{
        return Subscription.findById(subscriptionId).populate('user','name email');
    })
}

//sleep function that willl sleep until the next remainder
//we will use this in our main function as a helper function
const sleepUntilRemainder = async (context,label,date)=>{
    console.log(`Sleeping until ${label} remainder at ${date} `);
    await context.sleepUntil(label,date.toDate());
}

//trigger 
const triggerRemainder = async (context,label,subscription)=>{
    return await context.run(label,async()=>{
        console.log(`Triggering ${label} remainder`);
        //it can be email,sms,or notification kuch bhi
        await sendRemainderEmail({
            to:subscription.user.email,
            type:label,
            subscription,
        })
    })
}   