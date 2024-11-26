import { sendWelcomeEmail, sendPasswordResetEmail } from './emailService';

const testEmails = async () => {
  try {
    // Test welcome email
    console.log('Testing welcome email...');
    await sendWelcomeEmail('test@example.com', 'TestUser');
    console.log('Welcome email sent successfully!');

    // Test password reset email
    console.log('\nTesting password reset email...');
    await sendPasswordResetEmail('test@example.com', 'test-reset-token');
    console.log('Password reset email sent successfully!');
  } catch (error) {
    console.error('Error testing emails:', error);
  }
};

// Run the tests
testEmails();