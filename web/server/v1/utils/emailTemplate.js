exports.welcomeEmail = (email, userName) => {
  const data = {
    from: process.env.SMTP_USER,
    to: email,
    subject: 'Unlock the Magic of Mobile Apps with ITGeeks Mobilify 🌟',
    html: `
    <div style="margin: 0; padding: 0; font-family: Arial, sans-serif; color: #333;">
        <table width="800" align="center" cellpadding="0" cellspacing="0" border="0" style="border-collapse: collapse;">
          <tr>
            <td style="padding: 0;">
              <img src="https://mobilify.nyc3.cdn.digitaloceanspaces.com/public/themes/66f93435-c94f-4db0-a314-660452602a42.png" width="800" height="82" style="display: block; width: 100%; height: auto;"/>
            </td>
          </tr>
          <tr>
            <td style="padding: 0;">
              <img src="https://mobilify.nyc3.cdn.digitaloceanspaces.com/public/themes/7f5664e9-ab5c-4669-a225-4d015f34f2cb.png" width="800" height="235" style="display: block; width: 100%; height: auto;"/>
            </td>
          </tr>
      
          <!-- Email content -->
          <tr>
            <td style="padding: 40px; box-sizing: border-box;color:black;">
              <p style="font-weight: 700; margin: 0; padding:5px;">Hi ${userName},</p>
              <p style="margin: 0; padding:5px;">
                Welcome to <strong>Mobilify!</strong> We're thrilled to have you on board and excited to help you transform your Shopify store into a seamless mobile experience.
              </p>
              <p style="margin: 0; padding:5px;">By installing the Mobilify app, you’ve taken the first step towards reaching more customers and enhancing their shopping experience. Here’s what you can do next to get started:</p>
              <p style="margin: 0; padding:5px;"><strong>Explore the Dashboard:</strong> Log in to your Shopify admin and navigate to the Mobilify app under the Sales channel. Here, you'll find a user-friendly dashboard with all the tools you need to create and customize your mobile app.</p>
              <p style="margin: 0; padding:5px;"><strong>Customize Your App:</strong> Tailor your mobile app to reflect your brand’s unique identity. Choose a prebuilt template, add your logo, add a splash screen, choose your color scheme, and set up your product categories.</p>
              <p style="margin: 0; padding:5px;"><strong>Publish and Share:</strong> Once you're satisfied with your app's design, you can publish it directly to the app stores. Share your new app with your customers and watch your engagement grow!</p>
              <p style="margin: 0; padding:5px;">Need help? We’re here for you. Our support team is ready to assist you with any questions or concerns you might have. Feel free to reach out to us at <a href="mailto:support@mobilifyapp.com" style="text-decoration: underline; color: mailto:blue;">support@mobilifyapp.com</a> or check our <a href="https://mobilifyapp.com" target="_blank" style="color: blue;">help center link</a> for detailed guides and tutorials.</p>
              <p style="margin: 0; padding:5px;">Thank you for choosing Mobilify. We’re committed to helping your business thrive on mobile.<br>Best regards,</p>
              <p style="margin: 0; padding:5px;"><strong>The Mobilify Team</strong></p>
            </td>
          </tr>
      
          <!-- Third image -->
          <tr>
            <td style="padding: 0;">
              <img src="https://mobilify.nyc3.cdn.digitaloceanspaces.com/public/themes/2fbad637-b109-407e-a712-c979e254bb09.png" width="800" height="177" style="display: block; width: 100%; height: auto;"/>
            </td>
          </tr>
      
        </table>
      
      </div>`
  };

  return data;
};


