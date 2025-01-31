
export const colorList = [
	'#ff0000', 	//red
	'#ff6600', 	//orange
	'#ffff00', 	//yellow
	'#00cc00', 	//green
	'#33ccff', 	//light blue
	'#0033cc', 	//blue
	'#333399', 	//dark blue
	'#ff0066', 	//pink
	'#cc33ff', 	//purple
	'#bf8040', 	//brown
	'#c2c2a3', 	//grey
	'#000000', 	//black
] as const;

export const colorNames = [
	'red',
	'orange',
	'yellow',
	'green',
	'lightBlue',
	'blue',
	'darkBlue',
	'pink',
	'purple',
	'brown',
	'grey',
	'black',
] as const;

export type ColorType = typeof colorList[number];
export type ColorNames = typeof colorNames[number];

export const colorMap: Record<ColorNames, ColorType> = {
	red: '#ff0000',
	orange: '#ff6600', 
	yellow: '#ffff00', 
	green: '#00cc00',
	lightBlue: '#33ccff',
	blue: '#0033cc',
	darkBlue: '#333399',
	pink: '#ff0066',
	purple: '#cc33ff',
	brown: '#bf8040',
	grey: '#c2c2a3',
	black: '#000000',
};