import { ADMIN_SCHEMA_RESET_PROPS } from "../constants/admin-schema-reset-props.constant";

/**
 * Transforms a given survey JSON into an admin-specific survey JSON format.
 * This function ensures that certain properties are standardized for an admin view,
 * such as hiding question numbers, progress bars, and completed pages.
 *
 * @param {unknown} surveyJson - The original survey JSON to be transformed.
 * @returns {object} The transformed admin survey JSON.
 */
export const transformToAdminSurvey = (surveyJson: unknown) => {
    if (!isValidObject(surveyJson)) {
        return {};
    }

    const adminSurveyJson = {
        ...surveyJson,
        ...ADMIN_SCHEMA_RESET_PROPS.survey,
        pages: [
            {
                name: "allPanels",
                elements: [] as unknown[],
            },
        ],
    };

    if ("pages" in surveyJson && Array.isArray(surveyJson.pages)) {
        adminSurveyJson.pages[0].elements = transformPages(surveyJson.pages);
    }

    return adminSurveyJson;
};

const numOfInputsInARow = 3;

/**
 * Checks if a given value is a valid object (i.e., a non-null object).
 *
 * @param {unknown} obj - The value to check.
 * @returns {obj is Record<string, unknown>} `true` if the value is a valid object, otherwise `false`.
 */
const isValidObject = (obj: unknown): obj is Record<string, unknown> =>
    typeof obj === "object" && obj !== null;

// A function to transform pages into panel elements
const transformPages = (pages: unknown[]): unknown[] =>
    pages.filter(isValidObject).map((page) => ({
        ...page,
        ...ADMIN_SCHEMA_RESET_PROPS.page,
        type: "panel",
        title: sanitizeTitle(page.title),
        elements: transformElements(page.elements),
        state: "collapsed",
    }));

// A function to transforms elements inside a page
const transformElements = (elements: unknown): unknown =>
    Array.isArray(elements)
        ? elements.map((element, index) => {
              if (isValidObject(element)) {
                  const startWithNewLine =
                      element.startWithNewLine ?? index % numOfInputsInARow === 0;
                  const colCount = element.type === "radiogroup" ? 0 : 1;

                  return {
                      ...element,
                      startWithNewLine,
                      colCount,
                  };
              }

              return element;
          })
        : elements;

// A function to sanitizes title by removing newline characters
const sanitizeTitle = (title: unknown): unknown => {
    if (title === null) return title;

    if (typeof title === "object") {
        return Object.fromEntries(
            Object.entries(title).map(([key, value]) =>
                typeof value === "string"
                    ? [key, value.replace(/\n/g, "")]
                    : [key, value],
            ),
        );
    }

    return typeof title === "string" ? title.replace(/\n/g, "") : title;
};
