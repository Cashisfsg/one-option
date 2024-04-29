interface CashOutIcon extends React.ComponentProps<"svg"> {}

export const CashOutIcon: React.FC<CashOutIcon> = props => {
    return (
        <svg
            width="1em"
            height="1em"
            viewBox="0 0 32 33"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path
                d="M24.289 7.67378L19.5205 0.988281L1.987 14.9953L1.015 14.9848V14.9998H0.25V32.9998H31.75V14.9998H30.307L27.436 6.60128L24.289 7.67378ZM27.1375 14.9998H12.0955L23.299 11.1808L25.582 10.4503L27.1375 14.9998ZM21.325 8.68478L9.76 12.6268L18.919 5.30978L21.325 8.68478ZM3.25 27.2533V20.7433C3.88284 20.519 4.45766 20.1564 4.93254 19.6817C5.40743 19.2071 5.7704 18.6325 5.995 17.9998H26.005C26.2295 18.6327 26.5924 19.2076 27.0673 19.6825C27.5422 20.1574 28.1171 20.5203 28.75 20.7448V27.2548C28.1171 27.4793 27.5422 27.8422 27.0673 28.3171C26.5924 28.792 26.2295 29.3668 26.005 29.9998H5.998C5.77328 29.3663 5.40995 28.791 4.93453 28.3158C4.45911 27.8407 3.8836 27.4777 3.25 27.2533Z"
                fill="currentColor"
            />
        </svg>
    );
};
