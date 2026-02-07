import dayjs from "dayjs";
import {createRequire} from "module";
const require = createRequire(import.meta.url);
const { serve } = require('@upstash/workflow/express');
import Subscription from "../models/subscription.model";

const REMINDERS = [7,5,2,1];

export const sendRemainders = serve(async(context)=>{
    const {subscriptionId} = context.requestPayload;
    const subscription = await fetchSubscription(context,subscriptionId);

    //iske necche cheks hai
    if(!subscription || subscription.status !== active ) return;

    const renewalDate = dayjs(subscription.renewalDate);

    if(renewalDate.isBefore(dayjs())){
        console.log(`Renewal date has passed for subscription ${subscriptionId}. Stopping workflow.`)
        return;
    }

    //yaha apna asli reminder send karne wala logic
})

export const fetchSubscription = async (context,subscriptionId) =>{
    return await context.run('get Subscription ',()=>{
        return Subscription.findById(subscriptionId).populate('user','name email');
    })
}

//sleep function that willl sleep until the next remainder
//we will use this in our main function as a helper function