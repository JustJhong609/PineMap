import { FARM_STATUS } from '../utils/constants'

/* Mock pineapple farm data for Bukidnon */
export const MOCK_FARMS = [
  {
    id: 1,
    name: 'Sunshine Plains Farm',
    status: FARM_STATUS.ACTIVE,
    description: '500 hectares of premium Del Monte pineapples',
    lat: 8.2500,
    lng: 124.7500,
    planted: '2023-01-15',
    expectedHarvest: '2024-06-15'
  },
  {
    id: 2,
    name: 'Golden Valley Plantation',
    status: FARM_STATUS.HARVESTING,
    description: 'Estate managed by cooperative, 320 hectares',
    lat: 8.1500,
    lng: 124.8000,
    planted: '2022-08-20',
    expectedHarvest: '2024-03-20'
  },
  {
    id: 3,
    name: 'Mindanao Fruit Orchard',
    status: FARM_STATUS.IDLE,
    description: 'Seasonal operation, 180 hectares',
    lat: 8.1000,
    lng: 124.7000,
    planted: null,
    expectedHarvest: '2024-09-01'
  },
  {
    id: 4,
    name: 'Tropical Crown Estate',
    status: FARM_STATUS.ACTIVE,
    description: 'High-altitude pineapple farm, 410 hectares',
    lat: 8.3000,
    lng: 124.8500,
    planted: '2022-12-01',
    expectedHarvest: '2024-07-01'
  },
  {
    id: 5,
    name: 'Pilipinas Gold Farm',
    status: FARM_STATUS.HARVESTING,
    description: 'Organic pineapple certification pending, 95 hectares',
    lat: 8.2000,
    lng: 124.6500,
    planted: '2023-02-10',
    expectedHarvest: '2024-04-10'
  },
  {
    id: 6,
    name: 'Mt. Valencia Plantation',
    status: FARM_STATUS.ACTIVE,
    description: 'Cooperative-owned, premium quality, 340 hectares',
    lat: 8.0500,
    lng: 124.8200,
    planted: '2023-03-01',
    expectedHarvest: '2024-08-15'
  },
  {
    id: 7,
    name: 'Bukidnon Agri-Hub',
    status: FARM_STATUS.HARVESTING,
    description: 'Research and demonstration farm, 120 hectares',
    lat: 8.2800,
    lng: 124.7200,
    planted: '2022-06-15',
    expectedHarvest: '2024-02-28'
  },
  {
    id: 8,
    name: 'Southern Harvest Farm',
    status: FARM_STATUS.IDLE,
    description: 'Off-season maintenance, 250 hectares',
    lat: 8.0800,
    lng: 124.7800,
    planted: null,
    expectedHarvest: '2024-10-01'
  }
]

/* Helper to get next unique farm ID */
export const getNextFarmId = (farms) => {
  return farms.length > 0 ? Math.max(...farms.map(f => f.id)) + 1 : 1
}
