const ranges = {
    years: 3600 * 24 * 365,
    months: 3600 * 24 * 30,
    weeks: 3600 * 24 * 7,
    days: 3600 * 24,
    hours: 3600,
    minutes: 60,
    seconds: 1
};

export function timeSince(input: Date | string | null) {
    if (!input) return null;

    const date = input instanceof Date ? input : new Date(input);

    const formatter = new Intl.RelativeTimeFormat();

    const secondsElapsed = (date.getTime() - Date.now()) / 1000;

    for (const key in ranges) {
        const unit = key as keyof typeof ranges;
        if (ranges[unit] < Math.abs(secondsElapsed)) {
            const delta = secondsElapsed / ranges[unit];
            return formatter.format(Math.round(delta), unit);
        }
    }
}

export function toCustomLocaleString(input: Date) {
    return input.toLocaleDateString(undefined, {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric"
    });
}
