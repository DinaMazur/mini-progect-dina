const t=document.querySelector(".postForm"),e=document.querySelector(".postList");let a=null;const o=async()=>{try{let t=await fetch("https://687cc83d918b6422432f7281.mockapi.io/posts/posts");return await t.json()}catch(t){throw console.error("Error fetching posts:",t),t}},r=async t=>{try{let e=await fetch("https://687cc83d918b6422432f7281.mockapi.io/posts/posts",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)});return await e.json()}catch(t){throw console.error("Error creating post:",t),t}},i=async t=>{try{await fetch(`https://687cc83d918b6422432f7281.mockapi.io/posts/posts/${t}`,{method:"DELETE"})}catch(t){throw console.error("Error deleting post:",t),t}},s=async(t,e)=>{try{let a=await fetch(`https://687cc83d918b6422432f7281.mockapi.io/posts/posts/${t}`,{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)});return await a.json()}catch(t){throw console.error("Error updating post:",t),t}},c=async()=>{e.innerHTML=(await o()).reverse().map(t=>`
    <li class="post-item" data-id="${t.id}">
      <h3>${t.title}</h3>
      <p><b>\u{410}\u{432}\u{442}\u{43E}\u{440}:</b> ${t.author}</p>
      <p><b>\u{414}\u{430}\u{442}\u{430}:</b> ${t.date}</p>
      ${t.image?`<img src="${t.image}" alt="">`:""}
      <p>${t.description}</p>
      <button class="edit" data-id="${t.id}">\u{440}\u{435}\u{434}\u{430}\u{433}\u{443}\u{432}\u{430}\u{442}\u{438}</button>
      <button class="del" data-id="${t.id}">\u{432}\u{438}\u{434}\u{430}\u{43B}\u{438}\u{442}\u{438}</button>
    </li>
  `).join(""),e.querySelectorAll(".del").forEach(t=>{t.addEventListener("click",async()=>{await i(t.dataset.id),c()})}),e.querySelectorAll(".edit").forEach(e=>{e.addEventListener("click",async()=>{let r=(await o()).find(t=>t.id==e.dataset.id);r&&(t.title.value=r.title,t.author.value=r.author,t.date.value=r.date,t.image.value=r.image,t.description.value=r.description,a=r.id)})})};t.addEventListener("submit",async e=>{e.preventDefault();let o=Object.fromEntries(new FormData(t));a?await s(a,o):await r(o),a=null,t.reset(),c()}),c();
//# sourceMappingURL=mini-progect-dina.dda2af2c.js.map
