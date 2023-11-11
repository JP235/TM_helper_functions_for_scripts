const REPL = "...-...";
const minusc = [97, 122];
const mayusc = [65, 90];
const numbers = [48, 57];
const chars = [
	42, //*
	//61, //=
	63, //?
	// 126 //~
	// 8220,8221, // “ ”
];

const lonely_ = [
	"☜",
	"[",
	"]",
	"(",
	")",
	". [",
	".]",
	"“...",
	"...”",
	"‘...",
	"...’",
	'"...',
	'..."',
	"“…",
	"…”",
	"‘…",
	"…’",
	".",
	",",
	" .",
	" ,",
	". ",
	", ",
	"“",
	"”",
	" “",
	" ”",
	"“ ",
	"” ",
	"'",
	" '",
	"' ",
	"`",
	"‘",
	"’",
	" ‘",
	" ’",
	"‘ ",
	"’ ",
	".”",
	".’",
	".‘",
	".'",
	'."',
	'".',
	'"',
	' "',
	'" ',
	"—",
	" —",
	"— ",
	"!",
	" !",
	"! ",
	"?",
	" ?",
	"? ",
];

const wordPlusLower = (m) => {
	return [m.substring(0, m.length - 2), m[m.length - 1].toLowerCase()].join(
		""
	);
};

function hasReadableLetters(text) {
	if (text == REPL) return true;
	if (lonely_.includes(text)) return true;
	for (let l = 0; l < text.length; l++) {
		let cc = text.charCodeAt(l);
		if (
			(cc >= mayusc[0] && cc <= mayusc[1]) ||
			(cc >= minusc[0] && cc <= minusc[1]) ||
			(cc >= numbers[0] && cc <= numbers[1]) ||
			chars.includes(cc)
		) {
			return true;
		}
	}
	return false;
}


function unMultiSpan() {
	let content = document
		.getElementsByClassName("chapter-content")[0]
		.getElementsByTagName("p");
	console.log("ums");
	for (let ch of content) {
		if (ch.className.includes("cursor-pointer")) continue;
		// if (ch.childNodes.length>1){
		//     console.log(ch.childNodes.length)
		//     console.log(ch)
		// }
		while (ch.childNodes.length > 1) {
			let txt = ch.childNodes[0].innerText
				? ch.childNodes[0].innerText
				: ch.childNodes[0].data;
			for (let i = 1; i < ch.childNodes.length + 1; i++) {
				let e = ch.childNodes[1];
				if (e.innerText) {
					txt = [txt, e.innerText].join("");
				} else {
					txt = [txt, e.data].join("");
				}
				e.remove();
				// console.log(ch.childNodes.length)
			}
			ch.childNodes[0].innerText
				? (ch.childNodes[0].innerText = txt)
				: (ch.childNodes[0].data = txt);
		}
	}
}


function delAll(na) {
	var all_na = document.getElementsByTagName(na);
	for (let i = all_na.length; i >= 0; i--) {
		if (all_na[i] === undefined) {
			continue;
		}
		all_na[i].remove();
	}
}
const ssplay = document.createElement("span");
ssplay.setAttribute("class", "glyphicon glyphicon-play");

const sspause = document.createElement("span");
sspause.setAttribute("class", "glyphicon glyphicon-stop");

function makeButton() {
	var bton0 = document.createElement("a");
	bton0.setAttribute("class", "btn btn-success");

	bton0.style.width = "45px";
	bton0.style.marginRight = "5px";

	var spanText = document.createElement("span");
	spanText.setAttribute("class", "hidden-xs");
	// spanText.innerHTML = "ON"

	bton0.appendChild(spanText);
	bton0.appendChild(ssplay);
	bton0.setAttribute("id", "Toggle auto-next");
	return bton0;
}
function changeSpanText(el, nxit) {
	for (let e of el) {
		let fc = e.lastChild;
		let ssp = nxit ? sspause.cloneNode() : ssplay.cloneNode();
		e.replaceChild(ssp, fc);
		//console.log(e);
	}
}
function getDocHeight() {
	var D = document;
	return Math.max(
		D.body.scrollHeight,
		D.documentElement.scrollHeight,
		D.body.offsetHeight,
		D.documentElement.offsetHeight,
		D.body.clientHeight,
		D.documentElement.clientHeight
	);
}

// t = {}
// var targetProxy = new Proxy(t, {
//   set: function (target, key, value) {
//       console.log(`${key} set to ${value}`);
//       target[key] = value;
//       return true;
//   }
// });
