import type { Aggregate, Query, Schema } from "mongoose";

import { ROLES } from "../auth/constants/role.constants";

const AUTH_MODEL_NAME = "User";

function isValidRole(str: string) {
    return Object.values(ROLES).some((role) => role.name === str);
}

type UnknownQuery = Query<unknown, unknown>;
type UnknownAggregate = Aggregate<unknown>;

/**
 * Taken from `hilma-auth` and added some more
 */
const FIND_LIKE_METHODS_REGEX =
    /find|countDocuments|replaceOne|findOne|findById|findByIdAndDelete|findByIdAndRemove|findByIdAndUpdate|findOneAndDelete|findOneAndRemove|findOneAndReplace|findOneAndUpdate/;

const ROLE_FIELD = "roles.name";

/**
 * Setup function for filtering users by their roles.
 * This function override hilma-auth `type` filter, and reapply a role based filter.
 *
 * * The function assumes that the users' model names equal to the roles they represent
 *
 * @param schema mongoose schema of a user role to apply the filter on
 */
export function applyFilterByRole(schema: Schema) {
    schema.pre<UnknownQuery>(FIND_LIKE_METHODS_REGEX, function (next) {
        const query = this.getQuery();

        delete query["type"];

        const { modelName: role } = this.model;

        if (role === AUTH_MODEL_NAME) return next();
        if (!isValidRole(role)) {
            const err = new Error(`modelName (${role}) is not a valid role!`);
            return next(err);
        }

        query[ROLE_FIELD] = role;
        return next();
    });

    schema.pre<UnknownAggregate>("aggregate", function (next) {
        const pipeline = this.pipeline();

        const { modelName: role } = this.model();

        if (role === AUTH_MODEL_NAME) return next();
        if (!isValidRole(role)) {
            const err = new Error(`modelName (${role}) is not a valid role!`);
            return next(err);
        }

        const matchStage = pipeline.find((stage) => "$match" in stage);

        if (matchStage) matchStage.$match[ROLE_FIELD] = role;
        else pipeline.unshift({ $match: { [ROLE_FIELD]: role } });

        return next();
    });
}
