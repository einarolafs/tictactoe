enum Paths {
  root = 'root',
  //game = 'game',
}

type PathsObject = {
  [key in Paths]: string
}

const paths: PathsObject = {
  root: '/:playerId?',
}

export default paths
