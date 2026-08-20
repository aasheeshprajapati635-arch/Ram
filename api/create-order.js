const Razorpay = require("razorpay");

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
});

module.exports = async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const order = await razorpay.orders.create({
      amount: 2900,
      currency: "INR",
      receipt: "birthday_" + Date.now()
    });

    return res.status(200).json({
      id: order.id,
      amount: order.amount,
      currency: order.currency
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: "Unable to create order"
    });
  }
};
