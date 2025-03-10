import Axios from './Axios'
import SummarryApi from '../common/SummaryApi'

const fetchUserDetails = async() => {
    try {
        const res = await Axios({
            ...SummarryApi.user_details

        })
        return res.data
    } catch (error) {
        return{data: null}
    }
}

export default fetchUserDetails
