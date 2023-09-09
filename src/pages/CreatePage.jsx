import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import {toast} from "react-toastify"
import {VITE_BACKEND_URL} from "../App"
const CreatePage=()=>{

    const [name, setName]=useState("")
    const [quantity, setQuantity]=useState("")
    const [price, setPrice]=useState("")
    const [imageUrl, setImageUrl]=useState("")
    const [isLoading, setIsLoading]=useState(false)
    const navigate=useNavigate()

    const saveProduct=async (e)=>{
        e.preventDefault()
        if(name===""|| quantity===""|| price===""||imageUrl===""){
            alert("Please fill all the fields")
            return
        }

        try{
            setIsLoading(true)
            const response=await axios.post(`${VITE_BACKEND_URL}/api/products/`, {name:name, quantity:quantity, price:price, image:imageUrl})
            toast.success(`Saved ${response.data.name} Successfully`)
            setIsLoading(false)
            navigate("/")
        }catch(error){
            toast.error(error.message)
            setIsLoading(false)
        }
    }
    return (
        <div className="max-w-lg bg-white shadow-lg mx-auto p-7 rounded mt-6">
            <h2 className="font-semibold text-2xl mb-4 block text-center">
                Register your product
            </h2>

            <form onSubmit={saveProduct}>
                <div className="space-y-2">
                    <div>
                        <label>Name</label>
                        <input type="text" value={name} onChange={(e)=> setName(e.target.value)} className="w-full block border p-3 text-black-200 p-2 rounded focus:outline-none focus:shadow-outline focus:border-blue-500 placeholder-gray-400" placeholder="Enter Name"/>
                    </div>
                    <div>
                        <label>Quantity</label>
                        <input type="number" value={quantity} onChange={(e)=>setQuantity(e.target.value)} className="w-full block border p-3 text-black-200 p-2 rounded focus:outline-none focus:shadow-outline focus:border-blue-500 placeholder-gray-400" placeholder="Enter Quantity"/>
                    </div>
                    <div>
                        <label>Price</label>
                        <input type="number" value={price} onChange={(e)=>setPrice(e.target.value)} className="w-full block border p-3 text-black-200 p-2 rounded focus:outline-none focus:shadow-outline focus:border-blue-500 placeholder-gray-400" placeholder="Enter Price"/>
                    </div>
                    <div>
                        <label>Image URL</label>
                        <input type="text" value={imageUrl} onChange={(e)=>setImageUrl(e.target.value)} className="w-full block border p-3 text-black-200 p-2 rounded focus:outline-none focus:shadow-outline focus:border-blue-500 placeholder-gray-400" placeholder="Enter Image Url"/>
                    </div>
                    <div>
                        {!isLoading &&(<button className="block w-full mt-6 bg-blue-700 text-white rounded-sm px-4 py-2 font-bold hover:bg-blue-600 hover:cursor-pointer">Save</button>)}
                        
                    </div>
                </div>
            </form>
        </div>
    )   
}

export default CreatePage