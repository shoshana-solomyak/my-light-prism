import pluginJs from "@eslint/js";

import pluginCypress from "eslint-plugin-cypress/flat";
import eslintComments from "eslint-plugin-eslint-comments";
import nestjsPedantic from "eslint-plugin-nestjs-pedantic";
import nitpick from "eslint-plugin-nitpick";
import pluginReact from "eslint-plugin-react";
import reactRefresh from "eslint-plugin-react-refresh";
import globals from "globals";
import tseslint from "typescript-eslint";

/** @type {import('eslint').Linter.Config[]} */
export default tseslint.config(
    { files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"] },
    { files: ["**/*.js"], languageOptions: { sourceType: "script" } },
    {
        languageOptions: {
            parserOptions: {
                projectService: true,
                tsconfigRootDir: import.meta.dirname,
            },
            globals: { ...globals.browser, ...globals.node },
        },
    },
    pluginJs.configs.recommended,
    ...tseslint.configs.stylistic,
    pluginReact.configs.flat.recommended,
    nitpick.configs.recommended,
    nestjsPedantic.configs.recommended,
    pluginCypress.configs.recommended,
    {
        settings: {
            react: {
                version: "18",
            },
        },
    },
    {
        ignores: [
            "scripts",
            "clients/*/*.config.*",
            "internal/*/*.config.*",
            "*.config.{js,mjs,ts,mts}",
            "**/dist/*",
        ],
    },
    {
        plugins: {
            "react-refresh": reactRefresh,
            "eslint-comments": eslintComments,
            nitpick,
            "nestjs-pedantic": nestjsPedantic,
            cypress: pluginCypress,
        },
        rules: {
            // Disabled rules
            "max-params": "off", // We use `@typescript-eslint/max-params` instead
            "react/prop-types": "off",
            "react/react-in-jsx-scope": "off",

            // Extra core rules
            "capitalized-comments": [
                "error",
                "always",
                {
                    ignoreConsecutiveComments: true,
                },
            ],
            eqeqeq: "error",
            "object-shorthand": "error",
            "no-constant-binary-expression": "error",
            "no-console": "error",
            "no-implicit-coercion": [
                "error",
                { boolean: false, disallowTemplateShorthand: true },
            ],
            "no-sequences": "error",
            "no-var": "error",
            "require-await": "error",
            "no-return-await": "error",
            yoda: "error",

            "react/destructuring-assignment": "error",
            "react/jsx-curly-brace-presence": [
                "error",
                { children: "never", propElementValues: "always", props: "never" },
            ],
            "react/jsx-handler-names": [
                "error",
                {
                    checkLocalVariables: true,
                },
            ],
            "react/self-closing-comp": "error",
            "react/boolean-prop-naming": "error",
            "no-restricted-syntax": [
                "error",
                {
                    selector:
                        ":matches(JSXElement, JSXFragment) > JSXExpressionContainer > ConditionalExpression > [value=null]",
                    message: "Unexpected useless ternary. Use `&&` or `||` instead.",
                },
            ],
            "react-refresh/only-export-components": [
                "error",
                { allowConstantExport: true },
            ],

            // TypeScript-specific rules
            "@typescript-eslint/max-params": ["error", { max: 4 }],
            "@typescript-eslint/only-throw-error": "error",
            "@typescript-eslint/await-thenable": "error",
            "@typescript-eslint/naming-convention": [
                "error",
                {
                    selector: "default",
                    format: ["camelCase"],
                    leadingUnderscore: "allow",
                    trailingUnderscore: "allow",
                },
                {
                    selector: "import",
                    format: ["camelCase", "PascalCase"],
                },
                {
                    selector: "variable",
                    format: ["camelCase", "UPPER_CASE"],
                    leadingUnderscore: "allow",
                    trailingUnderscore: "allow",
                },
                {
                    selector: "typeLike",
                    format: ["PascalCase"],
                },
                {
                    selector: ["enumMember"],
                    format: ["PascalCase"],
                },
                {
                    selector: ["function", "variable", "parameter", "typeProperty"],
                    types: ["function"],
                    format: ["PascalCase", "camelCase"],
                },
                {
                    selector: ["typeProperty", "property"],
                    modifiers: ["requiresQuotes"],
                    format: null,
                },
            ],
            "@typescript-eslint/no-mixed-enums": "error",
            "@typescript-eslint/consistent-type-imports": [
                "error",
                {
                    fixStyle: "inline-type-imports",
                },
            ],
            "@typescript-eslint/consistent-type-exports": "error",
            "@typescript-eslint/no-explicit-any": "error",
            "@typescript-eslint/no-floating-promises": "error",
            "@typescript-eslint/no-misused-promises": "error",

            // Rules relating to ESLint comment
            "eslint-comments/require-description": "error",
        },
    },
);
