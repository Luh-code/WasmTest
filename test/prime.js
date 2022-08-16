function generateQuantityPrimes(wasm)
{
    var item = document.getElementById("quantity"); 
    return generatePrimes(item.value, wasm);
}

function jsPrimes(amt)
{
    // Search for primes
    var num = 1;
    var primes = [amt];
    if (amt > 0) primes[0] = 2;
    for (var i = 1; i < amt; i++){
        var prime = false;
        while (!prime){
            num++;
            prime = true;
            for (var j = 0; j < i; j++)
            {
                if (num%primes[j]==0)
                {
                    prime = false;
                    break;
                }
            }
        }
        primes[i] = num;
    }
    return primes;
}

var primes = [];
var lasttime;

function compareAlgs(){
    let amt = document.getElementById("quantity").value;

    printPrimes(generatePrimes(amt, false));
    const jstime = lasttime;
    printPrimes(generatePrimes(amt, true));
    const wasmtime = lasttime;

    document.getElementById("time").innerHTML =
        "" + (jstime/1000) + "s/" + (wasmtime/1000) +
        "s (JS/WASM) for " + amt + " Prime numbers"; 
}


function generatePrimes(amt, wasm)
{

    let total = 0;
    if (!wasm) { 
        // Get starting time
        let start = Date.now();
        primes = jsPrimes(amt);
        // Get ending time
        let end = Date.now();
        // Calculate total time
        total = end-start;
    }
    else { 
        total = __Z10wasmPrimesi(amt);
    }

    document.getElementById("time").innerHTML =
        'Time: ' + total/1000 + 's for ' + (amt) + 
        ' Prime numbers'; 

    lasttime = total;
    return primes;
}

function printPrimes(primes)
{
    let list = document.getElementById("primes");
    list.innerHTML = "";
    primes.forEach((value) => {
        var item = document.createElement("li");
        item.textContent = value;
        list.appendChild(item);
    });
}