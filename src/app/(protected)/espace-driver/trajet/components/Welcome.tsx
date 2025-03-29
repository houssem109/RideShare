import React from 'react'

type WelcomeProps = {
    firstname: string;
    lastname: string;
}
const Welcome = ({firstname ,lastname}:WelcomeProps) => {
  return (
    <div>hello groupe iam {firstname} {lastname} </div>
  )
}

export default Welcome