exports.partnerNotificationEmail = (email, partnerName, partnerDetails) => {
  const detailsList = Object.keys(partnerDetails).map(key => `<li><strong>${key}:</strong> ${partnerDetails[key]}</li>`).join('');

  const data = {
    from: process.env.SMTP_USER,
    to: email,
    subject: 'New Partner Added to Mobilify',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background-color: #f9f9f9; padding: 20px; border-radius: 10px;">
          <h2 style="color: #333;">New Partner Added: ${partnerName}</h2>
          <p style="color: #555;">Dear Support Team,</p>
          <p style="color: #555;">We are pleased to inform you that a new partner has been added to the Mobilify system.</p>
          <p style="color: #555;">Here are the details of the new partner:</p>
          <ul style="color: #555;">
            ${detailsList}
          </ul>
          <p style="color: #555; margin-top: 20px;">Please review the partner's details and take the necessary steps to complete their setup.</p>
          <p style="color: #555;">Thank you!</p>
          <p style="color: #555;">Best regards,<br/>The Mobilify Team</p>
        </div>
      </div>
    `,
  };

  return data;
};

exports.newPlanEmail = (email, merchantName, planDetails) => {
  const detailsList = Object.keys(planDetails).length
    ? `<ul style="color: #555;">${Object.keys(planDetails).map(key => `<li><strong>${key}:</strong> ${planDetails[key]}</li>`).join('')}</ul>`
    : '';

  const data = {
    from: process.env.SMTP_USER,
    to: email,
    subject: `Congratulations on Unlocking the Power of ${planDetails.plan || 'Your New Plan'}!`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background-color: #f9f9f9; padding: 20px; border-radius: 10px;">
          <h2 style="color: #333;">Dear ${merchantName},</h2>
          <p style="color: #555;">We’re thrilled to have you on board with the ${planDetails.plan || 'new plan'}! 🎉</p>
          <p style="color: #555;">By choosing this plan, you've unlocked the full potential of Mobilify to transform your mobile shopping experience into something truly extraordinary. With powerful features now at your disposal, you're all set to captivate your customers and drive your business forward.</p>
          ${detailsList ? `<p style="color: #555;">Plan Infographics:</p>${detailsList}` : ''}
          <p style="color: #555;">If you need any assistance, our dedicated support team is here to help. You can reach us at <a href="mailto:support@mobilifyapp.com" style="color: #1a73e8;">support@mobilifyapp.com</a>. Additionally, we’d love to connect with you personally—feel free to <a href="https://yourdomain.com/schedule-meeting" style="color: #1a73e8;">schedule a meeting</a> with your dedicated Customer Success Manager at your convenience.</p>
          <p style="color: #555; margin-top: 20px;">Thank you for choosing Mobilify and taking your business to the next level!</p>
          <p style="color: #555;">Best regards,<br/>The Mobilify Team</p>
        </div>
      </div>
    `,
  };
  return data;
};


exports.notifySupportNewPlan = (supportEmail, merchantName, planName) => {
  const data = {
    from: process.env.SMTP_USER,
    to: supportEmail,
    subject: `New Plan Purchased: ${merchantName} has chosen the ${planName} plan`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background-color: #f9f9f9; padding: 20px; border-radius: 10px;">
          <h2 style="color: #333;">New Plan Notification</h2>
          <p style="color: #555;">Dear Support Team,</p>
          <p style="color: #555;">We wanted to inform you that ${merchantName} has just purchased the ${planName} plan.</p>
          <p style="color: #555;">Please ensure that their onboarding process goes smoothly and reach out to them if necessary.</p>
          <p style="color: #555; margin-top: 20px;">Best regards,<br/>The Mobilify System</p>
        </div>
      </div>
    `,
  };
  return data;
};

exports.uninstallEmail = (email, merchantName, supportContactDetails) => {
  const data = {
    from: process.env.SMTP_USER,
    to: email,
    subject: "We're Sad to See You Go",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background-color: #f9f9f9; padding: 20px; border-radius: 10px;">
          <h2 style="color: #333;">Dear ${merchantName},</h2>
          <p style="color: #555;">We noticed that you've uninstalled the Mobilify app, and we wanted to take a moment to thank you for giving us a try.</p>
          <p style="color: #555;">It’s always hard to say goodbye, especially when we’ve put so much effort into helping your business succeed. If there’s anything we could have done better, we’d love to hear your feedback. Your insights help us improve and serve our users more effectively.</p>
          <p style="color: #555;">If you need support or have any questions, please don’t hesitate to reach out at <a href="mailto:${supportContactDetails}" style="color: #1a73e8;">${supportContactDetails}</a>. And if you’d like to discuss your experience further, you can <a href="https://yourdomain.com/schedule-meeting" style="color: #1a73e8;">schedule a meeting</a> with your dedicated Customer Success Manager at any time.</p>
          <p style="color: #555; margin-top: 20px;">We hope to have the opportunity to work with you again in the future.</p>
          <p style="color: #555;">With heartfelt thanks,<br/>The Mobilify Team</p>
        </div>
      </div>
    `,
  };
  return data;
};

exports.notifySupportUninstall = (supportEmail, merchantName) => {
  const data = {
    from: process.env.SMTP_USER,
    to: supportEmail,
    subject: `Merchant Uninstalled Mobilify: ${merchantName}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background-color: #f9f9f9; padding: 20px; border-radius: 10px;">
          <h2 style="color: #333;">Merchant Uninstallation Notification</h2>
          <p style="color: #555;">Dear Support Team,</p>
          <p style="color: #555;">We wanted to inform you that ${merchantName} has uninstalled the Mobilify app.</p>
          <p style="color: #555;">Please review their account and consider reaching out to gather feedback or address any issues they might have encountered.</p>
          <p style="color: #555; margin-top: 20px;">Best regards,<br/>The Mobilify System</p>
        </div>
      </div>
    `,
  };
  return data;
};
