/* global document */

'use strict';

const allNodeList = document.querySelectorAll('*');
const allElements = Array.prototype.slice.call(allNodeList, 0);

function el(selector) {
	return document.querySelectorAll(selector);
}

function setClockElOn(selector) {
	el(selector).forEach(function(elm) {
		elm.classList.add('on');
	});
}

function setMinutes(minutes) {
	const minutesSecond = minutes % 10;
	const minutesFirst  = (minutes - minutesSecond) / 10;

	switch (minutesFirst) { // eslint-disable-line default-case
		case 0:
			if(minutesSecond > 4) {
				setClockElOn('.fuenf-minuten');
				setClockElOn('.nach');
			} else {
				setClockElOn('.uhr');
			}
			break;
		case 1:
			if(minutesSecond < 5) {
				setClockElOn('.zehn-minuten');
			} else {
				setClockElOn('.viertel');
			}
			setClockElOn('.nach');
			break;
		case 2:
			setClockElOn('.zwanzig-minuten');
			setClockElOn('.nach');
			break;
		case 3:
			setClockElOn('.halb');
			break;
		case 4:
			if(minutesSecond < 5) {
				setClockElOn('.zwanzig-minuten');
			} else {
				setClockElOn('.viertel');
			}
			setClockElOn('.vor');
			break;
		case 5:
			if(minutesSecond < 5) {
				setClockElOn('.zehn-minuten');
			} else {
				setClockElOn('.fuenf-minuten');
			}
			setClockElOn('.vor');
			break;
	}
}

function setHour(hours, minutes) {

	let hoursSecond = hours % 10;
	const hoursFirst  = (hours - hoursSecond) / 10;

	const minutesSecond = minutes % 10;
	const minutesFirst  = (minutes - minutesSecond) / 10;

	if(minutesFirst === 3) {
		hoursSecond++;
	}

	if(hoursFirst === 0) { // eslint-disable-line default-case
		switch (hoursSecond) { // eslint-disable-line default-case
			case 1:
				if(minutesFirst == 0 && minutesSecond < 5) {
					setClockElOn('.ein');
				} else {
					setClockElOn('.eins');
				}
				break;
			case 2:
				setClockElOn('.zwei');
				break;
			case 3:
				setClockElOn('.drei');
				break;
			case 4:
				setClockElOn('.vier');
				break;
			case 5:
				setClockElOn('.fuenf');
				break;
			case 6:
				setClockElOn('.sechs');
				break;
			case 7:
				setClockElOn('.sieben');
				break;
			case 8:
				setClockElOn('.acht');
				break;
			case 9:
				setClockElOn('.neun');
				break;
		}
	} else {
		switch (hoursSecond) { // eslint-disable-line default-case
			case 0:
				setClockElOn('.zehn');
				break;
			case 1:
				setClockElOn('.elf');
				break;
			case 2:
				setClockElOn('.zwoelf');
				break;
			case 3:
				setClockElOn('.eins');
				break;
		}
	}
}

function clearClock() {
	allElements.forEach(element => {
		element.classList.remove('on');
	});
}

/** Main / Update Clock
----------------------------------------------------------------------------- */
function updateClock() {
	const date = new Date();
	let hours = date.getHours();
	const minutes = date.getMinutes();

	/*let hours = 22;
	let minutes = 55;*/

	// Convert 24 hour time to 12 hour
	if (hours >= 13) {
		hours -= 12;
	}
	if (parseInt(hours, 10) === 0) {
		hours = 12;
	}

	// 'Turn off' all clock elements
	clearClock();

	setClockElOn('.es');
	setClockElOn('.ist');
	
	setMinutes(minutes);
	setHour(hours, minutes);
}

/** Tick / init
----------------------------------------------------------------------------- */
setInterval(updateClock, 1000);
updateClock();
