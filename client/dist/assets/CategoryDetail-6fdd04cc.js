import{q as d,t as l,r as o,j as e,v as h}from"./index-1bee27aa.js";const x=()=>{const{id:c}=d(),{data:r,isError:a,isLoading:n}=l(c),s=r==null?void 0:r.category,i=r==null?void 0:r.category.Product;return o.useEffect(()=>{document.title=s!=null&&s.name?s.name:document.title}),n?e.jsx("div",{className:"category-detail",children:e.jsx("h1",{children:"Loading..."})}):a?e.jsx("div",{className:"category-detail",children:e.jsx("h1",{children:"Error fetching"})}):i&&i.length===0?e.jsxs("div",{className:"category-detail",children:[e.jsx("h2",{children:s.name}),e.jsx("p",{className:"desc",children:s.description}),e.jsx("h4",{children:"No product matched this category"})]}):e.jsxs("div",{className:"category-detail",children:[e.jsx("h2",{children:s.name}),e.jsx("p",{className:"desc",children:s.description}),e.jsx("ul",{children:i==null?void 0:i.map(t=>e.jsx("li",{children:e.jsx(h,{product:t})},t.id))})]})};export{x as default};