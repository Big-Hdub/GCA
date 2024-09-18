import{r as i,u as $,j as e,y as b,b as v,c as w,F as k,z as F}from"./index-8b89f411.js";import{S as z}from"./Sidebar-13def994.js";function U({theme:t,session:r}){const[s,c]=i.useState("No file chosen"),[x,d]=i.useState(!1),[f,o]=i.useState(""),[m,g]=i.useState(null),j=$(),p=n=>{o("");const l=n.target.files[0];l&&(g(l),c(l.name))},u=n=>{n.preventDefault(),n.stopPropagation(),o(""),d(!1);const l=n.dataTransfer.files[0];l&&(g(l),c(l.name.split(" ").join("_")))},a=n=>{n.preventDefault(),n.stopPropagation(),d(!0)},D=()=>{d(!1)},y=async n=>{n.preventDefault();const l=new FormData;l.append("file",m);const h=await(await fetch("/api/upload",{method:"POST",body:l})).json();if(g(null),h.file_url){o(h.file_url);const N=await fetch(`/api/users/${r.id}/settings`,{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify({"profile-image":h.file_url})}),S=await N.json();if(N.ok)return j(b(S));console.error(S)}else console.error(h.error)};return e.jsx("div",{className:"file-upload-wrapper",children:e.jsxs("form",{onSubmit:y,className:"file-upload-form flex column gap-10",children:[e.jsxs("div",{className:`drop-zone ${t} ${t}1 ${x?"dragover":""}`,onDrop:u,onDragOver:a,onDragLeave:D,onClick:()=>document.getElementById("file-input").click(),children:["Drag & drop or click here to select image for profile.",e.jsx("input",{id:"file-input",type:"file",onChange:p,className:"file-input"}),!f&&e.jsx(e.Fragment,{children:s&&e.jsxs("p",{children:[s," selected"]})})]}),!f&&e.jsx(e.Fragment,{children:e.jsx("button",{className:"button aselfend",disabled:!m,type:"submit",children:"Upload"})}),f&&e.jsx("p",{children:"File uploaded successfully"})]})})}function P(){var p,u;const t=(p=v(a=>a.session.user))==null?void 0:p.settings.theme,r=(u=v(a=>a.session.user))==null?void 0:u.settings.font_size,s=v(a=>a.session.user),[c,x]=i.useState(+r),[d,f]=i.useState(!1),o=$(),m=w(),g=()=>{o(F(s.id,{theme:!0,font:!1,image:!1}))},j=a=>{x(+a.target.value),o(F(s.id,{theme:!1,font:+a.target.value,image:!1}))};return i.useEffect(()=>{},[o]),i.useEffect(()=>{s?f(!0):m("/")},[m,s]),e.jsx(e.Fragment,{children:s&&c&&e.jsxs("div",{children:[e.jsx("div",{className:`flex column between ${t}1`,children:e.jsxs("main",{id:"main-container",className:"flex minh100 gap-60 mtop-229",children:[e.jsx(z,{selection:"settings"}),e.jsx("div",{id:"settings-container",className:`flex column gap-40 ${t} font-${c}`,children:d&&e.jsxs("div",{id:"settings-content",className:`flex column gap-15 ${t}2`,children:[e.jsxs("div",{className:"flex gap-25 mleft-25",children:[e.jsx("p",{className:"mleft-25",children:"Theme:"}),e.jsx("p",{className:"mleft-25",children:t}),e.jsxs("select",{className:`mleft-25 settings-select ${t}1 ${t} font-${r}`,defaultValue:t,onChange:g,children:[e.jsx("option",{value:"light",children:"light"}),e.jsx("option",{value:"dark",children:"dark"})]})]}),e.jsxs("div",{className:"flex gap-25 mleft-25",children:[e.jsx("p",{className:"mleft-25 mleft-25",children:"Font-size:"}),e.jsxs("select",{className:`mleft-25 settings-select ${t}1 ${t} font-${r}`,onChange:a=>j(a),value:c,children:[e.jsx("option",{value:"16",children:"16"}),e.jsx("option",{value:"20",children:"20"}),e.jsx("option",{value:"24",children:"24"}),e.jsx("option",{value:"32",children:"32"})]})]}),e.jsxs("div",{className:"flex gap-25 mleft-25",children:[e.jsx("p",{className:"mleft-25",children:"Profile image:"}),s.settings.image.includes("https://garden-city-academy.s3.amazonaws.com")?e.jsxs("p",{className:"mleft-25",children:[s.settings.image.slice(45,s.settings.image.length-37),s.settings.image.slice(s.settings.image.length-4)]}):e.jsx("p",{className:"mleft-25",children:s.settings.image})]}),e.jsx(U,{theme:t,session:s})]})})]})}),e.jsx(k,{})]})})}export{P as default};
