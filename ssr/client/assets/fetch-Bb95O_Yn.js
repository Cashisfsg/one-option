import{j as e}from"../main.js";const f=(t,s)=>t(s),m=({useQuery:t,args:s,renderSuccess:i,loadingFallback:a=e.jsx("div",{className:"flex w-full items-center justify-center px-3",children:"Loading..."}),renderError:u=r=>e.jsx("pre",{className:"self-center text-center text-red-700",children:r||"Неизвестная ошибка"})})=>{var c;const{data:r,isLoading:x,isSuccess:o,isError:d,error:n}=f(t,s);return x?a:d?u((c=n==null?void 0:n.data)==null?void 0:c.message):o?i(r):e.jsx(e.Fragment,{})};export{m as F};
