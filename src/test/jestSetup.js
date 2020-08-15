import mockFetch from 'jest-fetch-mock'
import '@babel/polyfill'

global.fetch = mockFetch
