import{r as i,j as e,b as v,u as $,c as D,F as b,y as S}from"./index-b5fc81fe.js";import{S as y}from"./Sidebar-ae7ae17a.js";function w({theme:t,session:d}){const[s,o]=i.useState(null),[f,m]=i.useState(""),[x,r]=i.useState(!1),[c,g]=i.useState("No file chosen"),j=a=>{m("");const l=a.target.files[0];l&&(o(l),g(l.name))},p=a=>{a.preventDefault(),a.stopPropagation(),m(""),r(!1);const l=a.dataTransfer.files[0];l&&(o(l),g(l.name.split(" ").join("_")))},u=a=>{a.preventDefault(),a.stopPropagation(),r(!0)},n=()=>{r(!1)},F=async a=>{a.preventDefault();const l=new FormData;l.append("file",s);const h=await(await fetch("/api/upload",{method:"POST",body:l})).json();if(o(null),h.file_url){m(h.file_url);const N=(await fetch(`/api/users/${d.id}/settings`,{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify({"profile-image":h.file_url})})).json();if(N.ok)return;console.error(N.errors)}else console.error(h.error)};return e.jsx("div",{className:"file-upload-wrapper",children:e.jsxs("form",{onSubmit:F,className:"file-upload-form flex column gap-10",children:[e.jsxs("div",{className:`drop-zone ${t} ${t}1 ${x?"dragover":""}`,onDrop:p,onDragOver:u,onDragLeave:n,onClick:()=>document.getElementById("file-input").click(),children:["Drag & drop or click here to select image for profile.",e.jsx("input",{id:"file-input",type:"file",onChange:j,className:"file-input"}),!f&&e.jsx(e.Fragment,{children:c&&e.jsxs("p",{children:[c," selected"]})})]}),!f&&e.jsx(e.Fragment,{children:e.jsx("button",{className:"button aselfend",disabled:!s,type:"submit",children:"Upload"})}),f&&e.jsxs("p",{children:["Uploaded File: ",c]})]})})}function T(){var p,u;const t=(p=v(n=>n.session.user))==null?void 0:p.settings.theme,d=(u=v(n=>n.session.user))==null?void 0:u.settings.font_size,s=v(n=>n.session.user),[o,f]=i.useState(+d),[m,x]=i.useState(!1),r=$(),c=D(),g=()=>{r(S(s.id,{theme:!0,font:!1,image:!1}))},j=n=>{f(+n.target.value),r(S(s.id,{theme:!1,font:+n.target.value,image:!1}))};return i.useEffect(()=>{},[r]),i.useEffect(()=>{s?x(!0):c("/")},[c,s]),e.jsx(e.Fragment,{children:s&&o&&e.jsxs("div",{children:[e.jsx("div",{className:`flex column between ${t}1`,children:e.jsxs("main",{id:"main-container",className:"flex minh100 gap-60 mtop-229",children:[e.jsx(y,{selection:"settings"}),e.jsx("div",{id:"settings-container",className:`flex column gap-40 ${t} font-${o}`,children:m&&e.jsxs("div",{id:"settings-content",className:`flex column gap-15 ${t}2`,children:[e.jsxs("div",{className:"flex gap-25 mleft-25",children:[e.jsx("p",{className:"mleft-25",children:"Theme:"}),e.jsx("p",{className:"mleft-25",children:t}),e.jsxs("select",{className:`mleft-25 settings-select ${t}1 ${t} font-${d}`,defaultValue:t,onChange:g,children:[e.jsx("option",{value:"light",children:"light"}),e.jsx("option",{value:"dark",children:"dark"})]})]}),e.jsxs("div",{className:"flex gap-25 mleft-25",children:[e.jsx("p",{className:"mleft-25 mleft-25",children:"Font-size:"}),e.jsxs("select",{className:`mleft-25 settings-select ${t}1 ${t} font-${d}`,onChange:n=>j(n),value:o,children:[e.jsx("option",{value:"16",children:"16"}),e.jsx("option",{value:"20",children:"20"}),e.jsx("option",{value:"24",children:"24"}),e.jsx("option",{value:"32",children:"32"})]})]}),e.jsxs("div",{className:"flex gap-25 mleft-25",children:[e.jsx("p",{className:"mleft-25",children:"Profile image:"}),s.settings.image.includes("https://garden-city-academy.s3.amazonaws.com")?e.jsxs("p",{className:"mleft-25",children:[s.settings.image.slice(45,s.settings.image.length-37),s.settings.image.slice(s.settings.image.length-4)]}):e.jsx("p",{className:"mleft-25",children:s.settings.image})]}),e.jsx(w,{theme:t,session:s})]})})]})}),e.jsx(b,{})]})})}export{T as default};
