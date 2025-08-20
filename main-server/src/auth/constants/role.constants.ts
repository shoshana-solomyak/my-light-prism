import { type Role } from "@hilma/auth-mongo-nest";

import { ROLE } from "@internal/constants";

const THERAPIST = {
    roleKey: "FwPR42cX93rkaPZQy",
    name: ROLE.Therapist,
} as const satisfies Role;

const ADMIN = {
    roleKey: "bMZyCGw0IuBiQ9Dv7",
    name: ROLE.Admin,
} as const satisfies Role;

const PATIENT = {
    roleKey: "r023nVEzXZfDXU0yK",
    name: ROLE.Patient,
} as const satisfies Role;

export const ROLES = {
    therapist: THERAPIST,
    admin: ADMIN,
    patient: PATIENT,
} as const satisfies Record<string, Role>;
