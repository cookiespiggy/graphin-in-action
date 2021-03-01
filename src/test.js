const users = [
  {
    name: "name3",
    order: 3,
  },
  {
    name: "name1",
    order: 1,
  },
  {
    name: "name2",
    order: 2,
  },
];

users.sort((a, b) => (a.order > b.order) ? 1 : -1);
console.log(users);
