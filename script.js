const COLORS = ['Red', 'Blue', 'Green', 'Yellow']
const NB_MAX_COLORS = COLORS.length
const NB_MAX_IN_COMBI = 2
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

function game(to_find)
{
	let nb_guesses = 0
	let guess
	let random_int
	do
	{
		guess = []
		for (let i = 0; i < NB_MAX_IN_COMBI; i++)
		{
			random_int = Math.round(Math.random() * (NB_MAX_COLORS - 1))
			while(guess.includes(COLORS[random_int]))
			{
				random_int = Math.round(Math.random() * (NB_MAX_COLORS - 1))
			}
			guess.push(COLORS[random_int])
		}
		console.log(guess);
		nb_guesses++
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
console.log(game(['Red', 'Blue']));