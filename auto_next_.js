
const REPL = "[.]"
const minusc = [97,122]
const mayusc = [65,90]
const numbers = [48,57]
const chars = [42, //*
               61, //=
               //63, //?
               // 126 //~
               // 8220,8221, // “ ”
              ]

const lonely_ = ['☜',
                  "[","]","(",")",". [",".]",
                  "“...","...”","‘...","...’","\"...","...\"",
                  "“…","…”","‘…","…’",
                  ".",","," ."," ,",". ",", ",
                  "“","”"," “"," ”","“ ","” ",
                  "'"," '","' ",
                  "`",
                  "‘","’"," ‘"," ’", "‘ ","’ ",
                  ".”",".’",".‘",".'",".\"","\".",
                  "\""," \"","\" ",
                  "—"," —","— ",
                  '!',' !','! ',
                  '?',' ?','? ',
                ]

const wordPlusLower = (m) => {
    return [m.substring(0,m.length-2),m[m.length-1].toLowerCase()].join('')}

function hasReadableLetters(text){
    if (text == REPL )return true
    if (lonely_.includes(text) )return true
    for (let l = 0; l < text.length; l++){
        let cc = text.charCodeAt(l)
        if (cc >= mayusc[0] && cc <= mayusc[1] ||
            cc >= minusc[0] && cc <= minusc[1] ||
            cc >= numbers[0] && cc <= numbers[1] ||
            chars.includes(cc)
           ){
            return true
        }
    }
    return false
}

var patterns = [
    //  [/ /ig," "],
    [/▶/g, "-->"],
    [/Hmph/g, "Humph"],
    [/([^a-z]*)PP([^a-z])/g,"$1player points$2"],
    [/([^a-z]*)([Pp])ow([^a-z])/g,"$1$2owh$3"],
    [/hmph/g, "humph"],
    [/\…/g, "..."],
    [/\xA0/g, " "],
    [/Sun\./ig, "Sun ."],
    [/sat\./ig, "sat ."],
    [/([^a-z]*)([Cc])ha([^a-z])/g, "$1$2hah$3"],
    [/([Ss])h\*t/g, "$1hit"],
    [/([Bb])\*tch/g, "$1itch"],
    [/([Ff])\*ck/g, "$1uck"],
    [/([^a-z]*)Ko([^a-z])/g, "$1Koh$2"],
    [/([^a-z]*)Bu([^a-z])/g, "$1Buh$2"],
    [/([^a-z]*)Gu([^a-z])/g, "$1Guh$2"],
    [/([^a-z]*)Min([^a-z])/g, "$1Minh$2"],
    [/([^a-z]*)Cai([^a-z])/g, "$1Caih$2"],
    [/([^a-z]*)Lang([^a-z])/g, "$1Langh$2"],
    [/([^a-z]*)Mi Er([^a-z])/g, "$1Mih Ehr$2"],
    [/([^a-z]*)mentor Mi([^a-z])/g, "$1mentor Mih$2"],
    // [/([^a-z]*)Qing'e([^a-z])/g, "$1Qinge$2"],
    [/-Min/g, "min"],
    [/Cāng/g, "Caeng"],
    [/Cáng/g, "Caang"],
    [/-Il/ig, "il"],
    [/-Ho/g, "ho"],
    [/-Ha/g, "ha"],
    [/Mi-[A-Z]/ig, (m) => wordPlusLower(m)],
    [/Il-[A-Z]/ig, (m) => wordPlusLower(m)],
    [/Min-[A-Z]/ig, (m) => wordPlusLower(m)],
    [/Si-[A-Z]/ig, (m) => wordPlusLower(m)]
]

function regexDealWith(text){
    for (let p of patterns){
        text = text.replaceAll(p[0],p[1])
    }
    return text
}
function unMultiSpan(){
    let content = document.getElementsByClassName("chapter-content")[0].getElementsByTagName("p")
    console.log("ums")
    for (let ch of content){
        if (ch.className.includes("cursor-pointer")) continue
        // if (ch.childNodes.length>1){
        //     console.log(ch.childNodes.length)
        //     console.log(ch)
        // }
        while (ch.childNodes.length>1 ){
            let txt = ch.childNodes[0].innerText ? ch.childNodes[0].innerText : ch.childNodes[0].data;
            for (let i = 1; i < ch.childNodes.length+1;i++){
                let e = ch.childNodes[1]
                if (e.innerText) {
                    txt = [txt, e.innerText].join("")
                }
                else{
                    txt = [txt, e.data].join("")
                }
                e.remove()
                // console.log(ch.childNodes.length)
            }
            ch.childNodes[0].innerText ? ch.childNodes[0].innerText = txt : ch.childNodes[0].data = txt
        }
    }
}

function dealWithNoReader(ps){
    console.log("dealWithNoReader")
     for (let v of ps){
        v.innerText = regexDealWith(v.innerText)
        if (v.children.length == 1 && v.children[0].outerHTML == "<br>") continue
        if (v.children.length == 1 && v.children[0].outerHTML == "<a>") continue
        if (!v.innerText || [""," "].includes(v.innerText)) continue
        if (!hasReadableLetters(v.innerText)){
            console.log(v,v.innerText)
            v.innerText = REPL
            console.log(v.innerText)
        }
    }
}
function delAll(na){
    var all_na = document.getElementsByTagName(na);
    for ( let i = all_na.length; i > 0 ; i-- ) {
        if (all_na[i] === undefined){continue};
        all_na[i].remove();
        };
}

// function getDocHeight() {
//   var D = document;
//   return Math.max(
//       D.body.scrollHeight, D.documentElement.scrollHeight,
//       D.body.offsetHeight, D.documentElement.offsetHeight,
//       D.body.clientHeight, D.documentElement.clientHeight
//   );
// }