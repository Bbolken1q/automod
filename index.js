require('dotenv').config()
const { Client, Events, GatewayIntentBits } = require('discord.js')
const { checkText } = require('./checkText')

const bannedWords = [
	"skill", "issue", "jeb", "kurwa", "szmat", "chuj", "pizd"
]
const bannedRegexes = [
	/.*kurw.*/i, /.*jeb.*/i, /.*szmat.*/i, /.*pizd.*/i, /.*chuj.*/i, /.*skill.*/i, /.*skil.*/i, /.*issue.*/i,  /.*isue.*/i, 
]

const evaluateArray = (arr) => {
	for(let i = 0; i < arr.length; arr++) {
		if(arr[i]) {
			return true
		}
	}
	return false
}

const deleteMessage = (message, regex, word, isDone) => {
	if(!isDone) {
		if(evaluateArray(checkText(message.cleanContent, null, regex, word))) {
			message.delete().then(msg => {console.log(`Deleted message from ${msg.author.username}`)})
			.catch(console.error);
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
		console.log(`Recieved message: ${message.cleanContent} from ${message.author}`)
		let done = 0
		bannedWords.forEach(bannedWord => {
			bannedRegexes.forEach(bannedRegex => {
				// console.log(evaluateArray(checkText(message.cleanContent, null, bannedRegex, bannedWord)))
				deleteMessage(message, bannedRegex, bannedWord, done)
				done++;
			})
		})
		
	});

	// Log in to Discord with your client's token
	client.login(process.env.BOT_TOKEN)
}

runBot()

// evalWord = evaluateArray(checkText("s k i l i s s u e", null, /(.*skil.*)/ig, "skill"))

testEval = (message) => {
	bannedWords.forEach(bannedWord => {
		bannedRegexes.forEach(bannedRegex => {
			console.log(evaluateArray(checkText(message, null, bannedRegex, bannedWord)))
		})
	})
}

// testEval("asdf ")

// console.log(evalWord)