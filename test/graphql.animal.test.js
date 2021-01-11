const chai = require('chai');
const expect = chai.expect;
const url = `http://localhost:8081`;
const request = require('supertest')(url);

const expectAnimalFields = animal => {
  expect(animal).to.have.property('id');
  expect(animal['id']).to.be.a('number');

  expect(animal).to.have.property('organization');
  expect(animal['organization']).to.be.a('string');

  expect(animal).to.have.property('registration_no');
  expect(animal['registration_no']).to.be.a('string');

  expect(animal).to.have.property('registration_date');
  expect(animal['registration_date']).to.be.a('string');

  expect(animal).to.have.property('status');
  expect(animal['status']).to.be.a('string');

  expect(animal).to.have.property('image_url');
  expect(animal['image_url']).to.be.a('string');

  expect(animal).to.have.property('birth_date');
  expect(animal['birth_date']).to.be.a('string');

  expect(animal).to.have.property('name');
  expect(animal['name']).to.be.a('string');

  expect(animal).to.have.property('species');
  expect(animal['species']).to.be.a('string');

  expect(animal).to.have.property('gender');
  expect(animal['gender']).to.be.a('string');

  expect(animal).to.have.property('weight');
  expect(animal['weight']).to.be.a('number');

  expect(animal).to.have.property('microchip_id');
  expect(animal['microchip_id']).to.be.a('string');

  expect(animal).to.have.property('chip_install_date');
  expect(animal['chip_install_date']).to.be.a('string');

  expect(animal).to.have.property('allergy');
  expect(animal).to.have.property('food');
  expect(animal).to.have.property('comments');

  expect(animal).to.have.property('mod_time');
  expect(animal['mod_time']).to.be.a('string');

  expect(animal).to.have.property('breed');
  expect(animal['breed']).to.be.a('string');

  expect(animal).to.have.property('color');
  expect(animal['color']).to.be.a('string');
}

const animalFields = `
  { 
    id organization registration_no registration_date status 
    image_url birth_date name species gender weight microchip_id 
    chip_install_date allergy food comments mod_time breed color
  }
`

describe('GraphQL', () => {
  it('Returns animal id=1 with all fields', (done) => {
    request.post('/graphql')
      .send({ query: `
        { animal(id: 1) 
          ${animalFields}
        }
      `})
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expectAnimalFields(res.body.data.animal);
        done();
      })
  });
  
  it('Returns all animals with all fields', (done) => {
    request.post('/graphql')
      .send({ query: `
        { animals
          ${animalFields}
        }
      `})
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        let animals = res.body.data.animals;
        expect(animals).to.be.an('array');
        expectAnimalFields(animals[0]);
        expect(animals).to.have.lengthOf(5);
        done();
      })
  });
});
