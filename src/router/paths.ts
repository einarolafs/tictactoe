enum Paths {
  root = 'root',
}

type PathsObject = {
  [key in Paths]: string
}

const paths: PathsObject = {
  root: '/:playerId?',
}

export default paths
