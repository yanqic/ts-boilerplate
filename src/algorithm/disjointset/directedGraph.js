/**
 * 基于Redis实现关联关系查询
 */
class RedisDirectedGraph {
    constructor() {
        this.client = redis.createClient();
    }

    async addEdge(fromVertex, toVertex) {
        const pipeline = this.client.pipeline();
        pipeline.sadd(`graph:${fromVertex}`, toVertex);
        pipeline.sadd(`graph:${toVertex}`, fromVertex);
        await pipeline.exec();
    }

    async removeEdge(fromVertex, toVertex) {
        const pipeline = this.client.pipeline();
        pipeline.srem(`graph:${fromVertex}`, toVertex);
        pipeline.srem(`graph:${toVertex}`, fromVertex);
        await pipeline.exec();
    }

    async getNeighbors(vertex) {
        const reply = await this.client.smembersAsync(`graph:${vertex}`);
        return reply.filter((v) => v.length > 0);
    }

    async getRelatedNodes(vertex) {
        const script = `
        local visited = {}
        local stack = { ARGV[1] }
        while #stack > 0 do
          local currentVertex = table.remove(stack)
          if not visited[currentVertex] then
            visited[currentVertex] = true
            local neighbors = redis.call("SMEMBERS", "graph:" .. currentVertex)
            for _, neighbor in ipairs(neighbors) do
              table.insert(stack, neighbor)
            end
          end
        end
        local result = {}
        for key, value in pairs(visited) do
          if key ~= ARGV[1] then
            table.insert(result, key)
          end
        end
        return result
      `;
        return this.client.eval(script, 0, vertex);
    }
}

module.exports = RedisDirectedGraph;
