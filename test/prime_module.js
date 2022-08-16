

exports.generateQuantityPrimes = () =>
{
    var item = document.getElementById("quantity"); 
    return generatePrimes(item.value);
}

exports.jsPrimes = (amt) =>
{
    // Search for primes
    var num = 1;
    var primes = [amt];
    if (amt > 0) primes[0] = 2;
    amt--;
    for (var i = 0; i < amt; i++){
        var prime = false;
        while (!prime){
            num++;
            prime = true;
            for (var j = 0; j < i+1; j++)
            {
                if (num%primes[j]==0)
                {
                    prime = false;
                    break;
                }
            }
        }
        primes[i+1] = num;
    }
    return primes;
}


exports.generatePrimes = (amt) =>
{
    var primes = [];

    let useWasm = document.getElementById("useWasm").value == "wasm";

    // Get starting time
    let start = Date.now();

    if (!useWasm) { primes = jsPrimes(amt); }
    else { 
        var response = fetch("wasmPrimes.wasm");
        var buffer = response.arrayBuffer();
        var obj = WebAssembly.instantiate(buffer);
        primes = obj._Z10wasmPrimesi(amt); 
    }

    // Get ending time
    let end = Date.now();

    // Calculate total time
    let total = end-start;
    document.getElementById("time").innerHTML = 'Time: ' + total/1000 + 's for ' + (amt) + ' elements'; 

    return primes;
}

exports.printPrimes = (primes) =>
{
    let list = document.getElementById("primes");
    list.innerHTML = "";
    primes.forEach((value) => {
        var item = document.createElement("li");
        item.textContent = value;
        list.appendChild(item);
    });
    //primes.forEach(console.log);
}

//instantiateWasmPrimes();