// const { CronJob } = require('cron');
// const partnerServices = require("../service/partner.service");
// const notificationServices = require("../service/notifications.service");
// const segmentsServices = require("../service/segment.service");

// const createCronJob = (cronExpression, jobFunction) => {
//     const cronJob = new CronJob(cronExpression, jobFunction);
//     cronJob.start();
//     return cronJob;
// };

// // const cronExpression1 = '0/10 * * * * *'; // Example: Every Day Mid Night
// const cronExpression1 = '*/1 0 * * *'; // Example: Every Day Mid Night
// const jobFunction1 = async () => {
//     // fetch all current sessions 
//     const sessions = await partnerServices.getAllCurrentSession();
//     // send all partner customers notification which is abandoned isOn true
//     for (const session of sessions) {
//         // get parent details 
//         const shop = session.shop;
//         const parentDetails = await partnerServices.getPartnerInfo(shop);
//         // check abandoned isOn true
//         if (parentDetails) {
//             const automaticNotification = await notificationServices.getNotificationsByParentIdAndIsOnTrue(parentDetails._id);
//             if (automaticNotification) {
//                 // get all customers
//                 const customers = await segmentsServices.getSegmentsCustomers(process.env.ABANDONED_SEGMENT_ID, session);
//                 // check if abandoned days given by partner send otherwise send default 30 days
//                 const abandonedDays = automaticNotification.settings?.interval ? automaticNotification.settings.interval : 30;
//                 // send abandoned customers notifications and update customer column 
//                 await notificationServices.sendNotificationToAbandonedCustomers(customers, parentDetails._id, abandonedDays);
//             }
//         }
//     }
//     console.log('****************************************Abandoned crone running*************************************************');
// };

// // execute cron every day mid night check if have any customer between 30 day abandoned send notification 
// const notificationAbandonedCustomers = createCronJob(cronExpression1, jobFunction1);

// // const cronExpression2 = '0/10 * * * * *'; // Example: Every Day Mid Night
// const cronExpression2 = '*/1 0 * * *'; // Example: Every Day Mid Night
// const jobFunction2 = async () => {
//     // find all partners 
//     const partnersDetails = await partnerServices.findAllPartners();
//     const currentDate = new Date().toISOString().split('T')[0];
//     for (const partner of partnersDetails) {
//         const trailDate = partner.trailDate?.toISOString().split('T')[0];
//         if (trailDate === currentDate) {
//             await partnerServices.updateTrailDateAndEnd(partner._id)
//         }
//     }
//     console.log('****************************************Partners Trail Days End*************************************************');
// };

// // execute cron every day mid night check if have any customer between 30 day abandoned send notification 
// const PartnersTrialDaysEnd = createCronJob(cronExpression2, jobFunction2);

// module.exports = { notificationAbandonedCustomers, PartnersTrialDaysEnd };
