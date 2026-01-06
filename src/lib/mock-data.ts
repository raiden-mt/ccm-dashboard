// CCM Database Mock Data - Based on the normalized schema
// This provides realistic data for the prototype dashboard

// Types based on the database schema
export type StaffPosition =
  | "project_manager"
  | "district_manager"
  | "area_manager"
  | "coordinator"
  | "lead_community_volunteer"
  | "community_volunteer";

export type Gender = "male" | "female" | "other";

export type StoveType =
  | "ccm"
  | "3_stone_fire"
  | "charcoal"
  | "mbaula"
  | "other_brick"
  | "metal"
  | "other";

export type CCMCondition = "good" | "needs_repair" | "damaged" | "replaced";

export type InspectionStatus = "green" | "yellow" | "red" | "uninspected";

export type ArchiveReason =
  | "moved"
  | "deceased"
  | "duplicate"
  | "stove_destroyed"
  | "opted_out"
  | "other";

export type HouseOwnership = "owned" | "rented" | "family";

export type UsageFrequency =
  | "daily"
  | "several_per_week"
  | "weekly"
  | "several_per_month"
  | "monthly"
  | "rarely"
  | "never";

export type Season = "dry" | "wet";

// Interfaces
export interface District {
  id: string;
  code: string;
  name: string;
}

export interface VPAArea {
  id: string;
  districtId: string;
  code: string;
  name: string;
}

export interface CoordinatorArea {
  id: string;
  vpaId: string;
  code: string;
  name: string;
}

export interface LCVArea {
  id: string;
  coordinatorAreaId: string;
  code: string;
  name: string;
}

export interface CVArea {
  id: string;
  lcvAreaId: string;
  code: string;
  name: string;
}

export interface Staff {
  id: string;
  name: string;
  phone: string;
  gender: Gender;
  position: StaffPosition;
  vpaAreaId?: string;
  coordinatorAreaId?: string;
  lcvAreaId?: string;
  cvAreaId?: string;
  isActive: boolean;
  startDate?: string;
  leaveDate?: string;
  trainingHours?: number;
}

export interface Householder {
  id: string;
  firstName: string;
  middleName?: string;
  lastName: string;
  chiefId: string;
  cvAreaId: string;
  familyCount: number;
  stoveType: StoveType;
  stoveBuildDate?: string;
  hasKitchen: boolean;
  kitchenWellVentilated: boolean;
  kitchenRainproof: boolean;
  houseOwnership: HouseOwnership;
  latitude?: number;
  longitude?: number;
  gpsAccuracy?: number;
  isArchived: boolean;
  archiveReason?: ArchiveReason;
  lastInspectionDate?: string;
  lastInspectionById?: string;
  lastCcmCondition?: CCMCondition;
  lastCcmInUse?: boolean;
  inspectionStatus: InspectionStatus;
}

export type WoodUseQuality = "good" | "fair" | "poor";

export interface Inspection {
  id: string;
  householderId: string;
  staffId: string;
  inspectionDate: string;
  ccmInUse: boolean;
  ccmCondition: CCMCondition;
  woodUse: boolean;
  woodUseQuality: WoodUseQuality;
  hasKitchen: boolean;
  kitchenWellVentilated: boolean;
  kitchenRainproof: boolean;
  ccmRainProtection: boolean;
  latitude?: number;
  longitude?: number;
  gpsAccuracy?: number;
  // Related entity names (denormalized for display)
  chiefName: string;
  leadCvName: string;
}

export interface UsageSurvey {
  id: string;
  householderId: string;
  staffId: string;
  surveyDate: string;
  ccmInUse: boolean;
  ccmWarm?: boolean;
  usageSigns?: boolean;
  respondentGender?: Gender;
  adultCount?: number;
  childCount?: number;
  otherStovesPresent?: boolean;
  cookingFrequency?: string;
}

export interface KPTSurvey {
  id: string;
  householderId: string;
  staffId: string;
  surveyDate: string;
  woodConsumption: number;
  cookingTime: number;
  fuelSavings: number;
  emissionsReduction: number;
}

