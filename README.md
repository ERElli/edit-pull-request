# edit-pull-request
A Github action to edit pull requests

Based on [this](https://github.com/actions/typescript-action) typescript action template

## Development
```bash
nvm use
```

```bash
npm i
```

- Actions run based on `dist/index.js`. This file will need to be regenerated to test your changes
	- ```bash
		npm run build
	```

## Supported Features
- [Prefix tags to PR titles](./docs/prefix-title-tags.md)

## Resources
- [Github Actions Toolkit](https://github.com/actions/toolkit)
	- A collection of github packages designed to make the process of action creation easier
- [Typescript Action Template](https://github.com/actions/typescript-action)
