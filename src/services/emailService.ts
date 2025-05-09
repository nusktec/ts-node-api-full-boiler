/**
 Author: Revelation.AF
 Git: nusktec
 **/
import fs from 'fs'
import {MailtrapClient} from 'mailtrap';
import process from "process";
import {EmailCategoryInterface, EmailCategoryType} from "../interfaces/system";
import rawTemplate from "./template/main.html";

const TOKEN: string = process.env.MAILTRAP_TOKEN || "";

const client = new MailtrapClient({
    token: TOKEN,
});

//const rawTemplate = fs.readFileSync(__dirname + '/template/main.html').toString('utf-8');

//Mail Engine Template
let renderTemplate = (template: any, data: any) => {
    return template.replace(/{{(.*?)}}/g, (match: string) => {
        let mkd = match.split(/{{|}}/).filter(Boolean)[0];
        let a = data[mkd];
        if (a instanceof Array)
            return a.join('\n');
        return data[mkd];
    })
}

const sender = {
    email: "info@notify.axstron.com",
    name: "Axstron Inc.",
};

const SendMail = (category: string, subject: string, name: string, body: string, to: string) => {

    const email = [{
        email: to,
    }]

    client.send({
        from: sender,
        to: email,
        subject,
        category,
        html: renderTemplate(rawTemplate, {body, name})
    })
        .then(console.log)
        .catch(console.error);
}

//enumeration
const EmailCategoryEnum: EmailCategoryInterface = Object.freeze({
    PASSWORD_RESET: "Password Reset",
    ORDER_CONFIRMATION: "Order Confirmation",
    SHIPPING_NOTIFICATION: "Shipping Notification",
    ACCOUNT_CREATION: "Account Creation",
    INVOICE: "Invoice",
    PROMOTIONAL: "Promotional",
    NEWSLETTER: "Newsletter",
    EVENT_INVITATION: "Event Invitation",
    PRODUCT_LAUNCH: "Product Launch",
    ABANDONED_CART: "Abandoned Cart",
    CUSTOMER_SUPPORT: "Customer Support",
    FEEDBACK_SURVEYS: "Feedback/Surveys",
    ISSUE_RESOLUTION: "Issue Resolution",
    ACCOUNT_ALERTS: "Account Alerts",
    SYSTEM_ALERTS: "System Alerts",
    USAGE_REPORTS: "Usage Reports",
    SUBSCRIPTION_RENEWAL: "Subscription Renewal",
    PRIVACY_POLICY_UPDATE: "Privacy Policy Update",
    GDPR_COMPLIANCE: "GDPR Compliance",
    TEAM_ANNOUNCEMENTS: "Team Announcements",
    MEETING_INVITATIONS: "Meeting Invitations",
    NEW_FOLLOWER_CONNECTION: "New Follower/Connection",
    COMMENT_MENTION: "Comment or Mention",
    FRIEND_REQUEST: "Friend Request",
    GENERAL: "General Information"
});


//Module
export {SendMail, EmailCategoryEnum}