export interface SDGSurvey {
  id: string;
  householderId: string;
  staffId: string;
  surveyDate: string;
  healthImpact: "improved" | "same" | "worse";
  timeFreedUp: number;
  incomeImpact: "increased" | "same" | "decreased";
  educationAccess: "improved" | "same" | "worse";
  genderEmpowerment: "improved" | "same" | "worse";
}

export interface DataQualityIssue {
  id: string;
  type: "duplicate" | "missing_gps" | "missing_data" | "anomaly";
  severity: "low" | "medium" | "high";
  description: string;
  affectedRecordId: string;
  affectedRecordType: "householder" | "inspection" | "survey";
  detectedAt: string;
  resolved: boolean;
}

// Mock Data
export const districts: District[] = [
  { id: "dist-001", code: "MZ", name: "Mzimba" },
  { id: "dist-002", code: "NB", name: "Nkhata Bay" },
  { id: "dist-003", code: "RM", name: "Rumphi" },
  { id: "dist-004", code: "KR", name: "Karonga" },
  { id: "dist-005", code: "MG", name: "Mangochi" },
  { id: "dist-006", code: "MC", name: "Machinga" },
];

export const vpaAreas: VPAArea[] = [
  {
    id: "vpa-001",
    districtId: "dist-001",
    code: "VPA-MZ1",
    name: "Mzimba North VPA",
  },
  {
    id: "vpa-002",
    districtId: "dist-001",
    code: "VPA-MZ2",
    name: "Mzimba Central VPA",
  },
  {
    id: "vpa-003",
    districtId: "dist-001",
    code: "VPA-MZ3",
    name: "Mzimba South VPA",
  },
  {
    id: "vpa-004",
    districtId: "dist-002",
    code: "VPA-NB1",
    name: "Nkhata Bay VPA",
  },
  {
    id: "vpa-005",
    districtId: "dist-005",
    code: "VPA-MG1",
    name: "Mangochi VPA",
  },
];

