import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import ReactDomServer from "react-dom/server";
import { createStaticHandler, createStaticRouter, StaticRouterProvider } from "react-router-dom/server.mjs";
import { useLayoutEffect, useId, useRef, lazy, Suspense, useMemo } from "react";
import { Navigate, useNavigate, Link, createBrowserRouter } from "react-router-dom";
import { useDispatch } from "react-redux";
import { createSlice } from "@reduxjs/toolkit";
import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";
import { cnBase } from "tailwind-variants";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { cva } from "class-variance-authority";
const publicRoutes = {
  root: "/",
  authentication: {}
};
const privateRoutes = {
  root: "/",
  statistics: "statistics",
  withdrawal: "withdrawal",
  account: "account"
};
const useAppDispatch = useDispatch;
const baseQuery = fetchBaseQuery({
  baseUrl: "https://affilate.oneoption.ru",
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.token;
    if (token) {
      headers.set("Authorization", `Token ${token}`);
    }
    return headers;
  }
});
const baseQueryWithLogout = async (args, api, extraOptions) => {
  const result = await baseQuery(args, api, extraOptions);
  if (result.error && result.error.status === 401) {
    api.dispatch({ type: "auth/logout" });
  }
  return result;
};
const rootApi = createApi({
  reducerPath: "rootApi",
  baseQuery: baseQueryWithLogout,
  endpoints: (builder) => ({
    signIn: builder.mutation({
      query: (body) => ({
        url: "/login/",
        method: "POST",
        body
      })
    }),
    signUp: builder.mutation({
      query: (body) => ({
        url: "/register/",
        method: "POST",
        body
      })
    }),
    recoverPassword: builder.mutation({
      query: (body) => ({
        url: "/password_reset/",
        method: "POST",
        body
      })
    }),
    confirmPassword: builder.mutation({
      query: ({ token, new_password, confirm_password }) => ({
        url: `/password_reset/${token}/`,
        method: "POST",
        body: {
          new_password,
          confirm_password
        }
      })
    }),
    changePassword: builder.mutation({
      query: (body) => ({
        url: "/change_password/",
        method: "POST",
        body
      })
    }),
    signOut: builder.mutation({
      query: () => ({
        url: "/logout/",
        method: "POST"
      })
    })
  })
});
const {
  useSignInMutation,
  useSignUpMutation,
  useRecoverPasswordMutation,
  useConfirmPasswordMutation,
  useChangePasswordMutation,
  useSignOutMutation
} = rootApi;
const authSlice = createSlice({
  name: "auth",
  initialState: () => {
    const storedData = localStorage.getItem("token");
    if (!storedData)
      return {
        token: null,
        isAuthenticated: false
      };
    const { token } = JSON.parse(storedData);
    return {
      token,
      isAuthenticated: true
    };
  },
  reducers: {
    login: (state, action) => {
      state.token = action.payload.token;
      state.isAuthenticated = true;
      localStorage.setItem(
        "token",
        JSON.stringify({ token: action.payload.token })
      );
    },
    logout: (state) => {
      state.token = null;
      state.isAuthenticated = false;
      localStorage.removeItem("token");
    }
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      rootApi.endpoints.signIn.matchFulfilled,
      (state, { payload }) => {
        state.token = payload.token;
        state.isAuthenticated = true;
        localStorage.setItem(
          "token",
          JSON.stringify({ token: payload.token })
        );
      }
    ).addMatcher(rootApi.endpoints.signOut.matchFulfilled, (state) => {
      state.token = null;
      state.isAuthenticated = false;
      localStorage.removeItem("token");
    });
  }
});
const { login, logout } = authSlice.actions;
const GoogleAuthenticationPage = () => {
  const dispatch = useAppDispatch();
  useLayoutEffect(() => {
    const queryString = window.location.search;
    const searchParams = new URLSearchParams(queryString);
    if (searchParams.has("token")) {
      dispatch(login({ token: searchParams.get("token") }));
    }
  }, []);
  return /* @__PURE__ */ jsx(Navigate, { to: "/" });
};
const Logo = "/assets/logo.png";
const AuthorizationHeaderWidget = ({
  className,
  children,
  ...props
}) => {
  return /* @__PURE__ */ jsxs(
    "header",
    {
      className: cnBase("space-y-2-3-xs-md", className),
      ...props,
      children: [
        /* @__PURE__ */ jsx(
          "img",
          {
            src: Logo,
            alt: "Logo",
            height: "125",
            width: "220",
            className: "mx-auto block"
          }
        ),
        children
      ]
    }
  );
};
const EmailIcon = (props) => {
  return /* @__PURE__ */ jsx(
    "svg",
    {
      width: "1em",
      height: "1em",
      viewBox: "0 0 34 34",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      ...props,
      children: /* @__PURE__ */ jsx(
        "path",
        {
          d: "M5.66732 28.3333C4.88815 28.3333 4.22137 28.0561 3.66698 27.5017C3.1126 26.9474 2.83493 26.2801 2.83398 25.5V8.49999C2.83398 7.72082 3.11165 7.05405 3.66698 6.49966C4.22232 5.94527 4.8891 5.6676 5.66732 5.66666H28.334C29.1131 5.66666 29.7804 5.94432 30.3357 6.49966C30.8911 7.05499 31.1683 7.72177 31.1673 8.49999V25.5C31.1673 26.2792 30.8901 26.9464 30.3357 27.5017C29.7813 28.0571 29.1141 28.3343 28.334 28.3333H5.66732ZM17.0007 18.4167L5.66732 11.3333V25.5H28.334V11.3333L17.0007 18.4167ZM17.0007 15.5833L28.334 8.49999H5.66732L17.0007 15.5833ZM5.66732 11.3333V8.49999V25.5V11.3333Z",
          fill: "currentColor"
        }
      )
    }
  );
};
const PasswordIcon = (props) => {
  return /* @__PURE__ */ jsx(
    "svg",
    {
      width: "1em",
      height: "1em",
      viewBox: "0 0 34 34",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      ...props,
      children: /* @__PURE__ */ jsx(
        "path",
        {
          d: "M16.9993 24.0833C16.2479 24.0833 15.5272 23.7848 14.9959 23.2535C14.4645 22.7221 14.166 22.0014 14.166 21.25C14.166 19.6775 15.4268 18.4167 16.9993 18.4167C17.7508 18.4167 18.4715 18.7152 19.0028 19.2465C19.5342 19.7779 19.8327 20.4985 19.8327 21.25C19.8327 22.0014 19.5342 22.7221 19.0028 23.2535C18.4715 23.7848 17.7508 24.0833 16.9993 24.0833ZM25.4993 28.3333V14.1667H8.49935V28.3333H25.4993ZM25.4993 11.3333C26.2508 11.3333 26.9715 11.6318 27.5028 12.1632C28.0342 12.6945 28.3327 13.4152 28.3327 14.1667V28.3333C28.3327 29.0848 28.0342 29.8054 27.5028 30.3368C26.9715 30.8681 26.2508 31.1667 25.4993 31.1667H8.49935C7.7479 31.1667 7.02723 30.8681 6.49588 30.3368C5.96453 29.8054 5.66602 29.0848 5.66602 28.3333V14.1667C5.66602 12.5942 6.92685 11.3333 8.49935 11.3333H9.91602V8.49999C9.91602 6.62137 10.6623 4.8197 11.9907 3.49132C13.3191 2.16293 15.1207 1.41666 16.9993 1.41666C17.9295 1.41666 18.8506 1.59987 19.71 1.95584C20.5694 2.31181 21.3503 2.83357 22.008 3.49132C22.6658 4.14907 23.1875 4.92993 23.5435 5.78932C23.8995 6.6487 24.0827 7.56979 24.0827 8.49999V11.3333H25.4993ZM16.9993 4.24999C15.8722 4.24999 14.7912 4.69776 13.9941 5.49479C13.1971 6.29182 12.7493 7.37282 12.7493 8.49999V11.3333H21.2493V8.49999C21.2493 7.37282 20.8016 6.29182 20.0046 5.49479C19.2075 4.69776 18.1265 4.24999 16.9993 4.24999Z",
          fill: "currentColor"
        }
      )
    }
  );
};
const checkbox = "_checkbox_1s8zk_1";
const styles = {
  checkbox
};
function cn(...inputs) {
  return twMerge(clsx(inputs));
}
const Checkbox = ({ className, ...props }) => {
  return /* @__PURE__ */ jsx(
    "input",
    {
      type: "checkbox",
      className: cn(styles.checkbox, className),
      ...props
    }
  );
};
const AuthenticationForm = ({
  className,
  ...props
}) => {
  const emailId = useId();
  const passwordId = useId();
  const navigate = useNavigate();
  const [authenticate] = useSignInMutation();
  const onSubmitHandler = async (event) => {
    event.preventDefault();
    const { email, password } = event.currentTarget;
    try {
      await authenticate({
        email: email.value,
        password: password.value
      }).unwrap();
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };
  return /* @__PURE__ */ jsxs(
    "form",
    {
      onSubmit: onSubmitHandler,
      className: cnBase("gap-y-6-8-xs-md", className),
      ...props,
      children: [
        /* @__PURE__ */ jsxs("fieldset", { className: "grid gap-y-2-4-xs-md", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex gap-x-2-4-xs-md", children: [
            /* @__PURE__ */ jsxs(
              "label",
              {
                htmlFor: emailId,
                className: "aspect-square h-full place-content-center rounded-lg bg-white",
                children: [
                  /* @__PURE__ */ jsx(EmailIcon, { className: "text-2xl-4xl-xs-md text-violet-primary" }),
                  /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Email" })
                ]
              }
            ),
            /* @__PURE__ */ jsx(
              "input",
              {
                id: emailId,
                type: "email",
                name: "email",
                required: true,
                autoComplete: "off",
                placeholder: "Почта",
                className: "flex-auto rounded-lg bg-white px-4-6-xs-md py-3-4-xs-md text-base-xl-xs-md text-black"
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex gap-x-2-4-xs-md", children: [
            /* @__PURE__ */ jsxs(
              "label",
              {
                htmlFor: passwordId,
                className: "aspect-square h-full place-content-center rounded-lg bg-white",
                children: [
                  /* @__PURE__ */ jsx(PasswordIcon, { className: "text-2xl-4xl-xs-md text-violet-primary" }),
                  /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Пароль" })
                ]
              }
            ),
            /* @__PURE__ */ jsx(
              "input",
              {
                id: passwordId,
                type: "password",
                name: "password",
                required: true,
                placeholder: "Пароль",
                className: "flex-auto rounded-lg bg-white px-4-6-xs-md py-3-4-xs-md text-base-xl-xs-md text-black"
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxs("fieldset", { className: "flex items-center justify-between text-lg text-sm-lg-xs-md ", children: [
          /* @__PURE__ */ jsxs("label", { className: "grid grid-cols-[auto_auto] place-items-center gap-x-2", children: [
            /* @__PURE__ */ jsx(Checkbox, { className: "checkbox size-6-8-xs-md" }),
            /* @__PURE__ */ jsx("span", { className: "leading-none", children: "Запомнить меня" })
          ] }),
          /* @__PURE__ */ jsx(
            Link,
            {
              to: "/auth/password/reset",
              className: "underline underline-offset-2",
              children: "Забыли пароль?"
            }
          )
        ] })
      ]
    }
  );
};
const SignInPage = () => {
  const authenticationFormId = `form-${useId()}`;
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(AuthorizationHeaderWidget, { children: /* @__PURE__ */ jsxs("hgroup", { children: [
      /* @__PURE__ */ jsx("h1", { className: "text-4xl-7xl-xs-md", children: "Вход" }),
      /* @__PURE__ */ jsx("p", { className: "text-xl-4xl-xs-md", children: "в партнерскую программу" })
    ] }) }),
    /* @__PURE__ */ jsx(AuthenticationForm, { id: authenticationFormId }),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col justify-center gap-2-4-xs-md text-base-xl-xs-md sm:flex-row", children: [
      /* @__PURE__ */ jsx(
        "button",
        {
          form: authenticationFormId,
          className: "rounded-lg border-2 border-white-primary bg-white-primary py-3 text-black transition-colors duration-300 sm:px-16 mh:hover:bg-transparent mh:hover:text-white-primary",
          children: "Войти"
        }
      ),
      /* @__PURE__ */ jsx(
        "a",
        {
          href: `${"https://affilate.oneoption.ru"}/google/`,
          className: "rounded-lg border-2 border-white-primary py-3 transition-colors duration-300 sm:px-16 mh:hover:bg-white-primary mh:hover:text-black",
          children: "Войти через Google"
        }
      )
    ] }),
    /* @__PURE__ */ jsx("footer", { className: "text-sm-lg-xs-md", children: /* @__PURE__ */ jsxs("p", { children: [
      "Еще нет аккаунта?",
      " ",
      /* @__PURE__ */ jsx(
        Link,
        {
          to: "/auth/sign/up",
          className: "underline underline-offset-2",
          children: "Зарегистрироваться"
        }
      )
    ] }) })
  ] });
};
const RegistrationForm = ({
  className,
  ...props
}) => {
  const emailId = useId();
  const passwordId = useId();
  const confirmPasswordId = useId();
  const labelId = useId();
  const navigate = useNavigate();
  const [signUp] = useSignUpMutation();
  const onSubmitHandler = async (event) => {
    event.preventDefault();
    const { email, password, password2 } = event.currentTarget;
    try {
      const response = await signUp({
        email: email.value,
        password: password.value,
        password2: password2.value
      }).unwrap();
      navigate("/auth/sign/in");
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };
  return /* @__PURE__ */ jsxs(
    "form",
    {
      onSubmit: onSubmitHandler,
      className: cnBase("gap-y-6-8-xs-md", className),
      ...props,
      children: [
        /* @__PURE__ */ jsxs("fieldset", { className: "grid gap-y-2-4-xs-md", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex gap-x-2-4-xs-md", children: [
            /* @__PURE__ */ jsxs(
              "label",
              {
                htmlFor: emailId,
                className: "aspect-square h-full place-content-center rounded-lg bg-white",
                children: [
                  /* @__PURE__ */ jsx(EmailIcon, { className: "text-2xl-4xl-xs-md text-violet-primary" }),
                  /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Email" })
                ]
              }
            ),
            /* @__PURE__ */ jsx(
              "input",
              {
                id: emailId,
                type: "email",
                name: "email",
                required: true,
                autoComplete: "off",
                maxLength: 255,
                placeholder: "Почта",
                className: "flex-auto rounded-lg bg-white px-4-6-xs-md py-3-4-xs-md text-base-xl-xs-md text-black"
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex gap-x-2-4-xs-md", children: [
            /* @__PURE__ */ jsxs(
              "label",
              {
                htmlFor: passwordId,
                className: "aspect-square h-full place-content-center rounded-lg bg-white",
                children: [
                  /* @__PURE__ */ jsx(PasswordIcon, { className: "text-2xl-4xl-xs-md text-violet-primary" }),
                  /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Пароль" })
                ]
              }
            ),
            /* @__PURE__ */ jsx(
              "input",
              {
                id: passwordId,
                type: "password",
                name: "password",
                required: true,
                autoComplete: "off",
                maxLength: 128,
                placeholder: "Пароль",
                className: "flex-auto rounded-lg bg-white px-4-6-xs-md py-3-4-xs-md text-base-xl-xs-md text-black"
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex gap-x-2-4-xs-md", children: [
            /* @__PURE__ */ jsxs(
              "label",
              {
                htmlFor: confirmPasswordId,
                className: "aspect-square h-full place-content-center rounded-lg bg-white",
                children: [
                  /* @__PURE__ */ jsx(PasswordIcon, { className: "text-2xl-4xl-xs-md text-violet-primary" }),
                  /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Повторите пароль" })
                ]
              }
            ),
            /* @__PURE__ */ jsx(
              "input",
              {
                id: confirmPasswordId,
                type: "password",
                name: "password2",
                required: true,
                autoComplete: "off",
                maxLength: 128,
                placeholder: "Подтвердите пароль",
                className: "flex-auto rounded-lg bg-white px-4-6-xs-md py-3-4-xs-md text-base-xl-xs-md text-black"
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxs("fieldset", { className: "grid grid-cols-[auto_1fr] place-items-center gap-x-2-4-xs-md text-start text-lg ", children: [
          /* @__PURE__ */ jsx(
            Checkbox,
            {
              "aria-labelledby": labelId,
              className: "checkbox size-6-8-xs-md"
            }
          ),
          /* @__PURE__ */ jsxs(
            "span",
            {
              id: labelId,
              className: "text-sm-lg-xs-md leading-none",
              children: [
                "Я подтверждаю, что мне исполнилось 18 лет и я принимаю условия",
                " ",
                /* @__PURE__ */ jsx("a", { className: "text-sm-lg-xs-md underline underline-offset-2", children: "Пользовательского соглашения" })
              ]
            }
          )
        ] })
      ]
    }
  );
};
const SignUpPage = () => {
  const formId = `form-${useId()}`;
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs("header", { className: "space-y-2-3-xs-md", children: [
      /* @__PURE__ */ jsx(
        "img",
        {
          src: Logo,
          alt: "Logo",
          height: "125",
          width: "220",
          className: "mx-auto block"
        }
      ),
      /* @__PURE__ */ jsx("h1", { className: "text-4xl-7xl-xs-md", children: "Регистрация" }),
      /* @__PURE__ */ jsx("p", { className: "text-xl-4xl-xs-md", children: "в партнерской программе" })
    ] }),
    /* @__PURE__ */ jsx(RegistrationForm, { id: formId }),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col justify-center gap-2-4-xs-md text-base-xl-xs-md", children: [
      /* @__PURE__ */ jsx(
        "button",
        {
          form: formId,
          className: "rounded-lg border-2 border-white-primary bg-white-primary py-3 text-black transition-colors duration-300 sm:px-12 mh:hover:bg-transparent mh:hover:text-white-primary",
          children: "Зарегистрироваться"
        }
      ),
      /* @__PURE__ */ jsx(
        "a",
        {
          href: `${"https://affilate.oneoption.ru"}/google/`,
          className: "rounded-lg border-2 border-white-primary py-3 transition-colors duration-300 sm:px-12 mh:hover:bg-white-primary mh:hover:text-black",
          children: "Регистрация через Google"
        }
      )
    ] }),
    /* @__PURE__ */ jsx("footer", { className: "text-sm-lg-xs-md", children: /* @__PURE__ */ jsxs("p", { children: [
      "Уже зарегистрированы?",
      " ",
      /* @__PURE__ */ jsx(
        Link,
        {
          to: "/auth/sign/in",
          className: "underline underline-offset-2",
          children: "Войти"
        }
      )
    ] }) })
  ] });
};
const titleVariants = cva("", {
  variants: {
    as: {
      h1: "text-2xl-3xl-xs-lg",
      h2: "text-xl-2xl-xs-lg"
    }
  },
  defaultVariants: {
    as: "h1"
  }
});
const Title = ({
  as: Element = "h1",
  className,
  ...props
}) => {
  return /* @__PURE__ */ jsx(
    Element,
    {
      className: cn(titleVariants({ as: Element, className })),
      ...props
    }
  );
};
const StartPage = () => {
  const headerRef = useRef(null);
  return /* @__PURE__ */ jsxs("main", { children: [
    /* @__PURE__ */ jsx(
      "header",
      {
        ref: headerRef,
        className: "header md:px-12",
        children: /* @__PURE__ */ jsxs("div", { className: "mx-auto grid h-full max-w-screen-2xl grid-rows-[minmax(0,_1fr)_auto] md:grid-cols-2", children: [
          /* @__PURE__ */ jsx("figure", { className: "flex justify-center pl-12 pr-12 md:order-2 md:pr-0", children: /* @__PURE__ */ jsxs(
            "svg",
            {
              viewBox: "0 0 747 467",
              fill: "none",
              xmlns: "http://www.w3.org/2000/svg",
              className: "h-full max-w-xs md:max-w-xl",
              children: [
                /* @__PURE__ */ jsxs("g", { filter: "url(#filter0_d_243_3600)", children: [
                  /* @__PURE__ */ jsx(
                    "path",
                    {
                      d: "M313.469 175.471V312.405L208.284 312.405C313.469 266.864 289.951 144.321 230.093 108.72H329.913L420.467 226.882V108.72H483.908V312.405H405.199L313.469 175.471Z",
                      fill: "white"
                    }
                  ),
                  /* @__PURE__ */ jsx(
                    "path",
                    {
                      d: "M697 312.405H506.941V108.72H697V157.228H570.382V188.462H696.868V227.296H570.382V258.806H697V312.405Z",
                      fill: "white"
                    }
                  ),
                  /* @__PURE__ */ jsx(
                    "path",
                    {
                      d: "M136.909 134.205L136.895 134.209V95.7671C111.859 100.837 90.0748 114.362 74.0165 134.621C56.793 156.351 48.3138 183.872 50.2787 211.668C52.2435 239.465 64.5071 265.481 84.6111 284.503C104.715 303.526 131.174 314.147 158.684 314.24C186.193 314.332 212.721 303.888 232.949 285.001C253.177 266.114 265.61 240.18 267.757 212.398C269.903 184.615 261.604 157.038 244.523 135.193C232.661 120.022 217.171 108.395 199.707 101.285L177.787 50V133.203L177.773 133.199V153.283C198.209 160.958 212.769 180.832 212.769 204.14C212.769 234.098 188.716 258.384 159.045 258.384C129.374 258.384 105.321 234.098 105.321 204.14C105.321 186.172 113.973 170.245 127.3 160.374L136.895 184.711V154.706L136.909 154.7V134.205Z",
                      fill: "white"
                    }
                  ),
                  /* @__PURE__ */ jsx(
                    "path",
                    {
                      d: "M156.905 332.83C172.175 332.83 184.44 345.06 184.44 360.287V389.423C184.44 404.65 172.175 417 156.905 417H84.8052C69.5342 417 57.2693 404.65 57.2693 389.423V360.287C57.2693 345.06 69.5342 332.83 84.8052 332.83H156.905ZM163.518 389.423V360.287C163.518 356.57 160.632 353.692 156.905 353.692H84.8052C81.0776 353.692 78.1918 356.57 78.1918 360.287V389.423C78.1918 393.14 81.0776 396.017 84.8052 396.017H156.905C160.632 396.017 163.518 393.14 163.518 389.423Z",
                      fill: "white"
                    }
                  ),
                  /* @__PURE__ */ jsx(
                    "path",
                    {
                      d: "M262.047 332.71C276.597 332.71 288.381 344.46 288.381 358.848C288.381 373.356 276.597 385.106 262.047 385.106L215.325 385.226V416.88H194.402V332.83L262.047 332.71ZM262.047 364.244C265.053 364.244 267.338 361.846 267.338 358.848C267.338 355.971 265.053 353.573 262.047 353.573L215.325 353.692V364.244H262.047Z",
                      fill: "white"
                    }
                  ),
                  /* @__PURE__ */ jsx(
                    "path",
                    {
                      d: "M401.206 332.83V353.692H357.077V416.88H336.154V353.692H292.145V332.83H401.206Z",
                      fill: "white"
                    }
                  ),
                  /* @__PURE__ */ jsx(
                    "path",
                    {
                      d: "M430.749 416.88H409.826V332.59H430.749V416.88Z",
                      fill: "white"
                    }
                  ),
                  /* @__PURE__ */ jsx(
                    "path",
                    {
                      d: "M525.251 332.83C540.522 332.83 552.787 345.06 552.787 360.287V389.423C552.787 404.65 540.522 417 525.251 417H470.901C455.63 417 443.365 404.65 443.365 389.423V360.287C443.365 345.06 455.63 332.83 470.901 332.83H525.251ZM531.864 389.423V360.287C531.864 356.57 528.978 353.692 525.251 353.692H470.901C467.173 353.692 464.287 356.57 464.287 360.287V389.423C464.287 393.14 467.173 396.017 470.901 396.017H525.251C528.978 396.017 531.864 393.14 531.864 389.423Z",
                      fill: "white"
                    }
                  ),
                  /* @__PURE__ */ jsx(
                    "path",
                    {
                      d: "M696.758 416.76L696.999 416.88H666.697L586.338 361.366V416.88H565.415V332.59H586.458L675.836 396.737V332.59H696.758V416.76Z",
                      fill: "white"
                    }
                  ),
                  /* @__PURE__ */ jsx(
                    "path",
                    {
                      d: "M126.986 209.969L117.066 218.673L125.795 233.647L138.452 229.683C140.052 230.858 141.617 231.85 143.148 232.66C144.678 233.471 146.313 234.24 148.053 234.968L150.672 248.18H168.13L170.748 234.968C172.494 234.234 174.132 233.465 175.663 232.66C177.193 231.856 178.756 230.863 180.35 229.683L193.007 233.647L201.736 218.673L191.698 209.865C191.989 207.957 192.134 206.048 192.134 204.14C192.134 202.231 191.989 200.323 191.698 198.415L201.736 189.607L193.007 174.633L180.35 178.597C178.75 177.422 177.187 176.43 175.663 175.62C174.138 174.809 172.5 174.04 170.748 173.312L168.13 160.1H151.063V188.636C153.562 187.232 156.342 186.528 159.401 186.524C164.202 186.524 168.313 188.25 171.735 191.703C175.156 195.156 176.864 199.301 176.859 204.14C176.859 208.984 175.151 213.133 171.735 216.586C168.319 220.038 164.207 221.762 159.401 221.756C154.6 221.756 150.492 220.032 147.076 216.586C145.118 214.61 143.721 212.405 142.883 209.969H126.986Z",
                      fill: "white"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsx("defs", { children: /* @__PURE__ */ jsxs(
                  "filter",
                  {
                    id: "filter0_d_243_3600",
                    x: "0",
                    y: "0",
                    width: "747",
                    height: "467",
                    filterUnits: "userSpaceOnUse",
                    colorInterpolationFilters: "sRGB",
                    children: [
                      /* @__PURE__ */ jsx(
                        "feFlood",
                        {
                          floodOpacity: "0",
                          result: "BackgroundImageFix"
                        }
                      ),
                      /* @__PURE__ */ jsx(
                        "feColorMatrix",
                        {
                          in: "SourceAlpha",
                          type: "matrix",
                          values: "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0",
                          result: "hardAlpha"
                        }
                      ),
                      /* @__PURE__ */ jsx("feOffset", {}),
                      /* @__PURE__ */ jsx("feGaussianBlur", { stdDeviation: "25" }),
                      /* @__PURE__ */ jsx(
                        "feComposite",
                        {
                          in2: "hardAlpha",
                          operator: "out"
                        }
                      ),
                      /* @__PURE__ */ jsx(
                        "feColorMatrix",
                        {
                          type: "matrix",
                          values: "0 0 0 0 0.396078 0 0 0 0 0.172549 0 0 0 0 0.870588 0 0 0 0.5 0"
                        }
                      ),
                      /* @__PURE__ */ jsx(
                        "feBlend",
                        {
                          mode: "normal",
                          in2: "BackgroundImageFix",
                          result: "effect1_dropShadow_243_3600"
                        }
                      ),
                      /* @__PURE__ */ jsx(
                        "feBlend",
                        {
                          mode: "normal",
                          in: "SourceGraphic",
                          in2: "effect1_dropShadow_243_3600",
                          result: "shape"
                        }
                      )
                    ]
                  }
                ) })
              ]
            }
          ) }),
          /* @__PURE__ */ jsx("div", { className: "flex items-center justify-center bg-white/10 px-4-6-xs-lg py-10 text-center text-xl text-white-primary", children: /* @__PURE__ */ jsxs("div", { className: "flex w-full max-w-[576px] flex-col gap-y-6 @container", children: [
            /* @__PURE__ */ jsx(
              Title,
              {
                className: "text-4xl-6xl-xs-md",
                children: "Реферальная система"
              }
            ),
            /* @__PURE__ */ jsx("p", { className: "text-xl-2xl-xs-md", children: "С нами вы сможете пассивно зарабатывать до 80% дохода ваших рефералов" }),
            /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap justify-center gap-y-6 @container", children: [
              /* @__PURE__ */ jsx(
                Link,
                {
                  to: "/auth/sign/in",
                  className: "sign-in basis-full py-[18px] text-base-lg-xs-lg/none @md:basis-5/12",
                  children: "Вход"
                }
              ),
              /* @__PURE__ */ jsx(
                Link,
                {
                  to: "/auth/sign/up",
                  className: "sign-up basis-full py-[18px] text-base-lg-xs-lg/none @md:-ml-6 @md:basis-7/12",
                  children: "Регистрация"
                }
              )
            ] })
          ] }) })
        ] })
      }
    ),
    /* @__PURE__ */ jsx("section", { className: "section border-t-[6px] border-t-violet-quaternary", children: /* @__PURE__ */ jsxs("div", { className: "container", children: [
      /* @__PURE__ */ jsx("figure", { children: /* @__PURE__ */ jsxs(
        "svg",
        {
          width: "462",
          height: "246",
          viewBox: "0 0 462 246",
          fill: "none",
          xmlns: "http://www.w3.org/2000/svg",
          children: [
            /* @__PURE__ */ jsx(
              "path",
              {
                d: "M47.1225 142.873L43.8283 141.804C29.6634 137.21 22.5568 121.888 10.2037 114.256L0.417969 93.7669L10.2037 85.774C24.698 94.7909 36.2275 100.602 51.5454 105.571C75.9221 113.478 77.2398 108.727 77.2398 103.548C77.2398 96.6436 77.2398 91.4651 39.0276 79.0702L36.0628 78.1085L21.3359 62.0584L31.1216 54.0655L64.0632 44.8998L49.8983 41.1682L10.3684 28.346L0.582677 8.72015L10.3684 0.727234L98.6518 29.3637V55.2562L88.8661 63.2491L71.1456 66.8755C96.1812 79.4843 103.593 95.5252 103.593 110.37V113.823C103.593 134.019 86.6524 155.695 47.1225 142.873Z",
                fill: "#793AFF"
              }
            ),
            /* @__PURE__ */ jsx(
              "path",
              {
                d: "M114.733 104.646V95.67C114.733 64.4263 133.69 37.2765 172.561 49.885L178.49 51.8084C217.361 64.417 228.232 93.4904 228.232 124.734V133.71C228.232 164.954 210.54 195.93 171.669 183.321L165.74 181.398C126.869 168.789 114.733 135.89 114.733 104.646ZM152.466 104.646C152.466 122.253 152.466 138.306 175.525 145.786C198.585 153.266 198.585 137.212 198.585 119.605C198.585 102.171 198.585 86.1177 175.525 78.6381C152.466 71.1584 152.466 87.2118 152.466 104.646Z",
                fill: "#793AFF"
              }
            ),
            /* @__PURE__ */ jsx(
              "path",
              {
                d: "M231.649 141.703V132.727C231.649 101.483 252.234 75.7287 291.105 88.3373L297.035 90.2606C335.906 102.869 346.777 131.943 346.777 163.186V172.162C346.777 203.406 329.976 233.283 291.105 220.674V210.895C252.234 198.287 231.649 172.947 231.649 141.703ZM271.011 143.098C271.011 160.705 271.011 176.759 294.07 184.238C317.129 191.718 317.129 175.665 317.129 158.058C317.129 140.623 317.129 124.57 294.07 117.09C271.011 109.611 271.011 125.664 271.011 143.098Z",
                fill: "#793AFF"
              }
            ),
            /* @__PURE__ */ jsx(
              "path",
              {
                d: "M461.582 212.681L451.796 220.674L427.218 201.535V237.534L417.433 245.527L412.394 232.726V196.727L377.866 185.527L368.081 177.984L377.866 169.991L412.394 181.191L402.609 153.012L412.394 145.019L427.218 149.827V185.999L461.582 197.146V212.681Z",
                fill: "#793AFF"
              }
            ),
            /* @__PURE__ */ jsx(
              "path",
              {
                d: "M43.4067 141.717L40.1126 140.648C25.9477 136.054 12.7711 129.881 0.417969 122.249V93.7669C14.9123 102.784 26.4418 108.595 41.7597 113.564C66.1364 121.471 67.4541 116.72 67.4541 111.541C67.4541 104.636 67.4541 99.458 29.2419 87.0631L26.2771 86.1014L21.3359 62.0584L54.2775 52.8927L40.1126 49.1611L0.582677 36.3389V8.72015L88.8661 37.3566V63.2491L61.3599 74.8684C86.3955 87.4772 93.8074 103.518 93.8074 118.363V121.816C93.8074 142.012 82.9366 154.539 43.4067 141.717Z",
                fill: "#BC9CFF"
              }
            ),
            /* @__PURE__ */ jsx(
              "path",
              {
                d: "M113.033 107.51V98.5343C113.033 67.2906 123.904 45.2694 162.775 57.878L168.704 59.8013C207.576 72.4099 218.446 101.483 218.446 132.727V141.703C218.446 172.947 207.576 194.968 168.704 182.359L162.775 180.436C123.904 167.827 113.033 138.754 113.033 107.51ZM142.681 112.639C142.681 130.246 142.681 146.299 165.74 153.779C188.799 161.259 188.799 145.205 188.799 127.598C188.799 110.164 188.799 94.1106 165.74 86.631C142.681 79.1513 142.681 95.2047 142.681 112.639Z",
                fill: "#BC9CFF"
              }
            ),
            /* @__PURE__ */ jsx(
              "path",
              {
                d: "M231.578 145.963V136.986C231.578 105.743 242.449 83.7216 281.32 96.3302L287.249 98.2535C326.12 110.862 336.991 139.936 336.991 171.179V180.155C336.991 211.399 326.12 233.42 287.249 220.812L281.32 218.888C242.449 206.28 231.578 177.206 231.578 145.963ZM261.225 151.091C261.225 168.698 261.225 184.752 284.284 192.231C307.343 199.711 307.343 183.658 307.343 166.051C307.343 148.616 307.343 132.563 284.284 125.083C261.225 117.604 261.225 133.657 261.225 151.091Z",
                fill: "#BC9CFF"
              }
            ),
            /* @__PURE__ */ jsx(
              "path",
              {
                d: "M451.796 220.674L417.433 209.528V245.527L402.609 240.719V204.719L368.081 193.52V177.984L402.609 189.184V153.012L417.433 157.82V193.992L451.796 205.139V220.674Z",
                fill: "#BC9CFF"
              }
            )
          ]
        }
      ) }),
      /* @__PURE__ */ jsxs("header", { children: [
        /* @__PURE__ */ jsx("h2", { children: "Наши партнеры" }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("p", { children: "Присоединяйтесь к нашему успешному сообществу, где более 300 партнеров уже нашли свое место!" }),
          /* @__PURE__ */ jsx("p", { children: "Мы сотрудничаем с партнерами со всех уголков мира, создавая уникальные возможности для заработка. Присоединяйтесь к нам сегодня и начните зарабатывать вместе с нами!" }),
          /* @__PURE__ */ jsx("p", { children: "Ваш успех - наш приоритет." })
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "section border-t-[6px] border-t-violet-quaternary", children: /* @__PURE__ */ jsxs("div", { className: "container", children: [
      /* @__PURE__ */ jsx("figure", { children: /* @__PURE__ */ jsxs(
        "svg",
        {
          viewBox: "0 0 215 476",
          fill: "none",
          xmlns: "http://www.w3.org/2000/svg",
          children: [
            /* @__PURE__ */ jsx(
              "path",
              {
                d: "M101.061 270.871L205.969 475.628L214.51 461.091L188.642 177.416L105.224 220.243L8.85713 0.948187L0.316176 15.4853L17.6432 313.698L101.061 270.871Z",
                fill: "#793AFF"
              }
            ),
            /* @__PURE__ */ jsx(
              "path",
              {
                d: "M109.602 256.334L214.51 461.091L197.183 162.879L113.765 205.705L8.85713 0.948187L26.1842 299.16L109.602 256.334Z",
                fill: "#BC9CFF"
              }
            )
          ]
        }
      ) }),
      /* @__PURE__ */ jsxs("header", { children: [
        /* @__PURE__ */ jsx("h2", { children: "Быстрые выплаты" }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("p", { children: "Быстрые выплаты - это наша гордость!" }),
          /* @__PURE__ */ jsx("p", { children: "Мы гордимся тем, что предоставляем своим партнерам моментальные выплаты, чтобы вы могли получать свои заработанные средства быстро и без задержек." }),
          /* @__PURE__ */ jsx("p", { children: "Надежность и оперативность - это наши основные принципы, и мы гарантируем, что ваши выплаты будут обработаны быстро и эффективно." }),
          /* @__PURE__ */ jsx("p", { children: "Присоединяйтесь к нам сегодня и начните наслаждаться преимуществами быстрых выплат вместе с нами!" })
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "section border-t-[6px] border-t-violet-quaternary", children: /* @__PURE__ */ jsxs("div", { className: "container", children: [
      /* @__PURE__ */ jsx("figure", { children: /* @__PURE__ */ jsxs(
        "svg",
        {
          viewBox: "125 50 560 150",
          fill: "none",
          xmlns: "http://www.w3.org/2000/svg",
          children: [
            /* @__PURE__ */ jsx(
              "g",
              {
                opacity: "0.14",
                "clip-path": "url(#clip0_2087_687)",
                children: /* @__PURE__ */ jsx(
                  "path",
                  {
                    d: "M208.525 63.8395L170.783 56.5033L170.111 65.4998L183.103 68.5955C190.718 70.5322 213.789 74.7884 213.789 97.9486V99.4317C213.789 113.122 206.285 123.871 180.415 118.843L176.383 118.059C165.856 116.013 156.224 112.772 147.153 108.612V89.7876C157.792 94.4797 169.327 98.3192 178.511 100.104C192.622 102.847 193.63 98.9359 193.63 95.6273C193.63 88.3256 188.926 87.7536 181.647 85.54L150.849 76.9294L154.208 35.0272L208.525 45.5852V63.8395ZM225.293 90.0309V84.0983C225.293 63.4481 232.685 47.9997 259.115 53.1372L263.147 53.9209C289.577 59.0584 296.969 77.3804 296.969 98.0306V103.963C296.969 124.613 289.577 140.062 263.147 134.924L259.115 134.141C232.685 129.003 225.293 110.681 225.293 90.0309ZM245.452 90.983C245.452 102.62 245.452 113.23 261.131 116.278C276.81 119.326 276.81 108.716 276.81 97.0784C276.81 85.5554 276.81 74.9451 261.131 71.8974C245.452 68.8497 245.452 79.46 245.452 90.983ZM334.99 111.354V105.421C334.99 84.7709 342.381 69.3225 368.812 74.46L372.843 75.2437C399.274 80.3813 406.665 98.7032 406.665 119.353V125.286C406.665 145.936 399.274 161.385 372.843 156.247L368.812 155.463C342.381 150.326 334.99 132.004 334.99 111.354ZM355.148 112.306C355.148 123.943 355.148 134.553 370.827 137.601C386.506 140.649 386.506 130.038 386.506 118.401C386.506 106.878 386.506 96.2679 370.827 93.2202C355.148 90.1725 355.148 100.783 355.148 112.306ZM415.594 127.022V121.089C415.594 100.439 422.986 84.9904 449.416 90.1279L453.448 90.9116C479.878 96.0492 487.27 114.371 487.27 135.021V140.954C487.27 161.604 479.878 177.053 453.448 171.915L449.416 171.131C422.986 165.994 415.594 147.672 415.594 127.022ZM435.753 127.974C435.753 139.611 435.753 150.221 451.432 153.269C467.111 156.317 467.111 145.706 467.111 134.069C467.111 122.546 467.111 111.936 451.432 108.888C435.753 105.84 435.753 116.451 435.753 127.974ZM496.199 142.69V136.757C496.199 116.107 503.59 100.658 530.02 105.796L534.052 106.58C560.483 111.717 567.874 130.039 567.874 150.689V156.622C567.874 177.272 560.483 192.72 534.052 187.583L530.02 186.799C503.59 181.662 496.199 163.34 496.199 142.69ZM516.357 143.642C516.357 155.279 516.357 165.889 532.036 168.937C547.715 171.984 547.715 161.374 547.715 149.737C547.715 138.214 547.715 127.604 532.036 124.556C516.357 121.508 516.357 132.119 516.357 143.642ZM640.277 215.076V205.949C629.077 203.658 618.326 200.199 608.135 196.05V176.883C618.55 181.304 629.973 185.236 640.277 187.581V176.742C627.846 173.641 608.471 167.137 608.471 148.426V146.943C608.471 135.192 615.75 126.111 640.277 129.623V120.382L650.356 122.341V131.469C660.1 133.477 669.619 136.696 678.466 140.698V158.381C669.059 154.956 659.764 152.008 650.356 149.951V160.675C662.339 163.575 682.61 170.253 682.61 189.192V190.675C682.61 202.427 675.219 211.6 650.356 207.908V217.035L640.277 215.076ZM662.451 186.529C662.451 182.764 659.092 181.084 650.356 179.044V189.54C661.443 191.125 662.451 188.697 662.451 186.529ZM628.629 150.862C628.629 154.627 631.989 156.421 640.277 158.488V147.992C629.413 146.565 628.629 149.036 628.629 150.862ZM180.863 265.926L183.663 266.471C191.726 268.038 202.141 271.432 209.085 275.177V294.23C201.805 289.735 190.83 286.004 183.663 284.611C169.551 281.868 166.864 287.506 166.304 296.867C170.783 295.912 175.823 296.207 182.431 297.492C211.997 303.239 214.909 316.355 214.909 328.334V329.817C214.909 342.823 209.421 352.481 181.647 347.082L177.503 346.277C152.976 341.509 146.033 323.503 146.033 303.081V297.148C146.033 276.27 153.648 260.637 180.863 265.926ZM182.207 328.937C194.078 331.244 194.75 326.925 194.75 324.073C194.75 320.651 193.742 317.146 179.071 314.294C174.143 313.336 169.999 312.873 166.416 312.975C167.088 321.434 169.999 326.564 182.207 328.937ZM225.293 318.031V312.098C225.293 291.448 232.685 276 259.115 281.137L263.147 281.921C289.577 287.058 296.969 305.38 296.969 326.031V331.963C296.969 352.613 289.577 368.062 263.147 362.924L259.115 362.141C232.685 357.003 225.293 338.681 225.293 318.031ZM245.452 318.983C245.452 330.62 245.452 341.23 261.131 344.278C276.81 347.326 276.81 336.716 276.81 325.078C276.81 313.555 276.81 302.945 261.131 299.897C245.452 296.85 245.452 307.46 245.452 318.983ZM334.99 339.354V333.421C334.99 312.771 342.381 297.322 368.812 302.46L372.843 303.244C399.274 308.381 406.665 326.703 406.665 347.353V353.286C406.665 373.936 399.274 389.385 372.843 384.247L368.812 383.463C342.381 378.326 334.99 360.004 334.99 339.354ZM355.148 340.306C355.148 351.943 355.148 362.553 370.827 365.601C386.506 368.649 386.506 358.038 386.506 346.401C386.506 334.878 386.506 324.268 370.827 321.22C355.148 318.173 355.148 328.783 355.148 340.306ZM415.594 355.022V349.089C415.594 328.439 422.986 312.99 449.416 318.128L453.448 318.912C479.878 324.049 487.27 342.371 487.27 363.021V368.954C487.27 389.604 479.878 405.053 453.448 399.915L449.416 399.131C422.986 393.994 415.594 375.672 415.594 355.022ZM435.753 355.974C435.753 367.611 435.753 378.221 451.432 381.269C467.111 384.317 467.111 373.706 467.111 362.069C467.111 350.546 467.111 339.936 451.432 336.888C435.753 333.84 435.753 344.451 435.753 355.974ZM496.199 370.69V364.757C496.199 344.107 503.59 328.658 530.02 333.796L534.052 334.58C560.483 339.717 567.874 358.039 567.874 378.689V384.622C567.874 405.272 560.483 420.72 534.052 415.583L530.02 414.799C503.59 409.662 496.199 391.34 496.199 370.69ZM516.357 371.642C516.357 383.279 516.357 393.889 532.036 396.937C547.715 399.984 547.715 389.374 547.715 377.737C547.715 366.214 547.715 355.604 532.036 352.556C516.357 349.508 516.357 360.119 516.357 371.642ZM640.277 443.076V433.949C629.077 431.658 618.326 428.199 608.135 424.05V404.883C618.55 409.304 629.973 413.236 640.277 415.581V404.742C627.846 401.641 608.471 395.137 608.471 376.426V374.943C608.471 363.192 615.75 354.111 640.277 357.623V348.382L650.356 350.341V359.469C660.1 361.477 669.619 364.696 678.466 368.698V386.381C669.059 382.956 659.764 380.008 650.356 377.951V388.675C662.339 391.575 682.61 398.253 682.61 417.192V418.675C682.61 430.427 675.219 439.6 650.356 435.908V445.035L640.277 443.076ZM662.451 414.529C662.451 410.764 659.092 409.084 650.356 407.044V417.54C661.443 419.125 662.451 416.697 662.451 414.529ZM628.629 378.862C628.629 382.627 631.989 384.421 640.277 386.488V375.992C629.413 374.565 628.629 377.036 628.629 378.862ZM160.256 568.642L190.606 516.356L146.817 507.845V489.59L214.125 502.674V518.646L181.311 572.735L160.256 568.642ZM225.293 546.031V540.098C225.293 519.448 232.685 504 259.115 509.137L263.147 509.921C289.577 515.058 296.969 533.38 296.969 554.031V559.963C296.969 580.613 289.577 596.062 263.147 590.924L259.115 590.141C232.685 585.003 225.293 566.681 225.293 546.031ZM245.452 546.983C245.452 558.62 245.452 569.23 261.131 572.278C276.81 575.326 276.81 564.716 276.81 553.078C276.81 541.555 276.81 530.945 261.131 527.897C245.452 524.85 245.452 535.46 245.452 546.983ZM334.99 567.354V561.421C334.99 540.771 342.381 525.322 368.812 530.46L372.843 531.244C399.274 536.381 406.665 554.703 406.665 575.353V581.286C406.665 601.936 399.274 617.385 372.843 612.247L368.812 611.463C342.381 606.326 334.99 588.004 334.99 567.354ZM355.148 568.306C355.148 579.943 355.148 590.553 370.827 593.601C386.506 596.649 386.506 586.038 386.506 574.401C386.506 562.878 386.506 552.268 370.827 549.22C355.148 546.173 355.148 556.783 355.148 568.306ZM415.594 583.022V577.089C415.594 556.439 422.986 540.99 449.416 546.128L453.448 546.912C479.878 552.049 487.27 570.371 487.27 591.021V596.954C487.27 617.604 479.878 633.053 453.448 627.915L449.416 627.131C422.986 621.994 415.594 603.672 415.594 583.022ZM435.753 583.974C435.753 595.611 435.753 606.221 451.432 609.269C467.111 612.317 467.111 601.706 467.111 590.069C467.111 578.546 467.111 567.936 451.432 564.888C435.753 561.84 435.753 572.451 435.753 583.974ZM496.199 598.69V592.757C496.199 572.107 503.59 556.658 530.02 561.796L534.052 562.58C560.483 567.717 567.874 586.039 567.874 606.689V612.622C567.874 633.272 560.483 648.72 534.052 643.583L530.02 642.799C503.59 637.662 496.199 619.34 496.199 598.69ZM516.357 599.642C516.357 611.279 516.357 621.889 532.036 624.937C547.715 627.984 547.715 617.374 547.715 605.737C547.715 594.214 547.715 583.604 532.036 580.556C516.357 577.508 516.357 588.119 516.357 599.642ZM640.277 671.076V661.949C629.077 659.658 618.326 656.199 608.135 652.05V632.883C618.55 637.304 629.973 641.236 640.277 643.581V632.742C627.846 629.641 608.471 623.137 608.471 604.426V602.943C608.471 591.192 615.75 582.111 640.277 585.623V576.382L650.356 578.341V587.469C660.1 589.477 669.619 592.696 678.466 596.698V614.381C669.059 610.956 659.764 608.008 650.356 605.951V616.675C662.339 619.575 682.61 626.253 682.61 645.192V646.675C682.61 658.427 675.219 667.6 650.356 663.908V673.035L640.277 671.076ZM662.451 642.529C662.451 638.764 659.092 637.084 650.356 635.044V645.54C661.443 647.125 662.451 644.697 662.451 642.529ZM628.629 606.862C628.629 610.627 631.989 612.421 640.277 614.488V603.992C629.413 602.565 628.629 605.036 628.629 606.862ZM215.245 785.654V787.936C215.245 799.915 208.301 808.263 183.215 803.387L177.839 802.342C152.752 797.466 145.809 786.418 145.809 774.439V772.157C145.809 765.426 147.937 761.276 153.872 758.893C150.289 754.432 148.049 748.178 148.049 739.507V737.225C148.049 725.36 154.544 716.811 177.839 721.339L183.215 722.384C206.509 726.912 213.005 737.986 213.005 749.851V752.133C213.005 758.522 211.101 762.715 207.293 765.398C211.885 769.941 215.245 776.413 215.245 785.654ZM163.728 774.728C163.728 778.264 164.624 781.519 180.191 784.545L180.863 784.676C196.206 787.658 197.326 784.795 197.326 781.487C197.326 775.098 192.958 775.047 179.183 771.799C175.151 770.901 170.783 769.824 166.64 768.106C164.4 769.268 163.728 771.419 163.728 774.728ZM195.086 749.791C195.086 746.026 194.526 742.837 180.639 740.137C166.752 737.438 165.968 740.366 165.968 743.789C165.968 750.292 168.879 751.086 183.215 754.329C186.014 754.987 189.486 755.776 192.958 757.021C194.526 755.615 195.086 753.442 195.086 749.791ZM225.293 774.031V768.098C225.293 747.448 232.685 732 259.115 737.137L263.147 737.921C289.577 743.058 296.969 761.38 296.969 782.031V787.963C296.969 808.613 289.577 824.062 263.147 818.924L259.115 818.141C232.685 813.003 225.293 794.681 225.293 774.031ZM245.452 774.983C245.452 786.62 245.452 797.23 261.131 800.278C276.81 803.326 276.81 792.716 276.81 781.078C276.81 769.555 276.81 758.945 261.131 755.897C245.452 752.85 245.452 763.46 245.452 774.983ZM334.99 795.354V789.421C334.99 768.771 342.381 753.322 368.812 758.46L372.843 759.244C399.274 764.381 406.665 782.703 406.665 803.353V809.286C406.665 829.936 399.274 845.385 372.843 840.247L368.812 839.463C342.381 834.326 334.99 816.004 334.99 795.354ZM355.148 796.306C355.148 807.943 355.148 818.553 370.827 821.601C386.506 824.649 386.506 814.038 386.506 802.401C386.506 790.878 386.506 780.268 370.827 777.22C355.148 774.173 355.148 784.783 355.148 796.306ZM415.594 811.022V805.089C415.594 784.439 422.986 768.99 449.416 774.128L453.448 774.912C479.878 780.049 487.27 798.371 487.27 819.021V824.954C487.27 845.604 479.878 861.053 453.448 855.915L449.416 855.131C422.986 849.994 415.594 831.672 415.594 811.022ZM435.753 811.974C435.753 823.611 435.753 834.221 451.432 837.269C467.111 840.317 467.111 829.706 467.111 818.069C467.111 806.546 467.111 795.936 451.432 792.888C435.753 789.84 435.753 800.451 435.753 811.974ZM496.199 826.69V820.757C496.199 800.107 503.59 784.658 530.02 789.796L534.052 790.58C560.483 795.717 567.874 814.039 567.874 834.689V840.622C567.874 861.272 560.483 876.72 534.052 871.583L530.02 870.799C503.59 865.662 496.199 847.34 496.199 826.69ZM516.357 827.642C516.357 839.279 516.357 849.889 532.036 852.937C547.715 855.984 547.715 845.374 547.715 833.737C547.715 822.214 547.715 811.604 532.036 808.556C516.357 805.508 516.357 816.119 516.357 827.642ZM640.277 899.076V889.949C629.077 887.658 618.326 884.199 608.135 880.05V860.883C618.55 865.304 629.973 869.236 640.277 871.581V860.742C627.846 857.641 608.471 851.137 608.471 832.426V830.943C608.471 819.192 615.75 810.111 640.277 813.623V804.382L650.356 806.341V815.469C660.1 817.477 669.619 820.696 678.466 824.698V842.381C669.059 838.956 659.764 836.008 650.356 833.951V844.675C662.339 847.575 682.61 854.253 682.61 873.192V874.675C682.61 886.427 675.219 895.6 650.356 891.908V901.035L640.277 899.076ZM662.451 870.529C662.451 866.764 659.092 865.084 650.356 863.044V873.54C661.443 875.125 662.451 872.697 662.451 870.529ZM628.629 834.862C628.629 838.627 631.989 840.421 640.277 842.488V831.992C629.413 830.565 628.629 833.036 628.629 834.862ZM180.079 1030.78L177.279 1030.23C169.215 1028.67 158.8 1025.27 151.856 1021.53V1002.47C159.136 1006.97 170.111 1010.7 177.279 1012.09C191.278 1014.81 193.966 1009.18 194.526 999.815C190.046 1000.88 185.006 1000.47 178.511 999.212C148.945 993.465 146.033 980.349 146.033 968.37V966.887C146.033 953.881 151.521 944.223 179.295 949.622L183.439 950.427C207.965 955.195 214.909 973.201 214.909 993.623V999.556C214.909 1020.43 207.293 1036.07 180.079 1030.78ZM178.735 967.767C166.864 965.46 166.192 969.778 166.192 972.631C166.192 976.053 167.2 979.558 181.871 982.41C186.798 983.367 190.83 983.809 194.526 983.843C193.854 975.384 190.942 970.14 178.735 967.767ZM225.293 1002.03V996.098C225.293 975.448 232.685 960 259.115 965.137L263.147 965.921C289.577 971.058 296.969 989.38 296.969 1010.03V1015.96C296.969 1036.61 289.577 1052.06 263.147 1046.92L259.115 1046.14C232.685 1041 225.293 1022.68 225.293 1002.03ZM245.452 1002.98C245.452 1014.62 245.452 1025.23 261.131 1028.28C276.81 1031.33 276.81 1020.72 276.81 1009.08C276.81 997.555 276.81 986.945 261.131 983.897C245.452 980.85 245.452 991.46 245.452 1002.98ZM334.99 1023.35V1017.42C334.99 996.771 342.381 981.322 368.812 986.46L372.843 987.244C399.274 992.381 406.665 1010.7 406.665 1031.35V1037.29C406.665 1057.94 399.274 1073.38 372.843 1068.25L368.812 1067.46C342.381 1062.33 334.99 1044 334.99 1023.35ZM355.148 1024.31C355.148 1035.94 355.148 1046.55 370.827 1049.6C386.506 1052.65 386.506 1042.04 386.506 1030.4C386.506 1018.88 386.506 1008.27 370.827 1005.22C355.148 1002.17 355.148 1012.78 355.148 1024.31ZM415.594 1039.02V1033.09C415.594 1012.44 422.986 996.99 449.416 1002.13L453.448 1002.91C479.878 1008.05 487.27 1026.37 487.27 1047.02V1052.95C487.27 1073.6 479.878 1089.05 453.448 1083.91L449.416 1083.13C422.986 1077.99 415.594 1059.67 415.594 1039.02ZM435.753 1039.97C435.753 1051.61 435.753 1062.22 451.432 1065.27C467.111 1068.32 467.111 1057.71 467.111 1046.07C467.111 1034.55 467.111 1023.94 451.432 1020.89C435.753 1017.84 435.753 1028.45 435.753 1039.97ZM496.199 1054.69V1048.76C496.199 1028.11 503.59 1012.66 530.02 1017.8L534.052 1018.58C560.483 1023.72 567.874 1042.04 567.874 1062.69V1068.62C567.874 1089.27 560.483 1104.72 534.052 1099.58L530.02 1098.8C503.59 1093.66 496.199 1075.34 496.199 1054.69ZM516.357 1055.64C516.357 1067.28 516.357 1077.89 532.036 1080.94C547.715 1083.98 547.715 1073.37 547.715 1061.74C547.715 1050.21 547.715 1039.6 532.036 1036.56C516.357 1033.51 516.357 1044.12 516.357 1055.64ZM640.277 1127.08V1117.95C629.077 1115.66 618.326 1112.2 608.135 1108.05V1088.88C618.55 1093.3 629.973 1097.24 640.277 1099.58V1088.74C627.846 1085.64 608.471 1079.14 608.471 1060.43V1058.94C608.471 1047.19 615.75 1038.11 640.277 1041.62V1032.38L650.356 1034.34V1043.47C660.1 1045.48 669.619 1048.7 678.466 1052.7V1070.38C669.059 1066.96 659.764 1064.01 650.356 1061.95V1072.68C662.339 1075.58 682.61 1082.25 682.61 1101.19V1102.68C682.61 1114.43 675.219 1123.6 650.356 1119.91V1129.04L640.277 1127.08ZM662.451 1098.53C662.451 1094.76 659.092 1093.08 650.356 1091.04V1101.54C661.443 1103.12 662.451 1100.7 662.451 1098.53ZM628.629 1062.86C628.629 1066.63 631.989 1068.42 640.277 1070.49V1059.99C629.413 1058.56 628.629 1061.04 628.629 1062.86ZM133.632 1247.47L68.5643 1234.82V1216.57L94.3227 1221.57V1189.86L70.8041 1199.32V1179.92L110.002 1164.15L114.481 1165.02V1225.49L133.632 1229.21V1247.47ZM144.689 1214.36V1208.43C144.689 1187.78 152.08 1172.33 178.511 1177.47L182.543 1178.25C208.973 1183.39 216.365 1201.71 216.365 1222.36V1228.3C216.365 1248.95 208.973 1264.39 182.543 1259.26L178.511 1258.47C152.08 1253.34 144.689 1235.01 144.689 1214.36ZM164.848 1215.32C164.848 1226.95 164.848 1237.56 180.527 1240.61C196.206 1243.66 196.206 1233.05 196.206 1221.41C196.206 1209.89 196.206 1199.28 180.527 1196.23C164.848 1193.18 164.848 1203.79 164.848 1215.32ZM225.293 1230.03V1224.1C225.293 1203.45 232.685 1188 259.115 1193.14L263.147 1193.92C289.577 1199.06 296.969 1217.38 296.969 1238.03V1243.96C296.969 1264.61 289.577 1280.06 263.147 1274.92L259.115 1274.14C232.685 1269 225.293 1250.68 225.293 1230.03ZM245.452 1230.98C245.452 1242.62 245.452 1253.23 261.131 1256.28C276.81 1259.33 276.81 1248.72 276.81 1237.08C276.81 1225.56 276.81 1214.95 261.131 1211.9C245.452 1208.85 245.452 1219.46 245.452 1230.98ZM334.99 1251.35V1245.42C334.99 1224.77 342.381 1209.32 368.812 1214.46L372.843 1215.24C399.274 1220.38 406.665 1238.7 406.665 1259.35V1265.29C406.665 1285.94 399.274 1301.38 372.843 1296.25L368.812 1295.46C342.381 1290.33 334.99 1272 334.99 1251.35ZM355.148 1252.31C355.148 1263.94 355.148 1274.55 370.827 1277.6C386.507 1280.65 386.507 1270.04 386.507 1258.4C386.507 1246.88 386.507 1236.27 370.827 1233.22C355.148 1230.17 355.148 1240.78 355.148 1252.31ZM415.594 1267.02V1261.09C415.594 1240.44 422.986 1224.99 449.416 1230.13L453.448 1230.91C479.878 1236.05 487.27 1254.37 487.27 1275.02V1280.95C487.27 1301.6 479.878 1317.05 453.448 1311.91L449.416 1311.13C422.986 1305.99 415.594 1287.67 415.594 1267.02ZM435.753 1267.97C435.753 1279.61 435.753 1290.22 451.432 1293.27C467.111 1296.32 467.111 1285.71 467.111 1274.07C467.111 1262.55 467.111 1251.94 451.432 1248.89C435.753 1245.84 435.753 1256.45 435.753 1267.97ZM496.199 1282.69V1276.76C496.199 1256.11 503.59 1240.66 530.02 1245.8L534.052 1246.58C560.483 1251.72 567.874 1270.04 567.874 1290.69V1296.62C567.874 1317.27 560.483 1332.72 534.052 1327.58L530.02 1326.8C503.59 1321.66 496.199 1303.34 496.199 1282.69ZM516.357 1283.64C516.357 1295.28 516.357 1305.89 532.036 1308.94C547.715 1311.98 547.715 1301.37 547.715 1289.74C547.715 1278.21 547.715 1267.6 532.036 1264.56C516.357 1261.51 516.357 1272.12 516.357 1283.64ZM640.277 1355.08V1345.95C629.077 1343.66 618.326 1340.2 608.135 1336.05V1316.88C618.55 1321.3 629.973 1325.24 640.277 1327.58V1316.74C627.846 1313.64 608.471 1307.14 608.471 1288.43V1286.94C608.471 1275.19 615.75 1266.11 640.277 1269.62V1260.38L650.356 1262.34V1271.47C660.1 1273.48 669.619 1276.7 678.466 1280.7V1298.38C669.059 1294.96 659.764 1292.01 650.356 1289.95V1300.68C662.339 1303.58 682.61 1310.25 682.61 1329.19V1330.68C682.61 1342.43 675.219 1351.6 650.356 1347.91V1357.04L640.277 1355.08ZM662.451 1326.53C662.451 1322.76 659.092 1321.08 650.356 1319.04V1329.54C661.443 1331.12 662.451 1328.7 662.451 1326.53ZM628.629 1290.86C628.629 1294.63 631.989 1296.42 640.277 1298.49V1287.99C629.413 1286.56 628.629 1289.04 628.629 1290.86Z",
                    fill: "#FEF7FF"
                  }
                )
              }
            ),
            /* @__PURE__ */ jsx("g", { "clip-path": "url(#clip1_2087_687)", children: /* @__PURE__ */ jsx(
              "path",
              {
                d: "M188.61 106.95L157.551 100.912L156.998 108.316L167.689 110.864C173.956 112.457 192.942 115.96 192.942 135.019V136.24C192.942 147.507 186.767 156.352 165.477 152.214L162.159 151.569C153.496 149.885 145.569 147.218 138.104 143.795V128.303C146.86 132.165 156.353 135.324 163.91 136.793C175.523 139.051 176.352 135.832 176.352 133.109C176.352 127.1 172.481 126.63 166.491 124.808L141.146 117.722L143.911 83.2387L188.61 91.9274V106.95ZM202.409 128.504V123.621C202.409 106.628 208.492 93.9143 230.243 98.1422L233.561 98.7872C255.311 103.015 261.394 118.093 261.394 135.087V139.969C261.394 156.963 255.311 169.676 233.561 165.448L230.243 164.803C208.492 160.575 202.409 145.498 202.409 128.504ZM218.999 129.287C218.999 138.864 218.999 147.596 231.902 150.104C244.805 152.612 244.805 143.88 244.805 134.303C244.805 124.821 244.805 116.089 231.902 113.581C218.999 111.073 218.999 119.804 218.999 129.287ZM292.683 146.051V141.169C292.683 124.175 298.766 111.462 320.517 115.69L323.835 116.335C345.585 120.563 351.668 135.64 351.668 152.634V157.517C351.668 174.51 345.585 187.224 323.835 182.996L320.517 182.351C298.766 178.123 292.683 163.045 292.683 146.051ZM309.273 146.835C309.273 156.411 309.273 165.143 322.176 167.651C335.079 170.159 335.079 161.427 335.079 151.851C335.079 142.368 335.079 133.636 322.176 131.128C309.273 128.62 309.273 137.352 309.273 146.835ZM359.016 158.945V154.063C359.016 137.069 365.099 124.356 386.85 128.583L390.167 129.228C411.918 133.456 418.001 148.534 418.001 165.528V170.41C418.001 187.404 411.918 200.117 390.167 195.89L386.85 195.245C365.099 191.017 359.016 175.939 359.016 158.945ZM375.606 159.728C375.606 169.305 375.606 178.037 388.508 180.545C401.411 183.053 401.411 174.321 401.411 164.745C401.411 155.262 401.411 146.53 388.508 144.022C375.606 141.514 375.606 150.246 375.606 159.728ZM425.349 171.839V166.956C425.349 149.963 431.432 137.249 453.182 141.477L456.5 142.122C478.251 146.35 484.334 161.428 484.334 178.422V183.304C484.334 200.298 478.251 213.011 456.5 208.783L453.182 208.138C431.432 203.91 425.349 188.833 425.349 171.839ZM441.938 172.622C441.938 182.199 441.938 190.931 454.841 193.439C467.744 195.947 467.744 187.215 467.744 177.638C467.744 168.156 467.744 159.424 454.841 156.916C441.938 154.408 441.938 163.139 441.938 172.622ZM543.917 231.409V223.898C534.701 222.012 525.853 219.166 517.466 215.752V199.978C526.037 203.616 535.438 206.852 543.917 208.782V199.862C533.687 197.31 517.742 191.958 517.742 176.56V175.339C517.742 165.669 523.733 158.195 543.917 161.086V153.481L552.212 155.093V162.604C560.23 164.257 568.064 166.906 575.345 170.199V184.752C567.603 181.933 559.953 179.507 552.212 177.814V186.64C562.073 189.026 578.755 194.522 578.755 210.108V211.328C578.755 220.999 572.672 228.548 552.212 225.51V233.021L543.917 231.409ZM562.165 207.916C562.165 204.818 559.4 203.435 552.212 201.756V210.394C561.336 211.698 562.165 209.7 562.165 207.916ZM534.332 178.564C534.332 181.662 537.097 183.139 543.917 184.84V176.202C534.977 175.028 534.332 177.062 534.332 178.564ZM165.846 273.625L168.15 274.073C174.785 275.362 183.357 278.155 189.071 281.238V296.917C183.08 293.218 174.048 290.147 168.15 289.001C156.537 286.744 154.325 291.384 153.864 299.087C157.551 298.301 161.698 298.544 167.136 299.601C191.467 304.331 193.863 315.124 193.863 324.982V326.203C193.863 336.906 189.347 344.854 166.491 340.411L163.081 339.748C142.897 335.825 137.183 321.006 137.183 304.2V299.318C137.183 282.136 143.45 269.271 165.846 273.625ZM166.952 325.479C176.721 327.378 177.274 323.823 177.274 321.476C177.274 318.659 176.444 315.775 164.371 313.429C160.316 312.64 156.906 312.259 153.956 312.343C154.509 319.304 156.906 323.526 166.952 325.479ZM202.409 316.504V311.621C202.409 294.628 208.492 281.914 230.243 286.142L233.561 286.787C255.311 291.015 261.394 306.093 261.394 323.087V327.969C261.394 344.963 255.311 357.676 233.561 353.448L230.243 352.803C208.492 348.575 202.409 333.498 202.409 316.504ZM218.999 317.287C218.999 326.864 218.999 335.596 231.902 338.104C244.805 340.612 244.805 331.88 244.805 322.303C244.805 312.821 244.805 304.089 231.902 301.581C218.999 299.073 218.999 307.804 218.999 317.287ZM292.683 334.051V329.169C292.683 312.175 298.766 299.462 320.517 303.69L323.835 304.335C345.585 308.563 351.668 323.64 351.668 340.634V345.517C351.668 362.51 345.585 375.224 323.835 370.996L320.517 370.351C298.766 366.123 292.683 351.045 292.683 334.051ZM309.273 334.835C309.273 344.411 309.273 353.143 322.176 355.651C335.079 358.159 335.079 349.427 335.079 339.851C335.079 330.368 335.079 321.636 322.176 319.128C309.273 316.62 309.273 325.352 309.273 334.835ZM359.016 346.945V342.063C359.016 325.069 365.099 312.356 386.85 316.583L390.167 317.228C411.918 321.456 418.001 336.534 418.001 353.528V358.41C418.001 375.404 411.918 388.117 390.167 383.89L386.85 383.245C365.099 379.017 359.016 363.939 359.016 346.945ZM375.606 347.728C375.606 357.305 375.606 366.037 388.508 368.545C401.411 371.053 401.411 362.321 401.411 352.745C401.411 343.262 401.411 334.53 388.508 332.022C375.606 329.514 375.606 338.246 375.606 347.728ZM425.349 359.839V354.956C425.349 337.963 431.432 325.249 453.182 329.477L456.5 330.122C478.251 334.35 484.334 349.428 484.334 366.422V371.304C484.334 388.298 478.251 401.011 456.5 396.783L453.182 396.138C431.432 391.91 425.349 376.833 425.349 359.839ZM441.938 360.622C441.938 370.199 441.938 378.931 454.841 381.439C467.744 383.947 467.744 375.215 467.744 365.638C467.744 356.156 467.744 347.424 454.841 344.916C441.938 342.408 441.938 351.139 441.938 360.622ZM543.917 419.409V411.898C534.701 410.012 525.853 407.166 517.466 403.752V387.978C526.037 391.616 535.438 394.852 543.917 396.782V387.862C533.687 385.31 517.742 379.958 517.742 364.56V363.339C517.742 353.669 523.733 346.195 543.917 349.086V341.481L552.212 343.093V350.604C560.23 352.257 568.064 354.906 575.345 358.199V372.752C567.603 369.933 559.953 367.507 552.212 365.814V374.64C562.073 377.026 578.755 382.522 578.755 398.108V399.328C578.755 408.999 572.672 416.548 552.212 413.51V421.021L543.917 419.409ZM562.165 395.916C562.165 392.818 559.4 391.435 552.212 389.756V398.394C561.336 399.698 562.165 397.7 562.165 395.916ZM534.332 366.564C534.332 369.662 537.097 371.139 543.917 372.84V364.202C534.977 363.028 534.332 365.062 534.332 366.564ZM148.887 523.112L173.864 480.083L137.828 473.079V458.056L193.218 468.823V481.968L166.214 526.48L148.887 523.112ZM202.409 504.504V499.621C202.409 482.628 208.492 469.914 230.243 474.142L233.561 474.787C255.311 479.015 261.394 494.093 261.394 511.087V515.969C261.394 532.963 255.311 545.676 233.561 541.448L230.243 540.803C208.492 536.575 202.409 521.498 202.409 504.504ZM218.999 505.287C218.999 514.864 218.999 523.596 231.902 526.104C244.805 528.612 244.805 519.88 244.805 510.303C244.805 500.821 244.805 492.089 231.902 489.581C218.999 487.073 218.999 495.804 218.999 505.287ZM292.683 522.051V517.169C292.683 500.175 298.766 487.462 320.517 491.69L323.835 492.335C345.585 496.563 351.668 511.64 351.668 528.634V533.517C351.668 550.51 345.585 563.224 323.835 558.996L320.517 558.351C298.766 554.123 292.683 539.045 292.683 522.051ZM309.273 522.835C309.273 532.411 309.273 541.143 322.176 543.651C335.079 546.159 335.079 537.427 335.079 527.851C335.079 518.368 335.079 509.636 322.176 507.128C309.273 504.62 309.273 513.352 309.273 522.835ZM359.016 534.945V530.063C359.016 513.069 365.099 500.356 386.85 504.583L390.167 505.228C411.918 509.456 418.001 524.534 418.001 541.528V546.41C418.001 563.404 411.918 576.117 390.167 571.89L386.85 571.245C365.099 567.017 359.016 551.939 359.016 534.945ZM375.606 535.728C375.606 545.305 375.606 554.037 388.508 556.545C401.411 559.053 401.411 550.321 401.411 540.745C401.411 531.262 401.411 522.53 388.508 520.022C375.606 517.514 375.606 526.246 375.606 535.728ZM425.349 547.839V542.956C425.349 525.963 431.432 513.249 453.182 517.477L456.5 518.122C478.251 522.35 484.334 537.428 484.334 554.422V559.304C484.334 576.298 478.251 589.011 456.5 584.783L453.182 584.138C431.432 579.91 425.349 564.833 425.349 547.839ZM441.938 548.622C441.938 558.199 441.938 566.931 454.841 569.439C467.744 571.947 467.744 563.215 467.744 553.638C467.744 544.156 467.744 535.424 454.841 532.916C441.938 530.408 441.938 539.139 441.938 548.622ZM543.917 607.409V599.898C534.701 598.012 525.853 595.166 517.466 591.752V575.978C526.037 579.616 535.438 582.852 543.917 584.782V575.862C533.687 573.31 517.742 567.958 517.742 552.56V551.339C517.742 541.669 523.733 534.195 543.917 537.086V529.481L552.212 531.093V538.604C560.23 540.257 568.064 542.906 575.345 546.199V560.752C567.603 557.933 559.953 555.507 552.212 553.814V562.64C562.073 565.026 578.755 570.522 578.755 586.108V587.328C578.755 596.999 572.672 604.548 552.212 601.51V609.021L543.917 607.409ZM562.165 583.916C562.165 580.818 559.4 579.435 552.212 577.756V586.394C561.336 587.698 562.165 585.7 562.165 583.916ZM534.332 554.564C534.332 557.662 537.097 559.139 543.917 560.84V552.202C534.977 551.028 534.332 553.062 534.332 554.564ZM194.14 702.069V703.947C194.14 713.805 188.426 720.675 167.781 716.662L163.357 715.802C142.712 711.789 136.998 702.698 136.998 692.84V690.962C136.998 685.422 138.749 682.007 143.634 680.046C140.685 676.374 138.842 671.228 138.842 664.092V662.215C138.842 652.45 144.187 645.415 163.357 649.141L167.781 650.001C186.951 653.727 192.297 662.841 192.297 672.605V674.483C192.297 679.741 190.73 683.192 187.596 685.399C191.375 689.138 194.14 694.464 194.14 702.069ZM151.744 693.077C151.744 695.988 152.482 698.666 165.293 701.156L165.846 701.264C178.472 703.718 179.394 701.362 179.394 698.639C179.394 693.381 175.799 693.34 164.463 690.667C161.145 689.928 157.551 689.042 154.141 687.628C152.297 688.584 151.744 690.354 151.744 693.077ZM177.55 672.555C177.55 669.457 177.09 666.833 165.661 664.611C154.233 662.39 153.588 664.799 153.588 667.616C153.588 672.968 155.984 673.621 167.781 676.29C170.085 676.832 172.942 677.481 175.799 678.506C177.09 677.348 177.55 675.56 177.55 672.555ZM202.409 692.504V687.621C202.409 670.628 208.492 657.914 230.243 662.142L233.561 662.787C255.311 667.015 261.394 682.093 261.394 699.087V703.969C261.394 720.963 255.311 733.676 233.561 729.448L230.243 728.803C208.492 724.575 202.409 709.498 202.409 692.504ZM218.999 693.287C218.999 702.864 218.999 711.596 231.902 714.104C244.805 716.612 244.805 707.88 244.805 698.303C244.805 688.821 244.805 680.089 231.902 677.581C218.999 675.073 218.999 683.804 218.999 693.287ZM292.683 710.051V705.169C292.683 688.175 298.766 675.462 320.517 679.69L323.835 680.335C345.585 684.563 351.668 699.64 351.668 716.634V721.517C351.668 738.51 345.585 751.224 323.835 746.996L320.517 746.351C298.766 742.123 292.683 727.045 292.683 710.051ZM309.273 710.835C309.273 720.411 309.273 729.143 322.176 731.651C335.079 734.159 335.079 725.427 335.079 715.851C335.079 706.368 335.079 697.636 322.176 695.128C309.273 692.62 309.273 701.352 309.273 710.835ZM359.016 722.945V718.063C359.016 701.069 365.099 688.356 386.85 692.583L390.167 693.228C411.918 697.456 418.001 712.534 418.001 729.528V734.41C418.001 751.404 411.918 764.117 390.167 759.89L386.85 759.245C365.099 755.017 359.016 739.939 359.016 722.945ZM375.606 723.728C375.606 733.305 375.606 742.037 388.508 744.545C401.411 747.053 401.411 738.321 401.411 728.745C401.411 719.262 401.411 710.53 388.508 708.022C375.606 705.514 375.606 714.246 375.606 723.728ZM425.349 735.839V730.956C425.349 713.963 431.432 701.249 453.182 705.477L456.5 706.122C478.251 710.35 484.334 725.428 484.334 742.422V747.304C484.334 764.298 478.251 777.011 456.5 772.783L453.182 772.138C431.432 767.91 425.349 752.833 425.349 735.839ZM441.938 736.622C441.938 746.199 441.938 754.931 454.841 757.439C467.744 759.947 467.744 751.215 467.744 741.638C467.744 732.156 467.744 723.424 454.841 720.916C441.938 718.408 441.938 727.139 441.938 736.622ZM543.917 795.409V787.898C534.701 786.012 525.853 783.166 517.466 779.752V763.978C526.037 767.616 535.438 770.852 543.917 772.782V763.862C533.687 761.31 517.742 755.958 517.742 740.56V739.339C517.742 729.669 523.733 722.195 543.917 725.086V717.481L552.212 719.093V726.604C560.23 728.257 568.064 730.906 575.345 734.199V748.752C567.603 745.933 559.953 743.507 552.212 741.814V750.64C562.073 753.026 578.755 758.522 578.755 774.108V775.328C578.755 784.999 572.672 792.548 552.212 789.51V797.021L543.917 795.409ZM562.165 771.916C562.165 768.818 559.4 767.435 552.212 765.756V774.394C561.336 775.698 562.165 773.7 562.165 771.916ZM534.332 742.564C534.332 745.662 537.097 747.139 543.917 748.84V740.202C534.977 739.028 534.332 741.062 534.332 742.564ZM165.2 904.16L162.896 903.713C156.261 902.423 147.689 899.63 141.975 896.548V880.868C147.966 884.568 156.998 887.638 162.896 888.784C174.417 891.024 176.629 886.383 177.09 878.68C173.403 879.56 169.256 879.223 163.91 878.184C139.579 873.454 137.183 862.661 137.183 852.803V851.582C137.183 840.879 141.699 832.931 164.555 837.374L167.965 838.037C188.149 841.96 193.863 856.779 193.863 873.585V878.467C193.863 895.649 187.596 908.514 165.2 904.16ZM164.094 852.307C154.325 850.408 153.772 853.962 153.772 856.309C153.772 859.126 154.602 862.01 166.675 864.356C170.73 865.145 174.048 865.508 177.09 865.536C176.537 858.574 174.14 854.259 164.094 852.307ZM202.409 880.504V875.621C202.409 858.628 208.492 845.914 230.243 850.142L233.561 850.787C255.311 855.015 261.394 870.093 261.394 887.087V891.969C261.394 908.963 255.311 921.676 233.561 917.448L230.243 916.803C208.492 912.575 202.409 897.498 202.409 880.504ZM218.999 881.287C218.999 890.864 218.999 899.596 231.902 902.104C244.805 904.612 244.805 895.88 244.805 886.303C244.805 876.821 244.805 868.089 231.902 865.581C218.999 863.073 218.999 871.804 218.999 881.287ZM292.683 898.051V893.169C292.683 876.175 298.766 863.462 320.517 867.69L323.835 868.335C345.585 872.563 351.668 887.64 351.668 904.634V909.517C351.668 926.51 345.585 939.224 323.835 934.996L320.517 934.351C298.766 930.123 292.683 915.045 292.683 898.051ZM309.273 898.835C309.273 908.411 309.273 917.143 322.176 919.651C335.079 922.159 335.079 913.427 335.079 903.851C335.079 894.368 335.079 885.636 322.176 883.128C309.273 880.62 309.273 889.352 309.273 898.835ZM359.016 910.945V906.063C359.016 889.069 365.099 876.356 386.85 880.583L390.167 881.228C411.918 885.456 418.001 900.534 418.001 917.528V922.41C418.001 939.404 411.918 952.117 390.167 947.89L386.85 947.245C365.099 943.017 359.016 927.939 359.016 910.945ZM375.606 911.728C375.606 921.305 375.606 930.037 388.508 932.545C401.411 935.053 401.411 926.321 401.411 916.745C401.411 907.262 401.411 898.53 388.508 896.022C375.606 893.514 375.606 902.246 375.606 911.728ZM425.349 923.839V918.956C425.349 901.963 431.432 889.249 453.182 893.477L456.5 894.122C478.251 898.35 484.334 913.428 484.334 930.422V935.304C484.334 952.298 478.251 965.011 456.5 960.783L453.182 960.138C431.432 955.91 425.349 940.833 425.349 923.839ZM441.938 924.622C441.938 934.199 441.938 942.931 454.841 945.439C467.744 947.947 467.744 939.215 467.744 929.638C467.744 920.156 467.744 911.424 454.841 908.916C441.938 906.408 441.938 915.139 441.938 924.622ZM543.917 983.409V975.898C534.701 974.012 525.853 971.166 517.466 967.752V951.978C526.037 955.616 535.438 958.852 543.917 960.782V951.862C533.687 949.31 517.742 943.958 517.742 928.56V927.339C517.742 917.669 523.733 910.195 543.917 913.086V905.481L552.212 907.093V914.604C560.23 916.257 568.064 918.906 575.345 922.199V936.752C567.603 933.933 559.953 931.507 552.212 929.814V938.64C562.073 941.026 578.755 946.522 578.755 962.108V963.328C578.755 972.999 572.672 980.548 552.212 977.51V985.021L543.917 983.409ZM562.165 959.916C562.165 956.818 559.4 955.435 552.212 953.756V962.394C561.336 963.698 562.165 961.7 562.165 959.916ZM534.332 930.564C534.332 933.662 537.097 935.139 543.917 936.84V928.202C534.977 927.028 534.332 929.062 534.332 930.564ZM126.978 1082.85L73.4304 1072.44V1057.42L94.6281 1061.54V1035.44L75.2737 1043.23V1027.27L107.531 1014.29L111.218 1015.01V1064.77L126.978 1067.83V1082.85ZM136.077 1055.61V1050.73C136.077 1033.73 142.159 1021.02 163.91 1025.25L167.228 1025.89C188.979 1030.12 195.062 1045.2 195.062 1062.19V1067.08C195.062 1084.07 188.979 1096.78 167.228 1092.55L163.91 1091.91C142.159 1087.68 136.077 1072.6 136.077 1055.61ZM152.666 1056.39C152.666 1065.97 152.666 1074.7 165.569 1077.21C178.472 1079.72 178.472 1070.99 178.472 1061.41C178.472 1051.93 178.472 1043.2 165.569 1040.69C152.666 1038.18 152.666 1046.91 152.666 1056.39ZM202.409 1068.5V1063.62C202.409 1046.63 208.492 1033.91 230.243 1038.14L233.561 1038.79C255.312 1043.02 261.394 1058.09 261.394 1075.09V1079.97C261.394 1096.96 255.312 1109.68 233.561 1105.45L230.243 1104.8C208.492 1100.58 202.409 1085.5 202.409 1068.5ZM218.999 1069.29C218.999 1078.86 218.999 1087.6 231.902 1090.1C244.805 1092.61 244.805 1083.88 244.805 1074.3C244.805 1064.82 244.805 1056.09 231.902 1053.58C218.999 1051.07 218.999 1059.8 218.999 1069.29ZM292.683 1086.05V1081.17C292.683 1064.17 298.766 1051.46 320.517 1055.69L323.835 1056.33C345.585 1060.56 351.668 1075.64 351.668 1092.63V1097.52C351.668 1114.51 345.585 1127.22 323.835 1123L320.517 1122.35C298.766 1118.12 292.683 1103.04 292.683 1086.05ZM309.273 1086.83C309.273 1096.41 309.273 1105.14 322.176 1107.65C335.079 1110.16 335.079 1101.43 335.079 1091.85C335.079 1082.37 335.079 1073.64 322.176 1071.13C309.273 1068.62 309.273 1077.35 309.273 1086.83ZM359.016 1098.94V1094.06C359.016 1077.07 365.099 1064.36 386.85 1068.58L390.167 1069.23C411.918 1073.46 418.001 1088.53 418.001 1105.53V1110.41C418.001 1127.4 411.918 1140.12 390.167 1135.89L386.85 1135.24C365.099 1131.02 359.016 1115.94 359.016 1098.94ZM375.606 1099.73C375.606 1109.31 375.606 1118.04 388.508 1120.54C401.411 1123.05 401.411 1114.32 401.411 1104.74C401.411 1095.26 401.411 1086.53 388.508 1084.02C375.606 1081.51 375.606 1090.25 375.606 1099.73ZM425.349 1111.84V1106.96C425.349 1089.96 431.432 1077.25 453.182 1081.48L456.5 1082.12C478.251 1086.35 484.334 1101.43 484.334 1118.42V1123.3C484.334 1140.3 478.251 1153.01 456.5 1148.78L453.182 1148.14C431.432 1143.91 425.349 1128.83 425.349 1111.84ZM441.938 1112.62C441.938 1122.2 441.938 1130.93 454.841 1133.44C467.744 1135.95 467.744 1127.22 467.744 1117.64C467.744 1108.16 467.744 1099.42 454.841 1096.92C441.938 1094.41 441.938 1103.14 441.938 1112.62ZM543.917 1171.41V1163.9C534.701 1162.01 525.853 1159.17 517.466 1155.75V1139.98C526.037 1143.62 535.438 1146.85 543.917 1148.78V1139.86C533.687 1137.31 517.742 1131.96 517.742 1116.56V1115.34C517.742 1105.67 523.733 1098.2 543.917 1101.09V1093.48L552.212 1095.09V1102.6C560.23 1104.26 568.064 1106.91 575.345 1110.2V1124.75C567.603 1121.93 559.953 1119.51 552.212 1117.81V1126.64C562.073 1129.03 578.755 1134.52 578.755 1150.11V1151.33C578.755 1161 572.672 1168.55 552.212 1165.51V1173.02L543.917 1171.41ZM562.165 1147.92C562.165 1144.82 559.401 1143.44 552.212 1141.76V1150.39C561.336 1151.7 562.165 1149.7 562.165 1147.92ZM534.332 1118.56C534.332 1121.66 537.097 1123.14 543.917 1124.84V1116.2C534.977 1115.03 534.332 1117.06 534.332 1118.56Z",
                fill: "#FEF7FF"
              }
            ) }),
            /* @__PURE__ */ jsxs("defs", { children: [
              /* @__PURE__ */ jsx("clipPath", { id: "clip0_2087_687", children: /* @__PURE__ */ jsx(
                "rect",
                {
                  width: "802",
                  height: "255.182",
                  fill: "white",
                  transform: "translate(-14)"
                }
              ) }),
              /* @__PURE__ */ jsx("clipPath", { id: "clip1_2087_687", children: /* @__PURE__ */ jsx(
                "rect",
                {
                  width: "660",
                  height: "210",
                  fill: "white",
                  transform: "translate(5 55)"
                }
              ) })
            ] })
          ]
        }
      ) }),
      /* @__PURE__ */ jsxs("header", { children: [
        /* @__PURE__ */ jsx("h2", { children: "Гарантированные выплаты" }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("p", { children: "Наша прозрачность - ваша уверенность!" }),
          /* @__PURE__ */ jsx("p", { children: "Мы с гордостью объявляем, что уже выплатили более 100 000$ нашим преданным партнерам." }),
          /* @__PURE__ */ jsx("p", { children: "Это доказательство нашей надежности и того, что мы ценим каждого нашего участника." }),
          /* @__PURE__ */ jsx("p", { children: "Присоединяйтесь к нашей успешной команде и станьте частью нашего процветающего сообщества. Ваши финансовые цели - наш приоритет!" })
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "section border-t-[6px] border-t-violet-quaternary", children: /* @__PURE__ */ jsxs("div", { className: "container", children: [
      /* @__PURE__ */ jsxs("div", { className: "order-2", children: [
        /* @__PURE__ */ jsxs("header", { children: [
          /* @__PURE__ */ jsx("h2", { children: "Гарантированные выплаты" }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("p", { children: "Присоединяйтесь к нам сегодня и начните зарабатывать вместе с нами!" }),
            /* @__PURE__ */ jsx("p", { children: "Уникальные возможности, быстрые выплаты и надежная поддержка - это то, что мы предлагаем нашим партнерам. Ваш успех начинается здесь!" })
          ] })
        ] }),
        /* @__PURE__ */ jsx("a", { href: "#header", className: "scroll-smooth", children: "Регистрация" })
      ] }),
      /* @__PURE__ */ jsx("figure", { children: /* @__PURE__ */ jsxs(
        "svg",
        {
          width: "338",
          height: "284",
          viewBox: "0 0 338 284",
          fill: "none",
          xmlns: "http://www.w3.org/2000/svg",
          children: [
            /* @__PURE__ */ jsx(
              "path",
              {
                d: "M180.418 239.027C180.418 239.027 214.446 232.722 214.446 212.182C214.446 191.643 180.418 136.328 100.296 154.809C20.173 173.291 0.142425 239.531 0.142425 260.071C0.142425 280.611 29.2661 285.608 37.0075 283.106C98.1162 263.358 180.418 239.027 180.418 239.027Z",
                fill: "#793AFF"
              }
            ),
            /* @__PURE__ */ jsx(
              "path",
              {
                d: "M100.296 142.818C67.7912 142.818 40.2037 120.543 40.2037 86.5116C40.2037 52.4802 67.1077 18.6863 100.296 11.0309C133.483 3.37545 173.33 24.1833 173.33 58.2148C173.33 92.2462 133.483 135.163 100.296 142.818Z",
                fill: "#793AFF"
              }
            ),
            /* @__PURE__ */ jsx(
              "path",
              {
                d: "M216.145 230.785C218.966 224.3 220.479 217.033 220.479 209.246C220.479 181.405 205.594 159.354 180.418 145.226C191.432 139.073 205.554 130.529 220.479 127.087C300.602 108.605 335.524 165.119 335.524 185.659C335.524 206.198 300.602 211.304 300.602 211.304L232.98 237.902L216.145 230.785Z",
                fill: "#793AFF"
              }
            ),
            /* @__PURE__ */ jsx(
              "path",
              {
                d: "M235.489 112.64C216.145 117.102 180.418 92.7979 180.418 64.4384C180.418 36.0788 202.838 7.91725 230.495 1.53774C258.151 -4.84177 297.215 15.623 297.215 43.9825C297.215 72.3421 263.145 106.261 235.489 112.64Z",
                fill: "#793AFF"
              }
            ),
            /* @__PURE__ */ jsx(
              "path",
              {
                d: "M197.252 246.143C197.252 246.143 217.283 241.522 217.283 220.983C217.283 200.443 197.252 143.444 117.13 161.926C37.0075 180.407 16.9769 246.647 16.9769 267.187C16.9769 287.727 37.0075 283.106 37.0075 283.106L197.252 246.143Z",
                fill: "#BC9CFF"
              }
            ),
            /* @__PURE__ */ jsx(
              "path",
              {
                d: "M117.13 141.386C83.9422 149.041 57.0382 127.659 57.0382 93.6278C57.0382 59.5963 83.9422 25.8024 117.13 18.147C150.318 10.4916 177.222 31.8736 177.222 65.9051C177.222 99.9365 150.318 133.73 117.13 141.386Z",
                fill: "#BC9CFF"
              }
            ),
            /* @__PURE__ */ jsx(
              "path",
              {
                d: "M232.98 237.902C235.8 231.416 237.314 224.15 237.314 216.362C237.314 188.521 223.712 163.027 198.536 148.898C209.549 142.745 222.389 137.646 237.314 134.203C317.436 115.721 337.467 172.72 337.467 193.26C337.467 213.8 317.436 218.42 317.436 218.42L232.98 237.902Z",
                fill: "#BC9CFF"
              }
            ),
            /* @__PURE__ */ jsx(
              "path",
              {
                d: "M247.329 111.353C219.673 117.732 197.252 99.9141 197.252 71.5545C197.252 43.195 219.673 15.0334 247.329 8.65389C274.986 2.27438 297.406 20.0927 297.406 48.4523C297.406 76.8118 274.986 104.973 247.329 111.353Z",
                fill: "#BC9CFF"
              }
            )
          ]
        }
      ) })
    ] }) }),
    /* @__PURE__ */ jsxs("footer", { className: "hidden bg-black sm:block", children: [
      /* @__PURE__ */ jsxs("nav", { className: "container grid grid-cols-4 gap-x-4 py-6 lg:grid-cols-5 lg:gap-x-8 xl:gap-x-16", children: [
        /* @__PURE__ */ jsxs(
          "svg",
          {
            width: "335",
            height: "188",
            viewBox: "0 0 335 188",
            fill: "none",
            xmlns: "http://www.w3.org/2000/svg",
            className: "col-span-4 max-w-80 justify-self-center pb-6 lg:col-span-1 lg:max-w-full",
            children: [
              /* @__PURE__ */ jsx(
                "path",
                {
                  d: "M131.885 64.2739V134.42L77.4331 134.42C132.787 109.04 120.59 47.94 88.6915 30.0799H144.999L191.746 90.6097V30.0799H224.496V134.42H183.864L131.885 64.2739Z",
                  fill: "#1F0060"
                }
              ),
              /* @__PURE__ */ jsx(
                "path",
                {
                  d: "M131.885 64.2739V134.42L77.4331 134.42C132.787 109.04 120.59 47.94 88.6915 30.0799H144.999L191.746 90.6097V30.0799H224.496V134.42H183.864L131.885 64.2739Z",
                  fill: "url(#paint0_linear_245_3732)"
                }
              ),
              /* @__PURE__ */ jsx(
                "path",
                {
                  d: "M334.5 134.42H236.386V30.0799H334.5V54.929H269.136V70.9287H334.432V90.8221H269.136V106.963H334.5V134.42Z",
                  fill: "#1F0060"
                }
              ),
              /* @__PURE__ */ jsx(
                "path",
                {
                  d: "M334.5 134.42H236.386V30.0799H334.5V54.929H269.136V70.9287H334.432V90.8221H269.136V106.963H334.5V134.42Z",
                  fill: "url(#paint1_linear_245_3732)"
                }
              ),
              /* @__PURE__ */ jsx(
                "path",
                {
                  d: "M45.365 43.1348L45.3577 43.1372V23.4447C32.4336 26.042 21.1878 32.97 12.898 43.3482C4.00675 54.4795 -0.370445 68.5776 0.643853 82.8165C1.65815 97.0554 7.98896 110.383 18.3673 120.127C28.7456 129.871 42.4044 135.313 56.6057 135.36C70.807 135.407 84.5014 130.057 94.9436 120.382C105.386 110.707 111.804 97.4219 112.912 83.1901C114.02 68.9583 109.736 54.8314 100.918 43.6411C94.7947 35.8698 86.7986 29.9136 77.7831 26.2713L66.4672 0V42.6215L66.4599 42.6195V52.9079C77.01 56.8396 84.5259 67.0204 84.5259 78.96C84.5259 94.3064 72.109 106.747 56.792 106.747C41.475 106.747 29.0582 94.3064 29.0582 78.96C29.0582 69.7559 33.5246 61.597 40.4044 56.5404L45.3577 69.0071V53.637L45.365 53.6337V43.1348Z",
                  fill: "#1F0060"
                }
              ),
              /* @__PURE__ */ jsx(
                "path",
                {
                  d: "M45.365 43.1348L45.3577 43.1372V23.4447C32.4336 26.042 21.1878 32.97 12.898 43.3482C4.00675 54.4795 -0.370445 68.5776 0.643853 82.8165C1.65815 97.0554 7.98896 110.383 18.3673 120.127C28.7456 129.871 42.4044 135.313 56.6057 135.36C70.807 135.407 84.5014 130.057 94.9436 120.382C105.386 110.707 111.804 97.4219 112.912 83.1901C114.02 68.9583 109.736 54.8314 100.918 43.6411C94.7947 35.8698 86.7986 29.9136 77.7831 26.2713L66.4672 0V42.6215L66.4599 42.6195V52.9079C77.01 56.8396 84.5259 67.0204 84.5259 78.96C84.5259 94.3064 72.109 106.747 56.792 106.747C41.475 106.747 29.0582 94.3064 29.0582 78.96C29.0582 69.7559 33.5246 61.597 40.4044 56.5404L45.3577 69.0071V53.637L45.365 53.6337V43.1348Z",
                  fill: "url(#paint2_linear_245_3732)"
                }
              ),
              /* @__PURE__ */ jsx(
                "path",
                {
                  d: "M55.6872 144.883C63.5705 144.883 69.902 151.148 69.902 158.948V173.873C69.902 181.674 63.5705 188 55.6872 188H18.4674C10.5841 188 4.25264 181.674 4.25264 173.873V158.948C4.25264 151.148 10.5841 144.883 18.4674 144.883H55.6872ZM59.1012 173.873V158.948C59.1012 157.044 57.6115 155.57 55.6872 155.57H18.4674C16.5432 155.57 15.0534 157.044 15.0534 158.948V173.873C15.0534 175.777 16.5432 177.251 18.4674 177.251H55.6872C57.6115 177.251 59.1012 175.777 59.1012 173.873Z",
                  fill: "#1F0060"
                }
              ),
              /* @__PURE__ */ jsx(
                "path",
                {
                  d: "M55.6872 144.883C63.5705 144.883 69.902 151.148 69.902 158.948V173.873C69.902 181.674 63.5705 188 55.6872 188H18.4674C10.5841 188 4.25264 181.674 4.25264 173.873V158.948C4.25264 151.148 10.5841 144.883 18.4674 144.883H55.6872ZM59.1012 173.873V158.948C59.1012 157.044 57.6115 155.57 55.6872 155.57H18.4674C16.5432 155.57 15.0534 157.044 15.0534 158.948V173.873C15.0534 175.777 16.5432 177.251 18.4674 177.251H55.6872C57.6115 177.251 59.1012 175.777 59.1012 173.873Z",
                  fill: "url(#paint3_linear_245_3732)"
                }
              ),
              /* @__PURE__ */ jsx(
                "path",
                {
                  d: "M109.965 144.821C117.476 144.821 123.559 150.841 123.559 158.211C123.559 165.643 117.476 171.662 109.965 171.662L85.8454 171.724V187.939H75.0446V144.883L109.965 144.821ZM109.965 160.975C111.517 160.975 112.696 159.747 112.696 158.211C112.696 156.737 111.517 155.509 109.965 155.509L85.8454 155.57V160.975H109.965Z",
                  fill: "#1F0060"
                }
              ),
              /* @__PURE__ */ jsx(
                "path",
                {
                  d: "M109.965 144.821C117.476 144.821 123.559 150.841 123.559 158.211C123.559 165.643 117.476 171.662 109.965 171.662L85.8454 171.724V187.939H75.0446V144.883L109.965 144.821ZM109.965 160.975C111.517 160.975 112.696 159.747 112.696 158.211C112.696 156.737 111.517 155.509 109.965 155.509L85.8454 155.57V160.975H109.965Z",
                  fill: "url(#paint4_linear_245_3732)"
                }
              ),
              /* @__PURE__ */ jsx(
                "path",
                {
                  d: "M181.803 144.883V155.57H159.022V187.939H148.221V155.57H125.502V144.883H181.803Z",
                  fill: "#1F0060"
                }
              ),
              /* @__PURE__ */ jsx(
                "path",
                {
                  d: "M181.803 144.883V155.57H159.022V187.939H148.221V155.57H125.502V144.883H181.803Z",
                  fill: "url(#paint5_linear_245_3732)"
                }
              ),
              /* @__PURE__ */ jsx(
                "path",
                {
                  d: "M197.053 187.939H186.253V144.76H197.053V187.939Z",
                  fill: "#1F0060"
                }
              ),
              /* @__PURE__ */ jsx(
                "path",
                {
                  d: "M197.053 187.939H186.253V144.76H197.053V187.939Z",
                  fill: "url(#paint6_linear_245_3732)"
                }
              ),
              /* @__PURE__ */ jsx(
                "path",
                {
                  d: "M245.838 144.883C253.721 144.883 260.053 151.148 260.053 158.948V173.873C260.053 181.674 253.721 188 245.838 188H217.781C209.898 188 203.566 181.674 203.566 173.873V158.948C203.566 151.148 209.898 144.883 217.781 144.883H245.838ZM249.252 173.873V158.948C249.252 157.044 247.762 155.57 245.838 155.57H217.781C215.857 155.57 214.367 157.044 214.367 158.948V173.873C214.367 175.777 215.857 177.251 217.781 177.251H245.838C247.762 177.251 249.252 175.777 249.252 173.873Z",
                  fill: "#1F0060"
                }
              ),
              /* @__PURE__ */ jsx(
                "path",
                {
                  d: "M245.838 144.883C253.721 144.883 260.053 151.148 260.053 158.948V173.873C260.053 181.674 253.721 188 245.838 188H217.781C209.898 188 203.566 181.674 203.566 173.873V158.948C203.566 151.148 209.898 144.883 217.781 144.883H245.838ZM249.252 173.873V158.948C249.252 157.044 247.762 155.57 245.838 155.57H217.781C215.857 155.57 214.367 157.044 214.367 158.948V173.873C214.367 175.777 215.857 177.251 217.781 177.251H245.838C247.762 177.251 249.252 175.777 249.252 173.873Z",
                  fill: "url(#paint7_linear_245_3732)"
                }
              ),
              /* @__PURE__ */ jsx(
                "path",
                {
                  d: "M334.375 187.877L334.499 187.939H318.857L277.373 159.501V187.939H266.572V144.76H277.435L323.574 177.62V144.76H334.375V187.877Z",
                  fill: "#1F0060"
                }
              ),
              /* @__PURE__ */ jsx(
                "path",
                {
                  d: "M334.375 187.877L334.499 187.939H318.857L277.373 159.501V187.939H266.572V144.76H277.435L323.574 177.62V144.76H334.375V187.877Z",
                  fill: "url(#paint8_linear_245_3732)"
                }
              ),
              /* @__PURE__ */ jsx(
                "path",
                {
                  d: "M40.2423 81.9458L35.1213 86.4047L39.6274 94.0751L46.1612 92.0447C46.9873 92.6463 47.7954 93.1547 48.5855 93.5698C49.3756 93.9849 50.2197 94.379 51.1179 94.752L52.4697 101.52H61.4819L62.8338 94.752C63.735 94.376 64.5806 93.9819 65.3707 93.5698C66.1608 93.1577 66.9673 92.6494 67.7905 92.0447L74.3243 94.0751L78.8304 86.4047L73.6484 81.8927C73.7986 80.9151 73.8737 79.9375 73.8737 78.9599C73.8737 77.9823 73.7986 77.0047 73.6484 76.0271L78.8304 71.5152L74.3243 63.8447L67.7905 65.8751C66.9643 65.2735 66.1577 64.7652 65.3707 64.3501C64.5836 63.935 63.738 63.5409 62.8338 63.1679L61.4819 56.3999H52.6714V71.0177C53.9619 70.2984 55.3968 69.9379 56.9758 69.9359C59.4542 69.9359 61.5766 70.8203 63.3429 72.589C65.1093 74.3577 65.991 76.4813 65.988 78.9599C65.988 81.4415 65.1063 83.5667 63.3429 85.3354C61.5796 87.1041 59.4572 87.987 56.9758 87.984C54.4975 87.984 52.3766 87.1011 50.6132 85.3354C49.6027 84.3236 48.8813 83.1937 48.4488 81.9458H40.2423Z",
                  fill: "black"
                }
              ),
              /* @__PURE__ */ jsx(
                "path",
                {
                  d: "M40.2423 81.9458L35.1213 86.4047L39.6274 94.0751L46.1612 92.0447C46.9873 92.6463 47.7954 93.1547 48.5855 93.5698C49.3756 93.9849 50.2197 94.379 51.1179 94.752L52.4697 101.52H61.4819L62.8338 94.752C63.735 94.376 64.5806 93.9819 65.3707 93.5698C66.1608 93.1577 66.9673 92.6494 67.7905 92.0447L74.3243 94.0751L78.8304 86.4047L73.6484 81.8927C73.7986 80.9151 73.8737 79.9375 73.8737 78.9599C73.8737 77.9823 73.7986 77.0047 73.6484 76.0271L78.8304 71.5152L74.3243 63.8447L67.7905 65.8751C66.9643 65.2735 66.1577 64.7652 65.3707 64.3501C64.5836 63.935 63.738 63.5409 62.8338 63.1679L61.4819 56.3999H52.6714V71.0177C53.9619 70.2984 55.3968 69.9379 56.9758 69.9359C59.4542 69.9359 61.5766 70.8203 63.3429 72.589C65.1093 74.3577 65.991 76.4813 65.988 78.9599C65.988 81.4415 65.1063 83.5667 63.3429 85.3354C61.5796 87.1041 59.4572 87.987 56.9758 87.984C54.4975 87.984 52.3766 87.1011 50.6132 85.3354C49.6027 84.3236 48.8813 83.1937 48.4488 81.9458H40.2423Z",
                  fill: "url(#paint9_linear_245_3732)"
                }
              ),
              /* @__PURE__ */ jsxs("defs", { children: [
                /* @__PURE__ */ jsxs(
                  "linearGradient",
                  {
                    id: "paint0_linear_245_3732",
                    x1: "221.746",
                    y1: "-62.9527",
                    x2: "221.746",
                    y2: "253.168",
                    gradientUnits: "userSpaceOnUse",
                    children: [
                      /* @__PURE__ */ jsx("stop", { stopColor: "#652CDE" }),
                      /* @__PURE__ */ jsx(
                        "stop",
                        {
                          offset: "1",
                          stopColor: "#1E005E"
                        }
                      )
                    ]
                  }
                ),
                /* @__PURE__ */ jsxs(
                  "linearGradient",
                  {
                    id: "paint1_linear_245_3732",
                    x1: "221.746",
                    y1: "-62.9527",
                    x2: "221.746",
                    y2: "253.168",
                    gradientUnits: "userSpaceOnUse",
                    children: [
                      /* @__PURE__ */ jsx("stop", { stopColor: "#652CDE" }),
                      /* @__PURE__ */ jsx(
                        "stop",
                        {
                          offset: "1",
                          stopColor: "#1E005E"
                        }
                      )
                    ]
                  }
                ),
                /* @__PURE__ */ jsxs(
                  "linearGradient",
                  {
                    id: "paint2_linear_245_3732",
                    x1: "221.746",
                    y1: "-62.9527",
                    x2: "221.746",
                    y2: "253.168",
                    gradientUnits: "userSpaceOnUse",
                    children: [
                      /* @__PURE__ */ jsx("stop", { stopColor: "#652CDE" }),
                      /* @__PURE__ */ jsx(
                        "stop",
                        {
                          offset: "1",
                          stopColor: "#1E005E"
                        }
                      )
                    ]
                  }
                ),
                /* @__PURE__ */ jsxs(
                  "linearGradient",
                  {
                    id: "paint3_linear_245_3732",
                    x1: "221.746",
                    y1: "-62.9527",
                    x2: "221.746",
                    y2: "253.168",
                    gradientUnits: "userSpaceOnUse",
                    children: [
                      /* @__PURE__ */ jsx("stop", { stopColor: "#1E005E" }),
                      /* @__PURE__ */ jsx(
                        "stop",
                        {
                          offset: "1",
                          stopColor: "#652CDE"
                        }
                      )
                    ]
                  }
                ),
                /* @__PURE__ */ jsxs(
                  "linearGradient",
                  {
                    id: "paint4_linear_245_3732",
                    x1: "221.746",
                    y1: "-62.9527",
                    x2: "221.746",
                    y2: "253.168",
                    gradientUnits: "userSpaceOnUse",
                    children: [
                      /* @__PURE__ */ jsx("stop", { stopColor: "#1E005E" }),
                      /* @__PURE__ */ jsx(
                        "stop",
                        {
                          offset: "1",
                          stopColor: "#652CDE"
                        }
                      )
                    ]
                  }
                ),
                /* @__PURE__ */ jsxs(
                  "linearGradient",
                  {
                    id: "paint5_linear_245_3732",
                    x1: "221.746",
                    y1: "-62.9527",
                    x2: "221.746",
                    y2: "253.168",
                    gradientUnits: "userSpaceOnUse",
                    children: [
                      /* @__PURE__ */ jsx("stop", { stopColor: "#1E005E" }),
                      /* @__PURE__ */ jsx(
                        "stop",
                        {
                          offset: "1",
                          stopColor: "#652CDE"
                        }
                      )
                    ]
                  }
                ),
                /* @__PURE__ */ jsxs(
                  "linearGradient",
                  {
                    id: "paint6_linear_245_3732",
                    x1: "221.746",
                    y1: "-62.9527",
                    x2: "221.746",
                    y2: "253.168",
                    gradientUnits: "userSpaceOnUse",
                    children: [
                      /* @__PURE__ */ jsx("stop", { stopColor: "#1E005E" }),
                      /* @__PURE__ */ jsx(
                        "stop",
                        {
                          offset: "1",
                          stopColor: "#652CDE"
                        }
                      )
                    ]
                  }
                ),
                /* @__PURE__ */ jsxs(
                  "linearGradient",
                  {
                    id: "paint7_linear_245_3732",
                    x1: "221.746",
                    y1: "-62.9527",
                    x2: "221.746",
                    y2: "253.168",
                    gradientUnits: "userSpaceOnUse",
                    children: [
                      /* @__PURE__ */ jsx("stop", { stopColor: "#1E005E" }),
                      /* @__PURE__ */ jsx(
                        "stop",
                        {
                          offset: "1",
                          stopColor: "#652CDE"
                        }
                      )
                    ]
                  }
                ),
                /* @__PURE__ */ jsxs(
                  "linearGradient",
                  {
                    id: "paint8_linear_245_3732",
                    x1: "221.746",
                    y1: "-62.9527",
                    x2: "221.746",
                    y2: "253.168",
                    gradientUnits: "userSpaceOnUse",
                    children: [
                      /* @__PURE__ */ jsx("stop", { stopColor: "#1E005E" }),
                      /* @__PURE__ */ jsx(
                        "stop",
                        {
                          offset: "1",
                          stopColor: "#652CDE"
                        }
                      )
                    ]
                  }
                ),
                /* @__PURE__ */ jsxs(
                  "linearGradient",
                  {
                    id: "paint9_linear_245_3732",
                    x1: "56.9758",
                    y1: "56.3999",
                    x2: "56.9758",
                    y2: "101.52",
                    gradientUnits: "userSpaceOnUse",
                    children: [
                      /* @__PURE__ */ jsx("stop", { stopColor: "#652CDE" }),
                      /* @__PURE__ */ jsx(
                        "stop",
                        {
                          offset: "1",
                          stopColor: "#1E005E"
                        }
                      )
                    ]
                  }
                )
              ] })
            ]
          }
        ),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h3", { children: "Частые вопросы" }),
          /* @__PURE__ */ jsxs("ul", { className: "mt-2 space-y-1 font-secondary text-sm", children: [
            /* @__PURE__ */ jsx("li", { children: "Основные вопросы" }),
            /* @__PURE__ */ jsx("li", { children: "Финансовые вопросы" }),
            /* @__PURE__ */ jsx("li", { children: "Верификация" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h3", { children: "Правовые документы" }),
          /* @__PURE__ */ jsxs("ul", { className: "mt-2 space-y-1 font-secondary text-sm", children: [
            /* @__PURE__ */ jsx("li", { children: "Политика приватности" }),
            /* @__PURE__ */ jsx("li", { children: "Правила в отношении платежей" }),
            /* @__PURE__ */ jsx("li", { children: "Пользовательсое соглашение" }),
            /* @__PURE__ */ jsx("li", { children: "Соглашение о рисках" }),
            /* @__PURE__ */ jsx("li", { children: "Регламент торговых опепаций" }),
            /* @__PURE__ */ jsx("li", { children: "Регламент неторговых опепаций" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "basis-1/4", children: [
          /* @__PURE__ */ jsx("h3", { children: "О нас" }),
          /* @__PURE__ */ jsx("ul", { className: "mt-2 space-y-1 font-secondary text-sm", children: /* @__PURE__ */ jsx("li", { children: "Контакты" }) })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h3", { children: "Партнерская программа" }),
          /* @__PURE__ */ jsx("ul", { className: "mt-2 space-y-1 font-secondary text-sm", children: /* @__PURE__ */ jsx("li", { children: "Регистрация" }) })
        ] })
      ] }),
      /* @__PURE__ */ jsx("hr", { className: "border border-[#3c3c3c]" }),
      /* @__PURE__ */ jsxs("div", { className: "container -mx-6 space-y-2 py-6 font-secondary text-sm text-[#79747e]", children: [
        /* @__PURE__ */ jsx("p", { children: "One Option — Это Ведущая Платформа" }),
        /* @__PURE__ */ jsx("p", { children: "Для Торговли Бинарными Опционами, Предлагающая Инновационные Решения Для Трейдеров Всех Уровней. Наша Миссия — Предоставить Нашим Клиентам Простой, Прозрачный И Безопасный Способ Торговли На Глобальных Финансовых Рынках." })
      ] })
    ] })
  ] });
};
const ResetPasswordPage = lazy(
  async () => import("./assets/index-Dh7R9Ks-.js").then((module) => ({
    default: module.ResetPasswordPage
  }))
);
const ResetPasswordConfirmPage = lazy(
  async () => import("./assets/index-CxFw8uCz.js").then((module) => ({
    default: module.ResetPasswordConfirmPage
  }))
);
const DashboardPage = lazy(
  async () => import("./assets/index-GKFvvkNx.js").then((module) => ({
    default: module.DashboardPage
  }))
);
const ReferralPage = lazy(
  async () => import("./assets/referral-page-CBoef98X.js").then((module) => ({
    default: module.ReferralPage
  }))
);
const SubReferralPage = lazy(
  async () => import("./assets/sub-referral-page-C9mErc4G.js").then((module) => ({
    default: module.SubReferralPage
  }))
);
const StatisticPage = lazy(
  async () => import("./assets/index-fm-tLlkj.js").then((module) => ({
    default: module.StatisticPage
  }))
);
const WithdrawalPage = lazy(
  async () => import("./assets/index-iG_UKXc8.js").then((module) => ({
    default: module.WithdrawalPage
  }))
);
const ProfilePage = lazy(
  async () => import("./assets/page-CiqXEA96.js").then((module) => ({
    default: module.ProfilePage
  }))
);
createBrowserRouter([
  {
    path: publicRoutes.root,
    element: /* @__PURE__ */ jsx(StartPage, {})
  },
  {
    path: "auth",
    // element: <AuthenticationLayout />,
    lazy: async () => await import("./assets/layout-CLlmpeJ7.js").then((module) => ({
      Component: module.AuthenticationLayout
    })),
    children: [
      {
        path: "sign/in",
        element: /* @__PURE__ */ jsx(SignInPage, {})
      },
      {
        path: "sign/up",
        element: /* @__PURE__ */ jsx(SignUpPage, {})
      },
      {
        path: "password/reset",
        element: /* @__PURE__ */ jsx(Suspense, { fallback: /* @__PURE__ */ jsx(Fragment, { children: "Loading..." }), children: /* @__PURE__ */ jsx(ResetPasswordPage, {}) })
      },
      {
        path: "password/reset/confirm/:token",
        element: /* @__PURE__ */ jsx(Suspense, { fallback: /* @__PURE__ */ jsx(Fragment, { children: "Loading..." }), children: /* @__PURE__ */ jsx(ResetPasswordConfirmPage, {}) })
      }
    ]
  },
  {
    path: "password/reset",
    element: /* @__PURE__ */ jsx(Suspense, { fallback: /* @__PURE__ */ jsx(Fragment, { children: "Loading..." }), children: /* @__PURE__ */ jsx(ResetPasswordPage, {}) })
  },
  {
    path: "password/reset/confirm",
    element: /* @__PURE__ */ jsx(Suspense, { fallback: /* @__PURE__ */ jsx(Fragment, { children: "Loading..." }), children: /* @__PURE__ */ jsx(ResetPasswordConfirmPage, {}) })
  },
  {
    path: "google/complete/",
    element: /* @__PURE__ */ jsx(GoogleAuthenticationPage, {})
  },
  {
    path: "*",
    element: /* @__PURE__ */ jsx(Navigate, { to: "/" })
  }
]);
const routes = [
  {
    path: privateRoutes.root,
    lazy: async () => await import("./assets/app-layout-B2N30vcb.js").then((module) => ({
      Component: module.AppLayout
    })),
    children: [
      {
        index: true,
        element: /* @__PURE__ */ jsx(Suspense, { children: /* @__PURE__ */ jsx(DashboardPage, {}) })
      },
      {
        path: "referral",
        element: /* @__PURE__ */ jsx(Suspense, { children: /* @__PURE__ */ jsx(ReferralPage, {}) })
      },
      {
        path: "sub/referral",
        element: /* @__PURE__ */ jsx(Suspense, { children: /* @__PURE__ */ jsx(SubReferralPage, {}) })
      },
      {
        path: privateRoutes.statistics,
        element: /* @__PURE__ */ jsx(Suspense, { children: /* @__PURE__ */ jsx(StatisticPage, {}) })
      },
      {
        path: privateRoutes.withdrawal,
        element: /* @__PURE__ */ jsx(Suspense, { children: /* @__PURE__ */ jsx(WithdrawalPage, {}) })
      },
      {
        path: privateRoutes.account,
        element: /* @__PURE__ */ jsx(Suspense, { children: /* @__PURE__ */ jsx(ProfilePage, {}) })
      }
    ]
  },
  {
    path: "*",
    element: /* @__PURE__ */ jsx(Navigate, { to: "/" })
  }
];
createBrowserRouter(routes);
const Meta = ({ headers }) => {
  const headersComponent = useMemo(() => {
    if (!headers)
      return null;
    return Object.entries(headers).map(([currentValue]) => {
      if (`${currentValue}`.endsWith("js")) {
        return /* @__PURE__ */ jsx(
          "link",
          {
            crossOrigin: "",
            rel: "modulepreload",
            href: currentValue
          }
        );
      } else if (`${currentValue}`.endsWith("css")) {
        return /* @__PURE__ */ jsx(
          "link",
          {
            crossOrigin: "",
            rel: "stylesheet",
            href: currentValue
          }
        );
      } else if (currentValue.endsWith(".woff")) {
        return /* @__PURE__ */ jsx(
          "link",
          {
            rel: "preload",
            href: currentValue,
            as: "font",
            type: "font/woff",
            crossOrigin: ""
          }
        );
      } else if (currentValue.endsWith(".woff2")) {
        return /* @__PURE__ */ jsx(
          "link",
          {
            rel: "preload",
            href: currentValue,
            as: "font",
            type: "font/woff2",
            crossOrigin: ""
          }
        );
      } else if (currentValue.endsWith(".gif")) {
        return /* @__PURE__ */ jsx(
          "link",
          {
            rel: "preload",
            href: currentValue,
            as: "image",
            type: "image/gif"
          }
        );
      } else if (currentValue.endsWith(".jpg") || currentValue.endsWith(".jpeg")) {
        return /* @__PURE__ */ jsx(
          "link",
          {
            rel: "preload",
            href: currentValue,
            as: "image",
            type: "image/jpeg"
          }
        );
      } else if (currentValue.endsWith(".png")) {
        return /* @__PURE__ */ jsx(
          "link",
          {
            rel: "preload",
            href: currentValue,
            as: "image",
            type: "image/png"
          }
        );
      }
      return null;
    });
  }, [headers]);
  return headersComponent;
};
const HTML = ({ children, headers }) => {
  return /* @__PURE__ */ jsxs("html", { lang: "en", children: [
    /* @__PURE__ */ jsxs("head", { children: [
      /* @__PURE__ */ jsx("meta", { charSet: "utf-8" }),
      /* @__PURE__ */ jsx(
        "meta",
        {
          name: "viewport",
          content: "width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=3,user-scalable=0,minimal-ui, viewport-fit=cover"
        }
      ),
      /* @__PURE__ */ jsx(
        "meta",
        {
          name: "apple-mobile-web-app-capable",
          content: "yes"
        }
      ),
      /* @__PURE__ */ jsx(
        "meta",
        {
          name: "apple-mobile-web-app-status-bar-style",
          content: "black-translucent"
        }
      ),
      /* @__PURE__ */ jsx(
        "meta",
        {
          name: "format-detection",
          content: "telephone=no"
        }
      ),
      /* @__PURE__ */ jsx(
        "link",
        {
          rel: "manifest",
          href: "/manifest.json"
        }
      ),
      /* @__PURE__ */ jsx(
        "link",
        {
          rel: "icon",
          type: "image/png",
          href: "/favicon.png"
        }
      ),
      /* @__PURE__ */ jsx(Meta, { headers }),
      /* @__PURE__ */ jsx(
        "link",
        {
          rel: "stylesheet",
          crossOrigin: "",
          href: "/assets/index.css"
        }
      )
    ] }),
    /* @__PURE__ */ jsx("body", { children: /* @__PURE__ */ jsx("div", { id: "root", children }) })
  ] });
};
const createFetchRequest = (req, res) => {
  const origin = `${req}://${req.get("host")}`;
  const url = new URL(req.originalUrl || req.url, origin);
  const controller = new AbortController();
  res.on("close", () => controller.abort());
  const headers = new Headers();
  for (const [key, values] of Object.entries(req.headers)) {
    if (!values)
      return;
    if (Array.isArray(values)) {
      for (const value of values) {
        headers.append(key, value);
      }
      return;
    }
    headers.set(key, values);
  }
  const init = {
    method: req.method,
    headers,
    signal: controller.signal
  };
  if (req.method !== "GET" && req.method !== "HEAD") {
    Object.assign(init, { body: req.body });
  }
  return new Request(url.href, init);
};
const Renderer = async (req, res) => {
  try {
    const { query, dataRoutes } = createStaticHandler(routes);
    const fetchRequest = createFetchRequest(req, res);
    const context = await query(fetchRequest);
    if (context instanceof Response) {
      throw context;
    }
    const router = createStaticRouter(dataRoutes, context);
    const headers = {};
    const { pipe } = ReactDomServer.renderToPipeableStream(
      /* @__PURE__ */ jsx(HTML, { headers, children: /* @__PURE__ */ jsx(
        StaticRouterProvider,
        {
          router,
          context
        }
      ) }),
      {
        bootstrapModules: ["/main.js"],
        onShellReady: () => {
          res.setHeader("content-type", "text/html");
          pipe(res);
        }
      }
    );
  } catch (error) {
    console.error(error);
  }
};
export {
  EmailIcon as E,
  Logo as L,
  PasswordIcon as P,
  Title as T,
  useConfirmPasswordMutation as a,
  useChangePasswordMutation as b,
  cn as c,
  useSignOutMutation as d,
  rootApi as r,
  Renderer as renderer,
  useRecoverPasswordMutation as u
};
