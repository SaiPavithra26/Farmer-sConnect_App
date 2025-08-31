const Razorpay = require('razorpay');
const crypto = require('crypto');

const rp = new Razorpay({ key_id: process.env.RAZORPAY_KEY_ID, key_secret: process.env.RAZORPAY_KEY_SECRET });

exports.createOrder = (amountPaise, currency, receipt) => {
  return rp.orders.create({ amount: amountPaise, currency, receipt, payment_capture: 1 });
};

exports.verifySignature = (orderId, paymentId, signature) => {
  const body = orderId + '|' + paymentId;
  const expected = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET).update(body).digest('hex');
  return expected === signature;
};