export const staff: Staff[] = [
  {
    id: "staff-001",
    name: "John Mwase",
    phone: "+265999111001",
    gender: "male",
    position: "project_manager",
    isActive: true,
    trainingHours: 120,
  },
  {
    id: "staff-002",
    name: "Sarah Tembo",
    phone: "+265999111002",
    gender: "female",
    position: "district_manager",
    isActive: true,
    trainingHours: 96,
  },
  {
    id: "staff-003",
    name: "Peter Banda",
    phone: "+265999111003",
    gender: "male",
    position: "area_manager",
    vpaAreaId: "vpa-001",
    isActive: true,
    trainingHours: 80,
  },
  {
    id: "staff-004",
    name: "Grace Phiri",
    phone: "+265999111004",
    gender: "female",
    position: "area_manager",
    vpaAreaId: "vpa-002",
    isActive: true,
    trainingHours: 80,
  },
  {
    id: "staff-005",
    name: "Glory Choo",
    phone: "+265999111005",
    gender: "female",
    position: "coordinator",
    coordinatorAreaId: "coord-001",
    isActive: true,
    trainingHours: 64,
  },
  {
    id: "staff-006",
    name: "Flora Banda",
    phone: "+265999111006",
    gender: "female",
    position: "coordinator",
    coordinatorAreaId: "coord-002",
    isActive: true,
    trainingHours: 64,
  },
  {
    id: "staff-007",
    name: "Annette Karambo",
    phone: "+265999111007",
    gender: "female",
    position: "coordinator",
    coordinatorAreaId: "coord-003",
    isActive: true,
    trainingHours: 56,
  },
  {
    id: "staff-008",
    name: "Wanangwa Chimphepo",
    phone: "+265999111008",
    gender: "male",
    position: "coordinator",
    coordinatorAreaId: "coord-004",
    isActive: true,
    trainingHours: 56,
  },
  {
    id: "staff-009",
    name: "Chimwemwe Kumwenda",
    phone: "+265999111009",
    gender: "female",
    position: "lead_community_volunteer",
    lcvAreaId: "lcv-001",
    isActive: true,
    trainingHours: 40,
  },
  {
    id: "staff-010",
    name: "Daud Mpofu",
    phone: "+265999111010",
    gender: "male",
    position: "lead_community_volunteer",
    lcvAreaId: "lcv-002",
    isActive: true,
    trainingHours: 40,
  },
  {
    id: "staff-011",
    name: "Aaron Moyo",
    phone: "+265999111011",
    gender: "male",
    position: "lead_community_volunteer",
    lcvAreaId: "lcv-003",
    isActive: true,
    trainingHours: 40,
  },
  {
    id: "staff-012",
    name: "Saleji Nkosi",
    phone: "+265999111012",
    gender: "male",
    position: "lead_community_volunteer",
    lcvAreaId: "lcv-004",
    isActive: true,
    trainingHours: 40,
  },
  {
    id: "staff-013",
    name: "Bettie Mhango",
    phone: "+265999111013",
    gender: "female",
    position: "lead_community_volunteer",
    lcvAreaId: "lcv-005",
    isActive: true,
    trainingHours: 32,
  },
  {
    id: "staff-014",
    name: "Beuty Hara",
    phone: "+265999111014",
    gender: "female",
    position: "lead_community_volunteer",
    lcvAreaId: "lcv-006",
    isActive: true,
    trainingHours: 32,
  },
  {
    id: "staff-015",
    name: "Jim Mwamwatandala",
    phone: "+265999111015",
    gender: "male",
    position: "community_volunteer",
    cvAreaId: "cv-002",
    isActive: true,
    trainingHours: 24,
  },
  {
    id: "staff-016",
    name: "Laston Nyasulu",
    phone: "+265999111016",
    gender: "male",
    position: "community_volunteer",
    cvAreaId: "cv-003",
    isActive: true,
    trainingHours: 24,
  },
  {
    id: "staff-017",
    name: "Justice Chibalaza",
    phone: "+265999111017",
    gender: "male",
    position: "community_volunteer",
    cvAreaId: "cv-005",
    isActive: true,
    trainingHours: 24,
  },
  {
    id: "staff-018",
    name: "Dorica Chaura",
    phone: "+265999111018",
    gender: "female",
    position: "community_volunteer",
    cvAreaId: "cv-006",
    isActive: true,
    trainingHours: 24,
  },
  {
    id: "staff-019",
    name: "Charles Munthali",
    phone: "+265999111019",
    gender: "male",
    position: "community_volunteer",
    cvAreaId: "cv-008",
    isActive: true,
    trainingHours: 24,
  },
  {
    id: "staff-020",
    name: "Solomon Munthali",
    phone: "+265999111020",
    gender: "male",
    position: "community_volunteer",
    cvAreaId: "cv-009",
    isActive: true,
    trainingHours: 24,
  },
  {
    id: "staff-021",
    name: "Glory Nyirenda",
    phone: "+265999111021",
    gender: "female",
    position: "community_volunteer",
    cvAreaId: "cv-011",
    isActive: true,
    trainingHours: 24,
  },
  {
    id: "staff-022",
    name: "Chimwemwe Gondwe",
    phone: "+265999111022",
    gender: "female",
    position: "community_volunteer",
    cvAreaId: "cv-013",
    isActive: false,
    leaveDate: "2024-03-15",
    trainingHours: 20,
  },
  {
    id: "staff-023",
    name: "Colles Kumwenda",
    phone: "+265999111023",
    gender: "female",
    position: "community_volunteer",
    cvAreaId: "cv-014",
    isActive: true,
    trainingHours: 24,
  },
  {
    id: "staff-024",
    name: "Emily Kanyenda",
    phone: "+265999111024",
    gender: "female",
    position: "community_volunteer",
    cvAreaId: "cv-016",
    isActive: true,
    trainingHours: 24,
  },
];

