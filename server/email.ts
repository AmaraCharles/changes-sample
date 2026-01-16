// email.service.ts (Ethergalleries)
// Resend-based implementation (same pattern as Bullagetrade)

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY || "");
const FROM_EMAIL ="support@ethergalleries.com"
  // process.env.FROM_EMAIL || "Ethergalleries <support@ethergalleries.com>";

// ----------------------------
// Generic send helper
// ----------------------------
async function sendEmail({
  to,
  subject,
  html,
}: {
  to: string | string[];
  subject: string;
  html: string;
}) {
  try {
    const res = await resend.emails.send({
      from: FROM_EMAIL,
      to: Array.isArray(to) ? to : [to],
      subject,
      html,
    });

    console.log(`[email] sent "${subject}" ->`, to);
    return true;
  } catch (err) {
    console.error(`[email] failed "${subject}" ->`, err);
    return false;
  }
}

// ----------------------------
// Templates
// ----------------------------

export async function sendVerificationEmail(
  to: string,
  code: string,
  username?: string
) {
  return sendEmail({
    to,
    subject: "Verify Your Ethergalleries Account",
    html: `
      <div style="font-family: 'Inter', sans-serif; max-width:600px; margin:0 auto; padding:40px; background-color:#ffffff;">
  <!-- Header -->
  <h1 style="text-align:center; font-weight:700; font-size:28px; margin-bottom:30px; color:#111111;">
    Ether<span style="color:#5d8df4;">galleries</span>
  </h1>

  <!-- Card -->
  <div style="background:#f8f9fc; padding:40px 30px; border-radius:12px; text-align:center; box-shadow:0 4px 12px rgba(0,0,0,0.05);">
    
    <!-- Greeting -->
    <h2 style="font-size:22px; color:#111827; margin-bottom:16px;">
      Welcome${username ? `, ${username}` : ""}!
    </h2>

    <!-- Instruction -->
    <p style="font-size:16px; color:#4b5563; margin-bottom:24px; line-height:1.6;">
      Thank you for joining <strong>Ethergalleries</strong> — your gateway to discovering, collecting, and trading unique digital art and NFTs. We are excited to have you on board and look forward to helping you explore the world of blockchain collectibles.
    </p>
    
    <p style="font-size:16px; color:#4b5563; margin-bottom:24px; line-height:1.6;">
      To get started, please verify your email address by entering the code below. This ensures your account is secure and allows you to fully access all features, including purchasing, listing, and showcasing NFTs in your collection.
    </p>

    <!-- Code Box -->
    <div style="display:inline-block; font-size:28px; letter-spacing:8px; font-weight:700; background:#5d8df4; color:#ffffff; padding:20px 40px; border-radius:8px; margin-bottom:16px;">
      ${code}
    </div>

    <!-- Expiry Notice -->
    <p style="font-size:14px; color:#94a3b8; margin-top:8px; line-height:1.4;">
      This verification code will expire in 10 minutes. Please enter it promptly to activate your account.
    </p>

    <!-- Closing Remark -->
    <p style="font-size:16px; color:#4b5563; margin-top:24px; line-height:1.6;">
      Once verified, you can start exploring the Ethergalleries marketplace, connect with other collectors, and experience the exciting world of digital art. If you have any questions, our support team is here to assist you.
    </p>

    <p style="font-size:16px; color:#4b5563; margin-top:12px; line-height:1.6;">
      Welcome again to the Ethergalleries community — where art meets innovation.
    </p>
  </div>

  <!-- Footer -->
  <p style="text-align:center; font-size:12px; color:#9ca3af; margin-top:24px;">
    If you did not create an account with Ethergalleries, please ignore this email.
  </p>
</div>

    `,
  });
}

export async function sendPasswordResetEmail(to: string, code: string) {
  return sendEmail({
    to,
    subject: "Reset Your Ethergalleries Password",
    html: `
      <div style="font-family:Inter,sans-serif;max-width:600px;margin:auto;padding:40px">
        <h1 style="text-align:center">Vault<span style="color:#ef4444">orx</span></h1>
        <div style="background:#fef2f2;padding:30px;border-radius:12px;text-align:center">
          <h2>Password Reset</h2>
          <div style="font-size:32px;letter-spacing:8px;background:#ef4444;color:#fff;
            padding:20px 40px;border-radius:8px;display:inline-block">
            ${code}
          </div>
          <p style="font-size:14px;color:#94a3b8;margin-top:12px">
            Code expires in 15 minutes
          </p>
        </div>
      </div>
    `,
  });
}

export async function sendPurchaseConfirmation(
  to: string,
  nftName: string,
  price: number,
  currency: string
) {
  return sendEmail({
    to,
    subject: `Purchase Confirmed: ${nftName}`,
    html: `
      <div style="font-family:Inter,sans-serif;max-width:600px;margin:auto;padding:40px">
        <h1 style="text-align:center">Vault<span style="color:#22c55e">orx</span></h1>
        <div style="background:#f0fdf4;padding:30px;border-radius:12px;text-align:center">
          <h2>🎉 Purchase Successful!</h2>
          <h3>${nftName}</h3>
          <p><strong>${price} ${currency}</strong></p>
        </div>
      </div>
    `,
  });
}

export async function sendSaleNotification(
  to: string,
  nftName: string,
  price: number,
  currency: string,
  buyerName: string
) {
  return sendEmail({
    to,
    subject: `Your NFT "${nftName}" Has Been Sold`,
    html: `
      <div style="font-family:Inter,sans-serif;max-width:600px;margin:auto;padding:40px">
        <h1 style="text-align:center">Vault<span style="color:#d97706">orx</span></h1>
        <div style="background:#fef3c7;padding:30px;border-radius:12px;text-align:center">
          <h2>💰 You Made a Sale!</h2>
          <p><strong>${nftName}</strong></p>
          <p>Buyer: ${buyerName}</p>
          <p><strong>${price} ${currency}</strong></p>
        </div>
      </div>
    `,
  });
}

export async function sendDepositApprovalNotification(
  to: string,
  amount: number,
  status: "approved" | "rejected"
) {
  const approved = status === "approved";

  return sendEmail({
    to,
    subject: `Deposit ${approved ? "Approved" : "Rejected"}`,
    html: `
      <div style="font-family:Inter,sans-serif;max-width:600px;margin:auto;padding:40px">
        <h1 style="text-align:center">Ethergalleries</h1>
        <div style="background:${approved ? "#f0fdf4" : "#fef2f2"};
          padding:30px;border-radius:12px;text-align:center">
          <h2>${approved ? "✅ Approved" : "❌ Rejected"}</h2>
          <p><strong>${amount} ETH</strong></p>
        </div>
      </div>
    `,
  });
}

export async function sendWithdrawalApprovalNotification(
  to: string,
  amount: number,
  status: "approved" | "rejected"
) {
  const approved = status === "approved";

  return sendEmail({
    to,
    subject: `Withdrawal ${approved ? "Approved" : "Rejected"}`,
    html: `
      <div style="font-family:Inter,sans-serif;max-width:600px;margin:auto;padding:40px">
        <h1 style="text-align:center">Ethergalleries</h1>
        <div style="background:${approved ? "#f0fdf4" : "#fef2f2"};
          padding:30px;border-radius:12px;text-align:center">
          <h2>${approved ? "✅ Approved" : "❌ Rejected"}</h2>
          <p><strong>${amount} ETH</strong></p>
        </div>
      </div>
    `,
  });
}
