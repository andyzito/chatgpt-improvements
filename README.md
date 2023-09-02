# Andy Zito's ChatGPT Improvements

## What is this?

This is a collection of JavaScript and CSS that I have created (yes, with significant help from ChatGPT) for the purpose of enhancing the default ChatGPT interface.

## What are the improvements?

So far, the following features are available:

- **Focus Shortcut**: Press `/` to focus on the chat box
- **Spoiler Tags**: Working `<spoiler>` tags in responses
- **Resizable Chat Box**: Drag to make it taller or shorter
- **Don't Submit on Enter**: Only submit on `^ CTRL + Enter` or `⌘ CMD + Enter`

Future features might include:

- A settings modal to, for example, enable/disable features (stored in Cookies)
- Font family and size customization (in settings)
- Hide generating message until it is complete (remove live typing)
- Code block improvements:
  - Collapsible
  - Line numbers
  - Wrapping
  - Better syntax identification?
- Add VSCode-like functionality to chat box, for example, `ALT + UP` to move the current line up (maybe there's an existing editor that could be overlayed?)
- View source text of message (no rendered markdown formatting) (this might be impossible)
- Ways to categorize/mark conversations

## Why not just use a full improved interface like [chatwithgpt](https://github.com/cogentapps/chat-with-gpt)?

I think that chatwithgpt and other efforts to provide a full fledged independent interface are super cool and often provide excellent functionality. Moreover, applying custom functionality to the existing interface is frought -- any time OpenAI makes an interface change, it could break my code. So why am I doing this? Because I find it personally satisfying. Also, to be fair, it's easier to set this up than to host a custom interface yourself, and you don't have to provide an API key.

## How do I use this?

I use the [User JavaScript and CSS](https://chrome.google.com/webstore/detail/user-javascript-and-css/nbhcbdghjpllgmfilhnhkllmkecfmpld) Chrome plugin. I'm sure there are similar plugins for Firefox. For User JavaScript and CSS, make sure you enable jQuery in the Options menu.

## In depth feature documentation

### Focus Shortcut

This one is pretty simple. It listens to the whole page for the relevant keypress, and when detected, it shifts focus to the chat box. I picked `/` because that's what Youtube uses.

Future improvement: Add a setting to change `/` to other keys if desired.

### Spoiler Tags

This scans message content for `<spoiler>...</spoiler>` in the text response and replaces it with actual functioning spoiler tags. It does not perform this replacement inside code blocks or inline code blocks.

The replaced spoiler tag retains internal formatting like **bold**, *italics*, ~~strikethrough~~, `inline code block`. I expect it would not work with a block level element inside the spoiler tags, but haven't actually tested that yet.

Example use case: "Give me a riddle and output your answer in a spoiler tag."

Sample custom instructions (untested): `You can output text that is hidden except on hover by using <spoiler> </spoiler> tags.`


Future improvement: When a `<spoiler>` tag is spotted, black out all following content immediately until the `</spoiler>`. This sounds complicated but it would be cool, since for GPT-4 the speed is slow enough that you can read the spoiler contents before replacement if you're watching live.

Future improvement: Support other spoiler markup types, like `>!`.

Future improvement: Adjustable styles in settings.

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
