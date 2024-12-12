const checkStringSimilarity = require('js-levenshtein')
const tesseract = require('tesseract.js')

class TextCheckReturnObject {
    lev_number;
    regex_match;
    word_debug;
    constructor(textCheck, rMatch, d_word) {
        this.lev_number = textCheck
        this.regex_match = rMatch
        this.word_debug = d_word
    }
}

//TODO: Check for links, attachments

const checkText = (str, images, regex, text) => {
    if(str) {
        let words = str.match(/\b\w+\b/g)
        let returnValue = []

        if (words) {
            words.push(str.replace(/\s/g, ""))
            words.forEach(word => {
                if(word.length > 2) {
                    returnValue.push(evaluateTextSimilarity(new TextCheckReturnObject(checkStringSimilarity(word.replace(/[\u{0080}-\u{FFFF}]/gu,""), text), word.match(regex)), word))
                }
            });
            return returnValue
        }
    }
}

const evaluateTextSimilarity = (returnObject) => {
    if(returnObject.lev_number < 3 || returnObject.regex_match) {
        return true
    }
    else { return false }
        
}

module.exports = { checkText }
