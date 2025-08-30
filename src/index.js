

const form = document.querySelector(".postForm");
const postList = document.querySelector(".postList")
let editingId = null;

export const getPosts = async () => {
  try {
    const res = await fetch("https://687cc83d918b6422432f7281.mockapi.io/posts/posts");
    return await res.json();
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw error;
  }
};


export const createPost = async (postData) => {
  try {
    const res = await fetch("https://687cc83d918b6422432f7281.mockapi.io/posts/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(postData),
    });
    return await res.json();
  } catch (error) {
    console.error("Error creating post:", error);
    throw error;
  }
};

export const deletePost = async (id) => {
  try {
    const res = await fetch(`https://687cc83d918b6422432f7281.mockapi.io/posts/posts/${id}`, {
      method: "DELETE",
    });
  } catch (error) {
    console.error("Error deleting post:", error);
    throw error;
  }
};



export const updatePost = async (id, updatedData) => {
  try {
    const res = await fetch(`https://687cc83d918b6422432f7281.mockapi.io/posts/posts/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedData),
    });
    return await res.json();
  } catch (error) {
    console.error("Error updating post:", error);
    throw error;
  }
};


export function getPostForm(post = {}) {
  return `
    <form id="postForm">
      <input type="hidden" name="id" value="${post.id || ''}">
      <input type="text" name="title" placeholder="Назва" value="${post.title || ''}" required>
      <input type="text" name="image" placeholder="URL зображення" value="${post.image || ''}" required>
      <textarea name="description" placeholder="Опис" required>${post.description || ''}</textarea>
      <button type="submit">${post.id ? 'Оновити' : 'Додати'} пост</button>
    </form>
  `;
}


const renderPosts = async () => {
  const posts = (await getPosts()).reverse();
  postList.innerHTML = posts.map(post => `
    <li class="post-item" data-id="${post.id}">
      <h3>${post.title}</h3>
      <p><b>Автор:</b> ${post.author}</p>
      <p><b>Дата:</b> ${post.date}</p>
      ${post.image ? `<img src="${post.image}" alt="">` : ""}
      <p>${post.description}</p>
      <button class="edit" data-id="${post.id}">редагувати</button>
      <button class="del" data-id="${post.id}">видалити</button>
    </li>
  `).join("");

  // Події для кнопок "Видалити"
  postList.querySelectorAll(".del").forEach(button => {
    button.addEventListener("click", async () => {
      await deletePost(button.dataset.id);
      renderPosts();
    });
  });

  // Події для кнопок "Редагувати"
  postList.querySelectorAll(".edit").forEach(button => {
    button.addEventListener("click", async () => {
      const post = (await getPosts()).find(p => p.id == button.dataset.id);
      if (!post) return;

      form.title.value = post.title;
      form.author.value = post.author;
      form.date.value = post.date;
      form.image.value = post.image;
      form.description.value = post.description;
      editingId = post.id;
    });
  });
};

form.addEventListener("submit", async e => {
  e.preventDefault();
  const data = Object.fromEntries(new FormData(form));
  editingId ? await updatePost(editingId, data) : await createPost(data);
  editingId = null;
  form.reset();
  renderPosts();
});

renderPosts();