// Generate householders with inspection status
const generateHouseholders = (): Householder[] => {
  const baseHouseholders = [
    {
      id: "hh-001",
      firstName: "Catherini",
      middleName: "Patric",
      lastName: "Nguluwe",
      cvAreaId: "cv-001",
      familyCount: 4,
      inspectionStatus: "green" as InspectionStatus,
      lastInspectionDate: "2025-11-10",
    },
    {
      id: "hh-002",
      firstName: "Esinai",
      middleName: "Lenard",
      lastName: "Nguluwe",
      cvAreaId: "cv-001",
      familyCount: 8,
      inspectionStatus: "green" as InspectionStatus,
      lastInspectionDate: "2025-10-26",
    },
    {
      id: "hh-003",
      firstName: "Uness",
      middleName: "Lymore",
      lastName: "Nguluwe",
      cvAreaId: "cv-001",
      familyCount: 5,
      inspectionStatus: "green" as InspectionStatus,
      lastInspectionDate: "2025-10-11",
    },
    {
      id: "hh-004",
      firstName: "Lusungu",
      middleName: "Dinga",
      lastName: "Nkhonjera",
      cvAreaId: "cv-001",
      familyCount: 7,
      inspectionStatus: "green" as InspectionStatus,
      lastInspectionDate: "2025-09-26",
    },
    {
      id: "hh-005",
      firstName: "Lina",
      middleName: "Willntone",
      lastName: "Konjera",
      cvAreaId: "cv-001",
      familyCount: 8,
      inspectionStatus: "yellow" as InspectionStatus,
      lastInspectionDate: "2025-08-17",
    },
    {
      id: "hh-006",
      firstName: "Alice",
      middleName: "Prince",
      lastName: "Mhango",
      cvAreaId: "cv-002",
      familyCount: 8,
      inspectionStatus: "yellow" as InspectionStatus,
      lastInspectionDate: "2025-07-28",
    },
    {
      id: "hh-007",
      firstName: "Lekile",
      middleName: "Gibson",
      lastName: "Nyirenda",
      cvAreaId: "cv-002",
      familyCount: 4,
      inspectionStatus: "yellow" as InspectionStatus,
      lastInspectionDate: "2025-07-08",
    },
    {
      id: "hh-008",
      firstName: "Tabita",
      middleName: "Helena",
      lastName: "Mhango",
      cvAreaId: "cv-002",
      familyCount: 7,
      inspectionStatus: "red" as InspectionStatus,
      lastInspectionDate: "2025-05-09",
    },
    {
      id: "hh-009",
      firstName: "Ester",
      middleName: "Smart",
      lastName: "Chakulutha",
      cvAreaId: "cv-002",
      familyCount: 7,
      inspectionStatus: "red" as InspectionStatus,
      lastInspectionDate: "2025-03-20",
    },
    {
      id: "hh-010",
      firstName: "Cafulesi",
      middleName: "Trywell",
      lastName: "Ngwira",
      cvAreaId: "cv-002",
      familyCount: 5,
      inspectionStatus: "red" as InspectionStatus,
      lastInspectionDate: "2025-02-15",
    },
    {
      id: "hh-011",
      firstName: "Lucy",
      middleName: "Lambick",
      lastName: "Chuma",
      cvAreaId: "cv-003",
      familyCount: 4,
      inspectionStatus: "uninspected" as InspectionStatus,
    },
    {
      id: "hh-012",
      firstName: "Lucy",
      middleName: "Denis",
      lastName: "Mhango",
      cvAreaId: "cv-003",
      familyCount: 6,
      inspectionStatus: "green" as InspectionStatus,
      lastInspectionDate: "2025-11-01",
    },
    {
      id: "hh-013",
      firstName: "Alice",
      middleName: "Clement",
      lastName: "Mhango",
      cvAreaId: "cv-003",
      familyCount: 2,
      inspectionStatus: "green" as InspectionStatus,
      lastInspectionDate: "2025-10-20",
    },
    {
      id: "hh-014",
      firstName: "Bether",
      middleName: "Walonga",
      lastName: "Mhango",
      cvAreaId: "cv-003",
      familyCount: 5,
      inspectionStatus: "yellow" as InspectionStatus,
      lastInspectionDate: "2025-08-05",
    },
    {
      id: "hh-015",
      firstName: "Efrida",
      middleName: "Omex",
      lastName: "Phiri",
      cvAreaId: "cv-003",
      familyCount: 4,
      inspectionStatus: "red" as InspectionStatus,
      lastInspectionDate: "2025-04-12",
    },
    {
      id: "hh-016",
      firstName: "Joice",
      middleName: "Made",
      lastName: "Mwale",
      cvAreaId: "cv-007",
      familyCount: 3,
      inspectionStatus: "green" as InspectionStatus,
      lastInspectionDate: "2025-11-15",
    },
    {
      id: "hh-017",
      firstName: "Towera",
      middleName: "Ivini",
      lastName: "Ngwiri",
      cvAreaId: "cv-007",
      familyCount: 5,
      inspectionStatus: "green" as InspectionStatus,
      lastInspectionDate: "2025-10-30",
    },
    {
      id: "hh-018",
      firstName: "Mary",
      middleName: "Nature",
      lastName: "Nyirenda",
      cvAreaId: "cv-007",
      familyCount: 5,
      inspectionStatus: "yellow" as InspectionStatus,
      lastInspectionDate: "2025-08-22",
    },
    {
      id: "hh-019",
      firstName: "Grace",
      middleName: "Lolece",
      lastName: "Matupi",
      cvAreaId: "cv-007",
      familyCount: 4,
      inspectionStatus: "uninspected" as InspectionStatus,
    },
    {
      id: "hh-020",
      firstName: "Rose",
      middleName: "Scort",
      lastName: "Mkandawire",
      cvAreaId: "cv-007",
      familyCount: 9,
      inspectionStatus: "red" as InspectionStatus,
      lastInspectionDate: "2025-03-01",
    },
    {
      id: "hh-021",
      firstName: "Queen",
      middleName: "Mckenzie",
      lastName: "Mkandawire",
      cvAreaId: "cv-012",
      familyCount: 7,
      inspectionStatus: "green" as InspectionStatus,
      lastInspectionDate: "2025-11-08",
    },
    {
      id: "hh-022",
      firstName: "Esnart",
      middleName: "Abraham",
      lastName: "Gondwe",
      cvAreaId: "cv-012",
      familyCount: 4,
      inspectionStatus: "green" as InspectionStatus,
      lastInspectionDate: "2025-10-15",
    },
    {
      id: "hh-023",
      firstName: "Grace",
      middleName: "Daniel",
      lastName: "Gondwe",
      cvAreaId: "cv-012",
      familyCount: 9,
      inspectionStatus: "yellow" as InspectionStatus,
      lastInspectionDate: "2025-07-20",
    },
    {
      id: "hh-024",
      firstName: "Dorothy",
      middleName: "Kamzati",
      lastName: "Kwenda",
      cvAreaId: "cv-012",
      familyCount: 11,
      inspectionStatus: "red" as InspectionStatus,
      lastInspectionDate: "2025-04-05",
    },
    {
      id: "hh-025",
      firstName: "Merry",
      middleName: "Pilirani",
      lastName: "Kwenda",
      cvAreaId: "cv-012",
      familyCount: 4,
      inspectionStatus: "uninspected" as InspectionStatus,
    },
    {
      id: "hh-026",
      firstName: "Alice",
      middleName: "Edward",
      lastName: "Nyoni",
      cvAreaId: "cv-017",
      familyCount: 9,
      inspectionStatus: "green" as InspectionStatus,
      lastInspectionDate: "2025-11-12",
    },
    {
      id: "hh-027",
      firstName: "Taona",
      middleName: "Vinthumfumbenge",
      lastName: "Chaula",
      cvAreaId: "cv-017",
      familyCount: 7,
      inspectionStatus: "green" as InspectionStatus,
      lastInspectionDate: "2025-10-28",
    },
    {
      id: "hh-028",
      firstName: "Idah",
      middleName: "Charse",
      lastName: "Nyoni",
      cvAreaId: "cv-017",
      familyCount: 6,
      inspectionStatus: "yellow" as InspectionStatus,
      lastInspectionDate: "2025-08-10",
    },
    {
      id: "hh-029",
      firstName: "Sella",
      middleName: "Jolly",
      lastName: "Nyoni",
      cvAreaId: "cv-017",
      familyCount: 5,
      inspectionStatus: "red" as InspectionStatus,
      lastInspectionDate: "2025-05-02",
    },
    {
      id: "hh-030",
      firstName: "John",
      middleName: "Moved",
      lastName: "Away",
      cvAreaId: "cv-001",
      familyCount: 3,
      inspectionStatus: "red" as InspectionStatus,
      isArchived: true,
      archiveReason: "moved" as ArchiveReason,
    },
  ];

  return baseHouseholders.map((hh) => ({
    ...hh,
    chiefId: "chief-001",
    stoveType: "ccm" as StoveType,
    stoveBuildDate: "2022-06-15",
    hasKitchen: Math.random() > 0.5,
    kitchenWellVentilated: Math.random() > 0.6,
    kitchenRainproof: Math.random() > 0.7,
    houseOwnership: "owned" as HouseOwnership,
    latitude: -11.18 + Math.random() * 0.02,
    longitude: 33.78 + Math.random() * 0.02,
    gpsAccuracy: Math.random() * 10 + 2,
    isArchived: hh.isArchived ?? false,
    lastCcmCondition: "good" as CCMCondition,
    lastCcmInUse: true,
  }));
};

