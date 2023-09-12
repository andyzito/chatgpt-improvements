// CONFIG AND INIT
// ============================================================================

const ourWindowObj = window.andyChatGptImprovements = {}
const config = ourWindowObj.config = {}

class Config {
  constructor(value) {
    this.value = value
  }

  change() { }
}

class Toggle extends Config {
  on() {
    super.change()
  }

  off() {
    super.change()
  }
}

class FeatureToggle extends Toggle {
  constructor(_class, value) {
    super(value)
    this._class = _class
  }

  on() {
    super.on()

    this._class.on()
  }

  off() {
    super.off()

    this._class.off()
  }
}

function configValue(name) {
  return config[name].value
}

$(document).ready(() => {
  config.resizableChatBoxEnabled = new FeatureToggle(ResizableChatBox, true)
  config.resizableChatBoxResetSizeOnSubmit = new Toggle(true)
  config.focusShortcutEnabled = new FeatureToggle(FocusShortcut, true)
  config.focusShortcutKey = new Config('/')
  config.spoilerTagsEnabled = new FeatureToggle(SpoilerTags, true)
  config.dontSubmitOnEnterEnabled = new FeatureToggle(DontSubmitOnEnter, true)

  FocusShortcut.on()
  ResizableChatBox.on()
  SpoilerTags.on()
  DontSubmitOnEnter.on()
})



// Settings
// ============================================================================

$(document).ready(() => {
  function updateSettingsModalFromConfig() {
    for (const [key, configObject] of Object.entries(config)) {
      const inputElement = $(`#andyChatGptImprovements-settingsModal input[name="${key}"]`)[0];
      const value = configObject.value

      if ($(inputElement).length) {
        if (inputElement.type === "checkbox") {
          inputElement.checked = value;
          if (value) {
            configObject.on()
          } else {
            configObject.off()
          }
        } else if (inputElement.type === "text" || inputElement.type === "number") {
          inputElement.value = value;
        }
      }
    }
  }

  function updateConfigFromSettingsModal() {
    const inputElements = $(`#andyChatGptImprovements-settingsModal input`)

    for (let inputElement of inputElements) {
      const name = $(inputElement).attr('name')

      if (!config[name]) { continue }

      const configObject = config[name]

      let value = null

      if (inputElement.type === "checkbox") {
        value = inputElement.checked
        if (configObject.value != value) {
          if (value) {
            configObject.on()
          } else {
            configObject.off()
          }
        }
      } else if (inputElement.type === "text" || inputElement.type === "number") {
        value = inputElement.value
        if (configObject.value != value) {
          configObject.change()
        }
      }

      if (value !== null) {
        configObject.value = value
      }
    }
  }

  function toggleSettingsModal() {
    $('#andyChatGptImprovements-settingsModal').toggle()
    $('#andyChatGptImprovements-settingsOverlay').toggle()
  }

  function closeSettingsModal() {
    $('#andyChatGptImprovements-settingsModal').hide()
    $('#andyChatGptImprovements-settingsOverlay').hide()
  }

  $(document.body).append(`
    <div id="andyChatGptImprovements-settingsButton"></div>
    <div id="andyChatGptImprovements-settingsOverlay"></div>
  `)

  $(document.body).append(`
    <div id="andyChatGptImprovements-settingsModal">
      <div class="inner-container">
      <div class="header">
        <h2>Andy's ChatGPT Improvements - Settings</h2>
        <button class="close">
          <svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" height="20" width="20" xmlns="http://www.w3.org/2000/svg">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>
      <div class="content">
        <h3>Toggle Features</h3>
        <label class="custom-checkbox">
          <input name="focusShortcutEnabled" type="checkbox" class="hidden-checkbox" >
          <span class="styled-checkbox"></span>
          Focus Shortcut
        </label>
        <label class="custom-checkbox">
          <input name="spoilerTagsEnabled" type="checkbox" class="hidden-checkbox">
          <span class="styled-checkbox"></span>
          Spoiler Tags
        </label>
        <label class="custom-checkbox">
          <input name="resizableChatBoxEnabled" type="checkbox" class="hidden-checkbox">
          <span class="styled-checkbox"></span>
          Resizable Chat Box
        </label>
        <label class="custom-checkbox">
          <input name="dontSubmitOnEnterEnabled" type="checkbox" class="hidden-checkbox">
          <span class="styled-checkbox"></span>
          Don't Submit on Enter
        </label>
        <h3>Resizable Chat Box</h3>
        <label class="custom-checkbox">
          <input name="resizableChatBoxResetSizeOnSubmit" type="checkbox" class="hidden-checkbox">
          <span class="styled-checkbox"></span>
          Reset chat box size on message submit
        </label>
      </div>
    </div>
    </div>
  `)

  $(document).on('click', '#andyChatGptImprovements-settingsButton', (event) => {
    toggleSettingsModal()
  })

  $(document).on('click', '#andyChatGptImprovements-settingsOverlay, #andyChatGptImprovements-settingsModal .close', (event) => {
    closeSettingsModal()
  })

  $(document).on('keydown', (event) => {
    if (event.key === 'Escape') {
      closeSettingsModal()
    }
  })

  $(document).on('change', '#andyChatGptImprovements-settingsModal input', (event) => {
    updateConfigFromSettingsModal()
  })

  updateSettingsModalFromConfig()
  updateConfigFromSettingsModal()
})



