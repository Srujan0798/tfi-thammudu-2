interface EmailOptions {
    to: string;
    subject: string;
    html: string;
}

export const email = {
    send: async ({ to, subject, html }: EmailOptions) => {
        console.log(`[Email] Sending to ${to}:`, { subject });
        // In a real app, integrate Resend or SendGrid here
        // await resend.emails.send({ ... });
        return { success: true, id: 'email_test_123' };
    }
};

export const templates = {
    welcome: (name: string) => `
        <h1>Welcome to TFI Timeline, ${name}!</h1>
        <p>We're excited to have you join our community of TFI fans.</p>
        <p>Start exploring the timeline now!</p>
    `,
    proUpgrade: (name: string) => `
        <h1>Thanks for upgrading, ${name}!</h1>
        <p>You now have access to all Pro features.</p>
    `
};
