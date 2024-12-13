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

// console.log(colorsAvailable(['Blue', 'Red']));