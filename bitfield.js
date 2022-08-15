let fs = require("fs");

let nullobj = function(){
    return Object.create(null);
};

let createCharSet = function(str){
    let obj = nullobj();
    for(let c of str){
        obj[c] = true;
    }
    return obj;
}


let hasNoDuplicates = function(str){
    let obj = nullobj();
    for(let i = 0; i < str.length; i++){
        if(str[i] in obj)return false;
        obj[str[i]] = true;
    }
    return true;
};

let nummap = {};
let num_reps = [];

let fives_original = (""+fs.readFileSync("./words_alpha.txt")).split("\r\n").map(w=>w.trim())
.filter(w=>w.length === 5)
.filter(w=>hasNoDuplicates(w));

for(let w of fives_original){
    let n = 0;
    for(let c of w){
        let cc = c.charCodeAt(0)-97;
        n |= (1<<cc);
    }
    if(!(n in nummap)){
        nummap[n] = [];
        num_reps.push(n);
    }
    nummap[n].push(w);
}

//main code

//'afikz', 'afikw'
let search = function(currentSet,n){
    let results = [];
    if(n === 1){
        for(let w of currentSet)results.push([w]);
        return results;
    }

    let cnt = 0;
    for(let i = 0; i < currentSet.length-1; i++){
        cnt++;
        let w1 = currentSet[i];
        let newSet = [];
        for(let j = i+1; j < currentSet.length; j++){
            let w2 = currentSet[j];
            //bitwise if no overlap
            if(!(w2 & w1))newSet.push(w2);
        }
        let r = search(newSet,n-1);
        for(let set of r){
            set.push(w1);
            results.push(set);
        }
        if(n === 5)console.log(`${Math.round(cnt/num_reps.length*1000)/10}% complete, searched subset: ${newSet.length}`);
    }
    return results;
};
console.log("searching");
let Results = search(num_reps,5);
console.log(`result length: ${Results.length}`);

console.log("here comes the result");
console.log(Results.map(result=>{
    return result.map(n=>nummap[n]);
}));


//saving the result to file
//                        map reserve, preserves the original
console.log("saving results to files");
let readable = Results.map(r=>r.map(v=>v).reverse().map(n=>{
    let ws=nummap[n];
    if(ws.length===1){
        return ws[0];
    }else{
        return `[${ws.join(", ")}]`;
    }
}).join(", ")).join("\n");
fs.writeFileSync("_result_readable.txt",readable,"utf-8");

let json = JSON.stringify(Results.map(r=>r.map(n=>nummap[n])));
fs.writeFileSync("_result.json",json,"utf-8");

let json0 = JSON.stringify(Results);
fs.writeFileSync("_result_compact.json",json0,"utf-8");
console.log("saved results to files");
