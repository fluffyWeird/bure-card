import { useQuery } from '@tanstack/react-query'
import axios from 'axios'


export default function UseFetchAllEnrolles() {

    const Fetchcourse=()=>{

        return axios.get('https://localhost:5000/api/enroll',{
            withCredentials: true
        })
    }
  
    return useQuery({ queryKey: ['fetchAllEnrolles'], queryFn: Fetchcourse })
 
}