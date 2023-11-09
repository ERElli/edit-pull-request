# edit-pull-request
A Github action to edit pull requests written in Typescript

Based on [this](https://github.com/actions/typescript-action) typescript action template

## Development

## Supported Features
- [Add tags to PR titles](#ad-tags-to-pr-titles)

### Add Tags to PR Titles
#### Motivation
In `skillspass-backend-core` monorepo, we want to be able to show what services/packages have been changed at a glance of each commit in the commit history

#### Issue
There's nothing/no one that enforces this title tagging at the moment. It would be easier if it could be done automatically

### Config
```yml
titleTagConfig:
	tags:
		- tag: <tag filename glob>
		- tag2: <tag2 filename glob>
	tagWrappers: '[]'
```
- tags: the list of tags that we want to add to PR titles based on the given glob
- tagWrappers: The two characters you want to use to wrap your tags
	- Note: These wrappers is also how we parse the start of the current title for existing tags

### Example Config
```yml
titleTagConfig:
  tags: 
    - octokit: "src/octokit/**"
    - utils: "src/utils/**"
  tagWrappers: "[]"
```

## Resources
- [Github Actions Toolkit](https://github.com/actions/toolkit)
	- A collection of github packages designed to make the process of action creation easier
- [Typescript Action Template](https://github.com/actions/typescript-action)
