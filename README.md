# Algoritmo de Codificação de Huffman

Este projeto implementa um algoritmo para codificar um texto em uma sequência binária utilizando o código de Huffman. O algoritmo ignora espaços e considera todas as letras em minúsculo.

## Funcionalidades

- **Entrada:** Um texto em formato string.
- **Processamento:**
  - Remove espaços e converte todo o texto para minúsculo.
  - Calcula a frequência de cada caractere.
  - Constrói uma Árvore de Huffman baseada nas frequências.
  - Gera os códigos binários correspondentes a cada caractere.
  - Codifica o texto de entrada utilizando os códigos gerados.
- **Saída:** Uma sequência binária representando o texto codificado.

## Exemplo de Entrada e Saída

### Entrada:
```plaintext
Batatinha quando nasce espalha ramas pelo chao
```

### Saída:
```plaintext
Código de Huffman: 00110011111101111110011110101011011000010001011010100101100101001110100001110111011010001010010101101100110111110011101000111100010110000001011011100
```

## Implementação

O algoritmo é implementado em JavaScript e consiste nos seguintes componentes principais:

1. **Classe `HuffmanNode`:**
   Representa um nó na Árvore de Huffman.

2. **Função `buildFrequencyMap`:**
   Constrói um mapa de frequências a partir do texto de entrada.

3. **Função `buildHuffmanTree`:**
   Constrói a Árvore de Huffman a partir do mapa de frequências.

4. **Função `generateHuffmanCodes`:**
   Gera os códigos binários para cada caractere da árvore.

5. **Função `huffmanEncode`:**
   Junta todas as etapas e retorna o texto codificado.

## Código

```javascript
// Classe para representar um nó da Árvore de Huffman
class HuffmanNode {
    constructor(char, freq) {
        this.char = char;
        this.freq = freq;
        this.left = null;
        this.right = null;
    }
}

// Função para construir o mapa de frequências
function buildFrequencyMap(text) {
    const freqMap = new Map();
    
    // Converte para minúsculas e remove espaços
    text = text.toLowerCase().replace(/\s/g, '');
    
    for (let char of text) {
        freqMap.set(char, (freqMap.get(char) || 0) + 1);
    }
    
    return freqMap;
}

// Função para construir a Árvore de Huffman
function buildHuffmanTree(freqMap) {
    // Cria uma fila de prioridade
    const pq = Array.from(freqMap.entries()).map(
        ([char, freq]) => new HuffmanNode(char, freq)
    );
    
    // Ordena os nós pela frequência
    while (pq.length > 1) {
        pq.sort((a, b) => a.freq - b.freq);
        
        // Obtém os dois nós com menor frequência
        const left = pq.shift();
        const right = pq.shift();
        
        // Cria um novo nó interno
        const internal = new HuffmanNode(null, left.freq + right.freq);
        internal.left = left;
        internal.right = right;
        
        pq.push(internal);
    }
    
    return pq[0];
}

// Função para gerar os códigos de Huffman
function generateHuffmanCodes(root) {
    const codes = new Map();
    
    function traverse(node, code = '') {
        if (node.char) {
            codes.set(node.char, code);
            return;
        }
        
        traverse(node.left, code + '0');
        traverse(node.right, code + '1');
    }
    
    traverse(root);
    return codes;
}

// Função principal para codificar o texto
function huffmanEncode(text) {
    // Remove espaços e converte para minúsculas
    text = text.toLowerCase().replace(/\s/g, '');
    
    // Constrói o mapa de frequências
    const freqMap = buildFrequencyMap(text);
    
    // Constrói a Árvore de Huffman
    const root = buildHuffmanTree(freqMap);
    
    // Gera os códigos de Huffman
    const codes = generateHuffmanCodes(root);
    
    // Codifica o texto
    let encodedText = '';
    for (let char of text) {
        encodedText += codes.get(char);
    }
    
    return encodedText;
}

// Exemplo de uso
const inputText = "Batatinha quando nasce espalha ramas pelo chao";
const encoded = huffmanEncode(inputText);
console.log(`Código de Huffman: ${encoded}`);
```
