# Prefix Tags to PR Titles
Prefix the pull request title with tags defined in a config file

## Usage

### Example Config
```yml
...
prefixTitleTagConfig:
  # The list of tags that we want to prefix to PR titles
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
...
```

### Example Workflow
```yml
name: 'Edit PR'

on:
  # run this workflow whenever a PR is opened, reopened or when the pull request's head branch is updated
  pull_request:
    types: [opened, reopened, synchronize]

permissions:
  contents: read
  pull-requests: write

jobs:
  Edit-PR:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: ERElli/edit-pull-request@v2
        with:
          prNumber: ${{github.event.number}}
          githubToken: ${{github.token}}
```