export const householders = generateHouseholders();

// Mock chief names
const chiefNames = [
  "Chief Mwase",
  "Chief Tembo",
  "Chief Phiri",
  "Chief Banda",
  "Chief Nyirenda",
  "Chief Gondwe",
  "Chief Kumwenda",
  "Chief Mhango",
];

// Mock lead CV names (from staff with lead_community_volunteer position)
const leadCvNames = [
  "Chimwemwe Kumwenda",
  "Daud Mpofu",
  "Aaron Moyo",
  "Saleji Nkosi",
  "Bettie Mhango",
  "Beuty Hara",
];

// Generate inspections
const generateInspections = (): Inspection[] => {
  const inspections: Inspection[] = [];
  let inspId = 1;

  const woodUseQualities: WoodUseQuality[] = ["good", "fair", "poor"];

  householders
    .filter((h) => h.lastInspectionDate)
    .forEach((hh) => {
      inspections.push({
        id: `insp-${String(inspId++).padStart(3, "0")}`,
        householderId: hh.id,
        staffId: staff[Math.floor(Math.random() * 10) + 14]!.id,
        inspectionDate: hh.lastInspectionDate!,
        ccmInUse: Math.random() > 0.1,
        ccmCondition: Math.random() > 0.8 ? "needs_repair" : "good",
        woodUse: true,
        woodUseQuality:
          woodUseQualities[Math.floor(Math.random() * woodUseQualities.length)]!,
        hasKitchen: hh.hasKitchen,
        kitchenWellVentilated: hh.kitchenWellVentilated,
        kitchenRainproof: hh.kitchenRainproof,
        ccmRainProtection: Math.random() > 0.5,
        latitude: hh.latitude,
        longitude: hh.longitude,
        gpsAccuracy: hh.gpsAccuracy,
        chiefName: chiefNames[Math.floor(Math.random() * chiefNames.length)]!,
        leadCvName: leadCvNames[Math.floor(Math.random() * leadCvNames.length)]!,
      });
    });

  return inspections;
};

