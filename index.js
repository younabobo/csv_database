const fs = require("fs");
const { path, schema, writeJSON } = require("./config");
const file = fs.readFileSync(path).toString();
const all = file.split("\n").map((x) => x.split(","));
const header = all[0];
const data = all.slice(1);
const json = data.map((line) =>
  line.reduce((acc, box, ind) => ({ ...acc, [header[ind]]: box }), {})
);
if (writeJSON) fs.writeFileSync("./file.json", JSON.stringify(json));

// Main part
// Reorder tables based on foreign keys (Tables with no foreign keys come first)

schema.sort(
  (a, b) =>
    Object.keys(a.columns).filter(
      (key) =>
        a.columns[key].foreign && a.columns[key].foreign.table === b.label
    ) && -1
);
const files = schema.map(({ label, id, columns }) => ({
  label,
  data: json
    .map((line, ind) =>
      Object.keys(line)
        .filter((cell) => {
          return columns.map(({ label }) => label).includes(cell);
        })
        .map((key) => line[key])
    )
    .reduce((
      acc,
      cur // data lines
    ) => {
      const reducedData = columns
        .reduce((acc, cur, ind) => (cur.unique ? [...acc, ind] : acc), [])
        .map((ind) => cur[ind]);
      const filteredData = reducedData.reduce(
        (ac, cur) =>
          acc.filter((val) => {
            return val.includes(cur);
          }).length
            ? ac
            : [...ac, cur],
        []
      ).length;
      return !filteredData ? acc : [...acc, reducedData];
    }, []),
}));
console.log(JSON.stringify(files));
