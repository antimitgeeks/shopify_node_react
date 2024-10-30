// const { shopify } = require("../../shopify.js");
// const Partner = require("../models/partners.model.js");
// const AppBuildHistory = require('../models/appBuildHistory.js')
// const shopifySessions = require("../models/shopifySessions.model.js");
// const bcrypt = require("bcrypt");
// const StoreListings = require("../models/storeListing.model.js");
// const CustomerSupport = require("../models/customer.support.model.js");
// const Design = require("../models/design.model.js");
// const Customer = require("../models/customer.model.js");
// const Notifications = require("../models/notifications.model.js");
// const Forms = require("../models/form.model.js");
// const FormAns = require("../models/formAns.model.js");
// const Supports = require("../models/support.model.js");
// const AppPublish = require("../models/appPublish.model.js");
// const AppChat = require("../models/appChat.model.js");
// const AutomaticNotifications = require("../models/automaticNotifications.model.js");
// const ContactUs = require("../models/contactUs.model.js");
// const ShopDetails = require("../models/shopDetails.model.js");
// const { DEVICE, APP_STATUS, THEMES } = require("../constants/constants.js");
// const designService = require("../service/design.service.js");
// const imageUploadController = require("../controllers/imageUpload.controller.js");
// const fs = require('fs');
// const path = require('path');
// const emailConfig = require('../config/email');
// const emailTemplates = require('../utils/emailTemplate.js');
// const nodemailer = require('nodemailer');
// const axios = require('axios')
// const mongoose = require('mongoose')
// const { v4: uuidv4 } = require("uuid");

// exports.addPartnerDetails = async (session) => {
//     // Fetch shop information using the Shopify REST API
//     const shopInfo = await shopify.api.rest.Shop.all({
//         session: session,
//     });
//     if (!shopInfo.data?.length) {
//         return false;
//     }
//     const storData = shopInfo.data[0];
//     // Check if a store already exists in the database based on its myshopify_domain
//     const storeExist = await Partner.findOne({ myshopify_domain: storData.myshopify_domain }).select("-password");
//     if (storeExist) {
//         return storeExist;
//     }
//     const randomString = Math.random().toString(36).substring(2, 8);
//     const password = bcrypt.hashSync(randomString, 10);
//     console.log("new store password :", randomString);
//     // paper  partner details
//     const details = {
//         id: storData.id,
//         name: storData.name,
//         email: storData.email,
//         password: password,
//         domain: storData.domain,
//         address: storData.address,
//         city: storData.city,
//         country: storData.country,
//         zip: storData.zip,
//         shop_owner: storData.shop_owner,
//         myshopify_domain: storData.myshopify_domain,
//         currentTheme: THEMES.FIRST,
//         publishedTheme: THEMES.FIRST,
//         hiddenFeatures: []
//     };
//     const result = await Partner.create(details);
//     const updatedPartner = await Partner.updateOne({ _id: result._id }, { packageName: `com.itg.mob${result._id}` });
//     delete result.password;
//     // added partner Store Listing Details
//     const storeListingDetails = {
//         partnerId: result._id,
//         email: storData.email,
//         appName: storData.name,
//         // added app status default values
//         appStatus: [
//             {
//                 deviceName: DEVICE.ANDROID,
//                 status: [
//                     {
//                         state: APP_STATUS.DESIGN_PENDING,
//                         status: true
//                     }
//                 ]
//             },
//             {
//                 deviceName: DEVICE.IOS,
//                 status: [
//                     {
//                         state: APP_STATUS.DESIGN_PENDING,
//                         status: true
//                     }
//                 ]
//             }
//         ]
//     }
//     await StoreListings.create(storeListingDetails);
//     // added design for new partner
//     const defaultDesigns = await designService.getDefaultDesign(THEMES.FIRST, null, session);
//     await this.saveDefaultDesign(defaultDesigns, result._id);

