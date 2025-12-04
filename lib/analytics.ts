type EventName =
    | 'page_view'
    | 'sign_up'
    | 'login'
    | 'create_event'
    | 'like_event'
    | 'share_event'
    | 'purchase_item'
    | 'level_up';

interface EventProperties {
    [key: string]: string | number | boolean;
}

export const analytics = {
    track: (name: EventName, properties?: EventProperties) => {
        // In a real app, this would send data to PostHog, GA4, or Segment
        if (process.env.NODE_ENV === 'development') {
            console.log(`[Analytics] ${name}`, properties);
        }

        // Example integration placeholder
        // if (window.posthog) {
        //     window.posthog.capture(name, properties);
        // }
    },

    identify: (userId: string, traits?: EventProperties) => {
        if (process.env.NODE_ENV === 'development') {
            console.log(`[Analytics] Identify ${userId}`, traits);
        }
    },

    page: (path: string) => {
        if (process.env.NODE_ENV === 'development') {
            console.log(`[Analytics] Page View: ${path}`);
        }
    }
};
