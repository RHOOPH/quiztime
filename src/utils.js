export function shuffle(array) {
  let input = [...array]
  let output = []
  while (output.length < array.length) {
    if (input.length === 1) {
      output.push(input[0])
    } else {
      let index = Math.floor(Math.random() * input.length)
      output.push(input.splice(index, 1)[0])
    }
  }
  return output
}

export function htmlDecode(input) {
  let doc = new DOMParser().parseFromString(input, "text/html")
  return doc.documentElement.textContent
}
