# Aider

[Aider](https://github.com/paul-gauthier/aider) is a helpful software library that provides assistance in various tasks.

## Installation

To install Aider, you can use pip (`python3.10` is a recommended version to use):

```sh
pip install aider-chat
```

Then, you want to prepare a `openai api key` and expose it into your system environment.

```sh
export OPENAI_API_KEY="sk-****"
```

Finally, you can use aider command to compose:

```sh
$ aider hello.js
```

Just write code by prompting!

## About `hello.js`

**_features_**

- Providing 3 api, `/select`, `/clear` and `/insert`, and there are 3 corresponding buttons in index page.
- Rendering a table to show all records after clicking `select` button.
- Need to reconfirm after clicking `clear` button.
- Providing 'return to homepage' button in 3 sub pages.
- Amazingly, 4 features above are generated by `Aider` through prompting.
