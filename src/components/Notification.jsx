const Notification = ({message, type}) => {

  console.log("Call to Notification")

  if(message === null || type === null) {
    console.log("Returning null, params: ", message, type)
    return null
  }

  return(
    <div className={type}>
      {message}
    </div>
  )
}

export default Notification