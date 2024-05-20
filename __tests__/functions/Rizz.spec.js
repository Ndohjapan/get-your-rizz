const RizzService = require('../../controllers/rizz-controller');
const Rizz = require('../../database/model/Rizz');

const service = new RizzService();

const { setup, SeedDB } = require('../setup');
setup();

describe('Getting the rizz', () => {
  it('check - ensure that function returns the two rizz added to database', async () => {
    await SeedDB();
    const result = await service.GetLatestRizz();
    expect(result.total_docs).toBe(3);
  })
});

describe ('Liking of a rizz', () => {
  it('check - ensure that the function increases the likes count of a particular rizz', async () => {
    await SeedDB();

    const rizzes = await Rizz.find({});

    await service.LikeRizz(rizzes[0]._id);

    const curr_rizz_db = await Rizz.findById(rizzes[0]._id);

    expect(curr_rizz_db.likes).toBe(1);
  })
})
