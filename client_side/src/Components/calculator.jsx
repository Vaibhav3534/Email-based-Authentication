import React from "react"
import TextField from '@mui/material/TextField';
import axios from "axios";


const Calculator = () => {
    const initialData = {
        num1: 0,
        num2: 0
    }
    const [result, setResult] = React.useState(0)
    const [input, setInput] = React.useState(initialData)
    
    React.useEffect(() => {
        console.log(result)
    }, [result])

    const handleAdd = async () => {
        try {
            const data = await axios.post("http://localhost:8080/add", { input })

            const result = data.data.sum
            setResult(result)

        } catch (error) {
            console.log(error)
        }
    }

    const handleChange = (e) => {
        const { value, name } = e.target;
        setInput({ ...input, [name]: value })

    }
    return (
        <div>
            <h1>Calculator</h1>
            <TextField type="number" name="num1" onChange={handleChange} />
            <TextField type="number" name="num2" onChange={handleChange} />
            <button onClick={handleAdd}>Add</button>
            <h2>{result}</h2>
        </div>
    )
}

export default Calculator