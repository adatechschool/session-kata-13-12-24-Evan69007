const COLORS = ['Red', 'Blue', 'Green', 'Yellow', 'White', 'Black', 'Orange', 'Purple']
const NB_MAX_COLORS = COLORS.length
const NB_MAX_IN_COMBI = 4
const MAX_GUESSES = 12

const userInput = document.querySelector('#guessInput');
const startButton = document.querySelector('#start');
const errorMessage = document.querySelector('#ErrorMessage');
const endOfGameMessage = document.querySelector('#EndOfGameMessage');
const validateButton = document.querySelector('#validate');
const responseGuessVar = document.querySelector('#responseGuess');
const availableColors = document.querySelector('#AvailableColors');
const responses = document.querySelector('#Responses');

availableColors.innerHTML = `Couleurs disponibles: ${COLORS}`

let nb_guesses
let to_find_array

startButton.addEventListener('click', () => {
	responses.innerHTML = ""
	endOfGameMessage.innerHTML = ""
	nb_guesses = 0
	validateButton.style.display  = 'inline-block'
	userInput.style.display = 'inline-block'
	to_find_array = GenerateRandomCombination()
	console.log(to_find_array);
})

validateButton.addEventListener('click', () => {
	let guess = userInput.value
	userInput.value = ""
	errorMessage.innerHTML = ""
	responseGuessVar.innerHTML = ""
	if (guess && nb_guesses < 12)
	{
		let guess_array = guess.split(" ")
		game(to_find_array, guess_array)
	}
})

function colorsAvailable(combination)
{
	for (let color of combination)
	{
		if (!COLORS.includes(color))
		{
			return (false)
		}
	}
	return (true)
}

function compareArrays(array1, array2)
{
	return (JSON.stringify(array1) === JSON.stringify(array2))
}

function didWin(to_find, guess)
{
	return (compareArrays(to_find, guess))
}

function GenerateRandomCombination()
{
	let combination = []
	let random_int
	for (let i = 0; i < NB_MAX_IN_COMBI; i++)
	{
		random_int = Math.round(Math.random() * (NB_MAX_COLORS - 1))
		combination.push(COLORS[random_int])
	}
	return (combination)
}

function findColorIndex(array, color)
{
	for (let i = 0; i < array.length; i++)
	{
		if (array[i] == color)
		{
			return (i)
		}
	}
}

function responseGuess(to_find, guess) // Renvoie la réponse du codemaker en fonction du guess
{
	let bien_placee = 0
	let mal_placee = 0
	let i  = 0
	let to_find_copy = to_find.slice()
	for (let color of guess)
	{
		if (color == to_find[i])
		{
			bien_placee++
		}
		else if (to_find_copy.includes(color))
		{
			mal_placee++
			colorIndex = findColorIndex(to_find_copy, color)
			to_find_copy.splice(colorIndex, 1)
		}
		i++
	}
	let response = [bien_placee, mal_placee]
	return (response)
}

function game(to_find, guess)
{
	if (colorsAvailable(guess))
	{
		nb_guesses++
	}
	else
	{
		errorMessage.innerHTML = 'Couleurs Non disponibles ou sans espaces entre chaque couleur, Réessayez'
		return
	}
	if (didWin(to_find, guess))
	{
		endOfGameMessage.innerHTML = `Bravo! Vous avez trouvé la bonne combinaison qui était ${to_find}`
		validateButton.style.display  = 'none'
		userInput.style.display = 'none'
	}
	else if (nb_guesses == 12)
	{
		endOfGameMessage.innerHTML = `Nombre de tentatives maximum atteint, la combinaison à trouver était: ${to_find}`
	}
	else
	{
		let responseArray = responseGuess(to_find, guess)
		responseGuessVar.innerHTML = `${responseArray[0]} couleurs bien placée(s), ${responseArray[1]} couleurs mal placée(s)`
		responses.innerHTML += `Guess n°${nb_guesses}: ${guess}, ${responseArray[0]} couleurs bien placée(s), ${responseArray[1]} couleurs mal placée(s) <br>`
	}
}