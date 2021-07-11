
function myFunc(){
    x = 19;
    console.log(x);

    function inner(){
        x = 23;
    }

    inner();
    console.log(x);
}

function capitalize(string){
    string = string.toLowerCase();
    return string[0].toUpperCase() + string.slice(1);
}

let lastLetter = string => string[string.length-1];

let number = 16;

// '' -> ''
// G -> G
// Gr -> Gr, G, Gr
// Gre -> Gre, Gr, G, Gr, Gre
// Gree -> Gree, Gre, Gr, G, Gr, Gre, Gree

function downUp(string){
    if(string.length == 0){return;}
    if(string.length == 1){
        console.log(string);
    }

    else{
        console.log(string);
        downUp(string.substring(0, string.length-1));
        console.log(string);
    }
}

function downUpIter(string){
    for (let end = string.length; end >= 1; end--){
        console.log(string.substring(0, end));
    }

    for(let end = 2; end <= string.length; end++){
        console.log(string.substring(0,end));
    }
}

