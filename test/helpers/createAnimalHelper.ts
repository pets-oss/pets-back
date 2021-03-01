import supertest from 'supertest';

export default function createAnimal(
    done: Mocha.Done,
    request: supertest.SuperTest<supertest.Test>,
    registrationNo: String,
    date: String,
    setId: Function
) {
    request
        .post('/graphql')
        .send({
            query: `
                      mutation {
                      createAnimal(input: {
                          name: "Lokis",
                          organization: 2,
                          registration: {
                              registrationNo: "${registrationNo}",
                              registrationDate: "${date}",
                              status: Active
                          }
                      })
                      {id}
                    }`,
        })
        .set('Authorization', `Bearer ${process.env.BEARER_TOKEN}`)
        .end((err, res) => {
            if (err) {
                // eslint-disable-next-line no-console
                console.log('Failed on animalRegistration test preparation');
                // eslint-disable-next-line no-console
                console.log(res.body);
                return done(err);
            }
            setId(res.body.data.createAnimal.id);
            return done();
        });
}
