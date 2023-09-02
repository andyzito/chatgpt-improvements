In lieu of some kind of automated testing, which I may set up eventually but not yet, here is a handy-dandy list of how to test ALL the funcionality here.

## Spoiler Tags

Input:
```
Please output this exactly: "This is a <spoiler>top *secret*, **secret**, `secret`, ~~secret~~, secret</spoiler>, shhh!" in the following contexts:

- In regular text
- In a code block
- In an inline code block
- In headings of various sizes
- In a quote block
- In bold, italic, and struck through text
- In link text
- In a numbered, bullet, and task list
- In a table
```

First, verify that your own message does not have working spoiler tags.

Now, watch the reply generate. In each case, **except for the code blocks**, you should see the spoiler tag type out, and then be replaced by blacked out text almost as soon as the tag is closed.

Hover over the various spoiler tags. They should contain the properly formatted "top secret" message, and nothing else. When unhovered, none of the text should be visible, and when hovered, it should *all* be visible.

Reload the page, and navigate back to the same conversation if needed. The spoiler tags should be replaced slightly after the conversation is reloaded. Perform the same checks as above.
