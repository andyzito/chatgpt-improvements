# Andy Zito's ChatGPT Improvements

## What is this?

This is a collection of JavaScript and CSS that I have created (yes, with significant help from ChatGPT) for the purpose of enhancing the default ChatGPT interface.

## What are the improvements?

So far, the following features are available:

- Shortcut `CTRL + \` to focus the chat box
- Working `<spoiler>` tags in responses
- Resizable chat box
- Only submit on CTRL + Enter

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

### Focus shortcut ( `/` )

This one is pretty simple. It listens to the whole page for the relevant keypress, and when detected, it shifts focus to the chat box. I picked `/` because that's what Youtube uses.

Future improvement: Add a setting to change `/` to other keys if desired.