//     // send welcome mail to new partner
//     const transporter = nodemailer.createTransport(emailConfig);
//     const mailOptions = emailTemplates.welcomeEmail(storData.email, storData.name);
//     transporter.sendMail(mailOptions, (error, info) => {
//         if (error) {
//             console.error(`Error in partner welcome email send :`, error);
//         } else {
//             console.log(`Partner welcome email send success :`, info.response);
//         }
//     });
//     // send support to add new partner
//     const mailOptions2 = emailTemplates.partnerNotificationEmail(process.env.SUPPORT_EMAIL, storData.name, details);
//     transporter.sendMail(mailOptions2, (error, info) => {
//         if (error) {
//             console.error(`Error in support notify new partner:`, error);
//         } else {
//             console.log(`Support notify new partner mail send success :`, info.response);
//         }
//     });
//     return result;
// };

// // save default design for design and publish table
// exports.saveDefaultDesign = async (json_data, partnerId) => {
//     if (json_data?.length) {
//         json_data.forEach(async (json) => {
//             let data;
//             if (json.page_type === 'Collection') {
//                 const pageJsonDetails = json.page_json.map((item) => ({
//                     ...item,
//                     _id: item.id,
//                     id: uuidv4()
//                 }));
//                 data = {
//                     page_type: json.page_type,
//                     page_json: pageJsonDetails,
//                     partner_id: partnerId,
//                     created_at: new Date(),
//                     theme: THEMES.FIRST
//                 };
//             } else {
//                 data = {
//                     page_type: json.page_type,
//                     page_json: json.page_json,
//                     partner_id: partnerId,
//                     created_at: new Date(),
//                     theme: THEMES.FIRST
//                 };
//             }
//             // save design details for design 
//             await designService.saveDesigns(data);
//             // save design details for publish 
//             await designService.savePublishDesigns(data);
//             return true;
//         });
//     }
//     return true;
// }

// exports.getPartnerInfo = async (shop) => {
//     // Check if a store already exists in the database based on its myshopify_domain
//     let storeExist = await Partner.findOne({ myshopify_domain: shop })
//     storeExist = storeExist?.toObject();
//     if (!storeExist) {
//         return false;
//     }
//     // adjust and calculate trail remaining days
//     if (storeExist.trial) {
//         const today = new Date();
//         const trailDate = new Date(storeExist.trailDate);
//         trailDate.setDate(trailDate.getDate() + 30);
//         const trialEndDate = new Date(trailDate);
//         const timeDiff = trialEndDate.getTime() - today.getTime();
//         let remainingDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
//         if (remainingDays > 30) {
//             remainingDays = 30
//         }
//         storeExist.remainingDays = remainingDays;
//     }
//     return storeExist;
// };

// // update partner details by domain 
// exports.updatePartnerDetails = async (details, partnerDetails) => {
//     // add planDate if plan added/updated
//     if (details?.charge_id) {
//         details.planDate = new Date();
//         if (!partnerDetails.trailDate && !partnerDetails.trailEnd) {
//             details.trailDate = new Date().toISOString().split('T')[0];
//         }
//         // add data in shop details collection
//         const shopDetailsExist = await ShopDetails.findOne({ domain: partnerDetails.myshopify_domain });
//         if (!shopDetailsExist) {
//             await ShopDetails.create({ domain: partnerDetails.myshopify_domain, plan: details.planDate });
//         }
//     }
//     if (details.appUrlAndroid) {
//         const appBuildPreviewUrl = await appBuildPreview(details.appUrlAndroid)
//         const updatedDetails = { ...details, appUrlAndroid: appBuildPreviewUrl.publicURL, appUrlIos: appBuildPreviewUrl.publicURL }
//         await Partner.updateOne({ _id: partnerDetails._id }, updatedDetails);
//         await AppBuildHistory.create({
//             partnerId: partnerDetails._id,
//             appUrlAndroid: details.appUrlAndroid,
//             appBuildPreviewUrlAndroid: appBuildPreviewUrl.publicURL,
//             appUrlIos: details.appUrlAndroid,
//             appBuildPreviewUrlIos: appBuildPreviewUrl.publicURL,

//         })
//         return true;
//     }
//     // update partner details
//     await Partner.updateOne({ _id: partnerDetails._id }, details);
//     return true;
// };


// const appBuildPreview = async (appUrlAndroid) => {
//     try {
//         const response = await axios.post(process.env.APPETIZE_API, {
//             platform: 'android',
//             url: appUrlAndroid
//         }, {
//             headers: {
//                 'Content-Type': 'application/json'
//             }
//         });

