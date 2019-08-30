# Assign PR creator

This GitHub action will assign pull requests to their authors.

## Usage

```yaml
name: Assign PR to creator

on: [pull_request]

jobs:
  automation:
    runs-on: ubuntu-latest
    steps:
    - name: Assign PR to creator
      uses: thomaseizinger/assign-pr-creator-action@v1
      if: github.event_name == 'pull_request' && github.event.action == 'opened'
      with:
        repo-token: ${{ secrets.GITHUB_TOKEN }}
```

## Contributing

Compared to other GitHub actions, this one uses a bundled, zero-dependency JavaScript file at runtime.
