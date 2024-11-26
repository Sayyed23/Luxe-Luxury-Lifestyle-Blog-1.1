import emailjs from '@emailjs/browser';

const EMAILJS_SERVICE_ID = 'your_service_id';
const EMAILJS_TEMPLATE_ID = 'your_template_id';
const EMAILJS_PUBLIC_KEY = 'your_public_key';

interface EmailParams {
  to_email: string;
  to_name: string;
  subject: string;
  message: string;
}

export const sendEmail = async (params: EmailParams) => {
  try {
    const response = await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      params,
      EMAILJS_PUBLIC_KEY
    );
    return response;
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
};

export const sendWelcomeEmail = async (email: string, username: string) => {
  const params = {
    to_email: email,
    to_name: username,
    subject: 'Welcome to LUXE - Your Journey into Luxury Lifestyle Begins',
    message: `
      Welcome to LUXE, ${username}!
      
      We're thrilled to have you join our community of discerning individuals who appreciate the finer things in life.
      
      What's Next?
      - Complete your profile
      - Explore curated content
      - Share your experiences
      - Connect with like-minded individuals
      
      If you have any questions or need assistance, our dedicated support team is here to help.
      
      Best regards,
      The LUXE Team
    `
  };

  return sendEmail(params);
};

export const sendPasswordResetEmail = async (email: string, resetToken: string) => {
  const params = {
    to_email: email,
    to_name: email,
    subject: 'Reset Your LUXE Password',
    message: `
      We received a request to reset your LUXE account password.
      
      Click the link below to reset your password:
      https://your-luxe-website.com/reset-password?token=${resetToken}
      
      If you didn't request this password reset, you can safely ignore this email.
      
      This link will expire in 1 hour for security reasons.
      
      Best regards,
      The LUXE Team
    `
  };

  return sendEmail(params);
};