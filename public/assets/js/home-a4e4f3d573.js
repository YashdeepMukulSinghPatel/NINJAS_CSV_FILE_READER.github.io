try{const e={upload:"File has been uploaded successfully 🔥",delete:"File has been deleted successfully 🔥"},t={upload:"Please select a CSV File of Size <= 2MB ❌",delete:"Error in deleting the file ❌",search:"Please select a column to search ❌"};let o={Current_Records:[],Records:[],Total_Rows:0,Total_Rows_Per_Page:100,Total_Pages:0,Current_Page:1};const r=document.querySelector(".files");let a=void 0,l=void 0,n=void 0,s=!1;function tooltip(){try{const e={animation:!0,html:!0,placement:"right",trigger:"hover",delay:{show:300,hide:100}},t=document.querySelectorAll('[data-bs-toggle="tooltip"]');[...t].map(t=>new bootstrap.Tooltip(t,e)).forEach(e=>{e.tip.classList.add("tooltip")})}catch(e){}}function search(){const e=document.querySelector(".form-control");tooltip(),s=!1,e.style.cursor="not-allowed",e.disabled=!0,e.addEventListener("input",e=>{const t=e.target.value;if(""===t&&0!==o.Records.length&&(pagination(),tableSort()),void 0===n)return void notification("error","search");s=!0,o.Current_Records=o.Records.filter(e=>e[n.textContent.trim()].toLowerCase().includes(t.toLowerCase())),o.Total_Rows=o.Current_Records.length,o.Total_Pages=Math.ceil(o.Total_Rows/o.Total_Rows_Per_Page),o.Current_Page=1;document.querySelector(".pages").querySelectorAll("li").forEach((function(e){e.remove()})),pagination(t),tableSort()})}function notification(o,r){const a=document.querySelector(".toast-container"),l=a.querySelector(".toast").cloneNode(!0),n=l.querySelector(".toast-body strong");l.style.display="block","error"===o&&(n.textContent=t[r]),"success"===o&&(n.textContent=e[r]),a.appendChild(l);new bootstrap.Toast(l).show(),setTimeout(()=>l.remove(),6500)}function deleteFile(e){try{e.querySelectorAll(".filename > span > i").forEach(e=>{e.addEventListener("click",(async function(e){e.stopPropagation();const t=e.target.getAttribute("data-id"),o=await fetch("/delete/"+t,{method:"DELETE"}),r=await o.json();"success"===r.data?(notification("success","delete"),e.target.parentElement.parentElement.remove(),l=r.filename,deleteTable()):notification("error","delete")}))})}catch(e){console.log(e)}}function deleteTable(){try{const e=document.querySelectorAll(".pagination button"),t=document.querySelector(".form-control"),r=document.querySelector("table");l===a&&(r&&r.remove(),document.querySelector(".table").style.overflowX="hidden",e.forEach(e=>e.style.display="none"),document.querySelectorAll(".pages li").forEach((function(e){e.remove()})),document.querySelectorAll("#pie > *").forEach(e=>{e.remove()}),document.querySelectorAll("#stats > *").forEach(e=>{e.remove()}),document.querySelector(".chart").style.height="auto",document.querySelector(".chart").style.overflowX="hidden",document.querySelector(".chart2").style.height="auto",document.querySelector(".chart2").style.overflowX="hidden",o={Current_Records:[],Records:[],Total_Rows:0,Total_Rows_Per_Page:o.Total_Rows_Per_Page,Total_Pages:0,Current_Page:1},a=void 0,l=void 0,n=void 0,t.value="",t.style.cursor="not-allowed",t.disabled=!0,s=!1)}catch(e){console.log(e)}}function selectFile(e){e.querySelectorAll(".filename").forEach((function(t){t.addEventListener("click",(async function(r){r.stopPropagation(),e.querySelectorAll(".filename").forEach((function(e){e!==t&&e.classList.remove("active"),e===t&&e.classList.add("active")}));try{const e=t.getAttribute("data-id"),r=await fetch("/read/"+e,{method:"GET"}),n=await r.json();if("success"!==n.response)return;l=a,deleteTable(),o.Records=n.data,a=n.filename,pagination(),tableSort()}catch(e){console.log(e)}}))}))}function createTable(e){const t=document.querySelector(".table"),o=document.querySelector(".chart"),r=document.querySelector(".chart2");if(0===e.length)return t.style.display="none",t.style.overflowX="hidden",o.style.display="none",o.style.overflowX="hidden",r.style.display="none",r.style.overflowX="hidden",o.style.height="auto",void(r.style.height="auto");t.style.display="initial",t.style.overflowX="scroll",o.style.display="initial",o.style.overflowX="scroll",r.style.display="initial",r.style.overflowX="scroll",o.style.height="500px",r.style.height="500px";const a=Object.keys(e[0]);let l="",n="";for(let e in a)l+=`\n\t\t\t\t<th scope="col" class="heading" data-index=${e}>\n\t\t\t\t\t${a[e]}&emsp;<i class="fa-solid fa-sort-up"></i>\n\t\t\t\t</th>`;for(let t of e){let e="";for(let o in t)e+=`\n\t\t\t\t\t<td>${t[o]}</td>`;n+=`\n\t\t\t\t<tr>\n\t\t\t\t\t${e}\n\t\t\t\t</tr>`}let s=`\n\t\t\t<table class="table table-dark table-hover">\n\t\t\t\t<thead>\n\t\t\t\t\t<tr>\n\t\t\t\t\t\t${l}\n\t\t\t\t\t</tr>\n\t\t\t\t</thead>\n\t\t\t\t<tbody class="table-group-divider">\n\t\t\t\t\t${n}\n\t\t\t\t</tbody>\n\t\t\t</table>`;document.querySelector(".table").style.overflowX="scroll",document.querySelectorAll(".pagination button").forEach(e=>{e.style.display="initial"}),t.innerHTML=s}function fileUpload(){const e=document.querySelector(".upload-wrapper > .upload-btn"),t=document.querySelector(".upload-wrapper > input"),o=document.querySelector(".upload > form");t.addEventListener("change",(function(t){const o=this.files;e.textContent=o[0].name,e.classList.add("active")}),!1),o.addEventListener("submit",(async function(o){if(o.preventDefault(),o.stopPropagation(),null==t)return void notification("error","upload");if("null"===t||"undefined"===t)return void notification("error","upload");if(""===t)return void notification("error","upload");if(t.files[0].type.match("text/csv")){if(!(t.files[0].size<=2097152))return void notification("error","upload");notification("success","upload");try{let t=o.target,a=new FormData(t);o.target.reset(),e.textContent="Choose File",e.classList.remove("active");const l=await fetch("/upload",{method:"POST",body:a}),n=await l.json();r.innerHTML+=`<div class="filename" data-id="${n.data._id}">\n\t\t\t\t\t\t\t<span>${n.data.name}&emsp;<i class="fa-solid fa-trash" data-id='${n.data._id}'></i></span></div>`,deleteFile(r),selectFile(r)}catch(e){console.log(e)}}}),!1)}function createChart(e,t){const r=new Map,a=new Map;let l=0;for(let t of o.Records)r.has(t[e])?r.set(t[e],r.get(t[e])+1):r.set(t[e],1);google.charts.load("current",{packages:["corechart","bar"]}),google.charts.setOnLoadCallback((function(){const t=new google.visualization.arrayToDataTable([[e,"Percentage"],...a]),o={width:800,height:450,backgroundColor:{fill:"#000000",fillOpacity:1},titleTextStyle:{color:"#e8f9fd",fontSize:20,fontName:"poppins",bold:!0,italic:!1,underline:!1},legend:{position:"right",textStyle:{color:"#e8f9fd",fontSize:15,fontName:"poppins"}},tooltip:{textStyle:{fontName:"poppins"}},is3D:!0,chart:{title:"Frequency Distribution of "+e.toUpperCase(),subtitle:"Percentage"},annotations:{textStyle:{fontName:"poppins"}},chartArea:{backgroundColor:{fill:"#000000",fillOpacity:1}},colors:["#59ce8f"],isStacked:"true",axes:{x:{0:{side:"bottom"}}},bar:{groupWidth:"60%"},vAxis:{minValue:0,title:"PERCENTAGE",textStyle:{color:"#e8f9fd",fontSize:15,fontName:"poppins"},titleTextStyle:{color:"#e8f9fd",fontSize:15,fontName:"poppins",bold:!0}},hAxis:{title:e.toUpperCase(),textStyle:{color:"#e8f9fd",fontSize:15,fontName:"poppins"},titleTextStyle:{color:"#e8f9fd",fontSize:15,fontName:"poppins",bold:!0}}};document.querySelector("#stats").style.display="flex",document.querySelector("#stats").style.overflowX="scroll",document.querySelector(".chart").style.overflowX="scroll",document.querySelector(".chart").style.height="500px";const r=document.getElementById("stats");new google.charts.Bar(r).draw(t,google.charts.Bar.convertOptions(o))})),google.charts.setOnLoadCallback((function(){const t=google.visualization.arrayToDataTable([[e,"Percentage"],...a]),o={width:800,height:450,title:"Frequency Distribution of "+e.toUpperCase(),is3D:!0,legend:{textStyle:{color:"#e8f9fd",fontSize:17}},titleTextStyle:{color:"#e8f9fd",fontSize:20,bold:!0,italic:!1,underline:!1},backgroundColor:{fill:"#000000",fillOpacity:1},colors:["#8479f3","#59ce8f","#ed2d2d","#faac33","#fe60d7","#44cfe4","#e2b855","#55e2ae","#a855e2","#e25855"],pieSliceText:"percentage",pieSliceTextStyle:{color:"#000000",fontSize:16,bold:!0}};document.querySelector("#pie").style.display="flex",document.querySelector("#pie").style.overflowX="scroll",document.querySelector(".chart2").style.overflowX="scroll",document.querySelector(".chart2").style.height="500px";const r=document.getElementById("pie");new google.visualization.PieChart(r).draw(t,o)}));for(const e of r.values())l+=e;for(let[e,t]of r)a.set(e,100*Number(t)/l)}function sort(e,t){const o=document.querySelector("table").tBodies[0],r=Array.from(o.rows),a="ascending"===t?1:-1,l=r[0].cells[e].textContent.trim();let n=[];for(n=isNaN(l)?r.sort((t,o)=>t.cells[e].textContent.trim().toLowerCase()>o.cells[e].textContent.trim().toLowerCase()?1*a:-1*a):r.sort((t,o)=>Number(t.cells[e].textContent.trim())>Number(o.cells[e].textContent.trim())?1*a:-1*a);o.firstChild;)o.removeChild(o.firstChild);o.append(...n)}function tableSort(){try{const e=document.querySelectorAll(".heading"),t=new Map;e.forEach((function(o){t.has(o.textContent.trim())||t.set(o.textContent.trim(),!1),o.addEventListener("click",(function(){const r=document.querySelector(".form-control");r.style.cursor="initial",r.disabled=!1,s=!0;for(let t of e)t.classList.remove("active");this.classList.add("active");for(let t of e)t.querySelector("i").classList.remove("active");const a=o.querySelector("i"),l=o.getAttribute("data-index");if(createChart(o.textContent.trim(),l),t.get(o.textContent.trim()))a.classList.add("active"),n=this;else{if(t.set(o.textContent.trim(),!0),void 0===n)return a.classList.add("active"),sort(l,"ascending"),void(n=this);a.classList.add("active"),n=this}a.classList.contains("fa-sort-down")?(sort(l,"ascending"),a.classList.replace("fa-sort-down","fa-sort-up")):(sort(l,"descending"),a.classList.replace("fa-sort-up","fa-sort-down"))}))}))}catch(e){}}function pagination(e=""){let t=o.Total_Rows_Per_Page;s?(o.Current_Records=o.Records.filter(t=>t[n.textContent.trim()].toLowerCase().includes(e.toLowerCase())),o.Total_Rows=o.Current_Records.length):(o.Current_Records=o.Records.slice(0,t),o.Total_Rows=o.Records.length),o.Current_Page=1,o.Total_Pages=Math.ceil(o.Total_Rows/o.Total_Rows_Per_Page);const r=document.querySelector(".pages");r.querySelectorAll("li").forEach((function(e){e.remove()})),createTable(o.Current_Records),document.querySelector("#stats").style.display="none",document.querySelector("#stats").style.overflowX="hidden",document.querySelector(".chart").style.overflowX="hidden",document.querySelector(".chart").style.height="auto",document.querySelector("#pie").style.display="none",document.querySelector("#pie").style.overflowX="hidden",document.querySelector(".chart2").style.overflowX="hidden",document.querySelector(".chart2").style.height="auto";const a=document.querySelector("button.next-btn"),l=document.querySelector("button.prev-btn");if(l.style.display="none",1===o.Total_Pages&&(a.style.display="none"),1===o.Total_Pages&&(l.style.display="none"),s&&void 0!==n){const e=document.querySelectorAll(".heading"),t=[];for(let o of e)t.push(o.textContent.trim());if(t.includes(n.textContent.trim())){let t=n.getAttribute("data-index"),o=void 0;for(let r of e)if(r.getAttribute("data-index")==t){o=r;break}let r=n.querySelector("i");r.classList.contains("fa-sort-down")?(r=o.querySelector("i"),r.classList.remove("fa-sort-up"),r.classList.add("fa-sort-down"),r.classList.add("active"),sort(t,"descending")):(r=o.querySelector("i"),r.classList.remove("fa-sort-down"),r.classList.add("fa-sort-up"),r.classList.add("active"),sort(t,"ascending")),o.classList.add("active"),n=o,createChart(o.textContent.trim(),t)}}for(let e=0;e<o.Total_Pages;e++){const t=document.createElement("li");t.classList.add("page"),t.setAttribute("data-page",e+1),0===e&&t.classList.add("active");let s=document.createElement("p");if(s.textContent=e+1,t.appendChild(s),1===o.Total_Pages)return void r.appendChild(t);t.addEventListener("click",(function(){for(let e of document.querySelectorAll(".page"))e.classList.remove("active");t.classList.add("active"),o.Current_Page=Number(this.querySelector("p").textContent);let e=(o.Current_Page-1)*o.Total_Rows_Per_Page,r=o.Current_Page*o.Total_Rows_Per_Page;if(o.Current_Records=o.Records.slice(e,r),createTable(o.Current_Records),tableSort(),void 0!==n){const e=document.querySelectorAll(".heading"),t=[];for(let o of e)t.push(o.textContent.trim());if(t.includes(n.textContent.trim())){let t=n.getAttribute("data-index"),o=void 0;for(let r of e)if(r.getAttribute("data-index")==t){o=r;break}let r=n.querySelector("i");r.classList.contains("fa-sort-down")?(r=o.querySelector("i"),r.classList.remove("fa-sort-up"),r.classList.add("fa-sort-down"),r.classList.add("active"),sort(t,"descending")):(r=o.querySelector("i"),r.classList.remove("fa-sort-down"),r.classList.add("fa-sort-up"),r.classList.add("active"),sort(t,"ascending")),o.classList.add("active"),n=o,createChart(o.textContent.trim(),t)}}o.Current_Page===o.Total_Pages?a.style.display="none":1===o.Current_Page?l.style.display="none":(a.style.display="inline-block",l.style.display="inline-block")})),r.appendChild(t)}}function nextPage(){const e=document.querySelector(".pagination > button.next-btn");1===o.Total_Pages&&(e.style.display="none"),o.Current_Page===o.Total_Pages&&(e.style.display="none"),e.addEventListener("click",(function(t){if(t.preventDefault(),t.stopPropagation(),o.Current_Page<o.Total_Pages){let t=o.Current_Page*o.Total_Rows_Per_Page,r=t+o.Total_Rows_Per_Page;if(o.Current_Records=o.Records.slice(t,r),createTable(o.Current_Records),tableSort(),void 0!==n){const e=document.querySelectorAll(".heading"),t=[];for(let o of e)t.push(o.textContent.trim());if(t.includes(n.textContent.trim())){let t=n.getAttribute("data-index"),o=void 0;for(let r of e)if(r.getAttribute("data-index")==t){o=r;break}let r=n.querySelector("i");r.classList.contains("fa-sort-down")?(r=o.querySelector("i"),r.classList.remove("fa-sort-up"),r.classList.add("fa-sort-down"),r.classList.add("active"),sort(t,"descending")):(r=o.querySelector("i"),r.classList.remove("fa-sort-down"),r.classList.add("fa-sort-up"),r.classList.add("active"),sort(t,"ascending")),o.classList.add("active"),n=o,createChart(o.textContent.trim(),t)}}o.Current_Page++;for(let e of document.querySelectorAll(".page"))e.classList.remove("active");if(document.querySelector(`[data-page='${o.Current_Page}']`).classList.add("active"),o.Current_Page===o.Total_Pages)return void(e.style.display="none");e.style.display="inline-block"}}))}function previousPage(){const e=document.querySelector(".pagination > button.prev-btn");1===o.Total_Pages&&(e.style.display="none"),1===o.Current_Page&&(e.style.display="none"),e.addEventListener("click",(function(t){if(t.preventDefault(),t.stopPropagation(),o.Current_Page>1){o.Current_Page--;for(let e of document.querySelectorAll(".page"))e.classList.remove("active");document.querySelector(`[data-page='${o.Current_Page}']`).classList.add("active");let t=o.Current_Page*o.Total_Rows_Per_Page,r=t-o.Total_Rows_Per_Page;if(o.Current_Records=o.Records.slice(r,t),createTable(o.Current_Records),tableSort(),void 0!==n){const e=document.querySelectorAll(".heading"),t=[];for(let o of e)t.push(o.textContent.trim());if(t.includes(n.textContent.trim())){let t=n.getAttribute("data-index"),o=void 0;for(let r of e)if(r.getAttribute("data-index")==t){o=r;break}let r=n.querySelector("i");r.classList.contains("fa-sort-down")?(r=o.querySelector("i"),r.classList.remove("fa-sort-up"),r.classList.add("fa-sort-down"),r.classList.add("active"),sort(t,"descending")):(r=o.querySelector("i"),r.classList.remove("fa-sort-down"),r.classList.add("fa-sort-up"),r.classList.add("active"),sort(t,"ascending")),o.classList.add("active"),n=o,createChart(o.textContent.trim(),t)}}if(1===o.Current_Page)return void(e.style.display="none");e.style.display="inline-block"}}))}tableSort(),fileUpload(),deleteFile(r),selectFile(r),search(),nextPage(),previousPage()}catch(e){console.log(e)}