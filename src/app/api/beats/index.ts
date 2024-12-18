import type { NextApiRequest, NextApiResponse } from 'next'


export const beats = [
  { id: '1', name: 'Purple', album_img: '/assets/img-beats/purple.png', 
    audio: '/assets/beats/(pluggnb)purple_.mp3', genres: ['plugg', 'pluggnb'],
    dataLnc: '2023/01/24',
  },].sort((a, b) => parseInt(a.id) - parseInt(b.id));


export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    res.status(200).json(beats);
  } else {
    res.status(405).end();
  }
}