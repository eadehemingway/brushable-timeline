## 13th nov

- i have two branches:

  - on master there is a solution that uses translate to move the timeline around
  - on option-two is the solution that updates the xScale

### problems to solve

- text wrapping, I was using d3-textwrap to wrap the text but this turns them into divs inside a foreign object and makes it hard to work with (e.g. for updating their position)
- also an issue when text covers each other (happens even when wrapping sometimes), maybe its a matter of manually adding it to a different level when you see multiple with the same start date...
