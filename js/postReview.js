import { approvePost, rejectPost } from './Services/request.service.js';
import * as request from './utils/request.js';
const token = localStorage.getItem("token");

const options = {
  month: 'short', 
  day: '2-digit', 
  hour: '2-digit', 
};

const urlParams = new URLSearchParams(window.location.search);
const postId = urlParams.get('postId');

function displayPost() {

  request.get(`post/postRequest/${postId}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
    .then(response => {
      const post = response;

      const postCreatedTime = new Date(post.createdTime);
      const formattedTime = postCreatedTime.toLocaleString('en-US', options);

      // Update HTML elements with post data
      document.getElementById('postTitle').textContent = post.title;
      document.getElementById('postAuthor').textContent = post.createdByUser;
      document.getElementById('postDate').textContent = formattedTime;
      const postTagElement = document.getElementById('postTag');
      postTagElement.textContent = post.tagList ? post.tagList.join(', ') : '';
      document.getElementById('postCategory').textContent = post.belongedToCategory ?? '';
      document.getElementById('postContent').innerHTML = post.postDetail;
      
      if(post.mediaList.length > 0){
        const imageElement = document.getElementById('postMedia');
        imageElement.src = `data:image/jpeg;base64, ${post.mediaList[0]}`;
      }

      const readingTimeElement = document.getElementById('readingTime');
      const minuteText = post.readingTime === 1 ? 'minute' : 'minutes';
      readingTimeElement.textContent = post.readingTime + ' ' + minuteText + '' || '';

      if (post.tagList.length > 0) {
        document.querySelector('.container-tags').style.display = 'block';
        post.tagList.forEach(tag => {
          const tagDiv = document.getElementById('postTag');
          tagDiv.textContent = tag;
        });
      }else{
        document.querySelector('.container-tags').style.display = 'none';
      }

    })
    .catch(error => {
      console.error('Error retrieving post:', error);
      // Handle error display or logging
    });
}

// Display the post
displayPost();

const approveButton = document.getElementById("approveButton");
const rejectButton = document.getElementById("rejectButton");

approveButton.addEventListener("click", async (event) =>{
  event.preventDefault();

  var model = {
    teacherMessage: "approved"
  }

  const response = await approvePost(postId, model);

  if(response == null){
    alert('Fail to approve!');
  }else{
    alert('Post approved!');
    window.location.href = "../teacherPage.html";
  }
});

rejectButton.addEventListener("click", async (event) =>{
  event.preventDefault();
  var model = {
    teacherMessage: "rejected"
  }

  const response = await rejectPost(postId, model);

  if(response == null){
    alert('Fail to reject!');
  }else{
    alert('Post rejected!');
    window.location.href = "../teacherPage.html";
  }
});