// Feature Base
// ============================================================================

class Feature {
  static initialized = false

  static on() {
    $('body').addClass(`andyChatGptImprovements--${this.shortName}Enabled`)
    this.initialized = true
  }

  static off() {
    $('body').removeClass(`andyChatGptImprovements--${this.shortName}Enabled`)
  }
}



// Focus Shortcut
// ============================================================================

class FocusShortcut extends Feature {
  static shortName = 'focusShortcut'

  static on() {
    const initialized = this.initialized // Save bf super overrides
    super.on()

    if (initialized) { return }
    document.addEventListener('keydown', (event) => {
      if (!configValue('focusShortcutEnabled')) { return }

      if (event.key === configValue('focusShortcutKey') && !$(event.target).is('textarea#prompt-textarea')) {
        const textarea = document.querySelector('textarea#prompt-textarea')
        if (textarea) {
          textarea.focus()
          event.preventDefault() // Prevent any default behavior
        }
      }
    })
  }
}



// Spoiler Tags
// ============================================================================

// $(document).ready((event) => {
class SpoilerTags extends Feature {
  static shortName = 'spoilerTags'
  static observer = null
  static intervalId = null

  // We will store pairs of startNodes and spans here.
  // The ChatGPT interface provides rendered markdown formatting by
  // going back and deleting textNodes and replacing them with, say, a <strong> element.
  // Our <spoiler> tags are not included in the interface's list of textNodes to delete.
  // This pattern will ensure that we clean up vestigial <spoiler>s if the original context
  // has been replaced by live formatting HTML elements.
  static watchForDeletion = []

  static on() {
    const initialized = this.initialized // Save bf super overrides
    super.on()

    this.applyOnConversationLoad()

    if (this.observer == null) {
      this.observeForSpoilers()
    }
  }

  static off() {
    this.observer.disconnect()
    this.observer = null
    clearInterval(this.intervalId)
    // And maybe backreplace <spoiler>s
  }

  static applySpoilerTagsToContent(parentElement) {
    if (!configValue('spoilerTagsEnabled')) { return } // Hard check, but this should be taken care of by off()

    // If we're in a code block, skip it
    if (parentElement.tagName === 'PRE' || parentElement.tagName === 'CODE') {
      return
    }

    // Check for deleted source nodes, and remove corresponding span if found.
    // See comment above, `const watchForDeletion = []`, for more details.
    for (let pair of this.watchForDeletion) {
      if (!pair.noCheck && !document.contains(pair.ifDeleted)) {
        pair.thenDelete.remove()
        pair.noCheck = true
      }
    }

    // Initialize state
    let isInsideSpoiler = false
    let spoilerNodes = []
    let startNode = null
    let endNode = null

    const wrapContentWithSpoiler = () => {
      // Create and insert spoiler span.
      const span = document.createElement('span')
      span.className = 'spoiler-content'
      parentElement.insertBefore(span, startNode)

      // Add our start node to the deletion watch list.
      // See comment above, `const watchForDeletion = []`, for more details.
      this.watchForDeletion.push({
        ifDeleted: startNode,
        thenDelete: span,
        noCheck: false,
      })

      // Zero out our start and end nodes, we don't want the text "<spoiler>" to still show up.
      startNode.nodeValue = ''
      endNode.nodeValue = ''

      // For all nodes that were between the spoiler tags...
      for (let spoilerNode of spoilerNodes) {
        // Insert a copy into the spoiler span
        $(span).append(spoilerNode.cloneNode(true))
        // Zero out the source node without deleting it, so ChatGPT doesn't get confused
        // if it removes the source node later.
        if (spoilerNode.nodeType === Node.TEXT_NODE) {
          spoilerNode.nodeValue = ""
        } else if (spoilerNode.nodeType === Node.ELEMENT_NODE) {
          spoilerNode.innerHTML = ""
          $(spoilerNode).css('display', 'none')
        }
      }

      // Reset states
      isInsideSpoiler = false
      spoilerNodes = []
      startNode = null
      endNode = null
    }

    for (const child of parentElement.childNodes) {
      if (!isInsideSpoiler) {
        if (child.nodeType === Node.TEXT_NODE && child.textContent.includes('<spoiler>')) {
          // We've found the start node!
          isInsideSpoiler = true
          startNode = child
        } else {
          // We've found an elementNode outside of a spoiler tag, recurse into it.
          this.applySpoilerTagsToContent(child)
        }
      } else {
        if (child.nodeType === Node.TEXT_NODE && child.textContent.includes('</spoiler>')) {
          // We've found the end node!
          endNode = child
          wrapContentWithSpoiler()
        } else {
          // We've found some non-end node inside a spoiler. Add it to the list.
          spoilerNodes.push(child)
        }
      }
    }
  }

