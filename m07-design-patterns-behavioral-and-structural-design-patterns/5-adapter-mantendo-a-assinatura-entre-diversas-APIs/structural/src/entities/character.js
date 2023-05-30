export default class Character {
  constructor({ id, name, status, species, type, gender, origin, location }) {
    this.id = Number(id);
    this.name = name;
    this.status = status;
    this.species = species;
    this.type = type;
    this.gender = gender;
    this.origin = origin?.name;
    this.location = location?.name;
  }
};