import {
      VERIFICATION_EMAIL_TEMPLATE,
    } from "./emailTemplates.js";
    import { mailtrapClient, sender } from "./mailtrap.config.js";

    export const sendVerificationEmail = async (email, verificationToken) => {
      const recipient = [{ email }];

      try {
        const response = await mailtrapClient.send({
          from: sender,
          to: recipient,
          subject: "Verify your email",
          html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", verificationToken),
          category: "Email Verification",
        });

        console.log("Email sent successfully", response);
      } catch (error) {
        console.error(`Error sending verification`, error);

        throw new Error(`Error sending verification email: ${error}`);
      }
    };

    export const sendWelcomeEmail = async (email, name) => {
      const recipient = [{ email }];

      try {
        const response = await mailtrapClient.send({
          from: sender,
          to: recipient,
          template_uuid: "0e8b9da7-ac72-499b-b807-85240b95895a",
          template_variables: {
            company_info_name: "Auth APP",
            name: name,
          },
        });

        console.log("Welcome email sent successfully", response);
      } catch (error) {
        console.error(`Error sending welcome email`, error);

        throw new Error(`Error sending welcome email: ${error}`);
      }
    };