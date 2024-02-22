import{G as x,R as j,j as e,f as g,O as p,r as h,Q as f,P as F,C as v,D as b,u as B,a as C}from"./index-1bd465e3.js";import{b as y,d as D}from"./SecondaryButton-d9d51557.js";import{F as E}from"./FirstInput-3d23c3a5.js";function k(t){return x({tag:"svg",attr:{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},child:[{tag:"path",attr:{d:"M21 4H8l-7 8 7 8h13a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2z"}},{tag:"line",attr:{x1:"18",y1:"9",x2:"12",y2:"15"}},{tag:"line",attr:{x1:"12",y1:"9",x2:"18",y2:"15"}}]})(t)}const I=j.memo(function({id:n,name:s,value:c,onChange:a,accept:i}){return e.jsx("input",{id:n,name:s,className:"first-input",type:"file",value:c,onChange:a,accept:i,required:!0})}),L=()=>{const t=g(),[n,{isLoading:s,isError:c}]=p(),[a,i]=h.useState({title:"",desc:"",image:null}),d=r=>{i({...a,[r.target.name]:r.target.value})},m=r=>{i({...a,image:r.target.files[0]})},u=r=>{r.preventDefault();const l=new FormData;l.append("title",a.title),l.append("desc",a.desc),l.append("image",a.image);try{n(l),i({title:"",desc:"",image:null}),t(v("Created Banner successfully"))}catch(o){t(b(o.message)),console.log(o)}};return s?e.jsx("div",{children:e.jsx("h1",{children:"Loading..."})}):c?e.jsx("div",{children:e.jsx("h1",{children:"Error creating banner"})}):e.jsxs("div",{children:[e.jsx("h2",{children:"AddBanner"}),e.jsxs("form",{onSubmit:u,children:[e.jsxs("label",{htmlFor:"title",children:["Title",e.jsx(E,{type:"text",name:"title",value:a.title,onChange:d})]}),e.jsxs("label",{htmlFor:"desc",children:["Description",e.jsx(f,{name:"desc",value:a.desc,onChange:d})]}),e.jsx("label",{htmlFor:"image",children:e.jsx(I,{name:"image",onChange:m,accept:"image/png, image/jpeg, image/webp"})}),e.jsx(F,{children:"Create banner"})]})]})},R=()=>{var n;const t=(n=B(C).data)==null?void 0:n.banners;return h.useEffect(()=>{document.title="Banners List"}),e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"dash-head",children:[e.jsx(y,{}),e.jsx("h2",{children:"Banners List"})]}),e.jsx("ul",{className:"admin-banners",children:t==null?void 0:t.map(s=>e.jsxs("li",{children:[e.jsx("img",{src:s.imageUrl,alt:s.title}),e.jsxs("div",{className:"admin-banner-desc",children:[e.jsx("h3",{children:s.title}),e.jsx("p",{children:s.desc})]}),e.jsxs("div",{className:"buttons",children:[e.jsx("button",{onClick:()=>{},children:e.jsx(k,{})}),e.jsx("button",{onClick:()=>{},children:e.jsx(D,{})})]})]},s.title))}),e.jsx("div",{className:"add-banner",children:e.jsx(L,{})})]})};export{R as default};
