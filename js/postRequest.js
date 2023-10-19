import { getPostRequest } from "../js/Services/post.service.js";

const options = {
    month: 'short', // Two-digit month (e.g., 01)
    day: '2-digit', // Two-digit day (e.g., 18)
    hour: '2-digit', // Two-digit hour (e.g., 14)
  };

// DISPLAY LIST POSTS
function displayPosts(posts) {
    
    const postContainer = document.querySelector('#post .col-span-5');
    postContainer.innerHTML = '';

    if(posts.length === 0){
      const noResultsElement = document.createElement('div');
      noResultsElement.className = 'text-center text-4xl font-bold text-gray-500 dark:text-gray-400';
      noResultsElement.textContent = 'No results related to your search. Please use other keywords.';
      postContainer.appendChild(noResultsElement);
    }else{
      posts.forEach(post => {
        
        const postElement = document.createElement('div');
        postElement.className = 'col-span-5';
  
        const flexElement = document.createElement('div');
        flexElement.className = 'flex w-full px-8 py-4 items-center';
    
        const avatarImage = document.createElement('div');
        avatarImage.className = 'flex';
        const avatarImg = document.createElement('img');
        avatarImg.src = 'img/Img For User/User1.jpg';
        avatarImg.alt = 'avatar';
        avatarImg.className = 'rounded-full w-8';
        avatarImage.appendChild(avatarImg);
        flexElement.appendChild(avatarImage);
    
        const createdByUser = document.createElement('div');
        createdByUser.className = 'ml-4';
        createdByUser.textContent = post.createdByUser;
        const grayTextSpan = document.createElement('span');
        grayTextSpan.className = 'text-gray-400';
        grayTextSpan.textContent = ' in ';
        createdByUser.appendChild(grayTextSpan);
  
        const postTagLink = document.createElement('a');
        postTagLink.href = '/Page SE SA AI BS/html/pageBusiness.html';
    
        const postTagSpan1 = document.createElement('span');
        postTagSpan1.className = 'tag-name';
        postTagSpan1.textContent = post.belongedToCategory;
        postTagLink.appendChild(postTagSpan1);
    
        const commaSpan = document.createElement('span');
        commaSpan.className = 'tag-name';
        commaSpan.textContent = ' , ';
        postTagLink.appendChild(commaSpan);
  
        const postTagSpan2 = document.createElement('span');
        postTagSpan2.className = 'tag-name';
        postTagSpan2.textContent = '';
        postTagLink.appendChild(postTagSpan2);
    
        const commaSpan2 = document.createElement('span');
        commaSpan2.className = 'tag-name';
        commaSpan2.textContent = ' , ';
        postTagLink.appendChild(commaSpan2);
    
        const postTagSpan3 = document.createElement('span');
        postTagSpan3.className = 'tag-name';
        postTagSpan3.textContent = '';
        postTagLink.appendChild(postTagSpan3);
    
        createdByUser.appendChild(postTagLink);
        flexElement.appendChild(createdByUser);
    
        const dateTimeElement1 = document.createElement('div');
        dateTimeElement1.className = 'p-0.5 bg-gray-900 rounded-full mx-4';
        flexElement.appendChild(dateTimeElement1);
  
      const dateTimeElement2 = document.createElement('div');
      dateTimeElement2.className = 'date-time';
      const postCreatedTime = new Date(post.createdTime);
      const formattedTime = postCreatedTime.toLocaleString('en-US', options);
      dateTimeElement2.textContent = formattedTime;
      flexElement.appendChild(dateTimeElement2);
  
      const dateTimeElement3 = document.createElement('div');
      dateTimeElement3.className = 'p-0.5 bg-gray-900 rounded-full mx-4';
      flexElement.appendChild(dateTimeElement3);
  
      const memberOnlyElement = document.createElement('div');
      memberOnlyElement.textContent = 'Member only';
      flexElement.appendChild(memberOnlyElement);
  
      postElement.appendChild(flexElement);
  
      const postLink = document.createElement('a');
      postLink.href = `blogDetail.html?postId=${post.postsId}`;

      const titleElement = document.createElement('div');
      titleElement.className = 'font-semibold text-2xl px-8';
      titleElement.id = 'title';
      titleElement.textContent = post.title;
      postLink.appendChild(titleElement);

      const infoElement = document.createElement('p');
      infoElement.className = 'px-7 py-7 post-detail';
      infoElement.textContent = post.postDetail;
      postLink.appendChild(infoElement);

      postElement.appendChild(postLink);
  
      const flexItemsElement = document.createElement('div');
      flexItemsElement.className = 'flex items-center px-8';
  
      const iconTagElement = document.createElement('div');
      iconTagElement.className = 'icon-tag';
      const iconTagImg = document.createElement('img');
      iconTagImg.src = 'img/tag.png';
      iconTagImg.alt = 'icon-tag';
      iconTagElement.appendChild(iconTagImg);
      flexItemsElement.appendChild(iconTagElement);
  
      const tagLink1 = document.createElement('a');
      tagLink1.href = '/Page SE SA AI BS/html/pageTechnoloy.html';
      const tagDiv1 = document.createElement('div');
      tagDiv1.className = 'rounded-xl bg-gray-300 text-gray-900 px-2 mr-4';  

      tagDiv1.textContent = post.postTag ?? 'tag';
      tagLink1.appendChild(tagDiv1);
      flexItemsElement.appendChild(tagLink1);
  
      const tagLink3 = document.createElement('a');
      tagLink3.href = '/Page SE SA AI BS/html/pageDigitalTransformation.html';
      const tagDiv3 = document.createElement('div');
      tagDiv3.className = 'rounded-xl bg-gray-300 text-gray-900 px-2 mr-4';

      tagDiv3.textContent = post.postTag ?? 'tag';
      tagLink3.appendChild(tagDiv3);
      flexItemsElement.appendChild(tagLink3);
  
      postElement.appendChild(flexItemsElement);
  
      const imgContainer = document.createElement('div');
      imgContainer.className = 'm-5';
  
      const imgLink = document.createElement('a');
  
      const imgElement = document.createElement('img');
      imgElement.className = 'w-21 h-20';
  
      imgLink.appendChild(imgElement);
      imgContainer.appendChild(imgLink);
  
      postElement.appendChild(imgContainer);

      const approveButton = document.createElement('button');
      approveButton.textContent = 'Approve';

      approveButton.classList.add('button', 'approve-button');
      approveButton.addEventListener('click', () => {
        approvePost(post.postsId); // Call a function to handle post approval
      });
      flexItemsElement.appendChild(approveButton);
    
      // Create reject button
      const rejectButton = document.createElement('button');
      rejectButton.textContent = 'Reject';
      rejectButton.classList.add('button', 'reject-button');
      
      rejectButton.addEventListener('click', () => {
        rejectPost(post.postsId); // Call a function to handle post rejection
      });
      flexItemsElement.appendChild(rejectButton);
  
      postContainer.appendChild(postElement);
      });
    }
}

const displayPostRequests = () => {
    getPostRequest()
      .then((posts) => {
        displayPosts(posts);
      })
      .catch((error) => {
        console.error(error);
        // Handle the error as needed
      });
};

displayPostRequests();


function approvePost(postId) {
  // Logic to handle post approval
  // Redirect or perform any necessary actions
}

function rejectPost(postId) {
  // Logic to handle post rejection
  // Redirect or perform any necessary actions
}