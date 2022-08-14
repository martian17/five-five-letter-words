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

let charmap = createLetterMap();
for(let w of fives){
    for(let c of w){
        charmap[c][w] = true;
    }
}
let charmapSizes = nullobj();
for(let c of alphLetters){
    charmapSizes[c] = Object.keys(charmap[c]).length;
}

//main code


let search = function(forbidden,n){
    if(n === 0)console.log("yay fond a result!");
    if(n === 0)return [[]];
    //try to determine the smallest subset
    let min = Infinity;
    let minc = null;
    for(let c of alphLetters){
        if(c in forbidden)continue;
        if(charmapSizes[c] < min){
            min = charmapSizes[c];
            minc = c;
        }
    }
    if(n === 5)console.log(minc);
    if(minc === null)return [];//forbidden full
    let results = [];
    for(let w in charmap[minc]){
        let good = true;//word is good
        for(let c of w){
            if(c in forbidden){
                good = false;
                break;
            }
        }
        //console.log(w);
        if(good){
            let forbidden1 = Object.create(forbidden);
            for(let c of w){
                //console.log(c);
                forbidden1[c] = true;
            }
            let res = search(forbidden1,n-1);
            for(let set of res){
                set.push(w);
                results.push(set);
            }
        }
    }
    return results;
};
console.log("searching");
let Results = search(nullobj(),5);
console.log(`result length: ${Results.length}`);

console.log("here comes the result");
console.log(Results.map(result=>{
    return result.map(w=>permmap[w]);
}));

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


