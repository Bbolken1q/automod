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
        words.push(str.replace(/\s/g, ""))
        // console.log(words)
        words.forEach(word => {
            console.log(word)
            console.log(regex.toString())
            returnValue.push(evaluateTextSimilarity(new TextCheckReturnObject(checkStringSimilarity(word, text), word.match(regex)), word))
        });
        return returnValue
    }
    
}

const evaluateTextSimilarity = (returnObject) => {
    console.log("for " + returnObject.word_debug)
    console.log("levenshtein number: " + returnObject.lev_number+", returns:")
    console.log(returnObject.lev_number < 3)
    console.log("regex match: " + returnObject.regex_match)
    if(returnObject.lev_number < 3 || returnObject.regex_match) //
        return true
    else
        return false
}

module.exports = { checkText }
