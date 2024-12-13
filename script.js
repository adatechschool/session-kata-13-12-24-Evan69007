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