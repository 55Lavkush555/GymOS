import connectDB from "@/lib/db";
import { NextResponse } from "next/server";
import { sendEmail } from "@/lib/sendEmail";
import Member from "@/models/Member";
import User from "@/models/User";
import { formatDate, getIstDateKey } from "@/lib/date";


export async function GET() {

    try {
        await connectDB();

        const users = await User.find({});

        const todayKey = getIstDateKey(new Date());
        const todayKeyAsUtc = new Date(`${todayKey}T00:00:00.000Z`);

        for (const user of users) {
            const planEndKey = getIstDateKey(user.planEndDate);
            let isExpired = planEndKey ? todayKey > planEndKey : false;

            if (!isExpired) {
                let members = await Member.find({ ownerClerkId: user.clerkId });
                for (const member of members) {
                    if (!member.email) {
                        continue;
                    }

                    const expiryKey = getIstDateKey(member.expiryDate);
                    if (!expiryKey) {
                        continue;
                    }

                    const expiryKeyAsUtc = new Date(`${expiryKey}T00:00:00.000Z`);
                    const diffTime = expiryKeyAsUtc - todayKeyAsUtc;
                    const daysLeft = Math.round(diffTime / (1000 * 60 * 60 * 24));

                    const expiryDate = new Date(member.expiryDate);

                    if (daysLeft === 7) {
                        await sendEmail({
                            to: member.email,
                            subject: "Your gym membership expires in 7 days",
                            html: `<h2>Hi ${member.name},</h2>

<p>
This is a friendly reminder that your gym membership will expire in 7 days.
</p>

<p>
Expiry Date: ${formatDate(expiryDate)}
</p>

<p>
Keep your fitness journey going. Please contact your gym to renew your membership before it expires.
</p>

<p>
Thank you for being a valued member.
</p>
`
                        });
                    }
                    else if (daysLeft === 3) {
                        await sendEmail({
                            to: member.email,
                            subject: "Reminder: Your gym membership expires in 3 days",
                            html: `<h2>Hi ${member.name},</h2>

<p>
Your gym membership is expiring in just 3 days.
</p>

<p>
To continue your workouts without interruption, please renew your membership soon.
</p>

<p>
Expiry Date: ${formatDate(expiryDate)}
</p>

<p>
Contact your gym for renewal details.
</p>
`
                        });
                    }
                    else if (daysLeft === 1) {
                        await sendEmail({
                            to: member.email,
                            subject: "Your gym membership expires tomorrow",
                            html: `<h2>Hi ${member.name},</h2>

<p>
Your gym membership expires tomorrow.
</p>

<p>
Renew your membership today to continue accessing your gym services.
</p>

<p>
Expiry Date: ${formatDate(expiryDate)}
</p>

<p>
We look forward to seeing you at the gym.
</p>
`
                        });
                    }
                    else if (daysLeft === 0) {
                        await sendEmail({
                            to: member.email,
                            subject: "Your gym membership has expired",
                            html: `<h2>Hi ${member.name},</h2>

<p>
Your gym membership has expired.
</p>

<p>
Your gym membership period has ended, but we would love to have you continue your fitness journey with us.
</p>

<p>
Please contact your gym to renew your membership.
</p>
`
                        });
                    }
                }
            }
        }


        return NextResponse.json({
            success: true
        });


    } catch (error) {

        return NextResponse.json({
            success: false,
            error: error.message
        });

    }

}