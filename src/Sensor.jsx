export default function Sensor(props) {
    let { keyName, value} = props;
    let like = String(value)
    console.log('Sensor Component Props:', props)
    //let like = value
    //console.log(sense)

    //console.log(like)
    function Switch () {

    }

    return(
        <div className='caption'>
            <div>{like}</div>
            <div>{keyName}</div>

      leader
      
      </div>
    )
}
