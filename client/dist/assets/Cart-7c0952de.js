import{u as a,j as s,l as i,A as o,p as c,m as x,n as h,o as r,q as j,a as m,t as u,N as d}from"./index-3b0101c3.js";const C=({product:e})=>{const n=a();return s.jsx(s.Fragment,{children:s.jsxs("li",{children:[s.jsx("button",{type:"button",className:"delete-cart-item",onClick:()=>{n(i(e))},children:s.jsx(o,{})}),s.jsx("img",{src:c,alt:e.name,loading:"lazy"}),s.jsx("h3",{children:e.name}),s.jsxs("p",{children:["$",e.price]}),s.jsxs("div",{className:"item-count",children:[s.jsx("button",{type:"button",onClick:()=>{e.itemCount===1?n(i(e)):n(x(e))},children:s.jsx(h,{})}),s.jsx("span",{children:e.itemCount}),s.jsx("button",{type:"button",onClick:()=>n(r(e)),children:s.jsx(j,{})})]})]},e.id)})},b=()=>{const e=m(u);let n=0;return e==null||e.forEach(t=>{let l=t.price*t.itemCount;n+=l}),s.jsxs("div",{className:"cart-container",children:[e.length?s.jsx("ul",{className:"cart-list",children:e==null?void 0:e.map(t=>s.jsx(C,{product:t},t.id))}):s.jsx("h2",{children:"Your cart is empty"}),s.jsx("div",{className:"total",children:e!=null&&e.length?s.jsxs("p",{children:["Total : ",s.jsxs("span",{children:["$",n.toFixed(2)]})]}):s.jsx("span",{})}),s.jsx("button",{type:"button",className:"buy-now",children:e!=null&&e.length?s.jsx(d,{to:"/shipping",children:"Buy now"}):s.jsx("span",{})})]})};export{b as default};
