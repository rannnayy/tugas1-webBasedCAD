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

function isVertexSame(v1, v2) {
  return v1[0] == v2[0] && v1[1] == v2[1];
}

function SortVertices(list) {
  let temp = [list[0]];
  let currVertex = list[0];
  let lastVertex = [-99, -99];

  while (temp.length < list.length) {
    let nearestDistance = 100;
    let nearestVertex = null;

    for (vertex of list) {
      let tempDistance =
        (vertex[0] - currVertex[0]) ** 2 + (vertex[1] - currVertex[1]) ** 2;
      if (
        !isVertexSame(vertex, currVertex) &&
        !isVertexSame(vertex, lastVertex) &&
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

  let hull1 = DAndC(p1, pn, s1);
  let hull2 = DAndC(pn, p1, s2);

  hull2.forEach(function (point) {
    hull1.push(point);
  });

  let resultBucket = [];
  getUnique(hull1).forEach(function (item) {
    resultBucket.push([item[0] / 100, item[1] / 100]);
  });

  return SortVertices(resultBucket);
}