export const inspections = generateInspections();

// Generate usage surveys
const generateUsageSurveys = (): UsageSurvey[] => {
  return householders.slice(0, 20).map((hh, idx) => ({
    id: `usage-${String(idx + 1).padStart(3, "0")}`,
    householderId: hh.id,
    staffId: staff[Math.floor(Math.random() * 10) + 14]!.id,
    surveyDate: `2025-${String(Math.floor(Math.random() * 11) + 1).padStart(2, "0")}-${String(Math.floor(Math.random() * 28) + 1).padStart(2, "0")}`,
    ccmInUse: Math.random() > 0.15,
    ccmWarm: Math.random() > 0.3,
    usageSigns: Math.random() > 0.2,
    respondentGender: Math.random() > 0.7 ? "male" : "female",
    adultCount: Math.floor(Math.random() * 4) + 1,
    childCount: Math.floor(Math.random() * 5),
    otherStovesPresent: Math.random() > 0.6,
    cookingFrequency: ["2 times", "3 times", "4 or more times"][
      Math.floor(Math.random() * 3)
    ],
  }));
};

export const usageSurveys = generateUsageSurveys();

// Generate KPT Surveys
const generateKPTSurveys = (): KPTSurvey[] => {
  return householders.slice(0, 15).map((hh, idx) => ({
    id: `kpt-${String(idx + 1).padStart(3, "0")}`,
    householderId: hh.id,
    staffId: staff[Math.floor(Math.random() * 10) + 14]!.id,
    surveyDate: `2025-${String(Math.floor(Math.random() * 11) + 1).padStart(2, "0")}-${String(Math.floor(Math.random() * 28) + 1).padStart(2, "0")}`,
    woodConsumption: Math.random() * 5 + 2,
    cookingTime: Math.random() * 60 + 30,
    fuelSavings: Math.random() * 40 + 20,
    emissionsReduction: Math.random() * 50 + 30,
  }));
};

