enum Paths {
  root = 'root',
  game = 'game',
}

type PathsObject = {
  [key in Paths]: string
}

const paths: PathsObject = {
  root: '/',
  game: '/game/:playerId?',
}

export default paths
