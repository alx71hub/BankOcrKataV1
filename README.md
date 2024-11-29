# BankOcrKataV1
Probabilisitc Javascript implementation of the Bank OCR Kata: [BankOcrKataV1](BankOcrKataV1.js)

See also https://codingdojo.org/kata/BankOCR/ 

The reason why I believe a probabilistic approach to the problem makes sense is because it reminds me of the [Particle Filters](https://en.wikipedia.org/wiki/Particle_filter) algorithms, where partial observations are made.

In this case, each digit is composed/represented by several characters, each of which con be considered a partial observation of the digit representation.
