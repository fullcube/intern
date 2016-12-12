# Intern
Chrome Extension for Pivotal Tracker workflow optimization

### Installation
-----

1. `git clone git@github.com:fullcube/intern.git` to the directory of your choice
1. Go to the Chrome Extensions page at `chrome://extensions/`
1. Enable the `Developer Mode` checkbox
1. Click `Load Unpacked Extension`
1. Select the appropriate folder

You may need to refresh any currently open Pivotal Tracker windows. In the future, this extension will be available through the [Chrome App Store](https://chrome.google.com/webstore/category/extensions).

### Usage
-----

A new button should appear on the lefthand side of your story options, next to the "Clone Story" button. Different templates will be applied based on the currently selected story type.

Below is a list of the expected behavior in several scenarios:
- Description is empty
  - Template will be applied
- Description has content
  - After confirmation, template will be applied
  - Existing content will be pushed to the bottom of the description
- Description content matches template
  - Alert will say that template was not applied because the content matched the template

### Roadmap
-----

- Template selections popup
  - Clicking extension icon will allow default template switching
- Custom template creation
- Automatic tagging based on template completion

### Contribute
-----

- To make modifications, fork me and create pull requests
- Be sure to be running only 1 copy of this extension while developing
- The meat of everything is in ./src/inject/inject.js
- Click Reload on the extension in Chrome > Extensions and reload the Pivotal Tracker project page to see your changes

### Attribution
-----

This extension heavily borrows from the [StoryScrip Chrome Extension](https://chrome.google.com/webstore/detail/storyscrip/hbkfmblkcllhmmambkpoieimkmjamhdg?hl=en), which at the time of this posting does not allow for modification of the story description template.
