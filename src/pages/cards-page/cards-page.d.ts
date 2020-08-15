export namespace CardsPage {
  interface OwnProps {
    color: string
  }

  interface StoreProps {
    todos: ITodo[]
  }

  interface DispatchProp {
    id: number
    completed: boolean
    text: string
  }

  export type Props = OwnProps & DispatchProp & StoreProps
}
