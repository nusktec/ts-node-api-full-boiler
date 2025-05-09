/**
 Author: Revelation.AF
 Engine: [//]
 Git: nusktec
 **/
export const EmailTemplate_SEND_OTP = (code: string) => {
 return(
     `
     <h1>OTP Verification</h1>
     <p>Your verification code is: <strong>${code}</strong></p>
     <p>This OTP is valid for 10 minutes. Please do not share this code with anyone.</p>
                <p>If you did not request this, please ignore this email.</p>
     `
 )
}
