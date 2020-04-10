import titleize from 'titleize';

export const rentalType = isShared => isShared ? 'Shared' : 'Entire'

export const toUppercase = value => value ? titleize(value) : ''


