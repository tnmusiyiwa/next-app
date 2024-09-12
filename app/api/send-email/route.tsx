import WelcomeTemplate from "@/emails/welcome-template";
import {NextResponse} from "next/server";
import {Resend} from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST() {
  resend.emails.send({
    from: "...",
    to: "tnmusiyiwa@gmail.com",
    subject: "...",
    react: <WelcomeTemplate name="Tafadzwa" />,
  });

  return NextResponse.json({});
}