export const kptSurveys = generateKPTSurveys();

// Generate SDG Surveys
const generateSDGSurveys = (): SDGSurvey[] => {
  const impacts = ["improved", "same", "worse"] as const;
  const incomeImpacts = ["increased", "same", "decreased"] as const;

  return householders.slice(0, 18).map((hh, idx) => ({
    id: `sdg-${String(idx + 1).padStart(3, "0")}`,
    householderId: hh.id,
    staffId: staff[Math.floor(Math.random() * 10) + 14]!.id,
    surveyDate: `2025-${String(Math.floor(Math.random() * 11) + 1).padStart(2, "0")}-${String(Math.floor(Math.random() * 28) + 1).padStart(2, "0")}`,
    healthImpact: impacts[Math.floor(Math.random() * 3)]!,
    timeFreedUp: Math.floor(Math.random() * 120) + 30,
    incomeImpact: incomeImpacts[Math.floor(Math.random() * 3)]!,
    educationAccess: impacts[Math.floor(Math.random() * 3)]!,
    genderEmpowerment: impacts[Math.floor(Math.random() * 3)]!,
  }));
};

export const sdgSurveys = generateSDGSurveys();

// Generate data quality issues
export const dataQualityIssues: DataQualityIssue[] = [
  {
    id: "dqi-001",
    type: "duplicate",
    severity: "high",
    description: "Potential duplicate: Similar name and location",
    affectedRecordId: "hh-006",
    affectedRecordType: "householder",
    detectedAt: "2025-11-18",
    resolved: false,
  },
  {
    id: "dqi-002",
    type: "duplicate",
    severity: "medium",
    description: "Potential duplicate: Same phone number",
    affectedRecordId: "hh-012",
    affectedRecordType: "householder",
    detectedAt: "2025-11-18",
    resolved: false,
  },
  {
    id: "dqi-003",
    type: "missing_gps",
    severity: "medium",
    description: "Missing GPS coordinates",
    affectedRecordId: "hh-019",
    affectedRecordType: "householder",
    detectedAt: "2025-11-20",
    resolved: false,
  },
  {
    id: "dqi-004",
    type: "missing_gps",
    severity: "medium",
    description: "GPS accuracy > 50m",
    affectedRecordId: "hh-025",
    affectedRecordType: "householder",
    detectedAt: "2025-11-20",
    resolved: false,
  },
  {
    id: "dqi-005",
    type: "missing_data",
    severity: "low",
    description: "Missing middle name",
    affectedRecordId: "hh-011",
    affectedRecordType: "householder",
    detectedAt: "2025-11-22",
    resolved: true,
  },
  {
    id: "dqi-006",
    type: "anomaly",
    severity: "high",
    description: "Family count unusually high (25)",
    affectedRecordId: "hh-024",
    affectedRecordType: "householder",
    detectedAt: "2025-11-15",
    resolved: false,
  },
  {
    id: "dqi-007",
    type: "anomaly",
    severity: "medium",
    description: "Stove build date in future",
    affectedRecordId: "insp-005",
    affectedRecordType: "inspection",
    detectedAt: "2025-11-10",
    resolved: true,
  },
  {
    id: "dqi-008",
    type: "missing_data",
    severity: "high",
    description: "Missing inspection result",
    affectedRecordId: "usage-008",
    affectedRecordType: "survey",
    detectedAt: "2025-11-12",
    resolved: false,
  },
];

// Stoves per VPA summary
export interface VPAStoveSummary {
  vpaId: string;
  vpaName: string;
  totalStoves: number;
  activeStoves: number;
  targetStoves: number;
  greenStatus: number;
  yellowStatus: number;
  redStatus: number;
  uninspected: number;
}

