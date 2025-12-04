export const stripe = {
    checkout: {
        sessions: {
            create: async (params: any) => {
                console.log('[Stripe] Creating checkout session', params);
                return {
                    id: 'cs_test_123',
                    url: '/checkout/success?session_id=cs_test_123' // Mock success URL
                };
            }
        }
    },
    customers: {
        create: async (params: any) => {
            console.log('[Stripe] Creating customer', params);
            return {
                id: 'cus_test_123',
                ...params
            };
        }
    }
};
