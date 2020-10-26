module.exports = {
  path: "./file.csv",
  schema: [
    {
      label: "produits",
      id: false,
      columns: [
        {
          label: "id",
          foreign: false,
          target: "id",
          unique: true,
        },
        {
          label: "Gamme",
          foreign: { table: "gammes", column: "designation" },
          target: "id_gamme",
        },
        {
          label: "Ss-Famille",
          foreign: { table: "sous_familles", column: "designation" },
          target: "id_sous_famille",
        },
        {
          label: "Produit",
          foreign: false,
          target: "designation",
        },
        {
          label: "Unite Energ.",
          foreign: {
            table: "unite",
            column: "designation",
          },
          target: "id_unite",
        },
      ],
    },
    {
      label: "gammes",
      id: true,
      columns: [
        {
          label: "Gamme",
          foreign: false,
          target: "designation",
          unique: true,
        },
      ],
    },
    {
      label: "sous_famille",
      id: true,
      columns: [
        {
          label: "Famille",
          foreign: {
            table: "familles",
            column: "designation",
          },
          target: "id_famille",
        },
        {
          label: "Ss-Famille",
          foreign: false,
          target: "designation",
          unique: true,
        },
      ],
    },
    {
      label: "familles",
      id: true,
      columns: [
        {
          label: "Famille",
          foreign: false,
          target: "designation",
          unique: true,
        },
      ],
    },
    {
      label: "unites",
      id: true,
      columns: [
        {
          label: "Unite Energ.",
          foreign: false,
          target: "designation",
        },
      ],
    },
  ],
  writeJSON: true,
};
