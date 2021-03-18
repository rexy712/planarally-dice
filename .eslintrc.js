module.exports = {
    root: true,
    env: {
        node: true,
    },
    extends: ["plugin:@typescript-eslint/recommended", "plugin:import/typescript"],
    rules: {
        "@typescript-eslint/await-thenable": 2,
        "@typescript-eslint/ban-ts-comment": "off",
        "@typescript-eslint/consistent-type-assertions": [2, { assertionStyle: "as" }],
        "@typescript-eslint/explicit-function-return-type": [2, { allowExpressions: true }],
        "@typescript-eslint/explicit-member-accessibility": [2, { accessibility: "no-public" }],
        "@typescript-eslint/no-angle-bracket-type-assertion": "off",
        "@typescript-eslint/no-empty-function": "off",
        "@typescript-eslint/no-explicit-any": "off",
        "@typescript-eslint/no-non-null-assertion": "off",
        "@typescript-eslint/no-unused-vars": [
            process.env.GITHUB_ACTION === undefined ? 1 : 2,
            { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
        ],
        "@typescript-eslint/no-use-before-define": 0,
        "@typescript-eslint/require-await": "error",
        // "import/no-unused-modules": [process.env.GITHUB_ACTION === undefined ? 1 : 2, { unusedExports: true }],
        "import/order": [
            process.env.GITHUB_ACTION === undefined ? 1 : 2,
            {
                alphabetize: { order: "asc", caseInsensitive: true },
                "newlines-between": "always",
                pathGroups: [{ pattern: "@/**", group: "parent", position: "before" }],
            },
        ],
        // "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
        "no-console": "off",
        "no-constant-condition": "off",
        "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
        "no-dupe-class-members": "off",
        "no-empty-function": "off",
        "no-unused-vars": "off",
        "prettier/prettier": [process.env.GITHUB_ACTION === undefined ? 1 : 2],
    },
    parserOptions: {
        parser: "@typescript-eslint/parser",
        ecmaFeatures: {
            jsx: false,
        },
        project: "./tsconfig.json",
        tsconfigRootDir: __dirname,
    },
    plugins: ["import"],
    settings: {
        "import/resolver": {
            typescript: {
                extensions: [".js", ".ts", ".d.ts"],
            },
        },
        "import/extensions": [".ts"],
    },
};
