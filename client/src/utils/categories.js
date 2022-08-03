import {
	IoFastFoodOutline,
	IoHomeOutline,
	IoCarOutline,
	IoHammerOutline,
	IoShieldCheckmarkOutline,
	IoFitnessOutline,
	IoCashOutline,
	IoBagHandleOutline,
	IoTelescopeOutline,
	IoClipboardOutline,
	IoDiamondOutline,
	IoEggOutline,
	IoStorefrontOutline,
	IoLeafOutline,
	IoNewspaperOutline,
	IoBriefcaseOutline
} from 'react-icons/io5'

export const expense = [
	{ text: 'housing', value: 1, icon: <IoHomeOutline /> },
	{ text: 'transportation', value: 2, icon: <IoCarOutline /> },
	{ text: 'food', value: 3, icon: <IoFastFoodOutline /> },
	{ text: 'utilities', value: 4, icon: <IoHammerOutline /> },
	{ text: 'insurance', value: 5, icon: <IoShieldCheckmarkOutline /> },
	{ text: 'medical & healthcare', value: 6, icon: <IoFitnessOutline /> },
	{
		text: 'saving, investing & debt payments',
		value: 7,
		icon: <IoCashOutline />
	},

	{ text: 'personal spending', value: 8, icon: <IoBagHandleOutline /> },
	{
		text: 'recreation & entertainment',
		value: 9,
		icon: <IoTelescopeOutline />
	},
	{ text: 'miscellaneous', value: 10, icon: <IoClipboardOutline /> }
]

export const income = [
	{ text: 'salary & wages', value: 11, icon: <IoBriefcaseOutline /> },
	{ text: 'investment', value: 12, icon: <IoLeafOutline /> },
	{ text: 'business', value: 13, icon: <IoStorefrontOutline /> },
	{ text: 'interests', value: 14, icon: <IoEggOutline /> },
	{ text: 'rental', value: 15, icon: <IoNewspaperOutline /> },
	{ text: 'other', value: 16, icon: <IoDiamondOutline /> }
]
