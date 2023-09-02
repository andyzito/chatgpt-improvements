// Focus Shortcut
// ============================================================================

$(document).ready(() => {
  document.addEventListener('keydown', (event) => {
    // Check if CTRL is pressed and the key is '/'
    if (event.key === '/' && !$(event.target).is('textarea#prompt-textarea')) {
      // Set focus to the textarea
      const textarea = document.querySelector('textarea#prompt-textarea')
      if (textarea) {
        textarea.focus();
        event.preventDefault(); // Prevent any default behavior
      }
    }
  })
})


// Spoiler Tags
// ============================================================================

const watchForDeletion = []

function applySpoilerTagsToContent(parentElement) {
  // If the parent element is a code block, skip it
  if (parentElement.tagName === 'PRE' || parentElement.tagName === 'CODE') {
    return;
  }

  // Check for deleted source nodes, and remove corresponding span if found.
  for (let pair of watchForDeletion) {
    if (!pair.noCheck && !document.contains(pair.ifDeleted)) {
      pair.thenDelete.remove()
      pair.noCheck = true
    }
  }

  // Initialize state
  let isInsideSpoiler = false;
  let spoilerNodes = [];
  let startNode = null;
  let endNode = null;

  const wrapContentWithSpoiler = () => {
    const span = document.createElement('span');
    span.className = 'spoiler-content';

    parentElement.insertBefore(span, startNode);
    watchForDeletion.push({
      ifDeleted: startNode,
      thenDelete: span,
      noCheck: false,
    })
    startNode.nodeValue = ''
    endNode.nodeValue = ''

    for (let spoilerNode of spoilerNodes) {
      // span.appendChild(spoilerNode)
      $(span).append(spoilerNode.cloneNode(true))
    }

    // Reset states
    isInsideSpoiler = false;
    spoilerNodes = [];
    startNode = null;
    endNode = null;
  };

  for (const child of parentElement.childNodes) {
    if (!isInsideSpoiler) {
      if (child.nodeType === Node.TEXT_NODE) {
        if (child.textContent.includes('<spoiler>')) {
          isInsideSpoiler = true;
          startNode = child;
        }
      } else {
        applySpoilerTagsToContent(child)
      }
    } else {
      if (child.nodeType === Node.TEXT_NODE && child.textContent.includes('</spoiler>')) {
        endNode = child
        wrapContentWithSpoiler();
      } else {
        spoilerNodes.push(child);
      }
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

function observeForSpoilers() {
  // Options for the observer (which mutations to observe)
  const config = { childList: true, subtree: true, characterData: true };

  // Callback function to execute when mutations are observed
  const mutate = function(mutationsList, observer) {
    for(let mutation of mutationsList) {
      if(mutation.type === 'characterData' || mutation.type === 'childList') {
        // Check if added node contains '</spoiler>'
        const containsSpoilerEndTag = [...mutation.target.childNodes].some(node => node.nodeType === Node.TEXT_NODE && node.textContent.includes('</spoiler>'));

        if(containsSpoilerEndTag) {
          // const message = mutation.target.closest('div.markdown.prose');
          // applySpoilerTagsToContent(message)
          // console.log('test')
          applySpoilerTagsToConversation()
        }
      }
    }
  };

  // Create an observer instance linked to the callback function
  const observer = new MutationObserver(mutate);

  // Start observing the target node for configured mutations
  const conversation = document.querySelector('main > div[role=presentation] div.flex-1.overflow-hidden div[class*="react-scroll-to-bottom"] > div.flex.flex-col')
  if (conversation) {
    observer.observe(conversation, config);
  } else {
    setTimeout(observeForSpoilers, 1000)
  }
}

function applyOnConversationLoad() {
  if(document.querySelector('main div.markdown.prose') !== null) {
    applySpoilerTagsToConversation();
    setInterval(applySpoilerTagsToConversation, 10000)
    return;
  }
  else {
    setTimeout(() => {
      applyOnConversationLoad();
    }, 1000);
  }
}

$(document).ready(() => {
  applyOnConversationLoad();
  observeForSpoilers();
});


// Resizable Chat Box
// ============================================================================

// This resets the user applied size after message submit,
// so that the chat box will be able to auto-resize as normal
// until the next time the user manually resizes.
$(document).ready(() => {
  $(document).on('keydown', 'textarea#prompt-textarea', (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      const outerDiv = $('main form > div > div.flex.w-full.items-center > div.flex')
      outerDiv.css('height', '');  // Clear the inline height style
    }
  });
});


// Don't Submit on Enter
// ============================================================================

$(document).ready(() => {
  document.addEventListener('keydown', (event) => {
    if ($(event.target).is('textarea#prompt-textarea')) {
      if (event.key === "Enter" && !event.ctrlKey && !event.metaKey && !event.shiftKey) {
        // Prevent submission
        event.stopPropagation();
        event.preventDefault();

        // Simulate pressing Enter regularly -- i.e., insert a newline
        let cursorPos = event.target.selectionStart;
        let value = event.target.value;
        let newText = value.substring(0, cursorPos) + "\n" + value.substring(cursorPos);
        event.target.value = newText;
        event.target.selectionStart = cursorPos + 1;
        event.target.selectionEnd = cursorPos + 1;

        // Trigger input event to trigger textarea auto-resize
        var inputEvent = new Event('input', {
          bubbles: true,
          cancelable: true,
        });
        event.target.dispatchEvent(inputEvent)
      }
    }
  }, true); // The true here specifies the capture phase. Needed for event stopPropagation to work.
});
