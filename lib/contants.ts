export const inStaging = process.env.NEXT_PUBLIC_IN_DEVELOPMENT === "true";

export const description = "Check out or online courses to level up your skills.";

export const stagingRobotsMeta = {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
        index: false,
        follow: false,
        noimageindex: true
    }
};

export const productionRobotsMeta = {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
        index: true,
        follow: true,
        noimageindex: false,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1
    }
};
