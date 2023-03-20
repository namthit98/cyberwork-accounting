import { STATUS } from '@/const'

export const getStatusStringFromNumber = (value: number) => {
  if (value === STATUS.INACTIVE) return 'Không hoạt động'
  if (value === STATUS.ACTIVE) return 'Hoạt động'

  return STATUS.NONE
}
