interface LogoProps extends React.ComponentPropsWithoutRef<"svg"> {
    orientation?: "vertical" | "horizontal";
}

export const Logo: React.FC<LogoProps> = ({
    orientation = "vertical",
    ...props
}) => {
    if (orientation === "horizontal")
        return (
            <svg
                width="283"
                height="66"
                viewBox="0 0 283 66"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                {...props}
            >
                <g filter="url(#filter0_d_2059_1705)">
                    <path
                        d="M109.05 30.6637C109.05 29.1145 109.244 27.6565 109.631 26.2896C110.019 24.9227 110.691 23.738 111.647 22.7356C112.627 21.7104 113.937 20.9017 115.577 20.3094C117.218 19.717 119.279 19.4209 121.763 19.4209H122.993C125.476 19.4209 127.538 19.717 129.178 20.3094C130.818 20.9017 132.117 21.7104 133.074 22.7356C134.053 23.738 134.737 24.9227 135.124 26.2896C135.511 27.6565 135.705 29.1145 135.705 30.6637V32.4407C135.705 33.9898 135.511 35.4478 135.124 36.8148C134.737 38.1817 134.053 39.3777 133.074 40.4029C132.117 41.4053 130.818 42.2026 129.178 42.795C127.538 43.3873 125.476 43.6835 122.993 43.6835H121.763C119.279 43.6835 117.218 43.3873 115.577 42.795C113.937 42.2026 112.627 41.4053 111.647 40.4029C110.691 39.3777 110.019 38.1817 109.631 36.8148C109.244 35.4478 109.05 33.9898 109.05 32.4407V30.6637ZM115.201 31.5522C115.201 32.4179 115.236 33.2608 115.304 34.0809C115.395 34.8783 115.657 35.5845 116.09 36.1996C116.546 36.8148 117.252 37.3046 118.209 37.6691C119.188 38.0336 120.578 38.2158 122.378 38.2158C124.177 38.2158 125.556 38.0336 126.513 37.6691C127.492 37.3046 128.198 36.8148 128.631 36.1996C129.087 35.5845 129.349 34.8783 129.417 34.0809C129.508 33.2608 129.554 32.4179 129.554 31.5522C129.554 30.6865 129.508 29.8549 129.417 29.0576C129.349 28.2602 129.087 27.554 128.631 26.9389C128.198 26.3238 127.492 25.8339 126.513 25.4694C125.556 25.1049 124.177 24.9227 122.378 24.9227C120.578 24.9227 119.188 25.1049 118.209 25.4694C117.252 25.8339 116.546 26.3238 116.09 26.9389C115.657 27.554 115.395 28.2602 115.304 29.0576C115.236 29.8549 115.201 30.6865 115.201 31.5522ZM141.186 25.9137L143.031 27.0072C144.125 26.4149 145.287 25.9706 146.517 25.6745C147.747 25.3783 149.114 25.2302 150.618 25.2302C152.531 25.2302 154.115 25.458 155.368 25.9137C156.621 26.3465 157.623 26.9503 158.375 27.7248C159.127 28.4994 159.651 29.4107 159.947 30.4586C160.243 31.4838 160.391 32.5887 160.391 33.7734V35.1403C160.391 36.3249 160.243 37.4413 159.947 38.4892C159.651 39.5144 159.127 40.4143 158.375 41.1889C157.623 41.9634 156.621 42.5671 155.368 43C154.115 43.4556 152.531 43.6835 150.618 43.6835C149.592 43.6835 148.647 43.6151 147.781 43.4784C146.916 43.3417 146.084 43.1481 145.287 42.8975V51.5432H139.819V25.9137H141.186ZM150.31 30.1853C149.353 30.1853 148.465 30.2536 147.645 30.3903C146.824 30.5042 146.038 30.6865 145.287 30.9371V38.0108C146.79 38.4892 148.465 38.7284 150.31 38.7284C151.472 38.7284 152.36 38.6145 152.976 38.3867C153.591 38.1361 154.046 37.8172 154.342 37.4299C154.639 37.0426 154.809 36.5869 154.855 36.063C154.901 35.539 154.923 35.0036 154.923 34.4568C154.923 33.9101 154.901 33.3747 154.855 32.8507C154.809 32.3267 154.639 31.8711 154.342 31.4838C154.046 31.0965 153.591 30.789 152.976 30.5612C152.36 30.3106 151.472 30.1853 150.31 30.1853ZM169.948 25.9137H175.211V30.6979H169.948V36.1655C169.948 36.5528 169.971 36.8945 170.017 37.1907C170.062 37.4868 170.188 37.7374 170.393 37.9425C170.598 38.1475 170.917 38.307 171.349 38.4209C171.782 38.512 172.386 38.5576 173.161 38.5576C173.685 38.5576 174.231 38.5348 174.801 38.4892C175.37 38.4209 175.883 38.3183 176.339 38.1817V43.1709C175.883 43.2848 175.359 43.3645 174.767 43.4101C174.174 43.4784 173.559 43.5126 172.921 43.5126C171.372 43.5126 170.062 43.3645 168.992 43.0683C167.921 42.7722 167.055 42.3507 166.394 41.804C165.734 41.2344 165.244 40.5396 164.925 39.7194C164.629 38.8765 164.481 37.9197 164.481 36.8489V19.0792H165.848L169.948 21.4712V25.9137ZM180.44 25.9137H181.807L185.908 28.3058V43H180.44V25.9137ZM180.099 19.9335V20.3435C180.099 21.0498 180.304 21.6535 180.714 22.1547C181.124 22.6559 181.898 22.9065 183.038 22.9065H183.311C184.45 22.9065 185.225 22.6559 185.635 22.1547C186.045 21.6535 186.25 21.0498 186.25 20.3435V19.9335C186.25 19.2272 186.045 18.6235 185.635 18.1223C185.225 17.6211 184.45 17.3705 183.311 17.3705H183.038C181.898 17.3705 181.124 17.6211 180.714 18.1223C180.304 18.6235 180.099 19.2272 180.099 19.9335ZM191.882 25.9137L193.556 26.9047C194.672 26.3579 195.857 25.9479 197.11 25.6745C198.363 25.3783 199.719 25.2302 201.177 25.2302C202.749 25.2302 204.07 25.4011 205.141 25.7428C206.234 26.0845 207.145 26.5516 207.874 27.1439C209.014 26.506 210.21 26.0276 211.463 25.7086C212.716 25.3897 214.094 25.2302 215.597 25.2302C217.397 25.2302 218.889 25.458 220.074 25.9137C221.281 26.3465 222.227 26.9503 222.91 27.7248C223.617 28.4766 224.106 29.3765 224.38 30.4245C224.676 31.4724 224.824 32.5887 224.824 33.7734V43H219.356V34.4568C219.356 33.9101 219.334 33.3861 219.288 32.8849C219.243 32.3609 219.094 31.9053 218.844 31.518C218.616 31.1079 218.24 30.789 217.716 30.5612C217.192 30.3106 216.452 30.1853 215.495 30.1853C214.493 30.1853 213.547 30.265 212.659 30.4245C211.793 30.5612 210.95 30.7776 210.13 31.0738C210.244 31.5066 210.312 31.9508 210.335 32.4065C210.38 32.8621 210.403 33.3178 210.403 33.7734V43H204.936V34.4568C204.936 33.9101 204.913 33.3861 204.867 32.8849C204.822 32.3609 204.674 31.9053 204.423 31.518C204.195 31.1079 203.819 30.789 203.295 30.5612C202.771 30.3106 202.031 30.1853 201.074 30.1853C199.206 30.1853 197.509 30.4586 195.982 31.0054V43H190.515V25.9137H191.882ZM249.493 43H248.127L246.281 41.9406C245.119 42.533 243.912 42.9658 242.659 43.2392C241.406 43.5354 239.993 43.6835 238.422 43.6835C236.576 43.6835 235.038 43.524 233.808 43.205C232.601 42.9089 231.633 42.4988 230.904 41.9748C230.175 41.4281 229.662 40.813 229.366 40.1295C229.07 39.4233 228.922 38.6942 228.922 37.9425V37.6007C228.922 36.8945 229.07 36.2224 229.366 35.5845C229.685 34.9466 230.209 34.3885 230.938 33.9101C231.69 33.4317 232.658 33.0558 233.842 32.7824C235.05 32.509 236.542 32.3723 238.319 32.3723C240.552 32.3723 242.454 32.5887 244.026 33.0216C244.003 32.566 243.935 32.1673 243.821 31.8255C243.73 31.461 243.513 31.1649 243.172 30.9371C242.83 30.6865 242.317 30.5042 241.634 30.3903C240.973 30.2536 240.085 30.1853 238.968 30.1853C238.353 30.1853 237.693 30.208 236.986 30.2536C236.28 30.2992 235.562 30.3675 234.833 30.4586C234.127 30.527 233.421 30.6295 232.715 30.7662C232.031 30.9029 231.393 31.051 230.801 31.2104V26.0845C231.393 25.9479 232.031 25.8339 232.715 25.7428C233.421 25.6289 234.139 25.5378 234.868 25.4694C235.619 25.3783 236.348 25.3214 237.055 25.2986C237.784 25.253 238.478 25.2302 239.139 25.2302C241.053 25.2302 242.659 25.4011 243.958 25.7428C245.279 26.0618 246.35 26.5402 247.17 27.1781C247.99 27.7932 248.582 28.5678 248.947 29.5018C249.311 30.4359 249.493 31.518 249.493 32.7482V43ZM239.002 39.4119C240.802 39.4119 242.477 39.1727 244.026 38.6942V37.0881C243.251 36.8831 242.431 36.735 241.565 36.6439C240.7 36.53 239.731 36.473 238.661 36.473C237.636 36.473 236.838 36.5186 236.269 36.6097C235.699 36.7008 235.278 36.8261 235.004 36.9856C234.731 37.1223 234.56 37.2818 234.492 37.464C234.423 37.6463 234.389 37.8172 234.389 37.9766C234.389 38.1817 234.423 38.3753 234.492 38.5576C234.56 38.717 234.742 38.8651 235.038 39.0018C235.357 39.1385 235.824 39.241 236.44 39.3094C237.055 39.3777 237.909 39.4119 239.002 39.4119ZM260.999 31.5522L252.558 21.4712V20.1043H258.607L264.587 27.2806L270.601 20.1043H276.616V21.4712L268.175 31.5522L276.616 41.6331V43H270.601L264.587 35.8579L258.607 43H252.558V41.6331L260.999 31.5522Z"
                        fill="white"
                    />
                    <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M37.6265 35.471L16.7895 56.3329H32.0574L48.6939 39.8341L48.7063 39.8222L49.8923 41.0669C48.7063 39.8222 48.7067 39.8218 48.7072 39.8214L48.7081 39.8205L48.7103 39.8185L48.7155 39.8135C48.7194 39.8099 48.7241 39.8054 48.7297 39.8003C48.7407 39.7899 48.7551 39.7766 48.7728 39.7605C48.8081 39.7284 48.8563 39.6852 48.9171 39.6324C49.0386 39.527 49.2105 39.3832 49.4289 39.2138C49.8645 38.876 50.4915 38.4316 51.2769 37.9878C52.8348 37.1076 55.0992 36.1831 57.772 36.1831C60.4448 36.1831 62.7093 37.1076 64.2671 37.9878C65.0525 38.4316 65.6795 38.876 66.1151 39.2138C66.3335 39.3832 66.5054 39.527 66.6269 39.6324C66.6877 39.6852 66.736 39.7284 66.7712 39.7605C66.7889 39.7766 66.8033 39.7899 66.8144 39.8003C66.8181 39.8037 66.8214 39.8069 66.8244 39.8097L66.8285 39.8135L66.8337 39.8185L66.8359 39.8205L66.8368 39.8214C66.8373 39.8218 66.8377 39.8222 65.6517 41.0669L66.8377 39.8222L66.8501 39.8341L86.9538 59.7714L62.6682 59.7714L48.2971 45.6229L50.7642 43.1762L64.0767 56.3329L78.6035 56.3329L64.4603 42.3067C64.4588 42.3054 64.4572 42.3039 64.4554 42.3022C64.4398 42.288 64.4122 42.2632 64.3733 42.2295C64.2953 42.1618 64.1722 42.0584 64.008 41.9311C63.6784 41.6755 63.1902 41.3288 62.5755 40.9815C61.3331 40.2794 59.6577 39.6216 57.772 39.6216C55.8863 39.6216 54.2109 40.2794 52.9685 40.9815C52.3538 41.3288 51.8656 41.6755 51.536 41.9311C51.3718 42.0584 51.2487 42.1618 51.1707 42.2295C51.1318 42.2632 51.1042 42.288 51.0886 42.3022C51.0868 42.3039 51.0852 42.3054 51.0837 42.3068L33.4733 59.7714H8.49609L32.7637 35.471H37.6265ZM51.074 42.3157C51.0733 42.3163 51.0734 42.3162 51.0743 42.3154L51.074 42.3157ZM64.4701 42.3157L64.4697 42.3154C64.4706 42.3162 64.4707 42.3163 64.4701 42.3157Z"
                        fill="white"
                    />
                    <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M37.6265 30.585L16.7895 9.72317L32.0574 9.72317L48.6939 26.222L48.7063 26.2338L49.8923 24.9891C48.7063 26.2338 48.7067 26.2342 48.7072 26.2346L48.7081 26.2355L48.7103 26.2376L48.7155 26.2425C48.7194 26.2462 48.7241 26.2506 48.7297 26.2558C48.7407 26.2661 48.7551 26.2794 48.7728 26.2955C48.8081 26.3276 48.8563 26.3709 48.9171 26.4236C49.0386 26.529 49.2105 26.6729 49.4289 26.8422C49.8645 27.18 50.4915 27.6244 51.2769 28.0682C52.8348 28.9485 55.0992 29.8729 57.772 29.8729C60.4448 29.8729 62.7093 28.9485 64.2671 28.0682C65.0525 27.6244 65.6795 27.18 66.1151 26.8422C66.3335 26.6729 66.5054 26.529 66.6269 26.4236C66.6877 26.3709 66.736 26.3276 66.7712 26.2955C66.7889 26.2794 66.8033 26.2661 66.8144 26.2558C66.8181 26.2523 66.8214 26.2492 66.8244 26.2464L66.8285 26.2425L66.8337 26.2376L66.8359 26.2355L66.8368 26.2346C66.8373 26.2342 66.8377 26.2338 65.6517 24.9891L66.8377 26.2338L66.8501 26.222L86.9538 6.28467L62.6682 6.28467L48.2971 20.4331L50.7642 22.8798L64.0767 9.72317L78.6035 9.72317L64.4603 23.7493C64.4588 23.7507 64.4572 23.7522 64.4554 23.7538C64.4398 23.768 64.4122 23.7928 64.3733 23.8266C64.2953 23.8942 64.1722 23.9976 64.008 24.1249C63.6784 24.3805 63.1902 24.7272 62.5755 25.0746C61.3331 25.7766 59.6577 26.4344 57.772 26.4344C55.8863 26.4344 54.2109 25.7766 52.9685 25.0746C52.3538 24.7272 51.8656 24.3805 51.536 24.1249C51.3718 23.9976 51.2487 23.8942 51.1707 23.8266C51.1318 23.7928 51.1042 23.768 51.0886 23.7538C51.0868 23.7522 51.0852 23.7506 51.0837 23.7493L33.4733 6.28467L8.49609 6.28467L32.7637 30.585H37.6265ZM51.074 23.7403C51.0733 23.7397 51.0734 23.7398 51.0743 23.7406L51.074 23.7403ZM64.4701 23.7403L64.4697 23.7406C64.4706 23.7398 64.4707 23.7397 64.4701 23.7403Z"
                        fill="white"
                    />
                    <path
                        d="M45.7532 15.6909H49.7379L53.8109 10.9025H41.6802L45.7532 15.6909Z"
                        fill="white"
                    />
                    <path
                        d="M6 30.5273C7.64659 25.4843 10.6714 21.0601 14.6319 17.6952L17.7404 21.3497C14.8469 23.8114 12.5552 26.9536 11.1152 30.5273H6Z"
                        fill="white"
                    />
                    <path
                        d="M89.4833 30.5273C87.8373 25.4862 84.8142 21.0635 80.8559 17.6991L77.7474 21.3536C80.6387 23.8147 82.9288 26.9555 84.368 30.5273H89.4833Z"
                        fill="white"
                    />
                    <path
                        d="M6 35.5114C7.57514 40.3675 10.4366 44.6512 14.1863 47.9673L17.294 44.3261C14.6007 41.9197 12.4659 38.91 11.1061 35.5114H6Z"
                        fill="white"
                    />
                    <path
                        d="M84.3771 35.5114C83.0181 38.9081 80.8849 41.9164 78.1937 44.3221L81.3014 47.9634C85.0489 44.6477 87.9088 40.3656 89.4833 35.5114H84.3771Z"
                        fill="white"
                    />
                    <path
                        d="M50.5466 50.3668L54.6171 55.1362H40.874L44.9445 50.3668H50.5466Z"
                        fill="white"
                    />
                </g>
                <defs>
                    <filter
                        id="filter0_d_2059_1705"
                        x="0.399248"
                        y="0.683916"
                        width="281.817"
                        height="64.6882"
                        filterUnits="userSpaceOnUse"
                        colorInterpolationFilters="sRGB"
                    >
                        <feFlood
                            floodOpacity="0"
                            result="BackgroundImageFix"
                        />
                        <feColorMatrix
                            in="SourceAlpha"
                            type="matrix"
                            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                            result="hardAlpha"
                        />
                        <feOffset />
                        <feGaussianBlur stdDeviation="2.80038" />
                        <feComposite
                            in2="hardAlpha"
                            operator="out"
                        />
                        <feColorMatrix
                            type="matrix"
                            values="0 0 0 0 0.396078 0 0 0 0 0.172549 0 0 0 0 0.870588 0 0 0 0.5 0"
                        />
                        <feBlend
                            mode="normal"
                            in2="BackgroundImageFix"
                            result="effect1_dropShadow_2059_1705"
                        />
                        <feBlend
                            mode="normal"
                            in="SourceGraphic"
                            in2="effect1_dropShadow_2059_1705"
                            result="shape"
                        />
                    </filter>
                </defs>
            </svg>
        );

    return (
        <svg
            width="361"
            height="272"
            viewBox="0 0 361 272"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <g filter="url(#filter0_d_2059_1530)">
                <path
                    d="M12.118 218.042C12.118 214.93 12.5069 212.002 13.2848 209.257C14.0626 206.511 15.4124 204.132 17.3342 202.119C19.3017 200.06 21.9326 198.435 25.227 197.246C28.5215 196.056 32.6624 195.461 37.6497 195.461H40.1206C45.1079 195.461 49.2488 196.056 52.5432 197.246C55.8377 198.435 58.4457 200.06 60.3675 202.119C62.335 204.132 63.7077 206.511 64.4855 209.257C65.2633 212.002 65.6523 214.93 65.6523 218.042V221.611C65.6523 224.722 65.2633 227.65 64.4855 230.396C63.7077 233.141 62.335 235.543 60.3675 237.602C58.4457 239.615 55.8377 241.217 52.5432 242.407C49.2488 243.596 45.1079 244.191 40.1206 244.191H37.6497C32.6624 244.191 28.5215 243.596 25.227 242.407C21.9326 241.217 19.3017 239.615 17.3342 237.602C15.4124 235.543 14.0626 233.141 13.2848 230.396C12.5069 227.65 12.118 224.722 12.118 221.611V218.042ZM24.4721 219.826C24.4721 221.565 24.5407 223.258 24.678 224.905C24.861 226.506 25.3872 227.925 26.2566 229.16C27.1717 230.396 28.5901 231.379 30.5118 232.112C32.4793 232.844 35.2704 233.21 38.8851 233.21C42.4999 233.21 45.2681 232.844 47.1898 232.112C49.1573 231.379 50.5757 230.396 51.4451 229.16C52.3602 227.925 52.8864 226.506 53.0237 224.905C53.2067 223.258 53.2982 221.565 53.2982 219.826C53.2982 218.087 53.2067 216.417 53.0237 214.816C52.8864 213.214 52.3602 211.796 51.4451 210.561C50.5757 209.325 49.1573 208.341 47.1898 207.609C45.2681 206.877 42.4999 206.511 38.8851 206.511C35.2704 206.511 32.4793 206.877 30.5118 207.609C28.5901 208.341 27.1717 209.325 26.2566 210.561C25.3872 211.796 24.861 213.214 24.678 214.816C24.5407 216.417 24.4721 218.087 24.4721 219.826ZM76.6605 208.502L80.3667 210.698C82.563 209.508 84.8965 208.616 87.3673 208.021C89.8381 207.426 92.5835 207.129 95.6034 207.129C99.4468 207.129 102.627 207.586 105.143 208.502C107.66 209.371 109.673 210.583 111.183 212.139C112.693 213.695 113.746 215.525 114.34 217.63C114.935 219.689 115.233 221.908 115.233 224.287V227.033C115.233 229.412 114.935 231.654 114.34 233.759C113.746 235.818 112.693 237.625 111.183 239.181C109.673 240.736 107.66 241.949 105.143 242.818C102.627 243.733 99.4468 244.191 95.6034 244.191C93.5443 244.191 91.6455 244.054 89.9068 243.779C88.168 243.505 86.498 243.116 84.8965 242.612V259.977H73.9151V208.502H76.6605ZM94.9856 217.081C93.0639 217.081 91.2794 217.218 89.6322 217.493C87.985 217.721 86.4064 218.087 84.8965 218.591V232.798C87.9164 233.759 91.2794 234.239 94.9856 234.239C97.3192 234.239 99.1037 234.01 100.339 233.553C101.574 233.05 102.49 232.409 103.084 231.631C103.679 230.853 104.022 229.938 104.114 228.886C104.205 227.833 104.251 226.758 104.251 225.66C104.251 224.562 104.205 223.487 104.114 222.434C104.022 221.382 103.679 220.467 103.084 219.689C102.49 218.911 101.574 218.293 100.339 217.836C99.1037 217.332 97.3192 217.081 94.9856 217.081ZM134.428 208.502H144.998V218.11H134.428V229.092C134.428 229.869 134.474 230.556 134.565 231.151C134.657 231.745 134.908 232.249 135.32 232.661C135.732 233.072 136.373 233.393 137.242 233.621C138.111 233.804 139.324 233.896 140.88 233.896C141.932 233.896 143.03 233.85 144.174 233.759C145.318 233.621 146.347 233.416 147.263 233.141V243.162C146.347 243.39 145.295 243.55 144.105 243.642C142.916 243.779 141.68 243.848 140.399 243.848C137.288 243.848 134.657 243.55 132.506 242.956C130.356 242.361 128.617 241.514 127.29 240.416C125.963 239.272 124.979 237.877 124.339 236.23C123.744 234.537 123.447 232.615 123.447 230.464V194.775H126.192L134.428 199.579V208.502ZM155.501 208.502H158.246L166.482 213.306V242.818H155.501V208.502ZM154.814 196.491V197.314C154.814 198.733 155.226 199.945 156.05 200.952C156.873 201.958 158.429 202.462 160.717 202.462H161.266C163.554 202.462 165.109 201.958 165.933 200.952C166.757 199.945 167.168 198.733 167.168 197.314V196.491C167.168 195.072 166.757 193.86 165.933 192.853C165.109 191.846 163.554 191.343 161.266 191.343H160.717C158.429 191.343 156.873 191.846 156.05 192.853C155.226 193.86 154.814 195.072 154.814 196.491ZM178.48 208.502L181.843 210.492C184.085 209.394 186.464 208.57 188.981 208.021C191.497 207.426 194.22 207.129 197.148 207.129C200.305 207.129 202.959 207.472 205.109 208.158C207.306 208.845 209.136 209.783 210.6 210.972C212.888 209.691 215.29 208.73 217.807 208.09C220.323 207.449 223.091 207.129 226.111 207.129C229.726 207.129 232.723 207.586 235.102 208.502C237.527 209.371 239.426 210.583 240.799 212.139C242.217 213.649 243.201 215.456 243.75 217.561C244.345 219.666 244.642 221.908 244.642 224.287V242.818H233.661V225.66C233.661 224.562 233.615 223.509 233.524 222.503C233.432 221.45 233.135 220.535 232.632 219.757C232.174 218.934 231.419 218.293 230.367 217.836C229.314 217.332 227.827 217.081 225.905 217.081C223.892 217.081 221.993 217.241 220.209 217.561C218.47 217.836 216.777 218.27 215.13 218.865C215.359 219.735 215.496 220.627 215.542 221.542C215.633 222.457 215.679 223.372 215.679 224.287V242.818H204.698V225.66C204.698 224.562 204.652 223.509 204.56 222.503C204.469 221.45 204.171 220.535 203.668 219.757C203.211 218.934 202.456 218.293 201.403 217.836C200.351 217.332 198.864 217.081 196.942 217.081C193.19 217.081 189.781 217.63 186.716 218.728V242.818H175.734V208.502H178.48ZM294.189 242.818H291.444L287.738 240.691C285.404 241.88 282.979 242.75 280.463 243.299C277.946 243.894 275.109 244.191 271.952 244.191C268.246 244.191 265.157 243.871 262.687 243.23C260.262 242.635 258.317 241.812 256.853 240.759C255.389 239.661 254.359 238.426 253.764 237.053C253.169 235.635 252.872 234.171 252.872 232.661V231.974C252.872 230.556 253.169 229.206 253.764 227.925C254.405 226.644 255.457 225.523 256.921 224.562C258.431 223.601 260.376 222.846 262.755 222.297C265.18 221.748 268.177 221.473 271.746 221.473C276.23 221.473 280.051 221.908 283.208 222.777C283.162 221.862 283.025 221.061 282.796 220.375C282.613 219.643 282.179 219.048 281.492 218.591C280.806 218.087 279.776 217.721 278.404 217.493C277.077 217.218 275.292 217.081 273.05 217.081C271.815 217.081 270.488 217.126 269.07 217.218C267.651 217.31 266.21 217.447 264.746 217.63C263.327 217.767 261.909 217.973 260.49 218.248C259.118 218.522 257.837 218.819 256.647 219.14V208.845C257.837 208.57 259.118 208.341 260.49 208.158C261.909 207.93 263.35 207.747 264.814 207.609C266.324 207.426 267.788 207.312 269.207 207.266C270.671 207.175 272.067 207.129 273.393 207.129C277.237 207.129 280.463 207.472 283.071 208.158C285.725 208.799 287.875 209.76 289.522 211.041C291.17 212.276 292.359 213.832 293.091 215.708C293.823 217.584 294.189 219.757 294.189 222.228V242.818ZM273.119 235.612C276.734 235.612 280.097 235.131 283.208 234.171V230.945C281.652 230.533 280.005 230.236 278.266 230.052C276.528 229.824 274.583 229.709 272.433 229.709C270.374 229.709 268.772 229.801 267.628 229.984C266.484 230.167 265.638 230.419 265.089 230.739C264.54 231.013 264.197 231.334 264.059 231.7C263.922 232.066 263.853 232.409 263.853 232.729C263.853 233.141 263.922 233.53 264.059 233.896C264.197 234.216 264.563 234.514 265.157 234.788C265.798 235.063 266.736 235.269 267.971 235.406C269.207 235.543 270.923 235.612 273.119 235.612ZM317.297 219.826L300.345 199.579V196.834H312.493L324.504 211.247L336.583 196.834H348.663V199.579L331.71 219.826L348.663 240.073V242.818H336.583L324.504 228.474L312.493 242.818H300.345V240.073L317.297 219.826Z"
                    fill="currentColor"
                />
                <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M149.396 98.7053L87.4949 160.681H132.852L182.275 111.667L182.312 111.632L185.835 115.329C182.312 111.632 182.313 111.63 182.314 111.629L182.317 111.627L182.323 111.62L182.339 111.606C182.351 111.595 182.365 111.582 182.381 111.566C182.414 111.536 182.457 111.496 182.509 111.448C182.614 111.353 182.757 111.224 182.938 111.068C183.299 110.755 183.81 110.327 184.458 109.824C185.752 108.821 187.615 107.501 189.948 106.182C194.576 103.567 201.303 100.821 209.244 100.821C217.184 100.821 223.911 103.567 228.539 106.182C230.872 107.501 232.735 108.821 234.029 109.824C234.678 110.327 235.188 110.755 235.549 111.068C235.73 111.224 235.873 111.353 235.978 111.448C236.03 111.496 236.073 111.536 236.106 111.566C236.117 111.577 236.127 111.586 236.136 111.594L236.148 111.606L236.164 111.62L236.17 111.627L236.173 111.629C236.174 111.63 236.175 111.632 232.652 115.329L236.175 111.632L236.212 111.667L295.935 170.895H223.789L181.096 128.864L188.425 121.596L227.973 160.681H271.129L229.113 119.013C229.108 119.008 229.104 119.004 229.098 118.999C229.052 118.957 228.97 118.883 228.854 118.783C228.623 118.582 228.257 118.275 227.769 117.897C226.79 117.137 225.34 116.107 223.514 115.075C219.823 112.99 214.846 111.036 209.244 111.036C203.642 111.036 198.664 112.99 194.974 115.075C193.148 116.107 191.697 117.137 190.718 117.897C190.23 118.275 189.864 118.582 189.633 118.783C189.517 118.883 189.435 118.957 189.389 118.999C189.384 119.004 189.379 119.009 189.374 119.013L137.058 170.895H62.8574L134.95 98.7053H149.396ZM189.345 119.039C189.343 119.041 189.344 119.041 189.346 119.038L189.345 119.039ZM229.142 119.039L229.141 119.038C229.143 119.041 229.144 119.041 229.142 119.039Z"
                    fill="currentColor"
                />
                <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M149.396 84.1902L87.4949 22.215L132.852 22.215L182.275 71.2286L182.312 71.2638L185.835 67.5662C182.312 71.2638 182.313 71.2651 182.314 71.2663L182.317 71.269L182.323 71.275L182.339 71.2897C182.351 71.3006 182.365 71.3137 182.381 71.3291C182.414 71.3598 182.457 71.3994 182.509 71.4471C182.614 71.5426 182.757 71.671 182.938 71.8277C183.299 72.1408 183.81 72.5682 184.458 73.0712C185.752 74.0747 187.615 75.3949 189.948 76.7134C194.576 79.3284 201.303 82.0747 209.244 82.0747C217.184 82.0747 223.911 79.3284 228.539 76.7134C230.872 75.3949 232.735 74.0747 234.029 73.0712C234.678 72.5682 235.188 72.1408 235.549 71.8277C235.73 71.671 235.873 71.5426 235.978 71.4471C236.03 71.3994 236.073 71.3598 236.106 71.3291C236.117 71.3188 236.127 71.3094 236.136 71.3011L236.148 71.2897L236.164 71.275L236.17 71.269L236.173 71.2663C236.174 71.2651 236.175 71.2638 232.652 67.5662L236.175 71.2638L236.212 71.2286L295.935 12H223.789L181.096 54.0314L188.425 61.2999L227.973 22.215H271.129L229.113 63.883C229.108 63.887 229.104 63.8915 229.098 63.8964C229.052 63.9387 228.97 64.0122 228.854 64.1126C228.623 64.3136 228.257 64.6207 227.769 64.9989C226.79 65.7582 225.34 66.7882 223.514 67.82C219.823 69.9055 214.846 71.8598 209.244 71.8598C203.642 71.8598 198.664 69.9055 194.974 67.82C193.148 66.7882 191.697 65.7582 190.718 64.9989C190.23 64.6207 189.864 64.3136 189.633 64.1126C189.517 64.0122 189.435 63.9386 189.389 63.8964C189.384 63.8915 189.379 63.887 189.374 63.8829L137.058 12H62.8574L134.95 84.1902H149.396ZM189.345 63.8563C189.343 63.8544 189.344 63.8548 189.346 63.8572L189.345 63.8563ZM229.142 63.8563L229.141 63.8572C229.143 63.8548 229.144 63.8544 229.142 63.8563Z"
                    fill="currentColor"
                />
                <path
                    d="M173.544 39.86H185.374L197.467 25.5789H161.451L173.544 39.86Z"
                    fill="currentColor"
                />
                <path
                    d="M55.5195 84.1082C60.4081 69.068 69.3886 55.8733 81.1471 45.8378L90.3759 56.7369C81.7855 64.0788 74.9815 73.4501 70.7063 84.1082H55.5195Z"
                    fill="currentColor"
                />
                <path
                    d="M303.376 84.1082C298.489 69.0738 289.513 55.8834 277.762 45.8493L268.533 56.7485C277.117 64.0887 283.916 73.4557 288.189 84.1082H303.376Z"
                    fill="currentColor"
                />
                <path
                    d="M55.4443 98.6235C60.1237 113.165 68.6244 125.991 79.7637 135.921L88.996 125.018C80.9947 117.812 74.653 108.8 70.6134 98.6235H55.4443Z"
                    fill="currentColor"
                />
                <path
                    d="M288.283 98.6235C284.245 108.795 277.908 117.803 269.913 125.006L279.146 135.909C290.279 125.981 298.774 113.159 303.452 98.6235H288.283Z"
                    fill="currentColor"
                />
                <path
                    d="M187.781 143.106L199.873 157.387H159.046L171.139 143.106H187.781Z"
                    fill="currentColor"
                />
            </g>
            <defs>
                <filter
                    id="filter0_d_2059_1530"
                    x="0.412288"
                    y="0.294124"
                    width="359.957"
                    height="271.389"
                    filterUnits="userSpaceOnUse"
                    colorInterpolationFilters="sRGB"
                >
                    <feFlood
                        floodOpacity="0"
                        result="BackgroundImageFix"
                    />
                    <feColorMatrix
                        in="SourceAlpha"
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                        result="hardAlpha"
                    />
                    <feOffset />
                    <feGaussianBlur stdDeviation="5.85294" />
                    <feComposite
                        in2="hardAlpha"
                        operator="out"
                    />
                    <feColorMatrix
                        type="matrix"
                        values="0 0 0 0 0.396078 0 0 0 0 0.172549 0 0 0 0 0.870588 0 0 0 0.5 0"
                    />
                    <feBlend
                        mode="normal"
                        in2="BackgroundImageFix"
                        result="effect1_dropShadow_2059_1530"
                    />
                    <feBlend
                        mode="normal"
                        in="SourceGraphic"
                        in2="effect1_dropShadow_2059_1530"
                        result="shape"
                    />
                </filter>
            </defs>
        </svg>
    );
};
