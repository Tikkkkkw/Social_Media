var apiKey = "live_iKqo7KZIPP9JFIGWokmchR2xaz6x0o5fPG9ATwr0NVImlJ1SEM2Dya36MJfAlTgJ";
const num = 7

async function getCat() {
  try {
    const response = await fetch('https://api.thecatapi.com/v1/images/search?limit='+ num +'&has_breeds=true');
    const data = await response.json();
    return data[0].url; 
  } catch (error) {
    console.error('Error w/ cat:', error);
    return 'Banned.png'; 
  }
}
async function fetchData() {
    try {
      const posts = await fetch('https://jsonplaceholder.typicode.com/posts').then(res => res.json());
      const users = await fetch('https://jsonplaceholder.typicode.com/users').then(res => res.json());
      const comments = await fetch('https://jsonplaceholder.typicode.com/comments').then(res => res.json());
    
      display(posts, users, comments);
    } catch (error) {
      console.error('Error w/ fetch:', error);
    }
  }

  

  async function display(posts, users, comments) {
    const feed = document.getElementById('feed');
    
    for (const post of posts.slice(0, num)) {
      const user = users.find(cat => cat.id === post.userId);
      const Comments = comments.filter(com => com.postId === post.id);
      const catImage = await getCat();

      const postDiv = document.createElement('div');
      postDiv.classList.add('post');
      postDiv.innerHTML =
      `<div class="header">
          <img src="${catImage}" alt="${user.name}" class="user-img">
          <div>
            <h2>${post.title}</h2>
            <p class="cat"> ${user.name}</p>
          </div>
        </div>
        <p>${post.body}</p>
  
        <button class="show">Show Comments</button>
        <div class="comments">
          ${Comments.map(com => `
            <div class="comment">
              <p>${com.name}(${com.email})</p>
              <p>${com.body}</p>
            </div>
          `).join('')}
        </div>
      `;
    
      feed.appendChild(postDiv);


      const show = postDiv.querySelector('.show');
      const commentsSection = postDiv.querySelector('.comments');
  
      show.addEventListener('click', function () {
        const isCommentsVisible = commentsSection.style.display === 'block';
      
        if (isCommentsVisible) {
          commentsSection.style.display = 'none';  
          show.textContent = 'Show Comments'; 
        } else {
                  commentsSection.style.display = 'block'; 
                  show.textContent = 'Hide Comments';}

      });
    }
  }
  
  fetchData();