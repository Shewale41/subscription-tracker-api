import mongoose from 'mongoose';

const subscriptionSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,'Subscription name is required'],
        trim:true,
        minLength:2,
        maxLength:100,
    },
    price:{
        type:Number,
        required:[true,'Subscription price is required'],
        min:[0,'price must be greater than 0'],
    },
    currency:{
        type:String,
        enum:['USD','GBP','EUR','INR'],
        default:'USD',
    },
    frequency:{
        type:String,
        enum:['daily','weekly','monthly','yearly'],
    },
    category:{
        type:String,
        enum:['entertainment','utilities','education','health','other'],
        required:[true,'Subscription category is required'],
    },
    paymentMethod:{
        type:String,
        enum:['credit_card','debit_card','UPI','bank_transfer','other'],
        required:[true,'Payment method is required'],
    },
    status:{
        type:String,
        enum:['active','inactive','cancelled','expired'],
        default:'active',
    },
    startDate:{
        type:Date,
        required:true,
        validate:{
            validator:function(value){
               return value <=new Date()
            },
            message:"Start date must be in past "
        }
    },
    renewalDate:{
        type:Date,
        validate:{
            validator:function(value){
               return value> this.startDate;
            },
            message:"Renewal date must be after start date"
        }
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true,
        index:true,
    }

},{timestamps:true});

//a function to auto-calculate the renewal date if missing
//yeh tab call hota before a document is saved to the db
subscriptionSchema.pre('save', async function(){
    if(!this.renewalDate){
        const renewalPeriods = {
            daily:1,
            weekly:7,
            monthly:30,
            yearly:365,
        };

        this.renewalDate = new Date(this.startDate);
        this.renewalDate.setDate(this.renewalDate.getDate() + renewalPeriods[this.frequency]);
    }

    //Auto-update the status if renewal date has passed
    if(this.renewalDate < new Date()){
        this.status = 'expired';
    }

    
});

const Subscription = mongoose.model('Subscription',subscriptionSchema);

export default Subscription;