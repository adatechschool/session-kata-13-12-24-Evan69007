const COLORS = ['Red', 'Blue', 'Green', 'Yellow']

function colorsAvailable(combination)
{
	for (let color of combination)
	{;
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

// console.log(colorsAvailable(['Blue', 'Red']));
console.log(didWin([1, 2, 3], [2, 3, 1]));