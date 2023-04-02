/**
 * @param {number[][]} edges
 * @param {number} bob
 * @param {number[]} amount
 * @return {number}
 */
let testCases = [
  {
    edges: [
      [0, 1],
      [1, 2],
      [1, 3],
      [3, 4],
    ],
    bob: 3,
    amount: [-2, 4, 2, -4, 6],
  },
  {
    edges: [[0, 1]],
    bob: 1,
    amount: [-7280, 2350],
  },
];

var mostProfitablePath = function (edges, bob, amount) {
  //Создаем дерево в виде списка смежности и заполняем его
  const tree = Array(edges.length + 1)
    .fill(null)
    .map((item) => []);
  for (let [node1, node2] of edges) tree[node1].push(node2);
  tree[node2].push(node1);

  // DFS с вычислением стоимости пути и сохранением максимума
  const DFS = (node, parent, step) => {
    let bobsStep = node == bob ? 0 : 1e10;
    let newScore = -1e10;
    for (let children of tree[node]) {
      //DFS идет до тех пор, пока есть ребра в вершины, отличные от
      //родительской - иначе это конечные узел
      if (children == parent) continue;
      const [capacity, time] = DFS(children, node, step + 1);
      bobsStep = Math.min(bobsStep, time + 1);
      newScore = Math.max(newScore, capacity);
    }
    if (newScore == -1e10) newScore = 0;
    if (step < bobsStep) newScore += amount[node];
    else if (time == bobsStep) newScore += amount[node] / 2;

    return [newScore, bobsStep];
  };

  return DFS(0, -1, 0)[0];
};
