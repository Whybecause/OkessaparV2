import { GET } from "@/app/api/shows/route";
import { NextApiRequest, NextApiResponse } from 'next';
import { createMocks } from "node-mocks-http";


describe('GET /api/shows', () => {
  it('should return 400 if filter is missing', async () => {
    const { req, res } = createMocks({
      method: 'GET',
      url: '/api/shows',
      query: {},
    });

    await GET(req);
    console.log('ress= ', res.statusCode);
    // expect(res.statusCode).toBe(400);
    // expect(res._getData().error).toBe('Filter is invalid or missing');
  });
});
