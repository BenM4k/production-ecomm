import{v as p,f as h,J as g,r,j as e,K as d}from"./index-1bd465e3.js";const f=()=>{const i=p(),o=h(),[l]=g(),[n,m]=r.useState({email:"",password:"",first_name:"",last_name:""}),t=s=>{const{name:a,value:u}=s.target;n[a]=u},c=async s=>{s.preventDefault();try{await l(n).unwrap(),o(d("Registration Successful, Please Login")),m({}),i("/login")}catch(a){console.log(a)}};return r.useEffect(()=>{document.title="Register"}),e.jsxs("form",{onSubmit:c,children:[e.jsxs("label",{htmlFor:"email",children:["Email",e.jsx("input",{type:"email",name:"email",onChange:t})]}),e.jsxs("label",{htmlFor:"password",children:["Password",e.jsx("input",{type:"password",name:"password",onChange:t})]}),e.jsxs("label",{htmlFor:"first_name",children:["First Name",e.jsx("input",{type:"text",name:"first_name",onChange:t})]}),e.jsxs("label",{htmlFor:"last_name",children:["Last Name",e.jsx("input",{type:"text",name:"last_name",onChange:t})]}),e.jsx("button",{type:"submit",children:"Register"})]})};export{f as default};
