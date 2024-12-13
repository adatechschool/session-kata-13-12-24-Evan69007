const COLORS = ['Red', 'Blue', 'Green', 'Yellow', 'White', 'Black', 'Orange', 'Purple']
const NB_MAX_COLORS = COLORS.length
const NB_MAX_IN_COMBI = 4
const MAX_GUESSES = 12

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

function game(to_find)
{
	let nb_guesses = 0
	let guess
	do
	{
		guess = GenerateRandomCombination()
		console.log(guess);
		if (colorsAvailable(guess))
		{
			nb_guesses++
		}
		else
		{
			console.log('Couleurs Non disponibles, Réessayez');
		}
	}
	while (nb_guesses < MAX_GUESSES && !didWin(to_find, guess));
	if (didWin(to_find, guess))
	{
		console.log('Bravo! Vous avez trouvé la bonne combinaison');
		return (true)
	}
	else
	{
		console.log('Nombre de tentatives maximum atteint');
		return (false)
	}
}

// console.log(colorsAvailable(['Blue', 'Red']));
// console.log(didWin([1, 2, 3], [2, 3, 1]));
console.log(game(GenerateRandomCombination()));