export const vpaStoveSummary: VPAStoveSummary[] = [
  {
    vpaId: "vpa-001",
    vpaName: "Mzimba North VPA",
    totalStoves: 1250,
    activeStoves: 1180,
    targetStoves: 1500,
    greenStatus: 720,
    yellowStatus: 280,
    redStatus: 130,
    uninspected: 50,
  },
  {
    vpaId: "vpa-002",
    vpaName: "Mzimba Central VPA",
    totalStoves: 980,
    activeStoves: 920,
    targetStoves: 1200,
    greenStatus: 550,
    yellowStatus: 220,
    redStatus: 110,
    uninspected: 40,
  },
  {
    vpaId: "vpa-003",
    vpaName: "Mzimba South VPA",
    totalStoves: 750,
    activeStoves: 710,
    targetStoves: 900,
    greenStatus: 450,
    yellowStatus: 160,
    redStatus: 70,
    uninspected: 30,
  },
  {
    vpaId: "vpa-004",
    vpaName: "Nkhata Bay VPA",
    totalStoves: 520,
    activeStoves: 490,
    targetStoves: 600,
    greenStatus: 320,
    yellowStatus: 100,
    redStatus: 50,
    uninspected: 20,
  },
  {
    vpaId: "vpa-005",
    vpaName: "Mangochi VPA",
    totalStoves: 380,
    activeStoves: 355,
    targetStoves: 500,
    greenStatus: 200,
    yellowStatus: 95,
    redStatus: 45,
    uninspected: 15,
  },
];

// Helper functions for data extraction
export function getHouseholdersByVPA() {
  // In real app, this would filter by VPA hierarchy
  return householders.filter((h) => !h.isArchived);
}

export function getInspectionsByDateRange(startDate: string, endDate: string) {
  return inspections.filter(
    (i) => i.inspectionDate >= startDate && i.inspectionDate <= endDate,
  );
}

export function getStaffByStatus(activeOnly: boolean) {
  return activeOnly ? staff.filter((s) => s.isActive) : staff;
}

export function getSurveysByDateRange<T extends { surveyDate: string }>(
  surveys: T[],
  startDate: string,
  endDate: string,
) {
  return surveys.filter(
    (s) => s.surveyDate >= startDate && s.surveyDate <= endDate,
  );
}

// Dashboard stats
export interface DashboardStats {
  totalHouseholders: number;
  activeHouseholders: number;
  totalStoves: number;
  activeStoves: number;
  conditionGood: number;
  totalKitchens: number;
  wellVentilated: number;
  rainProtected: number;
  inspected0to3Months: number;
  inspected3to6Months: number;
  inspected6PlusMonths: number;
  greenStatusPercent: number;
  yellowStatusPercent: number;
  redStatusPercent: number;
  uninspectedPercent: number;
  activeStaff: number;
  totalStaff: number;
  inspectionsThisMonth: number;
  inspectionsThisYear: number;
  usageSurveysCompleted: number;
  kptSurveysCompleted: number;
  sdgSurveysCompleted: number;
  duplicatesDetected: number;
  missingDataCount: number;
  anomaliesDetected: number;
}

export const dashboardStats: DashboardStats = {
  totalHouseholders: 12450,
  activeHouseholders: 11890,
  totalStoves: 12450,
  activeStoves: 11650,
  conditionGood: 10820,
  totalKitchens: 9870,
  wellVentilated: 7640,
  rainProtected: 8120,
  inspected0to3Months: 5200,
  inspected3to6Months: 3890,
  inspected6PlusMonths: 2100,
  greenStatusPercent: 42,
  yellowStatusPercent: 31,
  redStatusPercent: 17,
  uninspectedPercent: 10,
  activeStaff: 24,
  totalStaff: 28,
  inspectionsThisMonth: 1245,
  inspectionsThisYear: 14560,
  usageSurveysCompleted: 3420,
  kptSurveysCompleted: 1890,
  sdgSurveysCompleted: 1420,
  duplicatesDetected: 12,
  missingDataCount: 45,
  anomaliesDetected: 7,
};
