import{r as n,l as j,m as w,n as f,u as v,j as e,o as S}from"./index-f99a0d8e.js";const C=()=>{var u,c;const[r,o]=n.useState(""),[i,l]=n.useState(""),[d,a]=n.useState(null),p=j(),m=((c=(u=w().state)==null?void 0:u.from)==null?void 0:c.pathname)||"/",[g,{isLoading:y,error:E}]=f(),h=v(),x=async s=>{s.preventDefault();try{const t=await g({email:r,password:i}).unwrap();h(S({...t,email:r})),o(""),l(""),a(""),p(m,{replace:!0})}catch(t){t.data?t.data.message?a(t.data.message):t.data.type?a("Add valid email and/or password"):a("Something went wrong"):a("No server response")}};return e.jsx(e.Fragment,{children:e.jsxs("form",{onSubmit:x,children:[e.jsx("h3",{children:d}),e.jsx("label",{children:"email"}),e.jsx("input",{type:"text",value:r,onChange:s=>o(s.target.value),required:!0}),e.jsx("label",{htmlFor:"",children:"password"}),e.jsx("input",{type:"password",onChange:s=>l(s.target.value),value:i,required:!0}),e.jsx("button",{children:"Sign in"}),e.jsx("br",{})]})})};export{C as default};