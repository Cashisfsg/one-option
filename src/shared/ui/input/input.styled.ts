import styled, { css } from "styled-components";

export const StyledInput = styled.input.attrs({ autoComplete: "off" })`
    ${({ type, maxLength }) => {
        switch (type) {
            case undefined:
            case "text":
            case "number":
            case "date":
                return css`
                    height: 3.75rem;
                    padding-inline: 1.25rem;

                    font-size: 1rem;

                    color: #182f53;

                    border-radius: 0.5rem;
                    border: 2px solid #d7e2e9;
                    background: white;

                    outline: transparent;

                    transition: border 0.3s ease-in-out;

                    &::placeholder {
                        color: #5d5d5d;
                    }

                    &:focus-visible {
                        border: 2px solid #a5d2eb;
                    }

                    ${type === "number"
                        ? css`
                              width: ${() =>
                                  maxLength
                                      ? `calc(${maxLength} * 1ch + 2.5rem + 4px)`
                                      : null};
                              min-width: calc(2ch + 1.5rem + 4px);
                              padding-inline: 1.25rem;
                              /* text-align: center; */

                              &::-webkit-inner-spin-button,
                              ::-webkit-outer-spin-button {
                                  -webkit-appearance: none;
                                  margin: 0;
                              }
                          `
                        : null}
                `;
            case "radio":
            case "checkbox":
                return css`
                    appearance: none;
                    -webkit-appearance: none;
                    -moz-appearance: none;

                    width: 20px;
                    height: 20px;

                    background: ${({ theme }) => theme.color.black.primary};
                    border-radius: 50%;
                    background-position: center;

                    will-change: background;
                    transition: background 0.3s ease-in-out;

                    cursor: pointer;

                    &:checked {
                        background: ${({ theme }) =>
                            `url("data:image/svg+xml,%3Csvg width='11' height='7' viewBox='0 0 11 7' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M4.27053 6.88086C4.26602 6.88086 4.26134 6.88086 4.25666 6.88068C4.11256 6.8769 3.97585 6.81584 3.87714 6.71082L0.937929 3.58879C0.733311 3.37156 0.743758 3.02951 0.960984 2.82489C1.17821 2.62046 1.52026 2.63072 1.72488 2.84795L4.29016 5.573L9.26258 0.804656C9.47765 0.598238 9.82006 0.605083 10.0265 0.820687C10.2331 1.03611 10.2259 1.37816 10.0104 1.58476L4.64446 6.73064C4.54377 6.82718 4.40958 6.88086 4.27053 6.88086Z' fill='%231F1F1F'/%3E%3C/svg%3E") center no-repeat, ${theme.color.lime.primary};`};
                    }

                    /* &:hover {
                        background: red;
                        filter: drop-shadow(0 0 32px #646cffaa);
                    } */
                `;

            default:
                break;
        }
    }}
`;
