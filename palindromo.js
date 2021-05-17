/**
 * Invierte el texto e indica si es un palindrome.
 *
 * @returns {Object}
 */
function get (text) {
  const response = {}

  if (typeof text !== 'undefined') {
    if (text.length > 0) {
      let invertText = ''
      for (let i = text.length - 1; i >= 0; i--) {
        invertText += text[i]
      }
      response.text = invertText
      response.palindrome = isPalindrome(text)
    } else {
      response.error = 'no text'
    }
  } else {
    response.error = 'undefined text'
  }

  return response
}

/**
 * Verifica si el texto es un Palindrome.
 *
 * @returns {Boolean}
 */
function isPalindrome (text) {
  const palindrome = text.toLowerCase().match(/[a-z]/gi).reverse()
  return palindrome.join('') === palindrome.reverse().join('')
}

module.exports = { get }
