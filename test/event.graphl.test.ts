// import { expect } from 'chai';
// import supertest from 'supertest';
// import { eventFields, eventTypeFields } from './testFields';
// import validateEventType  from './validators/eventType.interface.validator';
// import validateEvent  from './validators/event.interface.validator';
//
// const url = process.env.TEST_URL || 'http://localhost:8081';
// const request = supertest(url);
//
// const EVENTS_QUERY: string = 'events(language: "lt")';
//
// describe('GraphQl event fetch tests', () => {
//     it('returns all event types with all fields', (done) => {
//         request.post('/graphql')
//             .send({
//                 query: `{
//                     ${EVENTS_QUERY} {
//                         types ${eventTypeFields}
//                     }
//                 }`
//             })
//             .set('Authorization', `Bearer ${process.env.BEARER_TOKEN}`)
//             .expect(200)
//             .end((err, res) => {
//                 if (err) return done(err);
//
//                 const { body: { data: { events } } } = res;
//                 expect(events).to.be.an('array');
//                 expect(events).to.be.length(1);
//
//                 const [{ types }] = events;
//                 expect(types).to.be.an('array');
//                 validateEventType(types[0]);
//                 expect(types).to.have.length.above(10);
//                 return done();
//             });
//     });
//
//     it('returns all events with all fields', (done) => {
//         request.post('/graphql')
//             .send({
//                 query: `{
//                     ${EVENTS_QUERY} {
//                         all ${eventFields}
//                     }
//                 }`
//             })
//             .set('Authorization', `Bearer ${process.env.BEARER_TOKEN}`)
//             .expect(200)
//             .end((err, res) => {
//                 if (err) return done(err);
//
//                 const { body: { data: { events } } } = res;
//                 expect(events).to.be.an('array');
//                 expect(events).to.be.length(1);
//
//                 const [{ all }] = events;
//                 expect(all).to.be.an('array');
//                 validateEvent(all[0]);
//                 expect(all).to.have.length.above(1);
//                 return done();
//             });
//     });
//
//     it('returns animal id=2 all events with all fields', (done) => {
//         request.post('/graphql')
//             .send({
//                 query: `{
//                     ${EVENTS_QUERY} {
//                         animalAll(animalId: 2) ${eventFields}
//                     }
//                 }`
//             })
//             .set('Authorization', `Bearer ${process.env.BEARER_TOKEN}`)
//             .expect(200)
//             .end((err, res) => {
//                 if (err) return done(err);
//
//                 const { body: { data: { events } } } = res;
//                 expect(events).to.be.an('array');
//                 expect(events).to.be.length(1);
//
//                 const [{ animalAll }] = events;
//                 expect(animalAll).to.be.an('array');
//                 validateEvent(animalAll[0]);
//                 expect(animalAll).to.have.length.above(0);
//                 return done();
//             });
//     });
//
//     it('returns all general events with all fields', (done) => {
//         request.post('/graphql')
//             .send({
//                 query: `{
//                     ${EVENTS_QUERY} {
//                         general ${eventFields}
//                     }
//                 }`
//             })
//             .set('Authorization', `Bearer ${process.env.BEARER_TOKEN}`)
//             .expect(200)
//             .end((err, res) => {
//                 if (err) return done(err);
//
//                 const { body: { data: { events } } } = res;
//                 expect(events).to.be.an('array');
//                 expect(events).to.be.length(1);
//
//                 const [{ general }] = events;
//                 expect(general).to.be.an('array');
//                 validateEvent(general[0]);
//                 expect(general).to.have.length.above(0);
//                 return done();
//             });
//     });
//
//     it('returns animal id=2 all general events with all fields', (done) => {
//         request.post('/graphql')
//             .send({
//                 query: `{
//                     ${EVENTS_QUERY} {
//                         animalGeneral(animalId: 2) ${eventFields}
//                     }
//                 }`
//             })
//             .set('Authorization', `Bearer ${process.env.BEARER_TOKEN}`)
//             .expect(200)
//             .end((err, res) => {
//                 if (err) return done(err);
//
//                 const { body: { data: { events } } } = res;
//                 expect(events).to.be.an('array');
//                 expect(events).to.be.length(1);
//
//                 const [{ animalGeneral }] = events;
//                 expect(animalGeneral).to.be.an('array');
//                 validateEvent(animalGeneral[0]);
//                 expect(animalGeneral).to.have.length.above(0);
//                 return done();
//             });
//     });
//
//     it('returns all medical events with all fields', (done) => {
//         request.post('/graphql')
//             .send({
//                 query: `{
//                     ${EVENTS_QUERY} {
//                         medical ${eventFields}
//                     }
//                 }`
//             })
//             .set('Authorization', `Bearer ${process.env.BEARER_TOKEN}`)
//             .expect(200)
//             .end((err, res) => {
//                 if (err) return done(err);
//
//                 const { body: { data: { events } } } = res;
//                 expect(events).to.be.an('array');
//                 expect(events).to.be.length(1);
//
//                 const [{ medical }] = events;
//                 expect(medical).to.be.an('array');
//                 validateEvent(medical[0]);
//                 expect(medical).to.have.length.above(0);
//                 return done();
//             });
//     });
//
//     it('returns animal id=4 all medical events with all fields', (done) => {
//         request.post('/graphql')
//             .send({
//                 query: `{
//                     ${EVENTS_QUERY} {
//                         animalMedical(animalId: 4) ${eventFields}
//                     }
//                 }`
//             })
//             .set('Authorization', `Bearer ${process.env.BEARER_TOKEN}`)
//             .expect(200)
//             .end((err, res) => {
//                 if (err) return done(err);
//
//                 const { body: { data: { events } } } = res;
//                 expect(events).to.be.an('array');
//                 expect(events).to.be.length(1);
//
//                 const [{ animalMedical }] = events;
//                 expect(animalMedical).to.be.an('array');
//                 validateEvent(animalMedical[0]);
//                 expect(animalMedical).to.have.length.above(0);
//                 return done();
//             });
//     });
// });
