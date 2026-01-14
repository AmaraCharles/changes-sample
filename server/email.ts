// email.service.ts (Ethergalleries)
// Resend-based implementation (same pattern as Bullagetrade)

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY || "");
const FROM_EMAIL =
  process.env.FROM_EMAIL || "Ethergalleries <support@Ethergalleries.com>";

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
      <div style="font-family:Inter,sans-serif;max-width:600px;margin:auto;padding:40px">
        <h1 style="text-align:center">Vault<span style="color:#5d8df4">orx</span></h1>
        <div style="background:#f8fafc;padding:30px;border-radius:12px;text-align:center">
          <h2>Welcome${username ? `, ${username}` : ""}!</h2>
          <p>Use the code below to verify your email</p>
          <div style="font-size:32px;letter-spacing:8px;background:#5d8df4;color:#fff;
            padding:20px 40px;border-radius:8px;display:inline-block">
            ${code}
          </div>
          <p style="font-size:14px;color:#94a3b8;margin-top:12px">
            Code expires in 10 minutes
          </p>
        </div>
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
