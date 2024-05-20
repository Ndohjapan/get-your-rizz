const { app } = require('../../app');
const request = require('supertest');
const RizzService = require('../../controllers/rizz-controller');
const Rizz = require('../../database/model/Rizz');

const service = new RizzService();

const { setup, SeedDB } = require('../setup');
setup();

describe('Getting the rizz', () => {
  const GetLatestRizz = async () => {
    const response = await request(app)
      .get('/api/v1/rizz/latest?page=1&limit=100')
      .send();

    return response;
  };

  it('check - ensure that function returns the two rizz added to database', async () => {
    await SeedDB();
    const result = await GetLatestRizz();
    expect(result.body.data.total_docs).toBe(3);
  });
});

describe('Liking of a rizz', () => {
  const LikingRizz = async (rizz_id) => {
    const response = await request(app)
      .post(`/api/v1/rizz/${rizz_id}/like`)
      .send();

    return response;
  };

  it('check - ensure that the function increases the likes count of a particular rizz', async () => {
    await SeedDB();

    const rizzes = await Rizz.find({});

    const response = await LikingRizz(rizzes[0]._id);

    expect(response.body.data.likes).toBe(1);
  });
});