//         return response.data;
//     } catch (error) {
//         console.log("error in app build preview", error)
//         return false
//     }
// }


// // check charge id valid or not 
// exports.validChargeId = async (details, session) => {
//     const data = await shopify.api.rest.RecurringApplicationCharge.find({
//         session: session,
//         id: details.charge_id,
//     });
//     if (!data) {
//         return false;
//     }
//     // checkout give charge id same amount and plan in request
//     // if (details.planName === data?.name && details.amount == data?.price) {
//     //     return true;
//     // }
//     return data;
// }

// // getShopByEmail
// exports.findPartnerByEmail = async (email) => {
//     const partners = await Partner.find({ email: email });
//     return partners
// };

// exports.forgotPassword = async (shop) => {

//     const shopExist = await this.getPartnerInfo(shop)
//     if (!shopExist) {
//         return false
//     }
//     const email = shopExist.email

//     // const transporter = nodemailer.createTransport(emailConfig);
//     // const resetLink = `${process.env.RESET_LINK}?shop=${shop}`
//     // const mailOptions = emailTemplate.resetLink(email, resetLink);

//     // transporter.sendMail(mailOptions, (error, info) => {
//     //     if (error) {
//     //         console.error(ErrorMassage.EMAIL_NOT_SEND, error);
//     //     } else {
//     //         console.log(SuccessMassage.RESET_EMAIL, info.response);
//     //     }
//     // });

//     return true;
// }


// exports.resetPassword = async (shop, password) => {
//     const passwordHash = bcrypt.hashSync(password, 10);
//     await Partner.updateOne({ myshopify_domain: shop }, { password: passwordHash });
//     return true;
// }


// // when email have multiple shop
// exports.getpartnerByEmail = async (email) => {
//     const shops = await Partner.find({ email: email })
//     if (!shops?.length) {
//         return false
//     }
//     return shops.map((itm) => {
//         return {
//             id: itm._id,
//             shop: itm.myshopify_domain
//         }
//     })

// }

// exports.login = async ({ shop, email, password }) => {
//     const shopExist = await this.getPartnerInfo(shop)
//     if (!shopExist) {
//         return false
//     }
//     // password and email matched or not
//     let isMatched = await bcrypt.compare(password, shopExist.password);
//     if (isMatched == false || email != shopExist.email) {
//         return false
//     }
//     return shopExist
// }

// exports.settingUpdate = async (settingJson, partnerId) => {
//     const setting = {
//         settings: settingJson
//     }
//     await Partner.updateOne({ _id: partnerId }, setting)
//     return true
// }

// exports.getSettings = async (partnerInfo) => {
//     if (partnerInfo && typeof partnerInfo === 'object' && 'settings' in partnerInfo && partnerInfo?.settings?.length > 0) {
//         return partnerInfo?.settings
//     }

//     try {
//         const filePath = path.join(__dirname, '../files/defaultSettings.json');
//         const settingsData = fs.readFileSync(filePath, 'utf8');
//         const result = JSON.parse(settingsData);
//         return result?.settings;
//     } catch (error) {
//         console.log("Error While Fetching Setting Details Json File : ", error);
//         return false
//     }

// }

// exports.appSettings = async (settingJson, partnerId) => {
//     settingJson.updated_at = new Date()
//     const setting = {
//         appSettings: settingJson
//     }
//     await Partner.updateOne({ _id: partnerId }, setting);
//     // update app status 
//     const appDetails = { state: APP_STATUS.APP_DETAILS, status: true }
//     // check already app details exist or not 
//     const storeListingData = await StoreListings.findOne({ partnerId });
//     const storeExist = storeListingData.appStatus.some(entry => {
//         return entry.status.some(s => s.state === APP_STATUS.APP_DETAILS);
//     });
//     if (!storeExist) {
//         await StoreListings.findOneAndUpdate(
//             { partnerId, "appStatus.deviceName": DEVICE.ANDROID },
//             { $push: { "appStatus.$.status": appDetails } }
//         );

//         // Update for iOS
//         await StoreListings.findOneAndUpdate(
//             { partnerId, "appStatus.deviceName": DEVICE.IOS },
//             { $push: { "appStatus.$.status": appDetails } }
//         );
//     }
//     return true
// }

