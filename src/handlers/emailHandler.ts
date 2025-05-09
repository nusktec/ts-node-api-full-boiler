/**
 /Author: Revelation A.F
 /Git: nusktec
 **/
export const emailHandler = async (data: { to: string; subject: string; body: string }) => {
    console.log(`📨 Sending email to ${data.to} with subject "${data.subject}"`);
};

export default {
    send_email: emailHandler,
};
