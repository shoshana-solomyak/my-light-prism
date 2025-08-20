import { Serializer } from "survey-core";

// Add a custom property 'actionType' to the survey model
Serializer.addProperty("survey", {
    name: "actionType",
    type: "string",
    category: "general",
    visibleIndex: 0,
});
