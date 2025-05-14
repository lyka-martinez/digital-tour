export type Room = {
    name: string;
    description: string;
    roomFeatures?: string[];
    video?: string;
    images?: string[];
    bedOptions?: {
        type: string;
        video: string;
        images?: string[];
    }[];
};


export type OnboardingStep = "bedOption" | "description" | null;
