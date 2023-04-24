const vectors = [
    [1, 2, 3],
    [2, 3, 4],
    [1, 2, 4],
    [4, 5, 6],
    [1, 2, 5],
    [2, 2, 2]
];

// 构建倒排索引
const invertedIndex = {};
vectors.forEach((v, index) => {
    v.forEach((value) => {
        if (!invertedIndex[value]) {
            invertedIndex[value] = [];
        }
        invertedIndex[value].push(index);
    });
});

const queryVector = [1, 2, 2];

const cosineSimilarity = (v1, v2) => {
    const dotProduct = v1.reduce((sum, value, index) => sum + value * v2[index], 0);
    const magnitudeV1 = Math.sqrt(v1.reduce((sum, value) => sum + value ** 2, 0));
    const magnitudeV2 = Math.sqrt(v2.reduce((sum, value) => sum + value ** 2, 0));
    return dotProduct / (magnitudeV1 * magnitudeV2);
};

// 找到包含查询向量的所有向量
const similarVectors = [];
queryVector.forEach((value) => {
    const vectors = invertedIndex[value] || [];
    vectors.forEach((vectorIndex) => {
        if (similarVectors.indexOf(vectorIndex) === -1) {
            similarVectors.push(vectorIndex);
        }
    });
});

// 计算相似度
const cosineSimilarities = similarVectors.map((vectorIndex) => ({
    vector: vectors[vectorIndex],
    cosineSimilarity: cosineSimilarity(queryVector, vectors[vectorIndex])
}));

// 排序
const sortedCosineSimilarities = cosineSimilarities.sort((a, b) => b.cosineSimilarity - a.cosineSimilarity);

// 取前三个
const topThreeSimilarVectors = sortedCosineSimilarities.slice(0, 3);

console.log(
    topThreeSimilarVectors
        .map((v, index) => `Top ${index + 1}: Vector ${v.vector} - Cosine Similarity=${v.cosineSimilarity}`)
        .join('\n')
);
