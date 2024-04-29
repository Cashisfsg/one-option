interface TelegramIconProps extends React.ComponentProps<"svg"> {}

export const TelegramIcon: React.FC<TelegramIconProps> = props => {
    return (
        <svg
            width="1em"
            height="1em"
            viewBox="0 0 36 36"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path
                d="M18 0C8.064 0 0 8.064 0 18C0 27.936 8.064 36 18 36C27.936 36 36 27.936 36 18C36 8.064 27.936 0 18 0ZM26.352 12.24C26.082 15.084 24.912 21.996 24.318 25.182C24.066 26.532 23.562 26.982 23.094 27.036C22.05 27.126 21.258 26.352 20.25 25.686C18.666 24.642 17.766 23.994 16.236 22.986C14.454 21.816 15.606 21.168 16.632 20.124C16.902 19.854 21.51 15.66 21.6 15.282C21.6125 15.2247 21.6108 15.1653 21.5952 15.1088C21.5795 15.0524 21.5502 15.0006 21.51 14.958C21.402 14.868 21.258 14.904 21.132 14.922C20.97 14.958 18.45 16.632 13.536 19.944C12.816 20.43 12.168 20.682 11.592 20.664C10.944 20.646 9.72 20.304 8.802 19.998C7.668 19.638 6.786 19.44 6.858 18.81C6.894 18.486 7.344 18.162 8.19 17.82C13.446 15.534 16.938 14.022 18.684 13.302C23.688 11.214 24.714 10.854 25.398 10.854C25.542 10.854 25.884 10.89 26.1 11.07C26.28 11.214 26.334 11.412 26.352 11.556C26.334 11.664 26.37 11.988 26.352 12.24Z"
                fill="currentColor"
            />
        </svg>
    );
};
