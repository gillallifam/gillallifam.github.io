"use strict";

var obd = {
  "§tables": ["people", "addr", "hobbies"],
  addr: {},
  //search(f) { return Object.values },
  addAddres: function addAddres(adr) {
    this.addr[adr.id] = adr;
  },
  addUser: function addUser(p) {
    this.user[p.id] = p;
  },
  user: {},
  addHobbie: function addHobbie(h) {
    this.hobbie[h.id] = h;
  },
  hobbie: {}
};
console.log(obd); //console.log(e.data.data);

var JSONPrs = function JSONPrs(str) {
  return JSON.parse(str, function (key, value) {
    if (typeof value === "string" && value.startsWith("function")) {
      if (value.startsWith("function")) return (0, eval)("(" + value + ")");
    }

    return value;
  });
};

console.time("Filling");

for (var i = 1; i <= 10000; i++) {
  var id = makeid(10) + i;
  obd.addAddres({
    id: id,
    rua: makeid(5),
    n: makeid(5),
    bairro: makeid(5)
  });
  obd.addHobbie({
    id: id,
    h1: makeid(5),
    h2: makeid(5)
  });
  obd.addUser({
    id: id,
    name: makeid(5),
    age: 0.1 * i
  });
}

console.timeEnd("Filling");

function bdSearch(defs) {
  //console.log(obd);
  var result = {};
  defs.joins.forEach(function (j) {
    joinAny(obd[defs.table], j);
  }); //console.log(obd);
  //console.log(defs.job);

  result[defs.table] = Object.values(obd[defs.table])[defs.type](defs.job); //console.log(result);

  return result;
}

function joinerAny(obj, table) {
  for (p in obj) {
    obj[table] = obd[table][obj.id] || null;
  }
}

function joinAny(grp, table) {
  for (p in grp) {
    joinerAny(grp[p], table);
  }
}

function joinerAll(obj) {
  for (p in obj) {
    if (obj[p] === "§") obj[p] = obd[p][obj.id] || null;
  }
}

function joinAll(grp) {
  for (p in grp) {
    joinerAll(grp[p]);
  }
}

function tcomparer(x, s, y) {
  switch (s) {
    case ">":
      return y > x ? true : false;

    case ">=":
      return y >= x ? true : false;

    case "<=":
      return y <= x ? true : false;
  }
}

function makeid(length) {
  var result = '';
  var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;

  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return result;
}

onmessage = function onmessage(e) {
  var _e$data = e.data,
      action = _e$data.action,
      opt = _e$data.opt;

  switch (action) {
    case "search":
      console.time("search"); //console.log(opt);

      var res = bdSearch(JSONPrs(opt));
      console.timeEnd("search");
      this.postMessage({
        type: "search",
        data: res
      });
      break;

    default:
      break;
  }
};