# Andy Zito's ChatGPT Improvements

## What is this?

This is a collection of JavaScript and CSS that I have created (yes, with significant help from ChatGPT) for the purpose of enhancing the default ChatGPT interface.

## What are the improvements?

So far, the following features are available:

- **Focus Shortcut**: Press `/` to focus on the chat box
- **Spoiler Tags**: Working `<spoiler>` tags in responses
- **Resizable Chat Box**: Drag to make it taller or shorter
- **Don't Submit on Enter**: Only submit on `^ CTRL + Enter` or `⌘ CMD + Enter`

Future improvements might include:

- Settings!
- Other working markup, for example a way to output colors
- Font family and size customization
- Collapsible code and other blocks
- Ways to categorize/mark conversations

## Why not just use a full improved interface like [chatwithgpt](https://github.com/cogentapps/chat-with-gpt)?

I think that chatwithgpt and other efforts to provide a full fledged independent interface are super cool. However, they can be annoying to host and you must provide an API key. Personally, I find it satisfying to apply improvements on top of the existing interface, but that certainly comes with some disadvantages, and everyone should choose what is best for them.

## How do I use this?

I use the [User JavaScript and CSS](https://chrome.google.com/webstore/detail/user-javascript-and-css/nbhcbdghjpllgmfilhnhkllmkecfmpld) Chrome plugin. I'm sure there are similar plugins for Firefox. For User JavaScript and CSS, make sure you enable jQuery in the Options menu.

## In depth feature documentation

### Focus Shortcut

This one is pretty simple. It listens to the whole page for the relevant keypress, and when detected, it shifts focus to the chat box. I picked `/` because that's what Youtube uses.

Future improvement: Add a setting to change `/` to other keys if desired.

### Spoiler Tags

This scans message content for `<spoiler>...</spoiler>` in the text response and replaces it with actual functioning spoiler tags.

Example use case: "Give me a riddle and output your answer in a spoiler tag."

Sample custom instructions (untested): `You can output text that is hidden except on hover by using <spoiler> </spoiler> tags.`

Future improvement: Adjustable styles in settings.

Future improvement: Support other spoiler markup types, like `>!`.

### Resizable Chat Box

This allows you to resize the chat box by dragging from the upper right corner. I find this useful when typing out very long messages:
- I can make a nice big textarea for myself to draft in
- I can shrink the chat box back down so I can see the whole conversation (by default, the chat box at max height covers the last few lines of the convo)

When you press Enter to submit a message, the manual resizing is reset so that it will go back to auto-resizing until the next time you resize manually.

Future improvement: Watch for other submission types (e.g. clicking the submit button) to restore auto-resize.

Future improvement: Setting to enable/disable the size reset.

Future improvement: Prettier drag handle.

### Don't Submit on Enter

You can now type away without fear of accidentally submitting your message early! Much like the similar functionality in Slack (and elsewhere), this reverses submission behavior so that normal Enter presses will just type a newline. `⇧ SHIFT + Enter` will do the same thing, as it did before. To actually submit, use `^ CTRL + Enter` or `⌘ CMD + Enter`.

Future improvement: Alternate mode to do confirm dialog before submit?
