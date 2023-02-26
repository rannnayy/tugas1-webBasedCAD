function getMostLeftAndRight(list) {
  let right = [-99, -99];
  let left = [99, 99];

  list.forEach(function (point) {
    if (point[0] > right[0]) {
      right = point;
    }
    if (point[0] < left[0]) {
      left = point;
    }
  });

  return [left, right];
}

function isVertexNotInList(v1, list) {
  let bool = true
  for(item of list){
    if(item[0] == v1[0] && item[1] == v1[1]){
      bool = false
      break
    }
  }
  return bool
}

function SortVertices(list) {
  let [a,_] = getMostLeftAndRight(list)
  let temp = [a];
  let currVertex = a;

  while (temp.length < list.length) {
    let nearestDistance = 100;
    let nearestVertex = null;

    for (vertex of list) {
      let tempDistance =
        (vertex[0] - currVertex[0]) ** 2 + (vertex[1] - currVertex[1]) ** 2;
      if (
        isVertexNotInList(vertex, temp) &&
        tempDistance < nearestDistance
      ) {
        nearestDistance = tempDistance;
        nearestVertex = vertex;
      }
    }

    temp.push(nearestVertex);
    lastVertex = currVertex;
    currVertex = nearestVertex;
  }

  return temp;
}

function getUnique(list) {
  let output = [];
  for (let i = 0; i < list.length; i++) {
    let condition = true;
    for (let j = i + 1; j < list.length; j++) {
      if (list[i] === list[j]) {
        condition = false;
      }
    }
    if (condition) {
      output.push(list[i]);
    }
  }
  return output;
}

function farthestPoint(p1, p2, list) {
  let m = (p2[1] - p1[1]) / (p2[0] - p1[0]);
  let a = m;
  let b = -1;
  let c = p1[1] - p1[0] * m;
  let maks = 0;
  let pointMaks = null;

  list.forEach(function (point) {
    let temp =
      Math.abs(a * point[0] + b * point[1] + c) / Math.sqrt(a * a + b * b);
    if (temp > maks) {
      pointMaks = point;
      maks = temp;
    }
  });

  return pointMaks;
}

function Determinant(p1, p2, pTest) {
  return (
    p1[0] * p2[1] +
    pTest[0] * p1[1] +
    p2[0] * pTest[1] -
    pTest[0] * p2[1] -
    p2[0] * p1[1] -
    p1[0] * pTest[1]
  );
}

function OuterPoint(p1, p2, s) {
  let temp = [];
  s.forEach(function (point) {
    let det = Determinant(p1, p2, point);
    if (det > 0) {
      temp.push(point);
    }
  });

  return temp;
}

function DAndC(p1, p2, s) {
  console.log("p1", p1);
  console.log("p2", p2);
  console.log("s", s);
  let hull = [];
  if (s.length == 0) {
    hull = [p1, p2];
  } else if (s.length == 1) {
    hull = [p1, p2, s[0]];
  } else {
    let pmaks = farthestPoint(p1, p2, s);
    let s1 = OuterPoint(p1, pmaks, s);
    s1 = removeSpecificElement(pmaks, s1)
    let s2 = OuterPoint(pmaks, p2, s);
    s2 = removeSpecificElement(pmaks,s2)
    let hull1 = DAndC(p1, pmaks, s1);
    let hull2 = DAndC(pmaks, p2, s2);
    hull2.forEach(function (point) {
      hull1.push(point);
    });
    hull = hull1;
  }
  return hull;
}

function removeSpecificElement(value, list){
  temp = []

  for(item of list){
    if(item[0] != value[0] && item[1] != value[1]){
      temp.push(item)
    }
  }

  return temp
}

function ConvexHull(bucket) {
  let tempBucket = [];
  bucket.forEach(function (point) {
    tempBucket.push([point[0] * 100, point[1] * 100]);
  });
  let [p1, pn] = getMostLeftAndRight(tempBucket);

  let s1 = [];
  let s2 = [];
  tempBucket = removeSpecificElement(p1, tempBucket)
  tempBucket = removeSpecificElement(pn, tempBucket)
  tempBucket.forEach(function (point) {
    let det = Determinant(p1, pn, point);

    if (det > 0) {
      s1.push(point);
    } else if (det < 0) {
      s2.push(point);
    }
  });

  console.log("p1", p1);
  console.log("pn", pn);
  console.log("s1", s1);
  console.log("s2", s2);

  let hull1 = DAndC(p1, pn, s1);
  let hull2 = DAndC(pn, p1, s2);

  console.log("hull1", hull1);
  console.log("hull2", hull2);

  hull2.forEach(function (point) {
    hull1.push(point);
  });

  console.log("hull1", getUnique(hull1));

  let resultBucket = getUnique(hull1);
  resultBucket.forEach(function (item) {
    item[0] /= 100
    item[1] /= 100
  });

  return SortVertices(resultBucket);
}


a = [
  [-0.5224719101123596, 0.8670411985018727],
  [-0.8520599250936329, 0.6385767790262172],
  [-0.8445692883895132, 0.2752808988764045],
  [0.3295880149812734, 0.028089887640449437],
  [0.9812734082397003, 0.5880149812734082],
  [0.47752808988764045, 0.9438202247191011],
];

b = [
  [-0.7153558052434457, 0.8651685393258427],
  [-0.7734082397003745, 0.5936329588014981],
  [0.020599250936329586, 0.8876404494382022],
  [0.6404494382022472, 0.7434456928838952],
  [0.6797752808988764, 0.24344569288389514],
];

console.log(ConvexHull(b))