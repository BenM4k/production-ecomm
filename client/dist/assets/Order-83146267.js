import{F as g,c as f,u,s as j,y as O,r as y,M as D,j as t,O as v,e as _,f as b}from"./index-9663d4db.js";const E=()=>{const l=g(),o=f(),h=u(j),p=u(O),d={address:""},[r,n]=y.useState(d),c=[];let i=0;p.forEach(e=>{let s=e.price*e.itemCount;i+=s;const a={product_id:e.id,quantity:e.quantity,subtotal:parseFloat(s)};c.push(a)});const[m]=D(),x=e=>{e.preventDefault();const s={user_id:h.id,total_amount:i,order_detail_data:c,shipping_data:r};if(console.log(s),r.address)try{m(s).unwrap(),o(v()),n(d),l("/"),o(_("Order created successfully"))}catch(a){b(a.message),console.log(a)}};return t.jsxs("div",{children:[t.jsx("h2",{children:"Order Page"}),t.jsxs("form",{onSubmit:x,children:[t.jsxs("label",{htmlFor:"",children:["Enter your address:",t.jsx("input",{type:"text",name:"address",value:r.address,onChange:e=>n({...r,address:e.target.value}),required:!0})]}),t.jsx("button",{children:"Order now"})]})]})};export{E as default};
