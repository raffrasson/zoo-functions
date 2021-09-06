const data = require('./data');

function getSpeciesByIds(...ids) {
  return data.species.filter((elem) => ids.includes(elem.id)); // filter cria um novo array com os elementos que retornem true no teste. No caso, o teste vê se o id do elemento está dentro dos ids passados por parâmetro.
}

function getAnimalsOlderThan(animal, age) {
  const specie = data.species.find((el) => el.name === animal); // salva um objeto com os dados da espécie de animal passada por parâmetro.
  return specie.residents.every((el) => el.age > age); // retorna o resultado da comparação de idade dos animais da referida espécie.
}

function getEmployeeByName(employeeName) {
  if (employeeName === undefined) {
    return {}; // se não for passado parametro, o retorno é um objeto vazio.
  }
  return data.employees.find((el) => el.firstName === employeeName || el.lastName === employeeName); // retorna o objeto que contenha o primeiro ou o segundo nome igual ao parametro passado.
}

function createEmployee(personalInfo, associatedWith) {
  const newCollab = { ...personalInfo, ...associatedWith }; // cria objeto com os parâmetros.
  return newCollab;
}

function isManager(id) {
  return data.employees.some((employee) => employee.managers.includes(id)); // acessa as pessoas funcionárias e busca pelo id passado nos campos de pessoas gerentes.
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  const newEmployee = { // cria objeto com dados da nova pessoa funcionária.
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  };
  data.employees.push(newEmployee);
}

function countAnimals(species) {
  if (species === undefined) { // se não receber espécie retorna animais e quantidades.
    return data.species.reduce((acc, specie) => { // esse reduce adiciona um par chave valor para cada espécie dentro de um objeto (passado como valor inicial).
      acc[specie.name] = specie.residents.length; // como o valor inicial do acumulador é um objeto, podemos incluir chave e valor com essa sintaxe.
      return acc; // no fim retorna-se o objeto completo.
    }, {});
  }
  return data.species.find((typeOfAnimal) => typeOfAnimal.name === species).residents.length; // caso passada uma espécie, busca o elemento com nome igual e retorna o tamanho do elemento que guarda os animais.
}

function calculateEntry(entrants) {
  // depois de muita dificuldade consegui achar o meu erro referenciando a solução do Leonardo Bermejo, da turma 14A: https://github.com/tryber/sd-014-a-project-zoo-functions/pull/102/files.
  // minha falha foi não perceber a possibilidade de usar a notação objeto[chave] para acessar o valor da chave.
  if (entrants === undefined || Object.keys(entrants).length === 0) { // retorna 0 caso não haja parametro ou o objeto seja vazio (tamanho 0)
    return 0;
  }
  return Object.keys(entrants).reduce( // Object.keys faz um array, partindo do objeto passado, com o tipo de pessoa (adullto, idoso ou criança).
    (sum, person) => sum + (entrants[person] * data.prices[person]), 0, // Usando o tipo, podemos acessar o objeto-parametro e o objeto que guarda o preço, multiplicando-os e armazenando a soma num reduce.
  );
}

function getAnimalMap(options) {
  // seu código aqui
}

const schedule = { // variável declarada para a função getSchedule
  Tuesday: 'Open from 8am until 6pm',
  Wednesday: 'Open from 8am until 6pm',
  Thursday: 'Open from 10am until 8pm',
  Friday: 'Open from 10am until 8pm',
  Saturday: 'Open from 8am until 10pm',
  Sunday: 'Open from 8am until 8pm',
  Monday: 'CLOSED',
};

function getSchedule(dayName) {
  if (dayName === undefined) { // se não for passado dia, retorna a lista de horarios.
    return schedule;
  }
  const daysArray = Object.entries(schedule); // transforma os itens da lista de horarios em array
  let dayHours; // variável para guardar as horas do dia pesquisado
  Object.keys(schedule).forEach((day, i) => { // itera no array da lista de horários, armazenando em dayHours o horário pesquisado
    if (day === dayName) {
      dayHours = Object.fromEntries([daysArray[i]]);
    }
  });
  return dayHours;
}

function getOldestFromFirstSpecies(id) {
  const employee = data.employees.find((person) => person.id === id); // variável que guarda o funcionário com base no id passado.
  const specie = data.species.find((animal) => animal.id === employee.responsibleFor[0]); // guarda a espécie que corresponde à primeira espécie que o funcionário cuida.
  const oldestAge = specie.residents.reduce((acc, res) => ((res.age > acc) ? res.age : acc), 0); // função que compara idades, retornando a mais alta.
  const oldestAnimal = specie.residents.find((animal) => animal.age === oldestAge); // percorre os animais até encontrar o que tem a idade igual a mais alta.
  const { name, sex, age } = oldestAnimal; // desestrutura o objeto, para retornar o array na proxima linha.
  return [name, sex, age];
}

function increasePrices(percentage) {
  // referência para arredondamento: https://stackoverflow.com/questions/11832914/how-to-round-to-at-most-2-decimal-places-if-necessary
  Object.keys(data.prices).forEach((price) => {
    data.prices[price] = Math.round(data.prices[price] * (percentage / 100 + 1) * 100) / 100; // iguala cada preço à ele mesmo * a porcentagem.
  });
}

function getEmployeeCoverage(idOrName) {
  // seu código aqui
}

module.exports = {
  calculateEntry,
  getSchedule,
  countAnimals,
  getAnimalMap,
  getSpeciesByIds,
  getEmployeeByName,
  getEmployeeCoverage,
  addEmployee,
  isManager,
  getAnimalsOlderThan,
  getOldestFromFirstSpecies,
  increasePrices,
  createEmployee,
};
