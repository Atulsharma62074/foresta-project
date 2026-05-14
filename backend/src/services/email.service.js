var nodemailer = require('nodemailer');
var logger     = require('../utils/logger');

var transporter = nodemailer.createTransport({
  host:   process.env.SMTP_HOST || 'smtp.gmail.com',
  port:   parseInt(process.env.SMTP_PORT) || 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

exports.sendInquiryNotification = async function(inquiry) {
  var subject = 'New Inquiry from ' + inquiry.name + ' - ' + (inquiry.product || 'General');

  var rows = '';
  var fields = [
    ['Name',     inquiry.name],
    ['Company',  inquiry.company  || '-'],
    ['Phone',    inquiry.phone],
    ['Email',    inquiry.email    || '-'],
    ['Product',  inquiry.product  || '-'],
    ['Quantity', inquiry.quantity || '-']
  ];
  for (var i = 0; i < fields.length; i++) {
    rows += '<tr><td style="padding:10px;font-weight:700;color:#2a4a2e;width:120px;border-bottom:1px solid #eee;">' +
            fields[i][0] + '</td><td style="padding:10px;color:#333;border-bottom:1px solid #eee;">' +
            fields[i][1] + '</td></tr>';
  }

  var msgBlock = '';
  if (inquiry.message) {
    msgBlock = '<div style="margin-top:20px;padding:16px;background:#f5f0e0;border-radius:8px;">' +
               '<strong>Message:</strong><p style="margin:8px 0 0;">' + inquiry.message + '</p></div>';
  }

  var html = '<div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;">' +
    '<div style="background:#052e0f;padding:24px;border-bottom:3px solid #e8c040;">' +
    '<h1 style="color:#f5f0e0;font-size:22px;margin:0;">Foresta Paper Industries</h1>' +
    '<p style="color:#e8c040;margin:4px 0 0;font-size:11px;letter-spacing:3px;">NEW INQUIRY RECEIVED</p></div>' +
    '<div style="padding:32px;background:#fff;">' +
    '<table style="width:100%;border-collapse:collapse;">' + rows + '</table>' +
    msgBlock + '</div></div>';

  await transporter.sendMail({
    from:    process.env.EMAIL_FROM,
    to:      process.env.ADMIN_EMAIL,
    subject: subject,
    html:    html
  });

  logger.info('Inquiry notification sent for: ' + inquiry.name);
};
