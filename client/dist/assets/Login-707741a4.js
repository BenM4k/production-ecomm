import{r,x as w,y as v,u as S,z as b,C as y,e as E,j as e,D as C,g as L,h as n}from"./index-4eddcbba.js";const q=()=>{var d,g;const[o,i]=r.useState(""),[l,c]=r.useState(""),[h,p]=r.useState(null),m=w(),x=((g=(d=v().state)==null?void 0:d.from)==null?void 0:g.pathname)||"/",u=S(b),[j]=y(),s=E(),f=async a=>{a.preventDefault();try{const t=await j({email:o,password:l}).unwrap();s(C({...t,email:o})),i(""),c(""),p(""),m(x,{replace:!0}),s(L("Welcome"))}catch(t){t.data?t.data.message?s(n(t.data.message)):t.data.type?s(n("Add valid email and/or password")):s(n("Something went wrong")):s(n("No server response"))}};return r.useEffect(()=>{document.title="Login"}),e.jsxs(e.Fragment,{children:[e.jsx("h1",{children:"Login"}),e.jsx("h3",{children:u||""}),e.jsxs("form",{onSubmit:f,children:[e.jsx("h3",{children:h}),e.jsx("label",{children:"email"}),e.jsx("input",{type:"text",value:o,onChange:a=>i(a.target.value),required:!0}),e.jsx("label",{htmlFor:"",children:"password"}),e.jsx("input",{type:"password",onChange:a=>c(a.target.value),value:l,required:!0}),e.jsx("button",{children:"Sign in"}),e.jsx("br",{})]})]})};export{q as default};