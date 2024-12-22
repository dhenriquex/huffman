// Classe para representar um nó na árvore de Huffman
class HuffmanNode {
    constructor(symbol, frequency) {
        this.symbol = symbol; // Caractere ou símbolo
        this.frequency = frequency; // Frequência do símbolo
        this.left = null; // Subárvore esquerda
        this.right = null; // Subárvore direita
    }
}

// Função para construir o mapa de frequências
function createFrequencyMap(inputText) {
    const frequencyMap = new Map();

    // Converter texto para letras minúsculas e remover espaços
    inputText = inputText.toLowerCase().replace(/\s/g, '');

    // Contar a frequência de cada caractere
    for (let character of inputText) {
        frequencyMap.set(character, (frequencyMap.get(character) || 0) + 1);
    }

    return frequencyMap;
}

// Função para construir a árvore de Huffman
function constructHuffmanTree(frequencyMap) {
    // Criar uma fila de prioridade a partir do mapa de frequências
    const priorityQueue = Array.from(frequencyMap.entries()).map(
        ([symbol, frequency]) => new HuffmanNode(symbol, frequency)
    );

    // Ordenar os nós pela frequência
    while (priorityQueue.length > 1) {
        priorityQueue.sort((a, b) => a.frequency - b.frequency);

        // Pegar os dois nós com as menores frequências
        const leftNode = priorityQueue.shift();
        const rightNode = priorityQueue.shift();

        // Criar um novo nó interno com a soma das frequências
        const parentNode = new HuffmanNode(null, leftNode.frequency + rightNode.frequency);
        parentNode.left = leftNode;
        parentNode.right = rightNode;

        priorityQueue.push(parentNode);
    }

    // Retornar a raiz da árvore de Huffman
    return priorityQueue[0];
}

// Função para gerar os códigos de Huffman
function generateHuffmanCodes(treeRoot) {
    const huffmanCodes = new Map();

    // Função recursiva para percorrer a árvore
    function traverseTree(node, currentCode = '') {
        if (node.symbol) {
            // Se for uma folha, associar o símbolo ao código
            huffmanCodes.set(node.symbol, currentCode);
            return;
        }

        // Percorrer subárvore esquerda com "0"
        traverseTree(node.left, currentCode + '0');
        // Percorrer subárvore direita com "1"
        traverseTree(node.right, currentCode + '1');
    }

    traverseTree(treeRoot);
    return huffmanCodes;
}

// Função principal para codificar texto usando Huffman
function encodeWithHuffman(inputText) {
    // Preparar o texto
    inputText = inputText.toLowerCase().replace(/\s/g, '');

    // Criar o mapa de frequências
    const frequencyMap = createFrequencyMap(inputText);

    // Construir a árvore de Huffman
    const huffmanTreeRoot = constructHuffmanTree(frequencyMap);

    // Gerar os códigos de Huffman
    const huffmanCodes = generateHuffmanCodes(huffmanTreeRoot);

    // Codificar o texto
    let encodedString = '';
    for (let character of inputText) {
        encodedString += huffmanCodes.get(character);
    }

    return encodedString;
}

// Exemplo de uso
const exampleText = "Batatinha quando nasce espalha ramas pelo chao";
const huffmanEncodedText = encodeWithHuffman(exampleText);
console.log(`Texto codificado com Huffman: ${huffmanEncodedText}`);
