export default function FaultTolerance() {
  return (
    <div>
      <TopComponent />
      <ErrorProneComponent />
      <BottomComponent />
    </div>
  )
}

function TopComponent() {
  return <h2>Top component</h2>
}

function BottomComponent() {
  return <h2>Bottom component</h2>
}

function ErrorProneComponent() {
  throw Error('oops, you broke it')
  return <h2>Error prone component</h2>
}

function NiceErrorMessage() {
  return <p>Something when wrong</p>
}
