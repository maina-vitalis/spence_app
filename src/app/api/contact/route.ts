import ContactFormEmail from "@/components/Email/ContactEmail";
import { Resend } from "resend";
import { z } from "zod";

const ContactSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("A valid email is required"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export async function POST(request: Request) {
  try {
    if (!process.env.RESEND_API_KEY) {
      return Response.json(
        { error: "Email service not configured" },
        { status: 500 }
      );
    }

    const body = await request.json();
    const parsed = ContactSchema.safeParse(body);

    if (!parsed.success) {
      return Response.json(
        { error: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const { name, email, message } = parsed.data;
    const resend = new Resend(process.env.RESEND_API_KEY);

    const from =
      process.env.RESEND_FROM_EMAIL || "Spence Creations <onboarding@resend.dev>";
    const to = process.env.CONTACT_EMAIL || "mainavitalis65@gmail.com";

    const result = await resend.emails.send({
      from,
      to: [to],
      replyTo: email,
      subject: `New contact from ${name}`,
      react: ContactFormEmail({
        name,
        email,
        message,
      }),
    });

    if (result.error) {
      console.error("Resend API error:", result.error);
      return Response.json(
        { error: result.error.message || "Failed to send email" },
        { status: 500 }
      );
    }

    return Response.json({ success: true, id: result.data?.id });
  } catch (error) {
    console.error("Contact form error:", error);
    return Response.json(
      { error: (error as Error).message || "Failed to send email" },
      { status: 500 }
    );
  }
}
