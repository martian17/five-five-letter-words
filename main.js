let fs = require("fs");

let nullobj = function(){
    return Object.create(null);
};

let newarr = function(n){
    let arr = [];
    for(let i = 0; i < n; i++){
        arr.push(0);
    }
    return arr;
};

let createCharSet = function(str){
    let obj = nullobj();
    for(let c of str){
        obj[c] = true;
    }
    return obj;
}

let alphLetters = newarr(26).map((_,i)=>String.fromCharCode(i+97));

let createLetterMap = function(){
    let res = nullobj();
    for(let i = 0; i < alphLetters.length; i++){
        res[alphLetters[i]] = {};
    }
    return res;
};


let hasNoDuplicates = function(str){
    let obj = nullobj();
    for(let i = 0; i < str.length; i++){
        if(str[i] in obj)return false;
        obj[str[i]] = true;
    }
    return true;
};

let permmap = nullobj();

let fives_original = (""+fs.readFileSync("./words_alpha.txt")).split("\r\n").map(w=>w.trim())
.filter(w=>w.length === 5)
.filter(w=>hasNoDuplicates(w));

for(let w of fives_original){
    let ls = w.split("").sort().join("");
    if(!(ls in permmap))permmap[ls] = [];
    permmap[ls].push(w);
}

let fives = Object.keys(permmap);

let containChar = createLetterMap();
for(let w of fives){
    for(let c of w){
        containChar[c][w] = true;
    }
}
let containCharSizes = nullobj();
for(let c of alphLetters){
    containCharSizes[c] = Object.keys(containChar[c]).length;
}

let allSet = nullobj();
for(let w of fives){
    allSet[w] = true;
}


let notContainChar = createLetterMap();
for(let w of fives){
    let cs = createCharSet(w);
    for(let c of alphLetters){
        if(c in cs)continue;
        notContainChar[c][w] = true;
    }
}
let notContainCharSizes = nullobj();
for(let c of alphLetters){
    notContainCharSizes[c] = Object.keys(notContainChar[c]).length;
}

//main code

//'afikz', 'afikw'
let search = function(currentSet,n){
    if(n === 1 && currentSet.length > 0)console.log("yay fond a result! last members:",currentSet.map(w=>permmap[w]));
    if(n === 1)return currentSet.map(w=>[w]);

    let results = [];
    let cnt = 0;
    for(let i = 0; i < currentSet.length-1; i++){
        cnt++;
        let w1 = currentSet[i];
        let newSet = [];
        let forbidden = createCharSet(w1);
        for(let j = i+1; j < currentSet.length; j++){
            let w2 = currentSet[j];
            let good = true;
            for(let c of w2){
                if(c in forbidden){
                    good = false;
                    break;
                }
            }
            if(!good)continue;
            newSet.push(w2);
            //console.log(w2);
        }
        //console.log(newSet.length);
        //break;
        let r = search(newSet,n-1);
        for(let set of r){
            set.push(w1);
            results.push(set);
        }
        if(n === 5)console.log(`${Math.round(cnt/fives.length*1000)/10}% complete, sorted word: ${w1}, searched subset: ${newSet.length}`);
    }
    return results;
};
console.log("searching");
let Results = search(fives,5);
console.log(`result length: ${Results.length}`);

console.log("here comes the result");
console.log(Results.map(result=>{
    return result.map(w=>permmap[w]);
}));

//                        map reserve, preserves the original
console.log("saving results to files");
let rr = Results.map(r=>r.map(v=>v).reverse().map(wp=>{
    let ws=permmap[wp];
    if(ws.length===1){
        return ws[0];
    }else{
        return `[${ws.join(", ")}]`;
    }
}).join(", ")).join("\n");
fs.writeFileSync("result_readable.txt",rr,"utf-8");

let json = JSON.stringify(Results.map(r=>r.map(wp=>permmap[wp])));
fs.writeFileSync("result.json",json,"utf-8");

let json0 = JSON.stringify(Results);
fs.writeFileSync("result_compact.json",json0,"utf-8");
console.log("saved results to files");

/*
let searchWordList = function(forbiddens,n){
    for(let c of alphLetters){
        if(c in forbiddens)continue;

    }
};

console.log("calculating");
let results = searchWordList(nullobj());


for(let i = 0; i < fives.length; i++){
    let forbiddens = nullobj();
    for(let i = 0; i < 5; i++){

    }
    let word = fives[i];

}*/