// // get all current sessions
// exports.getAllCurrentSession = async () => {
//     const result = await shopifySessions.find();
//     return result
// }

// // get all partners
// exports.findAllPartners = async () => {
//     const result = await Partner.find();
//     return result
// }

// // update partner trail date and trail end
// exports.updateTrailDateAndEnd = async (id) => {
//     await Partner.updateOne({ _id: id }, { trailDate: null, trailEnd: true });
//     return true
// }

// // get parent by id 
// exports.getPartnerById = async (id) => {
//     const result = await Partner.findById(id);
//     return result;
// }

// // get supports list
// exports.getSupportsList = async (partnerId, params) => {
//     const result = await CustomerSupport.find({ type: params.type, partnerId: partnerId }).sort({ createdAt: -1 }).limit(params.limit).skip(params.offset);
//     return result;
// }

// // current shop store listing details
// exports.getStoreListing = async (partnerId) => {
//     const result = await StoreListings.findOne({ partnerId: partnerId }).select('-appStatus');
//     if (!result) {
//         const partnerData = await this.getPartnerById(partnerId);
//         const data = {
//             appName: partnerData.name,
//             mobile: partnerData.phoneNumber,
//             email: partnerData.email,
//         }
//         return data
//     }
//     return result;
// }

// // update current shop store listing details
// exports.updateStoreListing = async (details, id) => {
//     await StoreListings.updateOne({ partnerId: id }, { $set: details }, { upsert: true });
//     return true;
// }

// // get store listing details by id
// exports.getStoreListingByPartnerId = async (id) => {
//     const result = await StoreListings.findOne({ partnerId: id });
//     return result;
// }

// // get current shop status
// exports.getAppStatus = async (partnerId) => {
//     const result = await StoreListings.findOne({ partnerId }).select('appStatus');
//     return result;
// }

// // get app status list
// exports.getAppStatusList = async (params) => {
//     const result = await StoreListings.find().sort({ createdAt: -1 }).limit(params.limit).skip(params.offset).populate('partnerId', 'name email').select('appStatus');
//     return result;
// }

// // update current shop app status
// exports.updateAppStatus = async (details, partnerId) => {
//     // check first store listing exist or not for current shop
//     let storeListingsDetails = await StoreListings.findOne({ partnerId: partnerId });
//     if (!storeListingsDetails) {
//         return false
//     }
//     // update if existing property update given in request 
//     // add if new property update on status array
//     for (let i = 0; i < storeListingsDetails.appStatus.length; i++) {
//         if (storeListingsDetails.appStatus[i].deviceName === details.deviceName) {
//             // Find the status object within the status array
//             const statusObject = storeListingsDetails.appStatus[i].status.find(status => status.state === details.state);
//             if (statusObject) {
//                 // Update the state property of the found status object
//                 statusObject.state = details.state;
//                 statusObject.status = details.status;
//                 statusObject.link = details.link;
//             } else {
//                 // If state not found, add a new status object to the status array
//                 storeListingsDetails.appStatus[i].status.push({ state: details.state, status: details.status, link: details.link });
//             }
//         }
//     }
//     const data = await storeListingsDetails.save();

//     return data;
// }

// // save shop details 
// exports.saveShopDetails = async (domain, unInstalled) => {
//     // update partner charge id 
//     await Partner.updateOne({ myshopify_domain: domain }, { charge_id: null });
//     return true;
// }

// // uninstall email
// exports.uninstallEmail = async (email, name) => {
//     // uninstall app mail send partner and support
//     const transporter = nodemailer.createTransport(emailConfig);
//     const mailOptions = emailTemplates.uninstallEmail(email, name, process.env.SUPPORT_EMAIL)
//     transporter.sendMail(mailOptions, (error, info) => {
//         if (error) {
//             console.error(`Error in uninstall app :[partner]`, error);
//         } else {
//             console.log(`Uninstall app email send success :[partner]`, info.response);
//         }
//     });

//     const mailOptions2 = emailTemplates.notifySupportUninstall(process.env.SUPPORT_EMAIL, name)
//     transporter.sendMail(mailOptions2, (error, info) => {
//         if (error) {
//             console.error(`Error in uninstall app :[support]`, error);
//         } else {
//             console.log(`Error in uninstall app :[support]`, info.response);
//         }
//     });

