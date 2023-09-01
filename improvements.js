// CTRL + \ to focus chat box
// ==========================
document.addEventListener('keydown', function(event) {
  // Check if CTRL is pressed and the key is '/'
  if (event.ctrlKey && event.key === '\\') {
    // Set focus to the textarea
    const textarea = document.querySelector('textarea#prompt-textarea');
    if (textarea) {
      textarea.focus();
      event.preventDefault(); // Prevent any default behavior
    }
  }
});


// Working <spoiler> tags in responses
// ===================================
function applySpoilerTagsToContent(parentElement) {
  let isInsideSpoiler = false;
  let spoilerContent = '';
  let startNode = null;
  let toBeDeleted = [];

  const wrapContentWithSpoiler = () => {
    const span = document.createElement('span');
    span.className = 'spoiler-content';
    span.textContent = spoilerContent;
    
    // Replace startNode with spoiler span
    parentElement.replaceChild(span, startNode);

		// Delete all the nodes that were within the spoiler tag, since it's all now in the startNode.
    toBeDeleted.forEach(node => {
      if (node && node.parentNode) {
        node.parentNode.removeChild(node);
		  }
		}); 

    // Reset states
		toBeDeleted = [];
    isInsideSpoiler = false;
    spoilerContent = '';
    startNode = null;
  };

  for (const child of parentElement.childNodes) {
    // Text node
    if (child.nodeType === Node.TEXT_NODE) {
      if (child.textContent.includes('<spoiler>')) {
        isInsideSpoiler = true;
        startNode = child;
      }
      if (isInsideSpoiler) {
      	toBeDeleted.push(child) // So we can delete everything after the opening tag, which will be replaced with the spoiler content
        if (child.textContent.includes('</spoiler>')) {
	        wrapContentWithSpoiler();
	      } else {
	        spoilerContent += child.textContent.replace('<spoiler>', '').replace('</spoiler>', '');
	      }
      }

    } else {
      // For non-text nodes, recur into them
      applySpoilerTagsToContent(child);
    }
  }
}

function applySpoilerTagsToConversation() {
  // Get all messages from ChatGPT
  let messages = document.querySelectorAll('main div.markdown.prose');

  messages.forEach(message => {
  	applySpoilerTagsToContent(message)
  });
}

setInterval(applySpoilerTagsToConversation, 1000);