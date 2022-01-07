import { NextFunction, Request, Response } from 'express';
import {IOtp} from "../interfaces/otp"

const { generateOTP, fast2sms } = require('../utils/otp');

const Otp = require("../models/otp")

// Send otp
exports.sendOTP = async (req: Request, res: Response, next: NextFunction) => {
    const phone = req.body.phone;
    const otp = generateOTP(6);
    console.log('Generated otp', otp);
    Otp.findOneAndUpdate({phone: phone}, { otp: otp }, { new: true, upsert: true })
        .then(async (data: IOtp) => {
            await fast2sms(
                {
                    message: `Your OTP for connecting with Shree Developers is ${otp}`,
                    contactNumber: phone
                },
                res.status(200).send({ msg: 'Message sent on your phone', data: [] })
            );
        })
        .catch((err: any) => {
            console.log('err', err);
            res.status(500).send({ msg: 'Internal server error', data: [] });
        });
};

//verify otp
exports.verifyOTP = async (req: Request, res: Response, next: NextFunction) => {
    const { phone, otp } = req.body;
    console.log(req.body)
    Otp.findOne({ phone: phone })
        .then(async (data: IOtp) => {
            if (!data) {
                res.status(400).send({ msg: 'Contact Number mismatch! Please try again', data: [] });
            } else {
                console.log(otp);
                console.log(data.otp);
                console.log(otp.localeCompare(data.otp));
                if (otp == data.otp) {
                    Otp.deleteOne({phone: data.phone}, function(err:any, _:any){
                        if(err){
                            console.log(err)
                        }else{
                            console.log("OTP entry deleted...")
                        }
                    })
                    res.status(200).send({ msg: 'Contact Number Verifiedv', data: [] });
                }else{
                    res.status(401).send({ msg: 'Invalid OTP', data: [] });
                }
            }
        })
        .catch((err: Error) => {
            console.log('er', err);
            res.status(500).send({ msg: 'Internal server error', data: [] });
        });
};

