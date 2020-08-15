enum Paths {
  ROOT = 'ROOT',
  CARDS = 'CARDS',
}

type PathsObject = {
  [key in Paths]: string
}

const paths: PathsObject = {
  ROOT: '/',
  CARDS: '/cards',
}

export default paths
