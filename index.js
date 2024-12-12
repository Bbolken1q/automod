require('dotenv').config()
const { Client, Events, GatewayIntentBits } = require('discord.js')
const { checkText } = require('./checkText')

const bannedWords = [
	"skill", "issue", "jeb*", "kurw*", "szmat", "chuj*", "pizd*", "skil", "isue"
]
const bannedRegexes = [ // array of banned regexes for the bot
	/.*kurw.*/i,
	/.*jeb.*/i,
	/.*szmat.*/i,
	/.*pizd.*/i,
	/.*chuj.*/i,
	/.*s{1,5}k{1,5}i{1,5}l{1,10}.*/i,
	/.*s{1,5}k{1,5}i{1,5}l{1,5}.*/i,
	/.*i{1,5}s{1,10}u{1,5}e{1,5}.*/i,
	/.*i{1,5}s{1,5}u{1,5}e{1,5}.*/i,
]

const evaluateArray = (arr) => { // DEPRECATED
	if(arr.length) {
		for(let i = 0; i < arr.length; arr++) {
			if(arr[i]) {
				return true
			}
		}
		return false
	}
	return false
}

const checkMessage = (message) => {
	console.log(`Recieved message: ${message.cleanContent} from ${message.author}`)
		let done = { value: 0 }
		bannedWords.forEach(bannedWord => {
			bannedRegexes.forEach(bannedRegex => {
				// console.log(evaluateArray(checkText(message.cleanContent, null, bannedRegex, bannedWord)))
				deleteMessage(message, bannedRegex, bannedWord, done)
				// done++;
			})
		})
}

const deleteMessage = (message, regex, word, isDone) => { // deletes a message
	// console.log(isDone.value == 0)
	if(isDone.value == 0) { // check if action has already been done
		let checkedArrayResult = checkText(message.cleanContent, null, regex, word)
		// console.log(checkedArrayResult)
		if(checkedArrayResult) {
			checkedArrayResult.forEach(result => {
				// console.log("--------")
				// console.log(result)
				if(result) {
					message.delete().then(msg => {console.log(`Deleted message from ${msg.author.username}`)})
					.catch(console.error);
					isDone.value += 1
				}
			});
		}
	}	
}

const runBot = () => {
	// Create a new client instance
	const client = new Client({ intents: [ 
		GatewayIntentBits.DirectMessages,
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,] })

	client.once(Events.ClientReady, readyClient => {
		console.log(`Ready! Logged in as ${readyClient.user}`)
	});

	client.on(Events.MessageCreate, message => {
		checkMessage(message)
	});

	client.on(Events.MessageUpdate, (oldMessage, newMessage) => {
		checkMessage(newMessage)
	});

	// Log in to Discord with your client's token
	client.login(process.env.BOT_TOKEN)
}

runBot()
