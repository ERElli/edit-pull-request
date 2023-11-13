# edit-pull-request
A Github action to edit pull requests

Based on [this](https://github.com/actions/typescript-action) typescript action template

## Development

## Supported Features
- [Prefix tags to PR titles](#prefix-tags-to-pr-titles)

### Prefix Tags to PR Titles
Prefix the pull request title with tags defined in a config file

### Example Config
```yml
titleTagConfig:
  # The list of tags that we want to add to PR titles
  tags:
    # Add utils to title if any files in src/utils/ have changed
    - utils: "src/utils/**"
    # Add api to title if files in src/api/ have changed
    - api:
      - "src/api/**"
    # Add lib to title if any files in src/lib/ OR test/lib/ have changed
    - lib:
      - "src/lib/**"
      - "test/lib/**"
  # Wrap tags in the given characters. Ex. [utils]This is an example PR title
  # These characters are also used to parse tags that already exist in the title
  tagWrappers: '[]'
```

## Resources
- [Github Actions Toolkit](https://github.com/actions/toolkit)
	- A collection of github packages designed to make the process of action creation easier
- [Typescript Action Template](https://github.com/actions/typescript-action)
