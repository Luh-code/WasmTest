//#include <stdio.h>
#include <chrono>
#include <emscripten.h>

long wasmPrimes(int amt)
{
    std::chrono::time_point<std::chrono::system_clock> start, end;
    std::chrono::duration<double> elapsed_seconds;

    start = std::chrono::system_clock::now(); 

    int num = 1;
    int* primes = new int[amt];
    if (amt > 0) primes[0] = 2;
    for (int i = 1; i < amt; i++)
    {
        bool prime = false;
        while(!prime)
        {
            num++;
            prime = true;
            for (int j = 0; j < i; j++)
            {
                if (num%primes[j]==0)
                {
                    prime = false;
                    break;
                }
            }
        }
        primes[i] = num;
        /*EM_ASM({
            primes[$1] = $0;
        }, num, i+1);*/
    }
    
    end = std::chrono::system_clock::now(); 
    elapsed_seconds = end-start;

    for (int i = 0; i < amt; i++)
    {
        EM_ASM({
            primes[$1] = $0;
        }, primes[i], i);
    }

    return static_cast<long>(elapsed_seconds.count()*1000);
}