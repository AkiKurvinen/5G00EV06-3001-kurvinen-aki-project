import { useState, useEffect } from "react";

// JSON Data storage function is not implemented
function Data(props) {
  const [data, setData] = useState(null);
  useEffect(() => {
    if (props.data !== null) {
      setData(props.data);
      console.log(data);
    } else {
      console.log(data);
    }
  }, [props.data, data]);

  if (!data) {
    return null;
  } else return data;
}
export default Data;
