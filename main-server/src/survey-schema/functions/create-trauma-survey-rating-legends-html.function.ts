export const createLegendHtml = (
    options: { value: number; text: string }[],
): string => {
    return `<div class="options">
        ${options
            .map(
                (opt) => `
            <div class="option">
                <div class="circle">${opt.value}</div>
                ${opt.text}
            </div>`,
            )
            .join("")}
    </div>`;
};
