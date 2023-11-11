// ==UserScript==
// @name         regex_novelfull
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://readnovelfull.com/*
// @match        https://allnovelfull.com/*
// @match        https://novelfull.com/*
// @match        https://freewebnovel.com/*
// @match        https://readnovelfull.me/*
// @require      https://raw.githubusercontent.com/JP235/TM_helper_functions_for_scripts/master/auto_next_.js
// @grant        none
// ==/UserScript==
/* globals jQuery, $,
REPL,
getDocHeight,
delAll,
dealWithNoReader,
makeButton,
ssplay,
sspause,
changeSpanText,
wordPlusLower,
hasReadableLetters
*/

var patternsRegex = [
    //  [/ /ig," "],
    makePattern("Su Ya"),
    makePattern("Rem",2),
    makePattern("Ya"),
    makePattern("ya"),
    makePattern("Gao",2),
    makePattern("Fa"),
    makePattern("En",1),
    makePattern("Ce"),
    makePattern("Ci"),
    makePattern("Xi"),
    makePattern("Wa"),
    makePattern("Mi"),
    makePattern("Xu"),
    makePattern("Ke"),
    makePattern("ke"),
    makePattern("Ka"),
    makePattern("ka"),
    makePattern("Ze"),
    makePattern("Di"),
    makePattern("di"),
    makePattern("Da"),
    makePattern("da"),
    makePattern("Gu"),
    [/evildoers /g, "evil-doers "],
    [/Psy([^a-z])/g, "Psi$1"],
    [/\( NovelFull \)/g, ""],
    [/([Mm])a’am./g, "$1adam "],
    [/END/g, " Endurance"],
    [/STR/g, " Strength"],
    [/DEX/g, " Dexterity"],
    [/INT/g, " Intelligence"],
    [/MYS/g, " Mysterious"],
    [/CHA/g, " Charm"],
    [/LUK/g, " Luck"],
    [/([Cc])r\*p/g, "$1rap"],
    [/([Dd])\*mn/g, "$1amn"],
    [/ \*ss/g, " ass"],
    [/\*ss/g, "Ass"],
    [/([Ss])h\*t/g, "$1hit"],
    [/([Bb])\*tch/g, "$1itch"],
    [/([Bb])\*ll(s)*/g, "$1all$2"],
    [/([Bb])\*stard/g, "$1astard"],
    [/([Ff])\*ck/g, "$1uck"],
    [/([Ff])\**k/g, "$1uck"],
    [/([Ff])u\*k/g, "$1uck"],
    // makePattern("An",1),
    [/Umhp/g, "Umph"],
    [/Type-i/ig, "Type-1"],
    [/Su Su/g, "Susu"],
    [/Xiao Han/g, "Han Xiao"],
    [/Cycy/g, "Cicy"],
    [/([^a-z]*)Wan([^a-z])/g, "$1Wahn$2"],
    [/([^a-z]*)Pu([^a-z])/g, "$1Phu$2"],
    [/([^a-z]*)Ge([^a-z])/g, "$1Geh$2"],
    [/([^a-z]*)Kui([^a-z])/g, "$1Kuih$2"],
    [/([^a-z]*)Ba([^a-z])/g, "$1Bah$2"],
    [/([^a-z]*)Ko([^a-z])/g, "$1Koh$2"],
    [/([^a-z]*)Bu([^a-z])/g, "$1Buh$2"],
    [/([^a-z]*)Gu([^a-z])/g, "$1Guh$2"],
    [/([^a-z]*)Min([^a-z])/g, "$1Minh$2"],
    [/([^a-z]*)Cai([^a-z])/g, "$1Caih$2"],
    [/([^a-z]*)Lang([^a-z])/g, "$1Langh$2"],
    [/([^a-z]*)([Pp])ow([^a-z])/g, "$1$2owh$3"],
    [/([^a-z]*)Mi Er([^a-z])/g, "$1Mih Ehr$2"],
    [/([^a-zA-Z]*)IN([^a-zA-Z])/gm, "$1In$2"],
    [/([^a-zA-Z]*)IT([^a-zA-Z])/gm, "$1It$2"],
    [/\(TN:[^\(]*\)/gm, ""],
    [/CTOS/gm, "CTos"],
    [/\([a-z]*\) *$/gim, "\n"],
    [/▶/g, "-->"],
    [/http.*\//gm, ""],
    [/Hmph/g, "Humph"],
    [/BEar/g, "Bear"],
    [/Hm /g, "Hmm "],
    [/([^a-zA-Z]*)Mm([^a-zA-Z])/g, "$1Mmm$2"],
    [/([^a-zA-Z])mm([^a-zA-Z])/g, "$1mmm$2"],
    [/Xixi/g, "Xixih"],
    [/hmph/g, "humph"],
    [/\…/g, "..."],
    [/\xA0/g, " "],
    [/Sun\./gi, "Sun ."],
    [/Ruyue/gi, "Riue"],
    [/sat\./gi, "sat ."],
    [/([^a-z]*)([Cc])ha([^a-z])/g, "$1$2hah$3"],
    [/KaTalk/g, "KahTalk"],
    [/Arachne/g, "Arachhne"],
    [/([^a-z]*)mentor Mi([^a-z])/g, "$1mentor Mih$2"],
    // [/([^a-z]*)Qing'e([^a-z])/g, "$1Qinge$2"],
    [/-Min/g, "min"],
    [/Cāng/g, "Caeng"],
    [/Cáng/g, "Caang"],
    [/-Il/gi, "il"],
    [/-Ho/g, "ho"],
    [/-Ha/g, "ha"],
    [/([^a-z]*)\*([^a-z]*)/gm, "$1'$2"],
    [/Mi-[A-Z]/g, (m) => wordPlusLower(m)],
    [/Il-[A-Z]/g, (m) => wordPlusLower(m)],
    [/Min-[A-Z]/g, (m) => wordPlusLower(m)],
    [/Si-[A-Z]/g, (m) => wordPlusLower(m)],
    [/Chah Chah/g, "Chacha"],
    [/Kristi. Langh/g, "Kristi Langh"],
    [/MB. Freeman/g, "Freeman"],
    [/Gleason. Dodge/g, "Gleason Dodge"],
    [/Aikenseth/g, "Aiken"],
];
var patternsIncludes = [
    "broken links, non-standard content",
    "Translator:",
    "Editor:",
    "oxnove",
    "our website is running thanks to our ads",
    "you could also subscribe",
    "AzureOrchid92",
    "Atlas Studios",
    "You’re reading on NovelFull",
]
var patternsStarts = [
    "Translator:",
    "Translated by",
    "Edited by",
]

function logDiffStrs(a, b) {
    var maxLength = Math.max(a.length, b.length);
    var diff = []
    var diff1 = []

    for (var i = 0; i < maxLength; i++) {
        if (a[i] !== b[i]) {
            diff.push(a[i])
            diff1.push(b[i])
            // console.log("Difference at position", i, ":", a[i], "->", b[i]);
        }
    }
    return [diff.join(""),diff1.join("")]
}

function makePattern(word,variation){
    let outWord
    let pattStart
    if (!variation){
        outWord = word+"h"
    }else{
        outWord = word.slice(0,-variation)+"h"+word.slice(-variation)
    }
    if (word[0] === word[0].toUpperCase()){
        pattStart = "([^a-zA-Z]*)"
    } else {
        pattStart = "([^a-zA-Z])"
    }
    return [new RegExp(pattStart+word+"([^a-z])" ,"gm"), "$1"+outWord+"$2"]
}

var state = false

function toggleRemovedLines() {
    let elements = document.getElementsByClassName("removedLine");
    let elements2 = document.getElementsByClassName("changed-line");
    Array.from(elements).forEach(e => {
        e.style.display = state ? "none": "block"
    })
    Array.from(elements2).forEach(e => {
        e.setAttribute("class", state ? "changed-line": "show changed-line")
    })
    state = !state

}
var style = document.createElement("style");
//@ignore
style.innerHTML = "\
.show.changed-line::after { \
content: attr(data) \n;\
color: blue ;\
} \
.removedLine {display: none;} \
.toggleRemovedLines { background: transparent; } \
.toggleRemovedLines:hover { background: black; }";
document.head.appendChild(style);
let lastchildChapCont
let content
try {
    content = document.getElementsByClassName("chapter container")[0]
    lastchildChapCont = document.getElementById("chapter-content").lastChild
}catch {
    content = document.getElementsByClassName("chr-c")[0]
    lastchildChapCont = document.getElementById("chr-content").lastChild
}
const ps = content.querySelectorAll('p,li,b')

var bton0 = document.createElement("button");

bton0.setAttribute("class", "toggleRemovedLines");
bton0.style.width = "45px";
bton0.style.height = "45px";
bton0.style.marginRight = "5px";
bton0.style.position = "fixed"
bton0.style.top = "10px"
bton0.style.right = "0"
// bton0.style.backgroundColor = "transparent"
bton0.style.border = "transparent"

bton0.onclick = toggleRemovedLines
content.appendChild(bton0);

(function() {
    'use strict';

    function regexDealWith(v) {
        // console.log("regex")
        let text = v.innerText
        for (let p of patternsRegex) {
            text = text.replaceAll(p[0], p[1]);
            text = text.replaceAll(p[0], p[1]); //Ka ka ka! > Kah kah ka! > Kah kah kah!
        }
        if (v.innerText != text) {
            v.setAttribute("data", v.innerText);
            v.setAttribute("class", "changed-line");
            // console.log(logDiffStrs(v.innerText,text))
        }
        return text
    }
    function removeLines(v) {
        // console.log(text)
        for (let p of patternsStarts) {
            // removeIncludes(v,p)
            if (v.innerText.startsWith(p)){
                console.log("startsWith",p,"\n",v.innerText)
                // v.style = "display:none";
                v.className = "removedLine"
                return true}
        }
        for (let p of patternsIncludes) {
            // removeIncludes(v,p)
            if (v.innerText.includes(p)){
                console.log("includes:",p,"\n",v.innerText)
                // v.style = "display:none";
                v.className = "removedLine"
                return true}
        }
        return false
    }

    function dealWithNoReader(ps) {

        console.log("----------------");
        console.log("");
        console.log("dealWithNoReader");
        const arrPs = Array.from(ps)
        arrPs.push(lastchildChapCont)
        for (let [i,v] of arrPs.entries()) {
            // console.log(i)
            v.innerText = regexDealWith(v) // much much much faster than modifying v inside the function
            if (removeLines(v)) continue

            if (!v.innerText || ["", " "].includes(v.innerText)) continue;

            if (!hasReadableLetters(v.innerText)) {
                console.log(v, v.innerText);
                v.innerText = REPL;
                console.log(v.innerText);
            }

            if (/[a-z]| /.test(v.innerText.charAt(0)) &&
                (/([a-z0-9]| [^\.])/.test(arrPs[i-1].innerText.slice(-1)))) {
                console.log(v.innerText);
                console.log(arrPs[i-1].innerText.slice(-1))
                arrPs[i-1].innerText = arrPs[i-1].innerText + " " + v.innerText
                v.innerText = ""
            }
        }
        console.log("");
        console.log("----------------");

    }
    dealWithNoReader(ps)
})();