// }

// // get partner used trail date
// exports.getTrailUsedDate = async (domain) => {
//     const shopDetails = await ShopDetails.findOne({ domain });
//     if (!shopDetails) {
//         return 0
//     }
//     const planDate = new Date(shopDetails.plan);
//     const currentDate = new Date();
//     const timeDiff = currentDate.getTime() - planDate.getTime();
//     const usedDays = Math.floor(timeDiff / (1000 * 3600 * 24));
//     return usedDays
// }

// // check current plan status by charge id 
// exports.planStatus = async (chargeId, session) => {
//     try {
//         const chargeDetails = await shopify.api.rest.RecurringApplicationCharge.find({
//             session: session,
//             id: chargeId,
//         });
//         return chargeDetails;
//     } catch (error) {
//         console.log("Error in Check Partner Charge Details : ", error);
//         return false
//     }
// }

// // remove partner related details
// exports.removePartnerDetails = async (myshopify_domain) => {
//     const partnerDetails = await Partner.findOne({ myshopify_domain });
//     // partner details not exist return true
//     if (!partnerDetails) {
//         return true;
//     }
//     // remove store listing details 
//     await StoreListings.deleteOne({ partnerId: partnerDetails._id });
//     // remove store design details 
//     await Design.deleteMany({ partner_id: partnerDetails._id });
//     // remove customer details 
//     await Customer.deleteMany({ partner_id: partnerDetails._id });
//     // remove notification details
//     await Notifications.deleteMany({ partnerId: partnerDetails._id });
//     // remove automatic notification details
//     await AutomaticNotifications.deleteMany({ partnerId: partnerDetails._id });
//     // remove contacts us details
//     await ContactUs.deleteMany({ partner_id: partnerDetails._id });
//     // remove customer support details
//     await CustomerSupport.deleteMany({ partnerId: partnerDetails._id });
//     // remove forms details
//     await Forms.deleteMany({ partnerId: partnerDetails._id });
//     // remove form ans details
//     await FormAns.deleteMany({ partnerId: partnerDetails._id });
//     // remove supports details
//     await Supports.deleteMany({ partner_id: partnerDetails._id });
//     // remove chat details
//     await AppChat.deleteMany({ 'receiver.id': partnerDetails._id });
//     // remove app publish details
//     await AppPublish.deleteMany({ partner_id: partnerDetails._id });
//     // remove partner images folder 
//     await imageUploadController.deleteFolder(partnerDetails.myshopify_domain);
//     // remove remove details
//     await Partner.deleteOne({ _id: partnerDetails._id });
//     return true;
// }

// // remove customer from DB 
// exports.removeCustomer = async (id) => {
//     try {
//         // find customers where shopify id 
//         const customerDetails = await Customer.find({ id });
//         const customerIds = customerDetails.map(item => item._id);
//         if (customerIds?.length) {
//             for (const customerId of customerIds) {
//                 // remove form ans
//                 await FormAns.deleteMany({ customerId });
//                 // remove form ans
//                 await CustomerSupport.deleteMany({ customerId });
//                 // remove chat details
//                 await AppChat.deleteMany({ 'sender.id': id });
//                 // remove customer details
//                 await Customer.deleteMany({ id });
//             }
//         }
//         return true;
//     } catch (err) {
//         console.log('Remove Customer Error : ', err);
//     }
// }

// // current partner , customer details 
// exports.customerList = async (partner_id, params) => {
//     const result = await Customer.find({ partner_id }).sort({ createdAt: -1 }).limit(params.limit).skip(params.offset)
//     return result
// }

// // return current partner all installed app
// exports.appInstalled = async (session) => {
//     const client = new shopify.api.clients.Graphql({ session });
//     const data = await client.query({
//         data: {
//             "query": `query
//             {
//              appInstallations(first:250){
//                 nodes{
//                     app{
//                         apiKey
//                         icon{
//                             url
//                         }
//                         appStoreAppUrl
//                         title
//                         webhookApiVersion
//                         banner
//                         {
//                             url
//                         }
//                     }
                
//                 }
//             }
//             }`
//         }
//     });
//     return data;
// }