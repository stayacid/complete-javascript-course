// ///////////////////////////////
// CODING CHALLENGE

/*

Suppose that you're working in a small town administration, and you're in charge of two town elements:
1. Parks
2. Streets

It's a very small town, so right now there are only 3 parks and 4 streets. All parks and streets have a name and a build year.

At an end-of-year meeting, your boss wants a final report with the following:
1. Tree density of each park in the town (forumla: number of trees/park area)
2. Average age of each town's park (forumla: sum of all ages/number of parks)
3. The name of the park that has more than 1000 trees
4. Total and average length of the town's streets
5. Size classification of all streets: tiny/small/normal/big/huge. If the size is unknown, the default is normal

All the report data should be printed to the console.

HINT: Use some of the ES6 features: classes, subclasses, template strings, default parameters, maps, arrow functions, destructuring, etc.

*/

class Basic {
  constructor(name, build) {
    this.name = name;
    this.build = build;
  }
}

class Park extends Basic {
  constructor(name, build, trees, area) {
    super(name, build);
    this.trees = trees;
    this.area = area;
  }

  density() {
    return this.trees / this.area;
  }

  age() {
    return new Date().getFullYear() - this.build;
  }
}

class Street extends Basic {
  constructor(name, build, length) {
    super(name, build);
    this.length = length;
  }

  static setType() {
    if (this.street.length >= 10) {
      this.type = 'huge';
    } else if (this.street.length >= 7.5) {
      this.type = 'big';
    } else if (this.street.length <= 2.5) {
      this.type = 'small';
    } else {
      this.type = 'normal';
    }
  }
}

const allParks = [new Park('Green Park', 1982, 3584, 3), new Park('National Park', 1970, 7808, 6), new Park('Oak Park', 1990, 980, 1)];
const allStreets = [new Street('Ocean Avenue', 1999, 7.5), new Street('Evergreen Street', 2008, 2.5), new Street('4th Street', 2015), new Street('Sunset Boulevard', 1982, 12)];

// PARKS REPORT
function parkReport(p) {
  console.log('---PARKS REPORT---');

  // log average age
  const averageAge = () => {
    let allAges = 0;
    p.forEach((park) => {
      allAges += park.age();
    });
    return allAges / 3;
  };
  console.log(`Our ${p.length} parks have an average age of ${averageAge()} years`);

  // log density
  p.forEach((park) => {
    console.log(`${park.name} has a tree density of ${park.density()} trees per square km`);
  });

  // name of park with more than 1000 trees
  const denseParks = () => {
    const names = [];
    p.forEach((park) => {
      if (park.trees >= 1000) {
        names.push(park.name);
      }
    });
    return names;
  };

  if (denseParks().length > 0) {
    console.log(`${denseParks().join(', ')} ${denseParks().length >= 2 ? 'have' : 'has'} more than 1000 trees`);
  } else {
    console.log('No park has more than 1000 trees');
  }
}
parkReport(allParks);

// STREETS REPORT
function streetReport(s) {
  console.log('---STREETS REPORT---');
  // log total length and average
  const totalLength = () => {
    let total = 0;
    s.forEach((street) => {
      if (street.length > 0) {
        total += street.length;
      }
    });
    return total;
  };
  console.log(`Our ${s.length} streets have a total length of ${totalLength()} with an average of ${totalLength() / s.length} km`);

  // log all streets types
  s.forEach((street) => {
    street.setType();
  });
  /* for (let [key, value] of streetType) {
    console.log(`${key} = ${value}`);
  } */

  for (const street of s) {
    console.log(`${street.name}, built in ${street.build}, is a ${street.type} street`);
  };
}

streetReport(allStreets);
