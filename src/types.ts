export type Room = {
    name: string;
    description: string;
    roomFeatures?: string[];
    video?: string;
    bedOptions?: {
        type: string;
        video: string;
    }[];
};


export type OnboardingStep = "bedOption" | "description" | null;
