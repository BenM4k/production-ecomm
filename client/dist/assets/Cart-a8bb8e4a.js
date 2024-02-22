import {
  f as a,
  j as s,
  g as i,
  A as o,
  p as c,
  i as r,
  h as x,
  k as h,
  l as j,
  u as m,
  m as u,
  r as d,
  N as C,
} from "./index-1bd465e3.js";
const p = ({ product: e }) => {
    const t = a();
    return s.jsx(s.Fragment, {
      children: s.jsxs(
        "li",
        {
          children: [
            s.jsx("button", {
              type: "button",
              className: "delete-cart-item",
              onClick: () => {
                t(i(e));
              },
              children: s.jsx(o, {}),
            }),
            s.jsx("img", { src: c, alt: e.name, loading: "lazy" }),
            s.jsx("h3", { children: e.name }),
            s.jsxs("p", { children: ["$", e.price] }),
            s.jsxs("div", {
              className: "item-count",
              children: [
                s.jsx("button", {
                  type: "button",
                  onClick: () => {
                    e.itemCount === 1 ? t(i(e)) : t(r(e));
                  },
                  children: s.jsx(x, {}),
                }),
                s.jsx("span", { children: e.itemCount }),
                s.jsx("button", {
                  type: "button",
                  onClick: () => t(h(e)),
                  children: s.jsx(j, {}),
                }),
              ],
            }),
          ],
        },
        e.id
      ),
    });
  },
  g = () => {
    const e = m(u);
    let t = 0;
    return (
      e == null ||
        e.forEach((n) => {
          let l = n.price * n.itemCount;
          t += l;
        }),
      d.useEffect(() => {
        document.title = "Cart";
      }),
      s.jsxs("div", {
        className: "cart-container",
        children: [
          e.length
            ? s.jsx("ul", {
                className: "cart-list",
                children:
                  e == null
                    ? void 0
                    : e.map((n) => s.jsx(p, { product: n }, n.id)),
              })
            : s.jsx("h2", { children: "Your cart is empty" }),
          s.jsx("div", {
            className: "total",
            children:
              e != null && e.length
                ? s.jsxs("p", {
                    children: [
                      "Total : ",
                      s.jsxs("span", { children: ["$", t.toFixed(2)] }),
                    ],
                  })
                : s.jsx("span", {}),
          }),
          s.jsx("button", {
            type: "button",
            className: "buy-now",
            children:
              e != null && e.length
                ? s.jsx(C, { to: "/shipping", children: "Buy now" })
                : s.jsx("span", {}),
          }),
        ],
      })
    );
  };
export { g as default };
