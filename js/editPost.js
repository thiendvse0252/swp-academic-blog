import { getAllCategory } from "./Services/category.service.js";
import { updatePost } from "./Services/post.service.js";
import { getAllTag } from "./Services/tag.service.js";
import * as request from './utils/request.js';

const token = localStorage.getItem("token");

const urlParams = new URLSearchParams(window.location.search);
const postId = urlParams.get('belongedToPostID');

//EDIT POST
function displayEditPost() {

  // post.mediaList.forEach(media => {
  //   const mediaItem = document.getElementById('postMedia');
  //   mediaItem.src = `data:image/jpeg;base64, ${media}`;
  //   mediaItem.style.width = '240px'; 
  //   mediaItem.style.height = 'auto';
  //   //mediaList.appendChild(mediaItem);

  request.get(`post/GetAllApproved/${postId}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
    .then(response => {
      const post = response;

      // Store the post data in session storage
      sessionStorage.setItem('postData', JSON.stringify(post));

      document.getElementById('title').value = post.title;
      //document.getElementById('tags').textContent = post.tagList ?? '';
      // post.tagList.forEach((tag) => {
      //   const tagItem = document.getElementById('tags');
      //   tagItem.textContent = tag;
      // });

      document.getElementById('opt').textContent = post.belongedToCategory;
      document.getElementById('tagLists').textContent = post.tagList;

      const postContentElement = document.getElementById('text-editor');
      postContentElement.innerHTML = post.postDetail;
      postContentElement.contentEditable = true;

      // post.mediaList.forEach(media => {
      //   const mediaItem = document.getElementById('postMedia');
      //   mediaItem.src = `data:image/jpeg;base64, ${media}`;
      //   mediaItem.style.width = '240px'; 
      //   mediaItem.style.height = 'auto';
      //   //mediaList.appendChild(mediaItem);
      // });
    })
    .catch(error => {
      console.error('Error display post:', error);
    });

}

displayEditPost();

const displayCategories = (categories) => {
  const selectElement = document.getElementById('categoryID');

  categories.forEach(category => {
    const option = document.createElement('option');
    option.value = category.content;
    option.textContent = category.content;

    selectElement.appendChild(option);
  });
};

getAllCategory()
  .then((cates) => {
    displayCategories(cates);
});

const displayTags = async (tags) => {
  const selectElement = document.getElementById('tags');
  //const listTags = document.getElementById('listTags');

  tags.forEach(tag => {
    const option = document.createElement('option');
    option.value = tag.tagName;
    option.textContent = tag.tagName;

    // const tagItem = document.createElement('div');
    // tagItem.textContent = tag.tagName;
    // listTags.appendChild(tagItem);

    selectElement.appendChild(option);
  });
};

getAllTag().then((tags) => {
  displayTags(tags);
});

const getChosenTags = () => {
  const selectElement = document.getElementById('tags');
  const selectedOptions = Array.from(selectElement.value);
  const chosenTags = selectedOptions.map(option => option.value);

  return chosenTags;
};

document.addEventListener("DOMContentLoaded", function () {
  //const imageInput = document.getElementById("mediaList");
  const mediaInput = document.getElementById('mediaList');
  const selectedFiles = mediaInput.files;
  const mediaList = Array.from(selectedFiles);

  const form = document.getElementById('updatePost');
  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const textElement = document.querySelector('#text-editor');
    const text = textElement.textContent || textElement.innerText;
    
    const words = text.trim().split(/\s+/);
    
    const wordCount = words.length;
    
    if (wordCount < 100) {
      alert('Your post detail should have at least 100 words.');
      return;
    }

    const titleInput = document.querySelector('#updatePost input[type="text"]');
    //const allowCommentSelect = document.querySelector('#comment');
    const categorySelect = document.querySelector('#opt');
    const textEditor = document.querySelector('#text-editor');

    const model = {
      categoryName: categorySelect.textContent,
      title: titleInput.value,
      detail: textEditor.innerHTML,
      mediaList: [],
      tagList: getChosenTags()
    };

    if (mediaInput.files.length > 0) {
      mediaInput.addEventListener('change', () => {
        model.mediaList = Array.from(mediaInput.files);
      });
    } else {
      model.mediaList = new Blob([]);
    }

    try {
      const selectedTagsText = document.getElementById('tagLists').textContent.split(',').map(tag => tag.trim());
      const chosenTags = getChosenTags() || [];
      const isDifferent = chosenTags.some(tag => selectedTagsText.includes(tag));
      
      //CHECK if TAGS are already chosen
      if (isDifferent) {
        alert('Tags are already chosen!');
      }else{
        const res = await updatePost(postId, model);
        if (res != null) {
          alert('Your Post Edit successfully!');
          window.location.href = '/profile.html';
        } else {
          alert('You need to choose tag!');
        }
      }
    } catch (error) {
      console.log(error);
    }
  });
});