  static applySpoilerTagsToConversation() {
    let messages = document.querySelectorAll('main div.markdown.prose')

    messages.forEach(message => {
      this.applySpoilerTagsToContent(message)
    })
  }

  // This is what allows us to rapid replacement in actively generating messages.
  static observeForSpoilers() {
    // Options for the observer (which mutations to observe)
    const observerConfig = { childList: true, subtree: true, characterData: true }

    // Callback function to execute when mutations are observed
    const mutate = function(mutationsList, observer) {
      for(let mutation of mutationsList) {
        if(mutation.type === 'characterData' || mutation.type === 'childList') {
          // Check if added node contains '</spoiler>'
          const containsSpoilerEndTag = [...mutation.target.childNodes].some(node => node.nodeType === Node.TEXT_NODE && node.textContent.includes('</spoiler>'))

          if(containsSpoilerEndTag) {
            // Only process the message from which the detected `</spoiler>` originated.
            const message = mutation.target.closest('div.markdown.prose')
            this.applySpoilerTagsToContent(message)
          }
        }
      }
    }.bind(this)

    // Create an observer instance linked to the callback function
    this.observer = new MutationObserver(mutate)

    // Start observing the target node for configured mutations
    const conversation = document.querySelector('main > div[role=presentation] div.flex-1.overflow-hidden div[class*="react-scroll-to-bottom"] > div.flex.flex-col')

    if (conversation) {
      this.observer.observe(conversation, observerConfig)
    } else {
      setTimeout(this.observeForSpoilers.bind(this), 1000)
    }
  }

  static applyOnConversationLoad() {
    if(document.querySelector('main div.markdown.prose') !== null) {
      this.applySpoilerTagsToConversation()
      this.intervalId = setInterval(this.applySpoilerTagsToConversation.bind(this), 10000)
      return
    } else {
      setTimeout(this.applyOnConversationLoad.bind(this), 1000)
    }
  }
}



// Resizable Chat Box
// ============================================================================

// This resets the user applied size after message submit,
// so that the chat box will be able to auto-resize as normal
// until the next time the user manually resizes.
class ResizableChatBox extends Feature {
  static shortName = 'resizableChatBox'

  static on() {
    const initialized = this.initialized // Save bf super overrides
    super.on()

    if (initialized) { return }

    $(document).on('keydown', 'textarea#prompt-textarea', (event) => {
      if (!configValue('resizableChatBoxResetSizeOnSubmit')) { return }

      if (event.key === 'Enter' && !event.shiftKey) {
        const outerDiv = $('main form > div > div.flex.w-full.items-center > div.flex')
        outerDiv.css('height', '') // Clear the inline height style
      }
    })
  }
}



// Don't Submit on Enter
// ============================================================================

class DontSubmitOnEnter extends Feature {
  static shortName = 'dontSubmitOnEnter'

  static on() {
    const initialized = this.initialized // Save bf super overrides
    super.on()

    if (initialized) { return }

    document.addEventListener('keydown', (event) => {
      if (!configValue('dontSubmitOnEnterEnabled')) { return }

      if ($(event.target).is('textarea#prompt-textarea')) {
        if (event.key === "Enter" && !event.ctrlKey && !event.metaKey && !event.shiftKey) {
          // Make this think it's a shift+enter to prevent submission
          Object.defineProperty(event, 'shiftKey', {
            get: () => true
          });
        }
      }
    }, true) // The true here specifies the capture phase. Needed for event stopPropagation to work.
  }
}
