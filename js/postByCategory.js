
import { getPostByCategory } from './Services/post.service.js';

const urlParams = new URLSearchParams(window.location.search);
const categoryId = urlParams.get('categoryId');

function displayPosts(response) {

  // Get the container element
  var container = document.querySelector('.ListPost');

  // Loop through the JSON response
  for (var i = 0; i < response.length; i++) {
    var post = response[i];

    // Create the post element
    var postElement = document.createElement('div');
    postElement.classList.add('post');

    // Create the anchor element
    var anchorElement = document.createElement('a');
    anchorElement.href = '#';

    // Create the image element
    var imgElement = document.createElement('img');
    imgElement.src = '#' + (i + 1) + '.jpg';
    imgElement.alt = 'Post ' + (i + 1) + ' Image';
    anchorElement.appendChild(imgElement);

    // Create the title element
    var titleElement = document.createElement('h2');
    titleElement.classList.add('post-title');
    titleElement.textContent = post.title;
    anchorElement.appendChild(titleElement);

    // Create the post info element
    // Create the info element
    var infoElement = document.createElement('p');
    infoElement.classList.add('post-info');
    infoElement.classList.add('two-line-preview');
    infoElement.textContent = post.postDetail;
    anchorElement.appendChild(infoElement);

    // Create the tags element
    var tagsElement = document.createElement('div');
    tagsElement.classList.add('tags');

    // Create the icon-tag element
    var iconTagElement = document.createElement('div');
    iconTagElement.classList.add('icon-tag');
    var iconTagImageElement = document.createElement('img');
    iconTagImageElement.src = '/img/tag.png';
    iconTagImageElement.alt = 'icon-tag';
    iconTagElement.appendChild(iconTagImageElement);
    tagsElement.appendChild(iconTagElement);

    // Create the tag element
    var tagElement = document.createElement('a');
    tagElement.href = '/Page SE SA AI BS/html/pageTechnoloy.html';
    var tagSpanElement = document.createElement('span');
    tagSpanElement.classList.add('tag');
    tagSpanElement.textContent = post.tagList[0];
    tagElement.appendChild(tagSpanElement);
    tagsElement.appendChild(tagElement);

    // Append all elements to the post element
    postElement.appendChild(anchorElement);
    postElement.appendChild(tagsElement);

    // Append the post element to the container
    container.appendChild(postElement);
  }
}

  const displayAllPosts = () => {
    getPostByCategory(categoryId)
      .then((posts) => {
        displayPosts(posts);
      })
      .catch((error) => {
        console.error(error);
        // Handle the error as needed
      });
  };

  displayAllPosts();