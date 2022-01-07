import {Document} from 'mongoose'

export interface IOtp extends Document {
    phone: Number;
    otp: String
}


