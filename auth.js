import NextAuth from "next-auth";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "./libs/mongo";
import nodemailer from "nodemailer";
import EmailProvider from "next-auth/providers/email";
import Google from "next-auth/providers/google";

const sendVerificationRequest = ({ identifier, url }) => {
  //Transporter connects to SMTP server using env variables and send a verification email to the user with a sign-in link
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT, 587),
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  const { host } = new URL(url);
  return transporter.sendMail({
    from: process.env.SMTP_USER,
    to: identifier,
    subject: `Sign in to ${host}`,
    text: `Sign in to ${host}\n\n${url}\n\n`,
    html: `<p>Sign in to <b>${host}</b></p><p><a href="${url}">Click here to sign in</a></p>`,
  });
};

const config = {
  providers: [
    EmailProvider({
      server: {
        host: process.env.SMTP_HOST,
        port: parseInt(process.env.SMTP_PORT, 10),
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      },
      from: process.env.SMTP_USER,
      sendVerificationRequest,
    }),
    Google({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],
  adapter: MongoDBAdapter(clientPromise),

  secret: process.env.AUTH_SECRET,
};

export const { handlers, signIn, signOut, auth } = NextAuth(config);
