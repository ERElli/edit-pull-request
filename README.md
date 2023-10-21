# edit-pull-request
A Github action to edit pull requests

Based on [this](https://github.com/actions/typescript-action) typescript action template

## Supported Features
- [Prefix tags to PR titles](./docs/title-tags.md)

## Development
1. Make sure you're using the correct node version
	```bash
	nvm use
	```

1. Clear `node_modules/` and `package-lock.json`
	```bash
	npm run clean
	```

1. Install dependencies
	```bash
	npm i
	```

1. Make your file changes

1. Create a build
	```bash
	npm run build
	```
	- Actions run against this generated file

## Resources
- [Github Actions Toolkit](https://github.com/actions/toolkit)
	- A collection of github packages designed to make the process of action creation easier
- [Typescript Action Template](https://github.com/actions/typescript-action)
