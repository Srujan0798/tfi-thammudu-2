export const POINT_VALUES = {
    LIKE: 1,
    COMMENT: 5,
    SHARE: 10,
    CREATE_EVENT: 50,
    DAILY_LOGIN: 20,
    REFERRAL: 100,
    REPORT_ACCEPTED: 15,
};

export const LEVEL_THRESHOLDS = [
    0,      // Level 1
    100,    // Level 2
    300,    // Level 3
    600,    // Level 4
    1000,   // Level 5
    1500,   // Level 6
    2100,   // Level 7
    2800,   // Level 8
    3600,   // Level 9
    4500,   // Level 10
];

export function calculateLevel(points: number): number {
    let level = 1;
    for (let i = 0; i < LEVEL_THRESHOLDS.length; i++) {
        if (points >= LEVEL_THRESHOLDS[i]) {
            level = i + 1;
        } else {
            break;
        }
    }
    return level;
}

export function getNextLevelThreshold(currentLevel: number): number {
    if (currentLevel >= LEVEL_THRESHOLDS.length) return Infinity;
    return LEVEL_THRESHOLDS[currentLevel];
}

export function getProgressToNextLevel(points: number): number {
    const currentLevel = calculateLevel(points);
    const currentThreshold = LEVEL_THRESHOLDS[currentLevel - 1];
    const nextThreshold = getNextLevelThreshold(currentLevel);

    if (nextThreshold === Infinity) return 100;

    const progress = ((points - currentThreshold) / (nextThreshold - currentThreshold)) * 100;
    return Math.min(100, Math.max(0, progress));
}
