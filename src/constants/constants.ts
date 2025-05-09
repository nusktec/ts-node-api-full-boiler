export const Titles = ["Bro", "Sis", "Pastor", "Deac", "Elder"] as const;
export const MaritalStatuses = ["Single", "Married", "Widowed"] as const;
export const EducationLevels = ["None", "Primary", "SSCE", "Degree", "Masters", "PhD", "Professor"] as const;
export const ServicePositions = ["HOD", "Asist HOD", "Secretary", "Financial Sec", "Treasurer", "PRO", "Other"] as const;
export const DHC_Capacities = ["Host", "Member", "Leader", "Area leader", "Zonal leader", "District leader"] as const;
export const ChurchDepartments = [
    "Counselling",
    "Prayer Band",
    "Ushers",
    "Counting",
    "Crowd Control",
    "Security",
    "Children department",
    "Evangelism",
    "Medical team",
    "Hospitality",
    "Communion",
    "Communion Steward",
    "Marriage",
    "Welfare",
    "Choir",
    "Home church",
    "Sanctuary Keepers"
] as const;

export type Title = typeof Titles[number];
export type MaritalStatus = typeof MaritalStatuses[number];
export type EducationLevel = typeof EducationLevels[number];
export type ServicePosition = typeof ServicePositions[number];
export type DHCCapacity = typeof DHC_Capacities[number];
export type ChurchDepartment = typeof ChurchDepartments[number];
