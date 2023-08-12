import { ITrend } from '../types'
import { TrendTopic } from './trend-topic'

const TRENDS_DATA: ITrend[] = [
  {
    topic: 'Tucker',
    tweetsNumber: 925.6,
  },
  {
    topic: 'Chelsea',
    tweetsNumber: 391,
  },
  {
    topic: 'Sarah',
    tweetsNumber: 271.2,
  },
  {
    topic: 'Bruna',
    tweetsNumber: 189.9,
  },
  {
    topic: 'Mitch',
    tweetsNumber: 159.9,
  },
  {
    topic: 'Lamar',
    tweetsNumber: 156.7,
  },
  {
    topic: 'Schumer',
    tweetsNumber: 123.1,
  },
  {
    topic: 'Alfa',
    tweetsNumber: 120.5,
  },
  {
    topic: 'Camila',
    tweetsNumber: 115.5,
  },
  {
    topic: '#GranHermano',
    tweetsNumber: 106.2,
  },
]

export const TrendsForYou = () => (
  <div className="w-full cursor-not-allowed rounded-xl bg-gray-100 p-3">
    <h3 className="text-xl font-bold">Trends For You</h3>
    <div className="mt-6 flex flex-col gap-6">
      {TRENDS_DATA.map((trend) => (
        <TrendTopic key={trend.topic} data={trend} />
      ))}
    </div>
  </div>
)
